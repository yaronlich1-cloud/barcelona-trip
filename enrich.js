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
    try { const c = JSON.parse(localStorage.getItem(key) || 'null'); if (c && Date.now() - c.at < 14 * 864e5) return c; } catch (e) { /* ignore */ }
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
    try { localStorage.setItem(key, JSON.stringify(out)); } catch (e) { /* storage full */ }
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
    out.partial = !!out.osmErr || (!osm && !out.wiki);
    return out;
  }

  return { details, wikiArticle, parseHours, kindFrom, toHeOrEn };
})();
