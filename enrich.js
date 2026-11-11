// Automatic place details from free open sources:
// OpenStreetMap (Overpass) for type, hours, diet tags, website and phone; Wikidata + Wikipedia for the article and photos.
window.Enrich = (() => {
  'use strict';
  const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass-api.de/api/interpreter'];
  const getJSON = async (url, tries = 2, timeout = 12000) => {
    for (let i = 0; ; i++) {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), timeout);
      try { const r = await fetch(url, { signal: ctl.signal }); if (!r.ok) throw new Error('HTTP ' + r.status); return await r.json(); }
      catch (err) { if (i + 1 >= tries) throw err; await new Promise((res) => setTimeout(res, 1500 * (i + 1))); }
      finally { clearTimeout(t); }
    }
  };
  const OSM_TYPE = { N: 'node', W: 'way', R: 'relation', node: 'node', way: 'way', relation: 'relation' };
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9֐-׿ ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\"]/g, '\\$&');

  const cut = (t, n) => (t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + '…' : t);
  /* ---------- translation to Hebrew ---------- */
  // Chrome's built-in translator when the phone has it; otherwise the free MyMemory service (about 5,000 characters a day per phone).
  let builtIn = null;
  async function translate(text) {
    text = String(text || '').trim(); if (!text) return '';
    let h = 0; for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
    const key = 'bcn.tr:' + h + ':' + text.length;
    try { const c = localStorage.getItem(key); if (c) return c; } catch (err) { /* ignore */ }
    let out = null;
    try {
      // Use the phone's own translator only when its Hebrew model is already installed: creating one can wait for a long download.
      if (!builtIn && 'Translator' in self && self.Translator.availability) {
        const opts = { sourceLanguage: 'en', targetLanguage: 'he' };
        const av = await Promise.race([self.Translator.availability(opts), new Promise((r) => setTimeout(() => r('timeout'), 1500))]);
        if (av === 'available') builtIn = await Promise.race([self.Translator.create(opts), new Promise((r) => setTimeout(() => r(null), 3000))]);
      }
      if (builtIn) out = await Promise.race([builtIn.translate(text), new Promise((r) => setTimeout(() => r(null), 8000))]);
    } catch (err) { builtIn = null; }
    if (!out) {
      const pieces = []; let cur = '';
      text.split(/(?<=[.!?])\s+/).forEach((sen) => { if ((cur + ' ' + sen).length > 450 && cur) { pieces.push(cur); cur = sen; } else cur = cur ? cur + ' ' + sen : sen; });
      if (cur) pieces.push(cur);
      const res = [];
      for (const piece of pieces) {
        const d = await getJSON(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(piece.slice(0, 480))}&langpair=en|he`, 1, 15000);
        if (d.responseStatus !== 200 || d.quotaFinished) throw new Error('translation quota');
        res.push(d.responseData.translatedText);
      }
      out = res.join(' ');
    }
    try { localStorage.setItem(key, out); } catch (err) { /* storage full */ }
    return out;
  }

  /* ---------- OpenStreetMap ---------- */
  async function osmTags(stop) {
    let q;
    if (stop.osm && OSM_TYPE[stop.osm.type]) q = `[out:json][timeout:15];${OSM_TYPE[stop.osm.type]}(${stop.osm.id});out tags center 1;`;
    else if (stop.lat != null) {
      const nm = String(stop.name || '').split(/[(·,–-]/)[0].trim();
      if (!/[a-zA-Z]/.test(nm)) return null; // Hebrew-only names rarely match OSM names
      q = `[out:json][timeout:15];nwr(around:90,${stop.lat},${stop.lng})["name"~"${reEsc(nm)}",i];out tags center 1;`;
    } else return null;
    let d = null;
    for (const host of OVERPASS) {
      try { d = await getJSON(`${host}?data=${encodeURIComponent(q)}`, 1, 9000); break; } catch (err) { /* try the next server */ }
    }
    if (!d) throw new Error('overpass unavailable');
    const el = d.elements && d.elements[0];
    return el ? { tags: el.tags || {}, osm: { type: el.type, id: el.id } } : null;
  }

  /* ---------- opening_hours ---------- */
  const DAY = { Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6, Su: 0 };
  const HE = { Mo: 'ב׳', Tu: 'ג׳', We: 'ד׳', Th: 'ה׳', Fr: 'ו׳', Sa: 'ש׳', Su: 'א׳' };
  const ORDER = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  function parseHours(str) {
    if (!str) return null;
    const text = str.replace(/\b(Mo|Tu|We|Th|Fr|Sa|Su)\b/g, (m) => HE[m]).replace(/\boff\b|\bclosed\b/gi, 'סגור').replace(/\bPH\b/g, 'חגים').replace(/;\s*/g, ' · ').replace(/-/g, '–');
    if (/^\s*24\/7\s*$/.test(str)) return { text: 'פתוח 24/7', closed: [] };
    const open = new Set(); let ok = true; let any = false;
    str.split(';').map((r) => r.trim()).filter(Boolean).forEach((rule) => {
      if (/^PH\b/.test(rule)) return;
      const m = rule.match(/^((?:(?:Mo|Tu|We|Th|Fr|Sa|Su)(?:-(?:Mo|Tu|We|Th|Fr|Sa|Su))?)(?:,(?:Mo|Tu|We|Th|Fr|Sa|Su)(?:-(?:Mo|Tu|We|Th|Fr|Sa|Su))?)*)?(?:,PH)?\s*(.*)$/);
      if (!m) { ok = false; return; }
      const [, spec, rest] = m;
      if (rest && /[A-Za-z]/.test(rest.replace(/\b(off|closed)\b/gi, ''))) { ok = false; return; } // months, weeks etc: too complex
      let days = [];
      if (!spec) days = [0, 1, 2, 3, 4, 5, 6];
      else spec.split(',').forEach((part) => {
        const [a, b] = part.split('-');
        if (!b) days.push(DAY[a]);
        else { let i = ORDER.indexOf(a); const j = ORDER.indexOf(b); for (let n = 0; n < 7; n++) { days.push(DAY[ORDER[i]]); if (i === j) break; i = (i + 1) % 7; } }
      });
      any = true;
      if (/\b(off|closed)\b/i.test(rest)) days.forEach((d) => open.delete(d)); else days.forEach((d) => open.add(d));
    });
    if (!ok || !any) return { text, closed: null };
    return { text, closed: [0, 1, 2, 3, 4, 5, 6].filter((d) => !open.has(d)) };
  }

  /* ---------- kind from OSM categories ---------- */
  function kindFrom(key, value) {
    const v = value || '';
    if (/^(restaurant|cafe|fast_food|food_court|ice_cream|bakery)$/.test(v)) return 'food';
    if (/^(bar|pub|nightclub|biergarten)$/.test(v)) return 'bar';
    if (/^(museum|gallery|arts_centre)$/.test(v)) return 'museum';
    if (/^(place_of_worship|cathedral|church|chapel|basilica)$/.test(v)) return 'church';
    if (/^(viewpoint|peak)$/.test(v)) return 'view';
    if (/^(park|garden|nature_reserve)$/.test(v)) return 'park';
    if (/^(marketplace)$/.test(v)) return 'market';
    if (key === 'shop' || /^(mall|department_store|clothes)$/.test(v)) return 'shop';
    if (/^(theatre|cinema|music_venue|concert_hall)$/.test(v)) return 'show';
    if (/^(hotel|hostel|guest_house|apartment)$/.test(v)) return 'hotel';
    if (/^(beach|marina|harbour)$/.test(v)) return 'port';
    if (/^(monument|memorial|castle|attraction|artwork|heritage|building|palace)$/.test(v)) return 'gaudi';
    return null;
  }

  /* ---------- Wikipedia ---------- */
  async function wikiFromTags(tags) {
    if (!tags) return null;
    if (tags.wikidata) {
      try {
        const d = await getJSON(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${tags.wikidata}&props=sitelinks&sitefilter=hewiki|enwiki&format=json&origin=*`);
        const sl = (d.entities[tags.wikidata] || {}).sitelinks || {};
        if (sl.hewiki) return { lang: 'he', title: sl.hewiki.title };
        if (sl.enwiki) return { lang: 'en', title: sl.enwiki.title };
      } catch (e) { /* fall through */ }
    }
    if (tags.wikipedia) {
      const i = tags.wikipedia.indexOf(':'); const lang = tags.wikipedia.slice(0, i); const title = tags.wikipedia.slice(i + 1);
      if (lang === 'he' || lang === 'en') return { lang, title };
      return toHeOrEn(lang, title);
    }
    return null;
  }
  async function toHeOrEn(lang, title) {
    try {
      const d = await getJSON(`https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=langlinks&lllimit=50&redirects=1&format=json&origin=*`);
      const p = Object.values(d.query.pages)[0]; const ll = p.langlinks || [];
      const he = ll.find((l) => l.lang === 'he'); if (he) return { lang: 'he', title: he['*'] };
      const en = ll.find((l) => l.lang === 'en'); if (en) return { lang: 'en', title: en['*'] };
      if (lang === 'en' || lang === 'he') return { lang, title: p.title };
    } catch (e) { /* none */ }
    return null;
  }
  async function wikiByGeo(stop) {
    if (stop.lat == null) return null;
    const name = norm(String(stop.name).split(/[(·,]/)[0]);
    try {
      const d = await getJSON(`https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${stop.lat}|${stop.lng}&gsradius=250&gslimit=10&format=json&origin=*`);
      const hits = d.query.geosearch || [];
      const match = hits.find((h) => { const t = norm(h.title); return name && (t.includes(name) || name.includes(t)); }) || (hits[0] && hits[0].dist < 25 ? hits[0] : null);
      if (match) return toHeOrEn('en', match.title);
    } catch (e) { /* none */ }
    return null;
  }

  const SKIP = /^(references|notes|see also|external links|further reading|bibliography|gallery|sources|הערות שוליים|קישורים חיצוניים|ראו גם|לקריאה נוספת|מקורות|גלריה|גלריית תמונות)$/i;
  async function wikiArticle(ref) {
    const key = `bcn.wk:${ref.lang}:${ref.title}`;
    try {
      const c = JSON.parse(localStorage.getItem(key) || 'null');
      if (c && Date.now() - c.at < 14 * 864e5) {
        if (c.lang === 'en' && !c.introHe) { try { c.introHe = await translate(cut(c.intro, 1400)); const t = await translate(c.sections.map((s) => s.title).join(' | ')).then((x) => x.split(/\s*\|\s*/)); if (t.length === c.sections.length) c.sections.forEach((s, i) => { s.titleHe = t[i]; }); localStorage.setItem(key, JSON.stringify(c)); } catch (err) { /* later */ } }
        return c;
      }
    } catch (e) { /* ignore */ }
    const host = `https://${ref.lang}.wikipedia.org`;
    const d = await getJSON(`${host}/w/api.php?action=query&prop=extracts|pageimages|langlinks&lllang=en&piprop=original&explaintext=1&exsectionformat=wiki&redirects=1&titles=${encodeURIComponent(ref.title)}&format=json&origin=*`);
    const page = Object.values(d.query.pages)[0];
    const raw = (page.extract || '').replace(/\r/g, '');
    const parts = raw.split(/\n(={2,})\s*([^=\n]+?)\s*\1\n/);
    const intro = parts[0].trim();
    const sections = [];
    for (let i = 1; i < parts.length; i += 3) {
      const level = parts[i].length, title = parts[i + 1].trim(), body = (parts[i + 2] || '').trim();
      if (SKIP.test(title)) continue;
      if (level === 2 || !sections.length) sections.push({ title, body });
      else if (body) sections[sections.length - 1].body += `\n\n${title}\n${body}`;
    }
    const keep = sections.filter((s) => s.body.length > 80).slice(0, 6).map((s) => ({ title: s.title, body: s.body.slice(0, 2500) }));
    let images = [];
    try {
      const m = await getJSON(`${host}/api/rest_v1/page/media-list/${encodeURIComponent(page.title.replace(/ /g, '_'))}`);
      images = (m.items || []).filter((x) => x.type === 'image' && x.srcset && x.srcset[0] && !/\.svg/i.test(x.title)).slice(0, 10).map((x) => 'https:' + x.srcset[0].src);
    } catch (e) { /* no images */ }
    // Hebrew articles often have few photos: add the English article's gallery
    if (images.length < 3 && ref.lang === 'he' && page.langlinks && page.langlinks[0]) {
      try {
        const m = await getJSON(`https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(page.langlinks[0]['*'].replace(/ /g, '_'))}`, 1);
        images = images.concat((m.items || []).filter((x) => x.type === 'image' && x.srcset && x.srcset[0] && !/\.svg/i.test(x.title)).map((x) => 'https:' + x.srcset[0].src)).slice(0, 10);
      } catch (e) { /* none */ }
    }
    if (!images.length && page.original && page.original.source) images = [page.original.source];
    const out = { at: Date.now(), lang: ref.lang, title: page.title, intro: intro.slice(0, 3000), sections: keep, images, url: `${host}/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}` };
    if (ref.lang === 'en') {
      try {
        out.introHe = await translate(cut(intro, 1400));
        const titles = await translate(keep.map((s) => s.title).join(' | '));
        const parts = titles.split(/\s*\|\s*/); if (parts.length === keep.length) keep.forEach((s, i) => { s.titleHe = parts[i]; });
      } catch (err) { out.trErr = true; }
    }
    try { localStorage.setItem(key, JSON.stringify(out)); } catch (e) { /* storage full */ }
    return out;
  }

  /* ---------- photos: OSM image tag + Wikimedia Commons photos taken at the spot ---------- */
  async function photosNear(stop, tags) {
    const out = []; const t = tags || {};
    if (t.image && /^https:\/\/\S+\.(jpe?g|png|webp)$/i.test(t.image)) out.push(t.image);
    if (stop.lat == null) return out;
    try {
      const d = await getJSON(`https://commons.wikimedia.org/w/api.php?action=query&generator=geosearch&ggscoord=${stop.lat}|${stop.lng}&ggsradius=70&ggsnamespace=6&ggslimit=20&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json&origin=*`, 1, 10000);
      const words = norm(stop.name).split(' ').filter((w) => w.length > 3);
      const pages = Object.values((d.query || {}).pages || {}).filter((p) => /\.(jpe?g|png|webp)$/i.test(p.title) && p.imageinfo && p.imageinfo[0] && p.imageinfo[0].thumburl);
      // Photos whose file name mentions the place come first
      const score = (p) => words.filter((w) => norm(p.title).includes(w)).length;
      pages.sort((a, b) => score(b) - score(a) || (a.index || 0) - (b.index || 0));
      pages.forEach((p) => out.push(p.imageinfo[0].thumburl));
    } catch (e) { /* no photos now */ }
    return [...new Set(out)].slice(0, 12);
  }

  /* ---------- is it open now? (Barcelona time) ---------- */
  function cityNow(date) {
    const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date || new Date());
    const g = (t) => (f.find((x) => x.type === t) || {}).value;
    return { day: DAY[g('weekday').slice(0, 2)], min: +g('hour') * 60 + +g('minute') };
  }
  // true = open, false = closed, null = the hours are too complex or unknown
  function openAt(str, date) {
    if (!str) return null; str = str.trim();
    if (/^24\/7$/.test(str)) return true;
    const ranges = Array(7).fill(null); let any = false;
    for (let rule of str.split(';').map((r) => r.trim()).filter(Boolean)) {
      if (/^PH\b/.test(rule)) continue;
      rule = rule.replace(/,PH\b/, '');
      const m = rule.match(/^((?:(?:Mo|Tu|We|Th|Fr|Sa|Su)(?:-(?:Mo|Tu|We|Th|Fr|Sa|Su))?)(?:,(?:Mo|Tu|We|Th|Fr|Sa|Su)(?:-(?:Mo|Tu|We|Th|Fr|Sa|Su))?)*)?\s*(.*)$/);
      if (!m) return null;
      const [, spec, rest] = m; let days = [];
      if (!spec) days = [0, 1, 2, 3, 4, 5, 6];
      else spec.split(',').forEach((part) => { const [a, b] = part.split('-'); if (!b) days.push(DAY[a]); else { let i = ORDER.indexOf(a); const j = ORDER.indexOf(b); for (let n = 0; n < 7; n++) { days.push(DAY[ORDER[i]]); if (i === j) break; i = (i + 1) % 7; } } });
      let rs = [];
      if (/^(off|closed)$/i.test(rest)) rs = [];
      else {
        for (const t of rest.split(',').map((x) => x.trim())) {
          const tm = t.match(/^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})\+?$/); if (!tm) return null;
          rs.push([+tm[1] * 60 + +tm[2], +tm[3] * 60 + +tm[4]]);
        }
      }
      any = true; days.forEach((d) => { ranges[d] = rs; });
    }
    if (!any) return null;
    const { day, min } = cityNow(date); const prev = (day + 6) % 7;
    if ((ranges[day] || []).some(([a, b]) => (b > a ? min >= a && min < b : min >= a))) return true;
    if ((ranges[prev] || []).some(([a, b]) => b <= a && min < b)) return true;
    return false;
  }

  /* ---------- live recommendations around a point (OpenStreetMap) ---------- */
  const NEAR_Q = {
    eat: (a) => `nwr(${a})["amenity"~"^(restaurant|cafe|fast_food|ice_cream)$"]["diet:vegan"~"^(yes|only)$"];nwr(${a})["amenity"~"^(restaurant|cafe|fast_food|ice_cream)$"]["diet:gluten_free"~"^(yes|only)$"];nwr(${a})["amenity"~"^(restaurant|cafe)$"]["cuisine"~"vegan"];`,
    drink: (a) => `nwr(${a})["amenity"~"^(bar|pub|biergarten)$"]["name"];nwr(${a})["amenity"="cafe"]["cuisine"~"coffee"]["name"];`,
    shop: (a) => `nwr(${a})["shop"~"^(clothes|shoes|department_store|fashion_accessories)$"]["brand"~"Zara|Mango|Uniqlo|Pull&Bear|Bershka|Massimo Dutti|Stradivarius|Oysho|H&M|Primark|Corte Ingl|Desigual|COS|Lefties",i];nwr(${a})["shop"~"^(clothes|department_store)$"]["name"~"Zara|Mango|Uniqlo|Pull&Bear|Massimo Dutti|Primark|Corte Ingl",i];`,
    see: (a) => `nwr(${a})["tourism"~"^(attraction|museum|viewpoint|gallery)$"]["name"];nwr(${a})["historic"~"^(monument|castle|church|palace|archaeological_site)$"]["name"];nwr(${a})["leisure"~"^(park|garden)$"]["name"]["wikidata"];nwr(${a})["amenity"="marketplace"]["name"];`
  };
  async function nearby(cat, lat, lng, radius) {
    const a = `around:${radius || 900},${lat},${lng}`;
    const q = `[out:json][timeout:20];(${NEAR_Q[cat](a)});out tags center 80;`;
    let d = null;
    for (const host of OVERPASS) { try { d = await getJSON(`${host}?data=${encodeURIComponent(q)}`, 1, 15000); break; } catch (err) { /* next server */ } }
    if (!d) throw new Error('overpass unavailable');
    const seen = new Set(); const out = [];
    (d.elements || []).forEach((el) => {
      const t = el.tags || {}; const name = t.name || t['name:en']; if (!name) return;
      const la = el.lat ?? (el.center && el.center.lat), lo = el.lon ?? (el.center && el.center.lon); if (la == null) return;
      const k = norm(name); if (seen.has(k)) return; seen.add(k);
      const key = Object.keys(t).find((x) => ['amenity', 'tourism', 'leisure', 'historic', 'shop'].includes(x));
      out.push({
        id: 'o' + el.type[0] + el.id, name, nameHe: t['name:he'] || '', lat: la, lng: lo, osm: { type: el.type, id: el.id },
        kind: kindFrom(key, t[key]) || (cat === 'eat' ? 'food' : cat === 'drink' ? 'bar' : cat === 'shop' ? 'shop' : 'star'), what: t[key] || '', brand: t.brand || '',
        details: { at: Date.now(), hours: t.opening_hours ? parseHours(t.opening_hours) : null, hoursRaw: t.opening_hours || '', website: t.website || t['contact:website'] || '', phone: t.phone || t['contact:phone'] || '', vegan: t['diet:vegan'] || '', gf: t['diet:gluten_free'] || '', cuisine: t.cuisine || '', nameHe: t['name:he'] || '' },
        hasWiki: !!(t.wikidata || t.wikipedia)
      });
    });
    return out;
  }
  // Wikipedia articles about places around a point: Hebrew first, then English
  async function wikiNearby(lat, lng, radius) {
    const out = [];
    for (const lang of ['he', 'en']) {
      try {
        const d = await getJSON(`https://${lang}.wikipedia.org/w/api.php?action=query&generator=geosearch&ggscoord=${lat}|${lng}&ggsradius=${radius || 1000}&ggslimit=25&prop=coordinates|pageimages|description&piprop=thumbnail&pithumbsize=400&format=json&origin=*`, 1, 12000);
        Object.values((d.query || {}).pages || {}).forEach((p) => {
          if (!p.coordinates || !p.coordinates[0]) return;
          if (/^(Barcelona|Eixample|Ciutat Vella|Spain|Catalonia)$/i.test(p.title) || /^(ברצלונה|ספרד|קטלוניה)$/.test(p.title)) return;
          if (lang === 'en' && out.some((o) => Math.abs(o.lat - p.coordinates[0].lat) < 0.0003 && Math.abs(o.lng - p.coordinates[0].lon) < 0.0003)) return;
          out.push({ id: 'w' + lang + p.pageid, name: p.title, lat: p.coordinates[0].lat, lng: p.coordinates[0].lon, kind: 'gaudi', what: p.description || '', thumb: p.thumbnail ? p.thumbnail.source : '', wikiFixed: { lang, title: p.title }, lang });
        });
      } catch (e) { /* try the other language */ }
      if (out.length >= 12) break;
    }
    return out;
  }

  /* ---------- main: gather everything for a stop ---------- */
  async function details(stop) {
    const out = { at: Date.now() };
    let osm = null;
    try { osm = await osmTags(stop); } catch (e) { out.osmErr = true; }
    if (osm) {
      const t = osm.tags; out.osm = osm.osm;
      out.kind = kindFrom(Object.keys(t).find((k) => ['amenity', 'tourism', 'leisure', 'shop', 'historic', 'natural'].includes(k)), t.amenity || t.tourism || t.leisure || t.shop || t.historic || t.natural);
      if (t.opening_hours) out.hours = parseHours(t.opening_hours);
      out.website = t.website || t['contact:website'] || '';
      out.phone = t.phone || t['contact:phone'] || '';
      out.vegan = t['diet:vegan'] || ''; out.gf = t['diet:gluten_free'] || '';
      out.cuisine = t.cuisine || '';
      out.nameHe = t['name:he'] || '';
      out.wiki = await wikiFromTags(t);
    }
    if (!out.wiki) out.wiki = await wikiByGeo(stop);
    out.photos = await photosNear(stop, osm && osm.tags);
    out.partial = !!out.osmErr || (!osm && !out.wiki);
    return out;
  }

  return { details, wikiArticle, parseHours, kindFrom, toHeOrEn, translate, photosNear, openAt, nearby, wikiNearby };
})();
