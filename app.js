(() => {
'use strict';
const T = window.TRIP;
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9);

/* ---------- icons ---------- */
const P = {
  hotel: '<path d="M3 19V7M3 15h18v4M21 15v-2a3 3 0 0 0-3-3h-7v5"/>',
  food: '<path d="M7 3v18M5 3v5a2 2 0 0 0 4 0V3M17 21V3c-2.5 1-4 4-4 8h4"/>',
  walk: '<circle cx="13" cy="4.5" r="1.8"/><path d="M10 21l2.5-6.5L10 11l1.5-4 3.5 3 3 1M9.5 12l-3 2.5M12.5 14.5l3 6.5"/>',
  shop: '<path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
  gaudi: '<path d="M5 21V10l1.5-7L8 10v11M10.5 21V8l1.5-6 1.5 6v13M16 21V10l1.5-7L19 10v11M3 21h18"/>',
  park: '<circle cx="12" cy="9" r="5.5"/><path d="M12 21v-6.5M8 21h8"/>',
  arch: '<path d="M4 21V8h16v13M9 21v-5a3 3 0 0 1 6 0v5M3 8h18M6 5h12v3"/>',
  port: '<circle cx="12" cy="5" r="2"/><path d="M12 7v14M8 11h8M5 14a7 7 0 0 0 14 0"/>',
  bar: '<path d="M4 4h16l-8 9zM12 13v7M8 20h8"/>',
  view: '<path d="M2 20l7-10 4 5 3-3 6 8z"/><circle cx="17" cy="5.5" r="2.2"/>',
  show: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  market: '<path d="M3 10h18l-1.8 10H4.8zM8 10l3-6M16 10l-3-6"/>',
  plane: '<path d="M2.5 13.5l19-7-5 14-4.5-5-3.5 3.5v-5z"/>',
  metro: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M8 21l2-4M16 21l-2-4"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  trash: '<path d="M5 7h14M10 11v6M14 11v6M7 7l1 13h8l1-13M9 7V4h6v3"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>', down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  back: '<path d="M9 6l6 6-6 6"/>', link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  ig: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/>',
  tt: '<path d="M14 4v10a4 4 0 1 1-4-4"/><path d="M14 4c0 3 2 5 5 5"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M15 8.5a4 4 0 1 0 0 7M7 11h6M7 13.5h6"/>',
  bag: '<path d="M6 7h12l1 14H5zM9 7a3 3 0 0 1 6 0"/>', chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  sos: '<path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17v.5"/>',
  speaker: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6"/>',
  sort: '<path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"/>',
  warn: '<path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17v.5"/>',
  locate: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', check: '<path d="M5 12l5 5 9-10"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  museum: '<path d="M3 21h18M4 10h16M12 3l9 5H3zM6 10v8M10 10v8M14 10v8M18 10v8"/>',
  church: '<path d="M12 2v4M10 4h4M7 21V10l5-4 5 4v11M3 21v-6l4-3M21 21v-6l-4-3M2 21h20M10.5 21v-4a1.5 1.5 0 0 1 3 0v4"/>'
};
const ic = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${P[k] || P.star}</svg>`;
const ROT = ['r1', 'r2', 'r3', 'r4'];

/* ---------- state ---------- */
const KEY = 'bcn.v1';
function fresh() {
  return {
    v: 1,
    days: T.days.map((d) => ({ date: d.date, stops: d.stops.map((s) => ({ ...s, id: uid() })) })),
    legs: {},
    saved: [],
    expenses: [],
    budget: 1500, cardFee: 1.5,
    packing: T.packing.map(([g, items]) => ({ group: g, items: items.map((t) => ({ id: uid(), t, done: false })) })),
    flights: { out: {}, back: {} },
    insurance: { policy: '', phone: '' },
    hotel: { name: '', address: '', lat: null, lng: null },
    dayIdx: null
  };
}
let S;
try { S = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (e) { S = fresh(); }
(function migrate() {
  const byName = {}; T.days.forEach((d) => d.stops.forEach((s) => { byName[s.name] = s; }));
  S.days.forEach((d) => d.stops.forEach((s) => {
    const src = byName[s.name]; if (!src) return;
    ['story', 'wiki', 'info'].forEach((k) => { if (src[k] && !s[k]) s[k] = src[k]; });
    if (src.rule && (!s.rule || !T.rules[s.rule])) s.rule = src.rule;
    if (src.lat != null && s.lat == null && !s.hotelRef) { s.lat = src.lat; s.lng = src.lng; }
  }));
  if (!S.hotel) S.hotel = { name: '', address: '', lat: null, lng: null };
})();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('לא הצלחתי לשמור במכשיר'); } };
const META = T.days;
const VERSION = '13 · 11.11';

/* ---------- helpers ---------- */
let toastT;
function toast(m) { const el = $('#toast'); el.textContent = m; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2400); }
function sheet(html) { $('#sheet').innerHTML = `<div class="sheet-bg" data-act="closeSheet"></div><div class="sheet-body pop" role="dialog" aria-modal="true">${html}</div>`; }
function closeSheet() { $('#sheet').innerHTML = ''; }
const q = (s) => (s.lat != null ? `${s.lat},${s.lng}` : encodeURIComponent(`${s.name}, Barcelona`));
const gmDir = (from, to, mode) => `https://www.google.com/maps/dir/?api=1${from ? '&origin=' + q(from) : ''}&destination=${q(to)}&travelmode=${mode}`;
const gmSearch = (s) => `https://www.google.com/maps/search/?api=1&query=${q(s)}`;
function km(a, b) { const R = 6371, r = Math.PI / 180; const dl = (b.lat - a.lat) * r, dg = (b.lng - a.lng) * r; const h = Math.sin(dl / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dg / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); }
const hasGeo = (s) => s && s.lat != null && s.lng != null;
const dow = (date) => new Date(date + 'T12:00:00').getDay();
function todayIdx() { const t = new Date(); const iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`; return META.findIndex((d) => d.date === iso); }
function curIdx() { const t = todayIdx(); return S.dayIdx != null ? S.dayIdx : (t >= 0 ? t : 0); }
function daysToFlight() { const t = new Date(); t.setHours(0, 0, 0, 0); return Math.round((new Date(2026, 11, 13) - t) / 864e5); }
function closedDays(stop) { const r = stop.rule && T.rules[stop.rule]; if (r) return r.closed; const h = stop.details && stop.details.hours; return h && h.closed ? h.closed : []; }
function closedNote(stop, date) {
  const r = stop.rule && T.rules[stop.rule]; if (r) return r.closed.includes(dow(date)) ? r.text : '';
  return closedDays(stop).includes(dow(date)) ? 'לפי OpenStreetMap המקום סגור ביום הזה' : '';
}
function infoNote(stop, date) { const n = stop.info && T.infos && T.infos[stop.info]; return n && !n.days.includes(dow(date)) ? n.text : ''; }
function hoursOf(stop) { const r = stop.rule && T.rules[stop.rule]; if (r && r.hours) return r.hours; const h = stop.details && stop.details.hours; return h ? h.text : ''; }
// The open day whose stops are closest to this one: where it fits best on the map.
function suggestDay(stop, from) {
  const cd = closedDays(stop); let best = null, bestD = Infinity;
  META.forEach((m, k) => {
    if (k === from || cd.includes(dow(m.date))) return;
    const geo = S.days[k].stops.filter((x) => hasGeo(x) && x.id !== stop.id);
    const d = hasGeo(stop) && geo.length ? Math.min(...geo.map((x) => km(stop, x))) : 99;
    if (d < bestD) { bestD = d; best = k; }
  });
  return best;
}
const fmtKm = (k) => (k < 1 ? `${Math.round(k * 1000)} מ׳` : `${k.toFixed(1)} ק״מ`);
function nearest(list, from, n) { return list.filter(hasGeo).map((x) => ({ ...x, dist: km(from, x) })).sort((p, q) => p.dist - q.dist).slice(0, n); }
function legInfo(a, b) {
  if (!hasGeo(a) || !hasGeo(b)) return { walk: null, transit: null, rec: 'walk' };
  const k = km(a, b); const walk = Math.max(3, Math.round(k * 1.3 / 4.8 * 60)); const transit = Math.round(k * 1.3 / 18 * 60 + 8);
  return { walk, transit, rec: walk > 20 ? 'transit' : 'walk', k };
}
function setDayColor(i) { document.documentElement.style.setProperty('--day', META[i].color); }

/* ---------- remote data ---------- */
let weather = null, rate = null;
async function loadWeather() {
  try {
    const cached = JSON.parse(sessionStorage.getItem('bcn.w') || 'null');
    if (cached) { weather = cached; return; }
    const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.17&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMadrid&start_date=2026-12-13&end_date=2026-12-17');
    if (!r.ok) return;
    const j = await r.json(); if (!j.daily) return;
    weather = {}; j.daily.time.forEach((d, i) => { weather[d] = { max: Math.round(j.daily.temperature_2m_max[i]), min: Math.round(j.daily.temperature_2m_min[i]), rain: j.daily.precipitation_probability_max[i] }; });
    sessionStorage.setItem('bcn.w', JSON.stringify(weather)); render();
  } catch (e) { /* forecast not available yet */ }
}
async function loadRate() {
  try {
    const c = JSON.parse(localStorage.getItem('bcn.rate') || 'null');
    if (c && Date.now() - c.at < 12 * 3600e3) { rate = c; return; }
    const r = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR&symbols=ILS'); const j = await r.json();
    if (j.rates && j.rates.ILS) { rate = { v: j.rates.ILS, date: j.date, at: Date.now() }; localStorage.setItem('bcn.rate', JSON.stringify(rate)); render(); }
  } catch (e) { const c = JSON.parse(localStorage.getItem('bcn.rate') || 'null'); if (c) rate = c; }
}
/* place details: OpenStreetMap + Wikipedia (see enrich.js) */
const normName = (x) => String(x || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
function storyFor(s) {
  const all = window.STORIES || {}; if (s.story && all[s.story]) return all[s.story];
  const n = normName(s.name); return Object.values(all).find((st) => (st.names || []).some((x) => n.includes(normName(x)))) || null;
}
const articles = {}; const articleLoading = {};
function wikiRefOf(s) {
  if (s.details && s.details.wiki) return s.details.wiki;
  if (s.wiki) return { lang: 'en', title: decodeURIComponent(s.wiki).replace(/_/g, ' '), needsHe: true };
  return null;
}
function articleFor(s) {
  const ref = wikiRefOf(s); if (!ref || !window.Enrich) return null;
  const key = ref.lang + ':' + ref.title;
  if (articles[key]) return articles[key];
  if (!articleLoading[key]) {
    articleLoading[key] = (async () => {
      let r = ref; if (ref.needsHe) r = (await Enrich.toHeOrEn('en', ref.title)) || ref;
      articles[key] = await Enrich.wikiArticle(r);
    })().catch(() => { articles[key] = { err: true }; }).finally(() => { if (location.hash.startsWith('#place/')) render(); });
  }
  return 'loading';
}
const enriching = new Set(); const retried = new Set();
async function enrichStop(stop, force) {
  if (!window.Enrich || enriching.has(stop.id) || stop.hotelRef) return;
  if (!force && stop.details && stop.details.photos && Date.now() - stop.details.at < (stop.details.partial ? 3600e3 : 7 * 864e5)) return;
  if (!hasGeo(stop) && !stop.osm) {
    // No location picked: find it by name, inside the Barcelona area
    try {
      const r = (await searchPlaces(stop.name)).find((x) => x.lat > 41.2 && x.lat < 41.6 && x.lng > 1.9 && x.lng < 2.4);
      if (r) { stop.lat = r.lat; stop.lng = r.lng; if (r.osm) stop.osm = r.osm; if ((!stop.kind || stop.kind === 'star') && r.kind) stop.kind = r.kind; save(); }
    } catch (e) { /* offline */ }
    if (!hasGeo(stop)) return;
  }
  enriching.add(stop.id);
  if (location.hash.startsWith('#place/')) setTimeout(render, 0);
  try {
    const d = await Enrich.details(stop);
    stop.details = d; if (d.osm && !stop.osm) stop.osm = d.osm;
    if ((!stop.kind || stop.kind === 'star') && d.kind) stop.kind = d.kind;
    save();
    const h = location.hash;
    syncLinked(stop);
    if (h.startsWith('#place/') || h === '#today' || h === '' || h === '#places' || h === '#saved') render(); else if (h === '#map') drawMarkers(false);
  } catch (e) { /* offline or rate limited: try again later */ } finally { enriching.delete(stop.id); }
}
function enrichAllSlowly() {
  if (!navigator.onLine) return;
  const stale = (s) => !s.hotelRef && (!s.details || !s.details.photos || Date.now() - s.details.at > (s.details.partial ? 3600e3 : 7 * 864e5));
  const todo = []; S.days.forEach((d) => d.stops.forEach((s) => { if (stale(s)) todo.push(s); }));
  S.saved.forEach((x) => { if (hasGeo(x) && stale(x)) todo.push(x); });
  let k = 0; const step = () => { if (k >= todo.length) return; enrichStop(todo[k++]).finally(() => setTimeout(step, 1500)); }; step();
}
async function searchPlaces(text) {
  const r = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&lat=41.39&lon=2.17&limit=6`);
  const j = await r.json();
  return (j.features || []).map((f) => ({ name: f.properties.name || text, sub: [f.properties.street, f.properties.housenumber, f.properties.city].filter(Boolean).join(' '), lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0], osm: f.properties.osm_id ? { type: f.properties.osm_type, id: f.properties.osm_id } : null, kind: window.Enrich ? Enrich.kindFrom(f.properties.osm_key, f.properties.osm_value) : null }));
}

/* ---------- shared pieces ---------- */
function hero(opts = {}) {
  const small = opts.small;
  const tiles = small
    ? '<path class="tile-anim" d="M0 0h60l-8 46-52 6z" fill="#2453C9"/><path d="M60 0h56l4 42-68 4z" fill="#F2A900"/><path class="tile-anim d2" d="M116 0h62l-12 48-46-6z" fill="#fff"/><path d="M178 0h56l6 44-74 4z" fill="#1E9E8F"/><path class="tile-anim d3" d="M234 0h58l-8 40-50 4z" fill="#E8553D"/><path d="M292 0h54l8 46-70-6z" fill="#2453C9"/><path class="tile-anim" d="M346 0h44v52l-36-6z" fill="#C2417F"/><path d="M0 52l52-6 14 58H0z" fill="#E8553D"/><path class="tile-anim d2" d="M52 46l68-4-6 62-48 0z" fill="#13213D"/><path d="M120 42l46 6 20 56-72 0z" fill="#F2A900"/><path class="tile-anim d3" d="M166 48l74-4 2 60-56 0z" fill="#2453C9"/><path d="M240 44l44-4 14 64-56 0z" fill="#fff"/><path class="tile-anim" d="M284 40l70 6-4 58-52 0z" fill="#1E9E8F"/><path d="M354 46l36 6v52h-40z" fill="#F2A900"/>'
    : '<path class="tile-anim" d="M0 0h58l-10 44-48 8z" fill="#2453C9"/><path class="tile-anim d2" d="M58 0h52l6 38-68 6z" fill="#F2A900"/><path d="M110 0h60l-14 46-40-8z" fill="#fff"/><path class="tile-anim d3" d="M170 0h54l4 42-72 4z" fill="#1E9E8F"/><path d="M224 0h58l-8 36-46 6z" fill="#E8553D"/><path class="tile-anim" d="M282 0h56l10 44-74-8z" fill="#2453C9"/><path d="M338 0h52v50l-42-6z" fill="#F2A900"/><path d="M0 52l48-8 12 50-60 6z" fill="#E8553D"/><path class="tile-anim d3" d="M48 44l68-6-4 52-52 4z" fill="#13213D"/><path d="M116 38l40 8 22 44-66 0z" fill="#2453C9"/><path class="tile-anim" d="M156 46l72-4 0 50-50-2z" fill="#F2A900"/><path d="M228 42l46-6 14 52-60 4z" fill="#fff"/><path class="tile-anim d2" d="M274 36l74 8-6 46-54-2z" fill="#1E9E8F"/><path d="M348 44l42 6v44l-48-4z" fill="#C2417F"/><path d="M0 100l60-6 8 56-68 4z" fill="#1E9E8F"/><path d="M60 94l52-4 10 58-54 2z" fill="#F2A900"/><path class="tile-anim d2" d="M112 90h66l-6 60-50-2z" fill="#C2417F"/><path d="M178 90l50 2 8 56-64 2z" fill="#2453C9"/><path class="tile-anim d3" d="M228 92l60-4-4 60-48 0z" fill="#E8553D"/><path d="M288 88l54 2 4 58-62 0z" fill="#F2A900"/><path class="tile-anim" d="M342 90l48 4v56l-44-2z" fill="#2453C9"/><path d="M0 154l68-4 2 60H0z" fill="#2453C9"/><path d="M68 150l54-2-4 62-48 0z" fill="#fff"/><path d="M122 148l50 2 10 60-64 0z" fill="#1E9E8F"/><path d="M172 150l64-2-6 62-48 0z" fill="#F2A900"/><path d="M236 148h48l8 62-62 0z" fill="#13213D"/><path d="M284 148l62 0-2 62h-52z" fill="#E8553D"/><path d="M346 148l44 2v60h-46z" fill="#1E9E8F"/>';
  const h = small ? 104 : 200;
  return `<div class="hero ${small ? 'small' : ''}">
    <svg class="tiles" viewBox="0 0 390 ${h}" preserveAspectRatio="xMidYMid slice"><g stroke="#F6F8FC" stroke-width="3" stroke-linejoin="round">${tiles}</g></svg>
    <div class="shade"></div>
    ${small ? '' : '<svg class="sky" viewBox="0 0 390 90" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><path d="M20 88V60l5-30 5 30v28M34 88V52l6-40 6 40v36M50 88V56l5-28 5 28v32M64 88V64l4-22 4 22v24M120 88V52c0-22 26-22 26 0v36M128 60h10M128 70h10M128 80h10M200 88c0-10 10-14 18-10 6-14 26-14 30 2 10-2 18 6 14 14M330 88c2-20 0-36-4-48M326 40c-10-6-22-2-28 6M326 40c10-8 22-6 28 2M326 40c-4-10-14-16-24-14M326 40c6-10 16-14 24-10"/></svg>'}
    ${small ? '' : '<svg class="sun" viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="12" fill="#F2A900" stroke="#fff" stroke-width="2.5"/><path stroke="#fff" stroke-width="2.5" d="M27 3v7M27 44v7M3 27h7M44 27h7M10 10l5 5M39 39l5 5M10 44l5-5M39 15l5-5"/></svg>'}
    ${opts.back ? `<a class="back" href="${opts.back}" aria-label="חזרה">${ic('back')}</a>` : ''}
    ${opts.chips || ''}
    <svg class="wave" viewBox="0 0 390 34" preserveAspectRatio="none" aria-hidden="true"><path d="M0 18 C 40 2, 80 2, 120 16 S 200 32, 250 14 S 340 0, 390 16 V34 H0 Z" fill="#F6F8FC"/></svg>
  </div>`;
}
const pageHead = (title, sub, back) => hero({ small: true, back }) + `<div class="head"><span class="eyebrow">${esc(sub)}</span><h1 class="pop">${esc(title)}</h1></div>`;
const wx = (date) => weather && weather[date] ? `${weather[date].max}°/${weather[date].min}° · ${weather[date].rain}% גשם` : null;

/* ---------- views ---------- */
const V = {};

V.today = () => {
  const i = curIdx(); const m = META[i]; const day = S.days[i]; setDayColor(i);
  const dtf = daysToFlight();
  const chips = `<div class="chips"><span class="chip">${dtf > 0 ? `עוד ${dtf} ימים לטיסה` : dtf > -5 ? `יום ${1 - dtf} מתוך 5` : 'הטיול הסתיים'}</span><span class="chip dark">${wx(m.date) || 'ממוצע בדצמבר: 9°–15°'}</span></div>`;
  const warns = day.stops.map((s) => {
    const cn = closedNote(s, m.date); const inf = infoNote(s, m.date);
    let h = '';
    if (cn) { const to = suggestDay(s, i); h += `<div class="warn">${ic('warn')}<span class="grow"><b>${esc(s.name)}:</b> ${cn}, ו־${m.num}.12 הוא יום ${m.short}.${to != null ? `<br><button class="btn sun sm" style="margin-top:6px" data-act="moveTo" data-d="${i}" data-id="${s.id}" data-to="${to}">להעביר ליום ${META[to].short} ${META[to].num}.12</button>` : ''}</span></div>`; }
    if (inf) h += `<div class="warn" style="background:#EEF2FA;color:var(--navy)">${ic('warn')}<span><b>${esc(s.name)}:</b> ${inf}.</span></div>`;
    return h;
  }).join('');
  let flightWarn = '';
  if (i === 4 && S.flights.back.time) { const lb = leaveBy(); flightWarn = `<div class="warn">${ic('plane')}<span>הטיסה ב־${esc(S.flights.back.time)}. צאו מהמלון עד <b>${lb}</b>.</span></div>`; }
  if (weather && weather[m.date] && weather[m.date].rain >= 60 && day.stops.some((s) => ['park', 'view'].includes(s.kind))) {
    flightWarn += `<div class="warn">${ic('warn')}<span>צפוי גשם (${weather[m.date].rain}%), וביום הזה יש מקומות בחוץ. אפשר להחליף אותו עם יום של מוזיאונים.</span></div>`;
  }
  const nx = day.stops[0];
  let list = '';
  day.stops.forEach((s, si) => {
    const cn = closedNote(s, m.date);
    list += `<div class="card stop pop ${cn ? 'closed' : ''}">
      <span class="tile ${ROT[si % 4]}">${ic(s.kind)}</span>
      <a class="grow" href="#place/${i}/${s.id}" style="text-decoration:none"><div class="t">${esc(s.name)}</div><div class="muted">${esc(s.note || '')}${cn ? ` · <span class="hours-tag">${cn}</span>` : ''}</div></a>
      ${s.hotelRef && !(S.hotel && S.hotel.name) ? `<button class="btn sun sm" data-act="hotelEdit">הוסף מלון</button>` : `<a class="icon-btn" href="${gmDir(null, s, 'walking')}" target="_blank" rel="noopener" aria-label="נווט ב־Google Maps">${ic('pin')}</a>`}
      <span class="num">${si + 1}</span></div>`;
    const n = day.stops[si + 1]; if (!n) return;
    const L = legInfo(s, n); const key = s.id + '>' + n.id; const mode = S.legs[key] || L.rec;
    list += `<div class="leg"><div class="opts">
      <button class="opt ${mode === 'walk' ? 'on' : ''}" data-act="leg" data-k="${key}" data-m="walk">${ic('walk')}${L.walk ? `ברגל ${L.walk} דק׳` : 'ברגל'}${L.walk && L.rec === 'walk' ? ' · מומלץ' : ''}</button>
      <button class="opt ${mode === 'transit' ? 'on' : ''}" data-act="leg" data-k="${key}" data-m="transit">${ic('metro')}${L.transit ? `משולב ≈${L.transit} דק׳` : 'תחבורה ציבורית'}${L.walk && L.rec === 'transit' ? ' · מומלץ' : ''}</button></div>
      <div class="row muted"><span class="grow">${L.walk ? (mode === 'walk' ? `הליכה של ${L.walk} דקות` : 'מטרו או אוטובוס וקצת הליכה') : 'הזמן המדויק יחושב ב־Google Maps'}</span>
      <a href="${gmDir(s, n, mode === 'walk' ? 'walking' : 'transit')}" target="_blank" rel="noopener" style="font-weight:800;color:var(--navy);text-decoration:none">פתח ב־Google Maps ←</a></div></div>`;
  });
  const dayUrl = 'https://www.google.com/maps/dir/' + day.stops.map((s) => q(s)).join('/');
  return hero({ chips }) + `
  <div class="head"><span class="eyebrow">יום ${i + 1} מתוך 5 · ${m.short} ${m.num}.12</span><h1 class="pop">${esc(m.title)}</h1></div>
  <div class="days" role="tablist" aria-label="ימי הטיול">${META.map((d, k) => `<button class="dayb ${k === i ? 'on' : ''}" style="--c:${d.color}" role="tab" aria-selected="${k === i}" data-act="day" data-i="${k}"><b>${d.num}</b><span>${d.short}</span>${weather && weather[d.date] ? `<i>${weather[d.date].max}°</i>` : ''}</button>`).join('')}</div>
  <div class="section">${installEvt && !standalone() ? `<button class="btn navy sm" data-act="install">${ic('plus')}התקן את האפליקציה בטלפון</button>` : ''}${warns}${flightWarn}</div>
  ${nx ? `<div class="next pop"><div class="lbl"><span class="dot"></span>הבא בתור</div><div><div class="name">${esc(nx.name)}</div><div style="font-size:13px;opacity:.9">${esc(nx.note || '')}</div></div>
    <div class="row"><a class="btn sun grow" href="${gmDir(null, nx, 'walking')}" target="_blank" rel="noopener">${ic('pin')}נווט ב־Google Maps</a><a class="btn ghost" href="#place/${i}/${nx.id}">על המקום</a></div></div>` : ''}
  <div class="section">
    <h2>המסלול · בחר איך לעבור בין המקומות</h2>
    <button class="btn sun" data-act="placeAdd" data-d="${i}">${ic('plus')}הוסף מקום ליום ${m.short}</button>
    <div class="row"><button class="btn line sm grow" data-act="sortDay">${ic('sort')}סדר לי את היום</button><a class="btn line sm grow" href="#places">${ic('pen')}עריכה</a></div>
    <a class="btn navy sm" href="${dayUrl}" target="_blank" rel="noopener">${ic('pin')}כל היום ב־Google Maps</a>
    ${list || '<div class="card muted">אין עדיין מקומות ביום הזה.</div>'}
    <div style="height:64px"></div>
  </div>
  <button class="fab" data-act="placeAdd" data-d="${i}" aria-label="הוסף מקום">${ic('plus')}מקום</button>`;
};

function leaveBy() {
  const [h, mm] = (S.flights.back.time || '00:00').split(':').map(Number);
  const t = h * 60 + mm - 180 - 40; const hh = Math.floor(((t % 1440) + 1440) % 1440 / 60), m2 = ((t % 60) + 60) % 60;
  return `${String(hh).padStart(2, '0')}:${String(m2).padStart(2, '0')}`;
}

/* map */
let map, layer;
V.map = () => { if (mapDay == null) mapDay = curIdx(); return `<div class="mapwrap"><div id="leaflet" aria-label="מפת המסלול"></div>
  <div class="map-top"><div class="pills">${META.map((d, k) => `<button class="pill ${k === mapDay ? 'on' : ''}" style="--c:${d.color}" data-act="mapDay" data-i="${k}">${d.short} ${d.num}</button>`).join('')}${[['food', 'טבעוני', '#1E9E8F'], ['bars', 'ברים', '#C2417F'], ['tops', 'המלצות', '#13213D'], ['saved', 'שמורים', '#D99400']].map(([k, t, c]) => `<button class="pill ${mapDay === k ? 'on' : ''}" style="--c:${c}" data-act="mapDay" data-i="${k}">${t}</button>`).join('')}</div></div>
  <button class="icon-btn" style="position:absolute;left:12px;bottom:${mapSel ? 200 : 16}px;z-index:500;width:48px;height:48px;border-radius:16px;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.2)" data-act="locate" aria-label="המיקום שלי">${ic('locate')}</button>
  ${mapSel ? mapCard() : ''}</div>`; };
let mapDay = null, mapSel = null, meMarker = null;
const LAYER = { food: '#1E9E8F', bars: '#C2417F', tops: '#13213D' };
function mapStops() {
  if (LAYER[mapDay]) return T.discover[mapDay].map((t, k) => ({ ...t, id: mapDay + k, color: LAYER[mapDay] }));
  if (mapDay === 'saved') return S.saved.map((x) => { const l = linkedStop(x); return { ...x, lat: x.lat ?? (l && l.st.lat), lng: x.lng ?? (l && l.st.lng), name: x.name || x.title, note: l ? 'מהשמורים · ביום ' + META[l.di].short : 'מהשמורים', kind: x.kind || 'star', id: 's' + x.id, color: '#D99400' }; }).filter(hasGeo);
  const d = mapDay ?? curIdx(); return S.days[d].stops.map((s) => ({ ...s, color: META[d].color }));
}
const isLayer = () => typeof mapDay === 'string';
function mapCard() {
  const s = mapStops().find((x) => x.id === mapSel); if (!s) return '';
  return `<div class="map-card pop"><div class="row"><span class="tile" style="--c:${s.color}">${ic(s.kind)}</span><div class="grow"><div style="font-weight:800;font-size:18px">${esc(s.name)}</div><div class="muted">${esc(s.note || '')}</div></div><button class="icon-btn" data-act="mapClose" aria-label="סגירה">${ic('x')}</button></div>
  <span class="muted" style="font-weight:800">איך מגיעים? בחר ונפתח ב־Google Maps</span>
  <div class="row"><a class="btn sun grow" href="${gmDir(null, s, 'walking')}" target="_blank" rel="noopener">${ic('walk')}ברגל</a><a class="btn soft grow" href="${gmDir(null, s, 'transit')}" target="_blank" rel="noopener">${ic('metro')}תחבורה ציבורית</a></div>
  ${typeof mapDay === 'number' ? `<a class="btn soft sm" href="#place/${mapDay}/${s.id}">על המקום · תמונות</a>` : mapDay === 'saved' ? `<a class="btn soft sm" href="#place/s/${s.id.slice(1)}">על המקום · תמונות</a>` : ''}</div>`;
}
function mountMap() {
  if (!window.L) { $('#leaflet').innerHTML = '<div class="section muted">המפה צריכה חיבור לאינטרנט.</div>'; return; }
  if (mapDay == null) mapDay = curIdx();
  map = L.map('leaflet', { zoomControl: false, attributionControl: true }).setView([41.39, 2.17], 13);
  let tileErrs = 0, tileOk = 0;
  const tl = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
  tl.on('tileload', () => { tileOk++; const n = $('#map-msg'); if (n) n.remove(); });
  tl.on('tileerror', () => { tileErrs++; if (tileErrs === 4 && !tileOk && !$('#map-msg')) { const d = document.createElement('div'); d.id = 'map-msg'; d.className = 'warn'; d.style.cssText = 'position:absolute;top:70px;right:12px;left:12px;z-index:600'; d.textContent = 'רקע המפה לא נטען. בדוק חיבור לאינטרנט. העצירות והניווט עובדים גם בלי הרקע.'; $('.mapwrap').appendChild(d); } });
  setTimeout(() => map && map.invalidateSize(), 300);
  drawMarkers(true);
}
function drawMarkers(fit) {
  if (!map) return; if (layer) layer.remove(); layer = L.layerGroup().addTo(map);
  const pts = mapStops().filter(hasGeo);
  const line = [];
  pts.forEach((s, k) => {
    const icon = L.divIcon({ className: '', html: `<div class="mk" style="--c:${s.color};transform:rotate(${[-6, 5, -4, 6][k % 4]}deg)">${isLayer() ? ic(s.kind) : k + 1}</div>`, iconSize: [36, 36], iconAnchor: [18, 18] });
    L.marker([s.lat, s.lng], { icon, title: s.name }).addTo(layer).on('click', () => { mapSel = s.id; rerenderMapOverlay(); });
    line.push([s.lat, s.lng]);
  });
  if (!isLayer() && line.length > 1) L.polyline(line, { color: pts[0].color, weight: 4, dashArray: '2 10', lineCap: 'round' }).addTo(layer);
  if (fit && line.length) map.fitBounds(line, { padding: [70, 70], maxZoom: 15 });
}
function rerenderMapOverlay() {
  const w = document.querySelector('.mapwrap'); if (!w) return;
  w.querySelectorAll('.map-card, .map-top, [data-act="locate"]').forEach((e) => e.remove());
  const tmp = document.createElement('div'); tmp.innerHTML = V.map(); const nw = tmp.firstElementChild;
  [...nw.children].filter((c) => c.id !== 'leaflet').forEach((c) => w.appendChild(c));
}

/* discover */
let discTab = 'food';
let here = null;
V.discover = () => {
  const tabs = [['food', 'טבעוני · GF', '#1E9E8F'], ['bars', 'ברים', '#C2417F'], ['tops', 'מומלצים', '#E8553D']];
  const c = tabs.find((t) => t[0] === discTab)[2];
  const di = curIdx(); const dayGeo = S.days[di].stops.filter(hasGeo);
  const center = here || (dayGeo.length ? { lat: dayGeo.reduce((t, x) => t + x.lat, 0) / dayGeo.length, lng: dayGeo.reduce((t, x) => t + x.lng, 0) / dayGeo.length } : null);
  const list = T.discover[discTab].map((d, k) => ({ ...d, k, dist: center && hasGeo(d) ? km(center, d) : null })).sort((p, q) => (p.dist ?? 99) - (q.dist ?? 99));
  return pageHead('גלה את העיר', 'נבדק ב־10.11 · לאמת שעות לפני שהולכים') + `
  <div class="section"><div class="pills">${tabs.map((t) => `<button class="pill ${t[0] === discTab ? 'on' : ''}" style="--c:${t[2]}" data-act="disc" data-t="${t[0]}">${t[1]}</button>`).join('')}</div>
  <div class="row"><span class="muted grow">${here ? 'ממוין לפי המרחק ממך' : `ממוין לפי הקרבה למסלול של יום ${META[di].short}`}</span>${here ? '' : `<button class="btn soft sm" data-act="nearMe">${ic('locate')}קרוב אליי</button>`}</div>
  ${list.map((d, n) => `<div class="card row pop" style="align-items:flex-start"><span class="tile ${ROT[n % 4]}" style="--c:${c}">${ic(d.kind)}</span>
    <div class="grow"><div style="font-weight:800">${esc(d.name)}</div><div class="muted">${esc(d.note)}</div><div class="muted">${esc(d.area || '')}${d.dist != null ? ' · ' + fmtKm(d.dist) : ''}</div>${d.verify ? `<span class="badge" style="color:#8A4B00">${esc(typeof d.verify === 'string' ? d.verify : 'לבדיקה')}</span>` : ''}${d.src ? ` <a class="muted" href="${esc(d.src)}" target="_blank" rel="noopener">מקור</a>` : ''}</div>
    <div style="display:flex;flex-direction:column;gap:6px"><a class="icon-btn" href="${hasGeo(d) ? gmDir(null, d, 'walking') : gmSearch(d)}" target="_blank" rel="noopener" aria-label="ניווט ב־Google Maps">${ic('pin')}</a>
    <button class="icon-btn" style="background:#FFF4D6" data-act="discSave" data-k="${d.k}" aria-label="שמירה במועדפים">${ic('star')}</button>
    <button class="icon-btn" data-act="discAdd" data-k="${d.k}" aria-label="הוסף ליום">${ic('plus')}</button></div></div>`).join('')}
  </div>`;
};

/* saved */
function linkedStop(x) { for (let k = 0; k < S.days.length; k++) { const st = S.days[k].stops.find((s) => (s.savedId && s.savedId === x.id) || (x.url && s.url === x.url)); if (st) return { di: k, st }; } return null; }
const savedOf = (st) => S.saved.find((x) => (st.savedId && x.id === st.savedId) || (st.url && x.url === st.url));
// A saved link and the day stop made from it share one place: what one learns, the other gets.
function syncLinked(o) {
  const pair = S.days.some((d) => d.stops.includes(o)) ? savedOf(o) : (linkedStop(o) || {}).st;
  if (!pair) return;
  ['lat', 'lng', 'osm', 'details'].forEach((k) => { if (o[k] != null && pair[k] == null) pair[k] = o[k]; });
  if (o.details && (!pair.details || pair.details.at < o.details.at)) pair.details = o.details;
  if ((!pair.kind || pair.kind === 'star') && o.kind && o.kind !== 'star') pair.kind = o.kind;
  save();
}
const inCity = (x) => x.lat > 41.2 && x.lat < 41.6 && x.lng > 1.9 && x.lng < 2.4;
const GENERIC = ['פוסט מאינסטגרם', 'סרטון מטיקטוק', 'מקום מ־Google Maps', 'קישור חדש', 'מקום מהשמורים'];
function knownPlaces() {
  return [...S.days.flatMap((d) => d.stops).filter((s) => !s.hotelRef), ...T.discover.food, ...T.discover.bars, ...T.discover.tops].filter(hasGeo);
}
function matchKnown(text) {
  const n = normName(text); if (n.length < 3) return null; let best = null;
  knownPlaces().forEach((p) => { const pn = normName(String(p.name).split(/[(·,–]/)[0]); if (pn.length >= 4 && n.includes(pn) && (!best || pn.length > best.len)) best = { p, len: pn.length }; });
  return best && best.p;
}
function parseMapsUrl(u) {
  const out = {}; let m;
  if ((m = u.match(/\/place\/([^/@?]+)/))) out.name = decodeURIComponent(m[1].replace(/\+/g, ' '));
  if ((m = u.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)) || (m = u.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/))) { out.lat = +m[1]; out.lng = +m[2]; }
  if ((m = u.match(/[?&](?:q|query|destination)=([^&]+)/))) {
    const v = decodeURIComponent(m[1].replace(/\+/g, ' ')); const c = v.match(/^(-?\d+\.\d+),\s*(-?\d+\.\d+)$/);
    if (c) { out.lat = +c[1]; out.lng = +c[2]; } else if (!out.name) out.name = v;
  }
  return out;
}
// Phrases in a caption that may name the place: "📍 Name" first, then the first lines, then hashtags.
function placePhrases(text) {
  const t = String(text || '').replace(/https?:\/\/\S+/g, ' ');
  const c = [];
  (t.match(/📍[^\n#@|•]+/gu) || []).forEach((x) => c.push(x.replace('📍', '')));
  t.split(/\n+/).map((l) => l.replace(/#\S+/g, '').replace(/@\S+/g, '').replace(/\p{Extended_Pictographic}/gu, '')).filter((l) => l.trim().length > 2 && l.length < 70).slice(0, 2).forEach((l) => c.push(l));
  (t.match(/#[\p{L}\d_]{4,}/gu) || []).slice(0, 3).forEach((h) => c.push(h.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')));
  return [...new Set(c.map((x) => x.replace(/\s+/g, ' ').replace(/^[\s\-–:|]+|[\s\-–:|]+$/g, '').trim()).filter((x) => x.length > 2 && !/^(barcelona|barcelone|bcn|spain|espana|travel)$/i.test(x)))].slice(0, 5);
}
async function findPlaceIn(text) {
  const kn = matchKnown(text); if (kn) return [{ name: kn.name, lat: kn.lat, lng: kn.lng, kind: kn.kind, osm: kn.osm || null, sub: 'מהרשימות של האפליקציה' }];
  const found = [];
  for (const ph of placePhrases(text)) {
    try { (await searchPlaces(ph)).filter(inCity).forEach((r) => { if (!found.some((f) => f.name === r.name && f.sub === r.sub)) found.push(r); }); } catch (e) { break; }
    if (found.length >= 3) break;
  }
  return found;
}
function applyPlace(x, r) {
  x.title = r.name;
  x.name = r.name; x.lat = r.lat; x.lng = r.lng; x.osm = r.osm || null; if (r.kind) x.kind = r.kind; x.addr = r.sub || '';
  x.status = 'found'; delete x.details; save();
  const l = linkedStop(x); if (l && !hasGeo(l.st)) { Object.assign(l.st, { lat: r.lat, lng: r.lng, osm: r.osm || null }); if (GENERIC.includes(l.st.name)) l.st.name = r.name; delete l.st.details; enrichStop(l.st, true); }
  enrichStop(x, true);
}
// Automatic: read what the link and the shared text tell us, and find the place.
async function identify(x, text) {
  x.status = 'searching'; save(); if (location.hash === '#saved') render();
  let caption = text || ''; const k = srcKind(x.url || '');
  if (k === 'pin') { const p = parseMapsUrl(x.url); if (p.lat != null) { applyPlace(x, { name: p.name || placePhrases(caption)[0] || x.title, lat: p.lat, lng: p.lng }); return; } if (p.name) caption = p.name + '\n' + caption; }
  if (k === 'ig') { const m = (x.url || '').match(/\/explore\/locations\/\d+\/([^/?]+)/); if (m) caption = decodeURIComponent(m[1]).replace(/-/g, ' ') + '\n' + caption; }
  if (k === 'tt') {
    try { const r = await fetch('https://www.tiktok.com/oembed?url=' + encodeURIComponent(x.url)); const j = await r.json(); if (j.title) { caption += '\n' + j.title; x.caption = j.title; } if (j.thumbnail_url) x.thumb = j.thumbnail_url; } catch (e) { /* TikTok did not answer */ }
  }
  if (!x.caption && caption.replace(/https?:\/\/\S+/g, '').trim()) x.caption = caption.replace(/https?:\/\/\S+/g, '').trim().slice(0, 400);
  let res = [];
  try { res = await findPlaceIn(caption); } catch (e) { /* offline */ }
  if (res[0]) { applyPlace(x, res[0]); if (location.hash === '#saved') render(); toast('זיהיתי: ' + res[0].name); return; }
  x.status = 'unknown'; save(); if (location.hash === '#saved') render();
  identifySheet(x);
}
function identifySheet(x) {
  sheet(`<h3>איזה מקום זה?</h3>
    <span class="muted">${srcKind(x.url || '') === 'ig' ? 'אינסטגרם לא מאפשר לאפליקציות לקרוא פוסטים. ' : ''}כתוב את שם המקום, או הדבק את הכיתוב של הפוסט, ואמצא אותו לבד.</span>
    <textarea class="field" id="id-text" rows="3" placeholder="למשל: Flax & Kale, או כל הכיתוב מהפוסט">${esc(x.caption || '')}</textarea>
    <button class="btn sun" data-act="idFind" data-id="${x.id}">מצא את המקום</button>
    <div id="id-results" style="display:flex;flex-direction:column;gap:6px"></div>
    <button class="btn soft" data-act="closeSheet">אחר כך</button>`);
  sheetCtx = { kind: 'identify', id: x.id };
}
let savedTab = 'inbox';
const srcKind = (u) => /instagram\.com/.test(u) ? 'ig' : /tiktok\.com/.test(u) ? 'tt' : /(maps\.app\.goo\.gl|google\.[a-z.]+\/maps|goo\.gl\/maps)/.test(u) ? 'pin' : 'link';
const SRC = { ig: ['אינסטגרם', '#C2417F'], tt: ['טיקטוק', '#13213D'], pin: ['Google Maps', '#1E9E8F'], link: ['קישור', '#2453C9'] };
const photosOf = (s, w) => [...new Set([...(w && w.images ? w.images : []), ...((s.details && s.details.photos) || [])])];
const thumbOf = (x) => ((x.details && x.details.photos) || [])[0] || x.thumb || null;
V.saved = () => {
  const list = S.saved.map((x, i) => ({ x, i })).filter((o) => savedTab === 'fav' ? o.x.fav : !o.x.fav);
  return pageHead('שמורים', 'קישורים, סרטונים ומקומות שאהבת') + `
  <div class="section">
    <div class="card" style="display:flex;flex-direction:column;gap:8px">
      <label class="lab" for="sv-link" style="color:var(--pink)">הדבק קישור מאינסטגרם, טיקטוק או Google Maps</label>
      <div class="row"><input id="sv-link" class="field" type="url" inputmode="url" placeholder="https://www.instagram.com/p/…" style="direction:ltr;text-align:left"><button class="btn navy" style="background:var(--pink)" data-act="addLink">הוסף</button></div>
      <span class="muted">או ישר מהאפליקציה: "שיתוף" ← "ברצלונה"</span>
    </div>
    <div class="seg"><button class="${savedTab === 'inbox' ? 'on' : ''}" data-act="savedTab" data-t="inbox">נכנסו · ${S.saved.filter((x) => !x.fav).length}</button><button class="${savedTab === 'fav' ? 'on' : ''}" data-act="savedTab" data-t="fav">★ מועדפים · ${S.saved.filter((x) => x.fav).length}</button></div>
    ${list.length ? list.map(({ x, i }) => { const k = srcKind(x.url || ''); const m = SRC[k]; const th = thumbOf(x); const l = linkedStop(x); return `<div class="card pop" style="display:flex;flex-direction:column;gap:10px">
      <div class="row">${th ? `<img class="thumb" src="${esc(th)}" alt="" loading="lazy">` : `<span class="tile ${ROT[i % 4]}" style="--c:${m[1]}">${ic(k)}</span>`}<div class="grow" style="min-width:0"><div style="font-size:11px;font-weight:800;color:${m[1]}">${m[0]}${l ? ' · ביום ' + META[l.di].short : ''}</div><div style="font-weight:800;font-size:16px">${esc(x.title || 'בלי שם')}</div>
      ${x.status === 'searching' ? '<div class="muted">מזהה את המקום…</div>' : hasGeo(x) ? `<div class="muted" style="color:var(--teal);font-weight:700">📍 ${esc(x.name || x.title)}${x.addr ? ' · ' + esc(x.addr) : ''}</div>` : `<button class="hours-tag" style="border:0;cursor:pointer" data-act="savedIdentify" data-id="${x.id}">לא זוהה מקום · לחץ כדי לבחור</button>`}</div>
      <button class="icon-btn danger" data-act="savedDel" data-i="${i}" aria-label="מחיקה">${ic('trash')}</button></div>
      ${hasGeo(x) ? `<div class="row"><a class="btn soft sm grow" href="#place/s/${x.id}">על המקום · תמונות</a><a class="btn soft sm" href="${gmDir(null, x, 'walking')}" target="_blank" rel="noopener">${ic('pin')}נווט</a></div>` : ''}
      <div class="row"><button class="btn sun sm grow" data-act="savedToDay" data-i="${i}">${linkedStop(x) ? 'ביום ' + META[linkedStop(x).di].short + ' ✓' : 'הוסף ליום…'}</button><button class="btn soft sm grow" style="background:${x.fav ? '#FFE7A3' : '#FFF4D6'}" data-act="savedFav" data-i="${i}">${ic('star')}${x.fav ? 'במועדפים' : 'למועדפים'}</button>${x.url ? `<a class="icon-btn" href="${esc(x.url)}" target="_blank" rel="noopener" aria-label="פתיחת הקישור">${ic('link')}</a>` : ''}</div></div>`; }).join('') : `<div class="muted" style="text-align:center;padding:24px 0">${savedTab === 'fav' ? 'עוד אין מועדפים. לחץ ★ על קישור או מקום.' : 'אין כאן כלום עדיין. הדבק קישור למעלה או שתף מאינסטגרם.'}</div>`}
  </div>`;
};

/* places editor */
V.places = () => pageHead('כל המקומות', 'עריכה · מחיקה · הוספה · העברה בין ימים', '#today') + `<div class="section">
  ${META.map((m, di) => `<div style="display:flex;flex-direction:column;gap:6px">
    <div class="row"><span class="tile ${ROT[di % 4]}" style="--c:${m.color};font:700 22px var(--display)">${m.num}</span><h2 class="grow">יום ${m.short} · ${S.days[di].stops.length} מקומות</h2><button class="btn sm" style="background:${m.color};color:#fff" data-act="placeAdd" data-d="${di}">${ic('plus')}הוסף</button></div>
    ${S.days[di].stops.map((s, si) => `<div class="card row" style="padding:8px 10px">
      <div style="display:flex;flex-direction:column"><button class="icon-btn" style="width:28px;height:20px;background:none" data-act="mv" data-d="${di}" data-s="${si}" data-dir="-1" aria-label="למעלה">${ic('up')}</button><button class="icon-btn" style="width:28px;height:20px;background:none" data-act="mv" data-d="${di}" data-s="${si}" data-dir="1" aria-label="למטה">${ic('down')}</button></div>
      <div class="grow"><div style="font-weight:700">${esc(s.name)}</div><div class="muted">${esc(s.note || '')}${closedNote(s, m.date) ? ` · <span class="hours-tag">${closedNote(s, m.date)}</span>` : ''}${hasGeo(s) ? '' : ' · <span class="hours-tag">אין מיקום מדויק</span>'}</div></div>
      <button class="icon-btn" data-act="placeEdit" data-d="${di}" data-s="${si}" aria-label="עריכה">${ic('pen')}</button>
      <button class="icon-btn danger" data-act="placeDel" data-d="${di}" data-s="${si}" aria-label="מחיקה">${ic('trash')}</button></div>`).join('')}
  </div>`).join('')}</div>`;

/* place page */
V.place = (di, id) => {
  const fromSaved = di === 's';
  const s = fromSaved ? S.saved.find((x) => x.id === id) : S.days[+di] && S.days[+di].stops.find((x) => x.id === id);
  if (!s) return pageHead('לא נמצא', '', fromSaved ? '#saved' : '#today');
  if (fromSaved && !s.name) s.name = s.title;
  di = fromSaved ? null : +di; const m = fromSaved ? null : META[di];
  if (!fromSaved) setDayColor(di);
  const cn = m ? closedNote(s, m.date) : '';
  const w = articleFor(s);
  if (!s.hotelRef && hasGeo(s) && (!s.details || !s.details.photos || (s.details.partial && !retried.has(s.id)))) { retried.add(s.id); enrichStop(s, true); }
  else if (!s.hotelRef && !s.details && !retried.has(s.id)) { retried.add(s.id); enrichStop(s, true); }
  const link = fromSaved ? linkedStop(s) : null; const src = fromSaved ? s : savedOf(s);
  const imgs = photosOf(s, w); galleryImgs = imgs;
  return pageHead(s.name || s.title, fromSaved ? `מהשמורים · ${SRC[srcKind(s.url || '')][0]}${link ? ' · ביום ' + META[link.di].short : ''}` : `יום ${m.short} ${m.num}.12 · ${s.note || ''}`, fromSaved ? '#saved' : '#today') + `<div class="section">
    ${cn ? (() => { const to = suggestDay(s, di); return `<div class="warn">${ic('warn')}<span class="grow">${cn}.${to != null ? `<br><button class="btn sun sm" style="margin-top:6px" data-act="moveTo" data-d="${di}" data-id="${s.id}" data-to="${to}">להעביר ליום ${META[to].short} ${META[to].num}.12</button>` : ''}</span></div>`; })() : ''}
    ${m && infoNote(s, m.date) ? `<div class="warn" style="background:#EEF2FA;color:var(--navy)">${ic('warn')}<span>${infoNote(s, m.date)}.</span></div>` : ''}
    ${fromSaved ? (link ? `<a class="btn navy sm" href="#place/${link.di}/${link.st.id}">${ic('check')}כבר במסלול של יום ${META[link.di].short} · לעמוד במסלול</a>` : `<button class="btn sun" data-act="savedToDayById" data-id="${s.id}">${ic('plus')}הוסף למסלול של יום…</button>`) : ''}
    ${imgs.length ? `<div class="gallery">${imgs.map((u, k) => `<img src="${esc(u)}" alt="תמונה ${k + 1} של ${esc(s.name || '')}" loading="lazy" data-act="lightbox" data-i="${k}">`).join('')}</div><span class="muted" style="margin-top:-6px">לחץ על תמונה להגדלה</span>` : (enriching.has(s.id) ? '<span class="muted">מחפש תמונות…</span>' : '')}
    ${src && src.url ? `<a class="btn soft sm" href="${esc(src.url)}" target="_blank" rel="noopener">${ic(srcKind(src.url))}הפוסט המקורי (${SRC[srcKind(src.url)][0]})</a>` : ''}
    ${src && src.caption ? `<div class="card muted" style="white-space:pre-line;font-size:13px">${esc(cut(src.caption, 300))}</div>` : ''}
    ${infoCard(s)}
    ${storyHTML(s, w)}
    ${hasGeo(s) && s.kind !== 'food' ? `<h2>טבעוני וללא גלוטן קרוב</h2>${nearest(T.discover.food, s, 3).map((f) => `<div class="card row"><span class="tile" style="--c:var(--teal)">${ic('food')}</span><div class="grow"><div style="font-weight:800">${esc(f.name)}</div><div class="muted">${fmtKm(f.dist)} · ${esc(f.note)}</div></div><a class="icon-btn" href="${gmDir(s, f, 'walking')}" target="_blank" rel="noopener" aria-label="ניווט">${ic('pin')}</a></div>`).join('')}` : ''}
    <span class="muted" style="font-weight:800">איך מגיעים? בחר ונפתח ב־Google Maps</span>
    <div class="row"><a class="btn sun grow" href="${gmDir(null, s, 'walking')}" target="_blank" rel="noopener">${ic('walk')}ברגל</a><a class="btn soft grow" href="${gmDir(null, s, 'transit')}" target="_blank" rel="noopener">${ic('metro')}תחבורה ציבורית</a></div>
    <div class="row"><a class="btn soft sm grow" href="${gmSearch(s)}" target="_blank" rel="noopener">תמונות וביקורות ב־Google Maps</a>${fromSaved ? `<button class="btn soft sm" data-act="savedIdentify" data-id="${s.id}">${ic('pen')}מקום אחר</button>` : `<button class="btn soft sm" data-act="placeEditById" data-d="${di}" data-id="${s.id}">${ic('pen')}עריכה</button>`}</div>
  </div>`;
};

const dietWord = (v, what) => ({ only: `${what} לגמרי`, yes: what, limited: `יש אפשרויות (${what})`, no: `לא ${what}` }[v] || '');
function infoCard(s) {
  const d = s.details || {}; const rows = [];
  const h = hoursOf(s); if (h) rows.push(['שעות פתיחה', esc(h)]);
  if (d.vegan) rows.push(['טבעוני', esc(dietWord(d.vegan, 'טבעוני'))]);
  if (d.gf) rows.push(['ללא גלוטן', esc(dietWord(d.gf, 'ללא גלוטן'))]);
  if (d.cuisine) rows.push(['מטבח', esc(d.cuisine.split(';').map((c) => CUISINE[c.trim()] || c.trim().replace(/_/g, ' ')).join(', '))]);
  if (d.website) rows.push(['אתר', `<a href="${esc(d.website)}" target="_blank" rel="noopener" dir="ltr">${esc(d.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a>`]);
  if (d.phone) rows.push(['טלפון', `<a href="tel:${esc(d.phone.replace(/\s/g, ''))}" dir="ltr">${esc(d.phone)}</a>`]);
  const pending = enriching.has(s.id);
  if (!rows.length && !pending) return '';
  return `<div class="card" style="display:flex;flex-direction:column;gap:8px"><h2>פרטים</h2>
    ${rows.map(([k, v]) => `<div class="row" style="align-items:flex-start"><span class="muted" style="min-width:76px">${k}</span><span class="grow" style="font-size:14px;font-weight:600">${v}</span></div>`).join('')}
    ${pending ? '<span class="muted">מחפש עוד פרטים על המקום…</span>' : ''}
    ${d.hours && !(s.rule && T.rules[s.rule]) ? '<span class="muted">שעות לפי OpenStreetMap. כדאי לוודא לפני שהולכים.</span>' : ''}</div>`;
}
const CUISINE = { vegan: 'טבעוני', vegetarian: 'צמחוני', pizza: 'פיצה', sushi: 'סושי', japanese: 'יפני', mediterranean: 'ים תיכוני', spanish: 'ספרדי', catalan: 'קטלאני', tapas: 'טאפאס', coffee_shop: 'בית קפה', cafe: 'בית קפה', burger: 'המבורגרים', mexican: 'מקסיקני', italian: 'איטלקי', indian: 'הודי', healthy: 'בריא', bakery: 'מאפייה', brunch: 'בראנץ׳', breakfast: 'ארוחת בוקר', seafood: 'פירות ים', international: 'בינלאומי', asian: 'אסייתי', chinese: 'סיני', thai: 'תאילנדי', juice: 'מיצים', ice_cream: 'גלידה', cocktails: 'קוקטיילים', regional: 'מקומי', salad: 'סלטים', sandwich: 'כריכים', ramen: 'ראמן', middle_eastern: 'מזרח תיכוני', lebanese: 'לבנוני', greek: 'יווני', french: 'צרפתי', wine: 'יין' };
const cut = (t, n) => (t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + '…' : t);
const paras = (t) => t.split(/\n+/).map((p) => p.trim()).filter(Boolean).map((p) => `<p>${esc(p)}</p>`).join('');
function storyHTML(s, w) {
  const st = storyFor(s);
  let wikiPart = '';
  if (w === 'loading') wikiPart = '<p class="muted">טוען מוויקיפדיה…</p>';
  else if (w && !w.err && w.intro) {
    const en = w.lang === 'en';
    wikiPart = `${en && w.introHe ? paras(w.introHe) : paras(w.intro)}
      ${en ? `<p class="muted">${w.introHe ? 'תורגם אוטומטית מוויקיפדיה באנגלית.' : 'אין ערך בעברית, והתרגום האוטומטי לא זמין כרגע. ננסה שוב בפעם הבאה.'}</p>` : ''}
      ${w.sections.map((x, k) => `<details style="margin:6px 0;border-top:1px solid var(--line);padding-top:8px" ${en ? `data-tr="${k}"` : ''}><summary style="font-weight:800;cursor:pointer">${esc(en ? (x.titleHe || x.title) : x.title)}</summary><div style="margin-top:8px">${en ? (x.bodyHe ? paras(x.bodyHe) : '<p class="muted">מתרגם…</p>') : paras(x.body)}</div></details>`).join('')}
      <a class="muted" href="${esc(w.url)}" target="_blank" rel="noopener">הערך המלא בוויקיפדיה${en ? ' (באנגלית)' : ''} ←</a>`;
  }
  const speakBtn = (lang) => `<button class="btn soft sm" data-act="speak" data-lang="${lang}">${ic('speaker')}הקרא לי</button>`;
  const wikiCard = wikiPart ? `<div class="card story" ${st ? '' : 'id="story-text"'}><div class="row" style="margin-bottom:8px"><h2 class="grow">${st ? 'מוויקיפדיה' : 'על המקום'}</h2>${!st && w && w.intro ? speakBtn(w.lang === 'he' || w.introHe ? 'he-IL' : 'en-US') : ''}</div>${wikiPart}</div>` : '';
  if (!st) {
    if (wikiCard) return wikiCard;
    if (enriching.has(s.id) || w === 'loading') return '<div class="card story"><h2 style="margin-bottom:8px">על המקום</h2><p class="muted">מחפש מידע על המקום… זה לוקח כמה שניות.</p></div>';
    return `<div class="card story"><h2 style="margin-bottom:8px">על המקום</h2><p class="muted">${hasGeo(s) ? 'לא מצאתי ערך בוויקיפדיה למקום הזה.' : 'למקום אין מיקום, ולכן לא הצלחתי לחפש עליו מידע. בחר מיקום בעריכה.'}</p><button class="btn soft sm" data-act="reEnrich" data-id="${s.id}">לחפש שוב</button></div>`;
  }
  return `<div class="card story" id="story-text">
    <div class="row" style="margin-bottom:8px"><h2 class="grow">הסיפור</h2>${speakBtn('he-IL')}</div>
    <p>${esc(st.intro)}</p>
    <h2 style="margin:6px 0 8px">ציר זמן</h2>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">${st.timeline.map(([when, what]) => `<div class="row" style="align-items:flex-start"><span class="badge" style="color:var(--day);flex:none;min-width:64px;text-align:center">${esc(when)}</span><span style="font-size:14px;line-height:1.5">${esc(what)}</span></div>`).join('')}</div>
    <h2 style="margin-bottom:6px">מה לחפש כשאתה שם</h2>
    ${st.look.map((l) => `<p style="margin:0 0 6px">• ${esc(l)}</p>`).join('')}
    <div class="warn" style="display:block;background:#EEF2FA;color:var(--navy);margin:10px 0"><b>הידעת?</b> ${esc(st.fact)}</div>
    <div class="warn" style="display:block;margin-bottom:10px"><b>טיפ:</b> ${esc(st.tip)}</div>
  </div>
  ${wikiCard}`;
}

/* more */
V.more = () => { const H = S.hotel || {}; return pageHead('עוד דברים', 'כל הכלים לטיול') + `<div class="section">
  ${H.name ? `<div class="card row"><span class="tile r1" style="--c:var(--navy)">${ic('hotel')}</span><div class="grow"><div style="font-weight:800">${esc(H.name)}</div><div class="muted">${esc(H.address || '')}</div></div><button class="icon-btn" data-act="hotelEdit" aria-label="עריכת המלון">${ic('pen')}</button></div>
  <div class="row"><a class="btn sun sm grow" href="${hasGeo(H) ? gmDir(null, H, 'walking') : gmSearch({ name: H.name })}" target="_blank" rel="noopener">${ic('pin')}נווט למלון</a><button class="btn soft sm grow" data-act="driver">הראה לנהג המונית</button></div>`
  : `<button class="card row" style="border:2px dashed var(--line);cursor:pointer;text-align:right" data-act="hotelEdit"><span class="tile r1" style="--c:var(--navy)">${ic('hotel')}</span><div class="grow"><div style="font-weight:800">הוסף את המלון שלך</div><div class="muted">נשמר רק בטלפון הזה. משמש לניווט, למסך הנהג ולמסלול</div></div>${ic('plus')}</button>`}
  ${installCard()}
  <div class="grid2">
    ${[['#places', 'list', 'המקומות', 'עריכה והעברה בין ימים', '#2453C9'], ['#expenses', 'coin', 'הוצאות', `€${Math.round(spent())} מתוך €${S.budget}`, '#E8553D'], ['#packing', 'bag', 'ציוד', `${packCount()}`, '#1E9E8F'], ['#flights', 'plane', 'טיסות', S.flights.back.time ? `חזרה ${S.flights.back.time}` : 'הוסף פרטי טיסה', '#13213D'], ['#transport', 'metro', 'תחבורה', 'מהשדה, כרטיסים, מטרו', '#2453C9'], ['#phrases', 'chat', 'ספרדית', 'משפטים עם השמעה', '#C2417F'], ['#shopping', 'tag', 'קניות', 'מבצעים והחזר מע״מ', '#D99400'], ['#emergency', 'sos', 'חירום', '112 · ביטוח · בית מרקחת', '#E8553D']]
      .map(([h, k, t, s, c]) => `<a class="big" href="${h}" style="--c:${c}"><span class="ic">${ic(k)}</span><span style="display:flex;flex-direction:column"><b>${t}</b><span>${esc(s)}</span></span></a>`).join('')}
  </div><div class="muted" style="text-align:center;padding:8px 0">גרסה ${VERSION}</div></div>`; };

/* expenses */
const spent = () => S.expenses.reduce((a, e) => a + (e.cur === 'ILS' ? e.amount / (rate ? rate.v : 3.9) : e.amount), 0);
let convEur = '';
V.expenses = () => {
  const r = rate ? rate.v : null; const sp = spent(); const left = S.budget - sp;
  const cats = {}; S.expenses.forEach((e) => { cats[e.cat] = (cats[e.cat] || 0) + (e.cur === 'ILS' ? e.amount / (r || 3.9) : e.amount); });
  const conv = r && convEur ? Math.round(parseFloat(convEur) * r * (1 + S.cardFee / 100)) : null;
  return pageHead('הוצאות', r ? `שער היום: €1 = ₪${r.toFixed(2)} (${rate.date})` : 'טוען שער…', '#more') + `<div class="section">
  <div class="next" style="margin:0;background:var(--red)"><div class="row" style="align-items:flex-end"><div class="grow"><div style="font-size:12px">הוצאתם</div><div style="font-family:var(--display);font-size:56px;line-height:.85">€${Math.round(sp)}</div>${r ? `<div style="font-size:12px;opacity:.9">≈ ₪${Math.round(sp * r)}</div>` : ''}</div><div><div style="font-size:12px">${left >= 0 ? 'נשאר' : 'חריגה'}</div><div style="font-family:var(--display);font-size:36px;line-height:.85">€${Math.abs(Math.round(left))}</div><button class="btn ghost sm" data-act="budget">תקציב €${S.budget}</button></div></div>
  <div style="font-size:12px;font-weight:700">${Object.entries(cats).map(([c, v]) => `${esc(c)} €${Math.round(v)}`).join(' · ') || 'עוד אין הוצאות'}</div></div>
  <div class="card" style="display:flex;flex-direction:column;gap:8px"><h2>כמה זה בשקלים?</h2>
    <div class="row"><input id="conv" class="field" inputmode="decimal" placeholder="€ סכום" value="${esc(convEur)}" style="direction:ltr"><span style="font-family:var(--display);font-size:40px;min-width:110px">${conv != null ? '₪' + conv : '₪—'}</span></div>
    <span class="muted">כולל עמלת כרטיס ${S.cardFee}%. אפשר לשנות בכפתור התקציב.</span></div>
  <button class="btn sun" data-act="expAdd">${ic('plus')}הוצאה חדשה</button>
  ${S.expenses.slice().reverse().map((e) => `<div class="card row"><span class="tile" style="--c:var(--red)">${ic('coin')}</span><div class="grow"><div style="font-weight:700">${esc(e.title)}</div><div class="muted">${esc(e.cat)} · ${esc(e.day)}</div></div><b style="font-family:var(--display);font-size:26px">${e.cur === 'ILS' ? '₪' : '€'}${e.amount}</b><button class="icon-btn danger" data-act="expDel" data-id="${e.id}" aria-label="מחיקה">${ic('trash')}</button></div>`).join('')}
  </div>`;
};

/* packing */
const packCount = () => { let a = 0, b = 0; S.packing.forEach((g) => g.items.forEach((x) => { a++; if (x.done) b++; })); return `${b} מתוך ${a} ארוזים`; };
V.packing = () => pageHead('רשימת ציוד', packCount(), '#more') + `<div class="section">
  ${S.packing.map((g, gi) => `<div class="card" style="display:flex;flex-direction:column;gap:4px"><span style="font-size:12px;font-weight:800;color:var(--teal)">${esc(g.group)}</span>
    ${g.items.map((x) => `<div class="row"><button class="row grow" data-act="pack" data-g="${gi}" data-id="${x.id}" style="border:0;background:none;padding:6px 0;cursor:pointer;font:700 15px var(--body);text-align:right;color:${x.done ? '#8A94AB' : 'var(--navy)'}"><span class="tile" style="width:28px;height:28px;border-radius:9px;--c:${x.done ? 'var(--teal)' : '#fff'};border:2px solid var(--teal)">${x.done ? ic('check') : ''}</span><span style="${x.done ? 'text-decoration:line-through' : ''}">${esc(x.t)}</span></button><button class="icon-btn" style="width:32px;height:32px;background:none;color:#8A94AB" data-act="packDel" data-g="${gi}" data-id="${x.id}" aria-label="מחיקה">${ic('x')}</button></div>`).join('')}
    <div class="row"><input class="field" id="pk-${gi}" placeholder="פריט חדש" style="padding:8px 10px"><button class="btn soft sm" data-act="packAdd" data-g="${gi}">הוסף</button></div></div>`).join('')}
</div>`;

/* static guides */
const guide = (title, sub, cards) => pageHead(title, sub, '#more') + `<div class="section">${cards.map(([k, c, t, lines], i) => `<div class="card row" style="align-items:flex-start"><span class="tile ${ROT[i % 4]}" style="--c:${c}">${ic(k)}</span><div class="grow"><div style="font-weight:800;font-size:16px;margin-bottom:4px">${t}</div>${lines.map((l) => `<div style="font-size:14px;color:#3C4865;margin-bottom:3px">• ${l}</div>`).join('')}</div></div>`).join('')}</div>`;
V.transport = () => guide('תחבורה', 'מחירים לפי מקורות מ־2026 · לאמת בקופה', [
  ['plane', '#E8553D', 'מהשדה למלון', ['Aerobús: אוטובוס ישיר למרכז, בערך €7.75 לכיוון. כרטיסי המטרו לא תקפים בו', 'מטרו L9 Sud: בתחנות השדה צריך כרטיס שדה תעופה, בערך €5.70–5.90. ה־T-casual לא תקף שם', 'מונית: יש תור מסודר ביציאה מהטרמינל']],
  ['metro', '#2453C9', 'איזה כרטיס לקנות', ['T-casual: עשר נסיעות באזור 1 ב־€13. משתלם אם נוסעים פחות מ־4 פעמים ביום', 'Hola Barcelona: נסיעות ללא הגבלה, כולל המטרו לשדה. 48 שעות בערך €18.70, 72 שעות בערך €27.30', 'נסיעה בודדת: €2.90', 'קונים במכונות בכל תחנה, גם בכרטיס אשראי']],
  ['walk', '#1E9E8F', 'ברגל', ['רוב המסלול שלך במרחק הליכה', 'מעל 20 דקות הליכה האפליקציה ממליצה על מטרו']],
  ['warn', '#D99400', 'שימו לב', ['כייסים ברמבלס ובמטרו: תיק קדימה, טלפון בכיס פנימי', 'בלילה עדיף מונית או אפליקציית מוניות']]
]) + `<div class="section"><span class="muted">מקורות: <a href="https://static-web.tmb.cat/en/barcelona-fares-metro-bus" target="_blank" rel="noopener">TMB</a> · <a href="https://barcelonasecreta.com/en/prices-public-transport-fares-barcelona-2026/" target="_blank" rel="noopener">Barcelona Secreta</a> · <a href="https://aerobusbarcelona.es/en/faqs/" target="_blank" rel="noopener">Aerobús</a></span></div>`;
V.shopping = () => pageHead('קניות', 'מבצעים והחזר מע״מ', '#more') + `<div class="section">
  <div class="next" style="margin:0;background:var(--sun);color:var(--navy)"><div style="font-family:var(--display);font-size:32px;line-height:.9">החזר מע״מ = ההנחה הכי בטוחה</div><div style="font-size:14px">המע״מ על בגדים בספרד הוא 21%, ולתיירים מחוץ לאיחוד אין סכום מינימום. בקשו בקופה טופס tax free (מראים דרכון), ובשדה, לפני הבידוק, מאשרים אותו במכונת DIVA. אחרי עמלות חוזרים בדרך כלל 13%–16% מהמחיר.</div></div>
  <div class="warn">${ic('warn')}<span>עונת המבצעים הגדולה (Rebajas) מתחילה בדרך כלל ב־7 בינואר, אחרי הטיול. בדצמבר יש בעיקר מבצעים נקודתיים.</span></div>
  <div class="grid2">${[['ZARA', 'https://www.zara.com/es/', '#13213D'], ['MANGO', 'https://shop.mango.com/es', '#E8553D'], ['UNIQLO', 'https://www.uniqlo.com/es/es/', '#E8553D'], ['Pull&Bear', 'https://www.pullandbear.com/es/', '#2453C9']].map(([n, u, c]) => `<a class="card" href="${u}" target="_blank" rel="noopener" style="text-decoration:none;display:flex;flex-direction:column;gap:6px"><b style="font-family:var(--display);font-size:30px;line-height:.9;color:${c}">${esc(n)}</b><span class="muted">לאתר הספרדי ←</span></a>`).join('')}</div>
  <span class="muted">ניטור אוטומטי של מבצעים יתווסף בהמשך, בניסיון.</span></div>`;
V.phrases = () => pageHead('ספרדית לדרך', 'לחץ כדי לשמוע', '#more') + `<div class="section">${T.phrases.map(([g, list]) => `<h2>${g}</h2>${list.map(([es, tr, he], k) => `<div class="card row"><div class="grow"><div class="muted">${esc(he)}</div><div dir="ltr" style="font-weight:800;font-size:17px;text-align:right">${esc(es)}</div><div style="font-size:12px;font-weight:700;color:var(--pink)">${esc(tr)}</div></div><button class="icon-btn ${ROT[k % 4]}" style="background:var(--pink);color:#fff;width:44px;height:44px" data-act="say" data-t="${esc(es)}" aria-label="השמעה">${ic('speaker')}</button></div>`).join('')}`).join('')}</div>`;
V.emergency = () => pageHead('חירום', 'הכול במסך אחד, גם בלי אינטרנט', '#more') + `<div class="section">
  <a class="btn" href="tel:112" style="background:var(--red);color:#fff;font-size:22px;padding:16px">חיוג 112</a>
  <span class="muted">112 הוא מספר החירום האירופי: משטרה, אמבולנס וכיבוי אש.</span>
  <div class="card" style="display:flex;flex-direction:column;gap:8px"><h2>ביטוח נסיעות</h2>
    <label class="lab">מספר פוליסה<input class="field" id="ins-policy" value="${esc(S.insurance.policy)}"></label>
    <label class="lab">טלפון המוקד<input class="field" id="ins-phone" value="${esc(S.insurance.phone)}" inputmode="tel" style="direction:ltr;text-align:right"></label>
    <div class="row"><button class="btn soft sm grow" data-act="insSave">שמירה</button>${S.insurance.phone ? `<a class="btn sun sm grow" href="tel:${esc(S.insurance.phone)}">חיוג למוקד</a>` : ''}</div></div>
  <a class="btn soft" href="https://www.google.com/maps/search/farmacia/" target="_blank" rel="noopener">${ic('pin')}בית מרקחת קרוב (Farmàcia)</a>
  <button class="btn soft" data-act="driver">כתובת המלון בספרדית</button>
  <div class="card"><h2 style="margin-bottom:6px">דרכון נגנב או אבד</h2>${['להגיש תלונה בתחנת משטרה (Mossos d’Esquadra) ולקבל אישור', 'לפנות לשגרירות ישראל במדריד לקבלת תעודת מעבר', 'להודיע לחברת הביטוח'].map((l) => `<div style="font-size:14px;margin-bottom:4px">• ${l}</div>`).join('')}<a class="muted" href="https://www.google.com/search?q=%D7%A9%D7%92%D7%A8%D7%99%D7%A8%D7%95%D7%AA+%D7%99%D7%A9%D7%A8%D7%90%D7%9C+%D7%91%D7%9E%D7%93%D7%A8%D7%99%D7%93" target="_blank" rel="noopener">פרטי השגרירות ←</a></div>
</div>`;
V.flights = () => {
  const f = (k, lbl) => `<div class="card" style="display:flex;flex-direction:column;gap:8px"><h2>${lbl}</h2>
    <div class="grid2"><label class="lab">מספר טיסה<input class="field" id="fl-${k}-no" value="${esc(S.flights[k].no || '')}" style="direction:ltr"></label><label class="lab">טרמינל<input class="field" id="fl-${k}-term" value="${esc(S.flights[k].term || '')}" placeholder="T1 / T2"></label>
    <label class="lab">תאריך<input class="field" type="date" id="fl-${k}-date" value="${esc(S.flights[k].date || (k === 'out' ? '2026-12-13' : '2026-12-17'))}"></label><label class="lab">שעת המראה<input class="field" type="time" id="fl-${k}-time" value="${esc(S.flights[k].time || '')}"></label></div>
    ${S.flights[k].no ? `<a class="muted" href="https://www.flightradar24.com/data/flights/${encodeURIComponent(S.flights[k].no.replace(/\s/g, ''))}" target="_blank" rel="noopener">סטטוס הטיסה ←</a>` : ''}</div>`;
  return pageHead('טיסות', S.flights.back.time ? `ביום האחרון צאו מהמלון עד ${leaveBy()}` : 'מלא פעם אחת וזה מופיע במסך היום', '#more') + `<div class="section">${f('out', 'הלוך')}${f('back', 'חזור')}<button class="btn sun" data-act="flSave">שמירה</button>
  <span class="muted">שעת היציאה מחושבת כך: 3 שעות לפני ההמראה בשדה, ועוד כ־40 דקות נסיעה.</span></div>`;
};

/* ---------- install ---------- */
let installEvt = null;
const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; if (['#more', '#today', ''].includes(location.hash)) render(); });
window.addEventListener('appinstalled', () => { installEvt = null; toast('האפליקציה הותקנה ✓'); render(); });
function installCard() {
  if (standalone()) return '';
  if (installEvt) return `<button class="btn navy" data-act="install">${ic('plus')}התקן את האפליקציה בטלפון</button>`;
  return '<div class="card muted">להתקנה: בכרום לוחצים ⋮ ← "הוסף למסך הבית". באייפון: Safari ← שיתוף ← "הוסף למסך הבית".</div>';
}

/* ---------- photo viewer ---------- */
let galleryImgs = [], lbIdx = 0;
function openLightbox(i) {
  if (!galleryImgs.length) return; lbIdx = (i + galleryImgs.length) % galleryImgs.length;
  let b = $('#lb'); if (!b) { b = document.createElement('div'); b.id = 'lb'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-modal', 'true'); document.body.appendChild(b); }
  b.classList.remove('zoom');
  b.innerHTML = `<div class="lb-scroll" data-act="lbZoom"><img src="${esc(galleryImgs[lbIdx])}" alt="תמונה ${lbIdx + 1}"></div>
    <button class="lb-btn lb-x" data-act="lbClose" aria-label="סגירה">${ic('x')}</button>
    ${galleryImgs.length > 1 ? `<button class="lb-btn lb-prev" data-act="lbNav" data-dir="-1" aria-label="הקודמת">‹</button><button class="lb-btn lb-next" data-act="lbNav" data-dir="1" aria-label="הבאה">›</button>` : ''}
    <div class="lb-count">${lbIdx + 1} / ${galleryImgs.length} · הקש להגדלה</div>`;
  let x0 = null; const sc = b.querySelector('.lb-scroll');
  sc.addEventListener('touchstart', (ev) => { x0 = ev.touches.length === 1 && !b.classList.contains('zoom') ? ev.touches[0].clientX : null; }, { passive: true });
  sc.addEventListener('touchend', (ev) => { if (x0 == null) return; const dx = ev.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) { ev.preventDefault(); openLightbox(lbIdx + (dx < 0 ? 1 : -1)); } x0 = null; });
}
document.addEventListener('keydown', (ev) => { if (!$('#lb')) return; if (ev.key === 'Escape') A.lbClose(); if (ev.key === 'ArrowLeft') openLightbox(lbIdx + 1); if (ev.key === 'ArrowRight') openLightbox(lbIdx - 1); });

/* ---------- render + routing ---------- */
function render() {
  const h = (location.hash || '#today').slice(1); const [name, ...args] = h.split('/');
  const view = V[name] || V.today;
  const top = ['today', 'map', 'discover', 'saved', 'more'];
  const tab = top.includes(name) ? name : name === 'place' && args[0] === 's' ? 'saved' : (['place', 'places'].includes(name) ? 'today' : 'more');
  document.querySelectorAll('.tabbar a').forEach((a) => a.classList.toggle('on', a.dataset.tab === tab));
  if (name !== 'map' && map) { map.remove(); map = null; layer = null; }
  if (name === 'map' && map) return; // keep leaflet alive
  if (!['place'].includes(name)) setDayColor(curIdx());
  $('#app').innerHTML = view(...args);
  if (name === 'map') mountMap();
}
window.addEventListener('hashchange', () => { closeSheet(); A.lbClose(); window.scrollTo(0, 0); render(); });

/* ---------- sheets ---------- */
function placeSheet(di, si) {
  const editing = si != null; const s = editing ? S.days[di].stops[si] : { name: '', note: '' };
  let pick = editing && hasGeo(s) ? { lat: s.lat, lng: s.lng } : null; let day = di;
  sheet(`<h3>${editing ? 'עריכת מקום' : 'מקום חדש'}</h3>
    <label class="lab">שם המקום<input class="field" id="pl-name" value="${esc(s.name)}" placeholder="למשל: Bunkers del Carmel"></label>
    <div class="row"><button class="btn soft sm" data-act="plSearch">חפש מיקום במפה</button><span class="muted grow" id="pl-geo">${pick ? 'יש מיקום ✓' : 'בלי מיקום, הניווט יחפש לפי השם'}</span></div>
    <div id="pl-results" style="display:flex;flex-direction:column;gap:6px"></div>
    <label class="lab">הערה<input class="field" id="pl-note" value="${esc(s.note || '')}" placeholder="שעה, כרטיס, מה לא לפספס"></label>
    <div class="lab">סוג המקום<div class="pills" id="pl-kinds" style="flex-wrap:wrap">${[['star','כללי'],['food','אוכל'],['bar','בר'],['gaudi','גאודי'],['view','תצפית'],['park','פארק'],['market','שוק'],['shop','קניות'],['show','מופע'],['walk','סיור'],['port','ים'],['hotel','מלון']].map(([k, t]) => `<button class="pill ${(s.kind || 'star') === k ? 'on' : ''}" style="--c:var(--navy)" data-act="plKind" data-k="${k}">${t}</button>`).join('')}</div></div>
    <div class="lab">באיזה יום?<div class="row" id="pl-days">${META.map((m, k) => `<button class="pill ${k === di ? 'on' : ''}" style="--c:${m.color};flex:1" data-act="plDay" data-i="${k}">${m.num}.12</button>`).join('')}</div></div>
    <div class="row"><button class="btn sun grow" data-act="plSave">שמירה</button><button class="btn soft" data-act="closeSheet">ביטול</button></div>`);
  sheetCtx = { kind: 'place', kindSel: s.kind || 'star', di, si, get pick() { return pick; }, set pick(v) { pick = v; }, get day() { return day; }, set day(v) { day = v; } };
}
let sheetCtx = null;

/* ---------- actions ---------- */
const A = {
  closeSheet,
  day: (e) => { S.dayIdx = +e.dataset.i; save(); render(); },
  leg: (e) => { S.legs[e.dataset.k] = e.dataset.m; save(); render(); },
  sortDay: () => {
    const i = curIdx(); const st = S.days[i].stops; const geo = st.filter(hasGeo); const rest = st.filter((s) => !hasGeo(s));
    if (geo.length < 3) { toast('צריך לפחות 3 מקומות עם מיקום'); return; }
    const order = [geo[0]]; const left = geo.slice(1);
    while (left.length) { const last = order[order.length - 1]; let b = 0; left.forEach((s, k) => { if (km(last, s) < km(last, left[b])) b = k; }); order.push(left.splice(b, 1)[0]); }
    const len = (a) => a.slice(1).reduce((t, s, k) => t + km(a[k], s), 0);
    const before = len(geo), after = len(order);
    if (after >= before - 0.05) { toast('הסדר הנוכחי כבר הכי קצר'); return; }
    sheet(`<h3>סדר מוצע</h3><div class="muted">חוסך כ־${(before - after).toFixed(1)} ק״מ הליכה (${before.toFixed(1)} ← ${after.toFixed(1)}). המקום הראשון נשאר במקומו.</div>
      ${order.concat(rest).map((s, k) => `<div class="card row"><b style="font-family:var(--display);font-size:24px;color:var(--day)">${k + 1}</b><span class="grow">${esc(s.name)}</span></div>`).join('')}
      ${rest.length ? '<span class="muted">מקומות בלי מיקום מדויק עברו לסוף.</span>' : ''}
      <div class="row"><button class="btn sun grow" data-act="sortApply">להחליף לסדר הזה</button><button class="btn soft" data-act="closeSheet">להשאיר</button></div>`);
    sheetCtx = { kind: 'sort', i, ids: order.concat(rest).map((s) => s.id) };
  },
  reEnrich: (e) => { const s = [...S.days.flatMap((d) => d.stops), ...S.saved].find((x) => x.id === e.dataset.id); if (!s) return; delete s.details; retried.delete(s.id); enrichStop(s, true); render(); toast('מחפש מידע…'); },
  lightbox: (e) => openLightbox(+e.dataset.i),
  lbNav: (e) => openLightbox(lbIdx + +e.dataset.dir),
  lbZoom: () => { const b = $('#lb'); if (b) b.classList.toggle('zoom'); },
  lbClose: () => { const b = $('#lb'); if (b) b.remove(); },
  savedIdentify: (e) => { const x = S.saved.find((o) => o.id === e.dataset.id); if (x) identifySheet(x); },
  idFind: async (e) => {
    const x = S.saved.find((o) => o.id === e.dataset.id); const text = $('#id-text').value.trim(); if (!x || !text) { toast('כתוב שם או הדבק כיתוב'); return; }
    x.caption = text; save();
    $('#id-results').innerHTML = '<span class="muted">מחפש…</span>';
    let res = []; try { res = await findPlaceIn(text); } catch (err) { /* offline */ }
    if (!$('#id-results')) return;
    sheetCtx.results = res;
    $('#id-results').innerHTML = res.length ? '<span class="muted">בחר את המקום:</span>' + res.map((r, k) => `<button class="card" style="border:0;text-align:right;cursor:pointer" data-act="idPick" data-k="${k}"><b>${esc(r.name)}</b><div class="muted">${esc(r.sub || '')}</div></button>`).join('') : '<span class="muted">לא מצאתי. נסה רק את שם המקום, באנגלית או בספרדית.</span>';
  },
  idPick: (e) => { const x = S.saved.find((o) => o.id === sheetCtx.id); const r = sheetCtx.results[+e.dataset.k]; closeSheet(); applyPlace(x, r); render(); toast('המקום נשמר. מביא מידע ותמונות…'); },
  savedToDayById: (e) => { const i = S.saved.findIndex((o) => o.id === e.dataset.id); if (i >= 0) A.savedToDay({ dataset: { i } }); },
  install: async () => { if (!installEvt) return; installEvt.prompt(); const r = await installEvt.userChoice; installEvt = null; if (r.outcome !== 'accepted') toast('אפשר להתקין גם מתפריט ⋮ בכרום'); render(); },
  moveTo: (e) => {
    const d = +e.dataset.d, to = +e.dataset.to; const k = S.days[d].stops.findIndex((x) => x.id === e.dataset.id); if (k < 0) return;
    const [x] = S.days[d].stops.splice(k, 1); S.days[to].stops.push(x); save(); render(); toast(`"${x.name}" עבר ליום ${META[to].short}. אפשר לסדר את היום ב"סדר לי את היום"`);
  },
  nearMe: () => { if (!navigator.geolocation) { toast('אין גישה למיקום'); return; } navigator.geolocation.getCurrentPosition((p) => { here = { lat: p.coords.latitude, lng: p.coords.longitude }; render(); }, () => toast('לא קיבלתי הרשאה למיקום')); },
  sortApply: () => { const { i, ids } = sheetCtx; S.days[i].stops = ids.map((id) => S.days[i].stops.find((s) => s.id === id)); save(); closeSheet(); render(); toast('הסדר עודכן'); },
  mapDay: (e) => { mapDay = /^\d+$/.test(e.dataset.i) ? +e.dataset.i : e.dataset.i; mapSel = null; drawMarkers(true); rerenderMapOverlay(); },
  mapClose: () => { mapSel = null; rerenderMapOverlay(); },
  locate: () => {
    if (!navigator.geolocation) { toast('אין גישה למיקום'); return; }
    navigator.geolocation.getCurrentPosition((p) => { const ll = [p.coords.latitude, p.coords.longitude]; if (meMarker) meMarker.remove(); meMarker = L.marker(ll, { icon: L.divIcon({ className: '', html: '<div class="mk me"></div>', iconSize: [18, 18] }) }).addTo(map); map.setView(ll, 15); }, () => toast('לא קיבלתי הרשאה למיקום'));
  },
  disc: (e) => { discTab = e.dataset.t; render(); },
  discSave: (e) => { const d = T.discover[discTab][+e.dataset.k]; const x = { id: uid(), title: d.name, name: d.name, url: gmSearch(d), fav: true, lat: d.lat, lng: d.lng, kind: d.kind, status: 'found' }; S.saved.unshift(x); save(); toast('נשמר במועדפים ★'); if (hasGeo(x)) enrichStop(x, true); },
  discAdd: (e) => { const d = T.discover[discTab][+e.dataset.k]; daySheet((di) => { const ns = { id: uid(), kind: d.kind, name: d.name, note: d.note, lat: d.lat, lng: d.lng }; S.days[di].stops.push(ns); save(); toast(`נוסף ליום ${META[di].short} · מופיע במפה ובניווט`); enrichStop(ns, true); }); },
  addLink: () => { const v = $('#sv-link').value.trim(); addShared(v, ''); },
  savedTab: (e) => { savedTab = e.dataset.t; render(); },
  savedFav: (e) => { const x = S.saved[+e.dataset.i]; x.fav = !x.fav; save(); render(); toast(x.fav ? 'נשמר במועדפים ★' : 'הוסר מהמועדפים'); },
  savedDel: (e) => { S.saved.splice(+e.dataset.i, 1); save(); render(); toast('נמחק'); },
  savedToDay: (e) => {
    const i = +e.dataset.i; const x = S.saved[i];
    const l = linkedStop(x); if (l) { location.hash = `#place/${l.di}/${l.st.id}`; return; }
    daySheet((di) => {
      const ns = { id: uid(), kind: x.kind || 'star', name: x.name || x.title || 'מקום מהשמורים', note: SRC[srcKind(x.url || '')][0], lat: x.lat ?? null, lng: x.lng ?? null, osm: x.osm || null, url: x.url, savedId: x.id };
      if (x.details) ns.details = x.details;
      S.days[di].stops.push(ns); x.day = META[di].short; save(); render();
      if (!ns.details) enrichStop(ns, true);
      if (!hasGeo(ns)) { identifySheet(x); toast('נוסף. בוא נזהה את המקום כדי שיופיע במפה ובניווט'); } else toast(`נוסף ליום ${META[di].short} · מופיע במפה ובניווט`);
    });
  },
  placeAdd: (e) => placeSheet(+e.dataset.d, null),
  placeEdit: (e) => placeSheet(+e.dataset.d, +e.dataset.s),
  placeEditById: (e) => { const di = +e.dataset.d; placeSheet(di, S.days[di].stops.findIndex((s) => s.id === e.dataset.id)); },
  placeDel: (e) => { const di = +e.dataset.d, si = +e.dataset.s; const [x] = S.days[di].stops.splice(si, 1); save(); render(); toast(`"${x.name}" נמחק`); },
  mv: (e) => { const di = +e.dataset.d, si = +e.dataset.s, j = si + +e.dataset.dir; const a = S.days[di].stops; if (j < 0 || j >= a.length) return; [a[si], a[j]] = [a[j], a[si]]; save(); render(); },
  plKind: (e) => { sheetCtx.kindSel = e.dataset.k; document.querySelectorAll('#pl-kinds .pill').forEach((b) => b.classList.toggle('on', b.dataset.k === e.dataset.k)); },
  plDay: (e) => { sheetCtx.day = +e.dataset.i; document.querySelectorAll('#pl-days .pill').forEach((b, k) => b.classList.toggle('on', k === sheetCtx.day)); },
  plSearch: async () => {
    const name = $('#pl-name').value.trim(); if (!name) { toast('כתוב שם קודם'); return; }
    $('#pl-results').innerHTML = '<span class="muted">מחפש…</span>';
    try {
      const res = await searchPlaces(name);
      if (!$('#pl-results')) return;
      sheetCtx.results = res;
      $('#pl-results').innerHTML = res.length ? res.map((r, k) => `<button class="card" style="border:0;text-align:right;cursor:pointer" data-act="plPick" data-k="${k}"><b>${esc(r.name)}</b><div class="muted">${esc(r.sub)}</div></button>`).join('') : '<span class="muted">לא נמצא. נסה שם באנגלית או בספרדית.</span>';
    } catch (err) { if ($('#pl-results')) $('#pl-results').innerHTML = '<span class="muted">החיפוש צריך חיבור לאינטרנט.</span>'; }
  },
  plPick: (e) => {
    const r = sheetCtx.results[+e.dataset.k]; sheetCtx.pick = { lat: r.lat, lng: r.lng }; sheetCtx.osm = r.osm;
    $('#pl-geo').textContent = 'יש מיקום ✓ ' + r.name; $('#pl-results').innerHTML = '';
    if (r.kind && (!sheetCtx.kindSel || sheetCtx.kindSel === 'star')) { sheetCtx.kindSel = r.kind; document.querySelectorAll('#pl-kinds .pill').forEach((b) => b.classList.toggle('on', b.dataset.k === r.kind)); }
  },
  plSave: () => {
    const c = sheetCtx; const name = $('#pl-name').value.trim(); if (!name) { toast('צריך שם למקום'); return; }
    const note = $('#pl-note').value.trim();
    let item;
    if (c.si != null) { item = S.days[c.di].stops.splice(c.si, 1)[0]; } else { item = { id: uid(), kind: 'star' }; }
    const changed = item.name !== name || !!c.pick && (c.pick.lat !== item.lat || c.pick.lng !== item.lng);
    Object.assign(item, { name, note, kind: c.kindSel || item.kind || 'star' }); if (c.pick) { item.lat = c.pick.lat; item.lng = c.pick.lng; }
    if (c.osm) item.osm = c.osm; else if (changed) delete item.osm;
    if (changed) delete item.details;
    if (c.si != null && c.day === c.di) S.days[c.di].stops.splice(c.si, 0, item); else S.days[c.day].stops.push(item);
    save(); closeSheet(); render();
    toast(c.si == null ? `נוסף ליום ${META[c.day].short}` : c.day === c.di ? 'נשמר' : `הועבר ליום ${META[c.day].short}`);
    if (changed || !item.details) enrichStop(item, true);
  },
  speak: (e) => { if (!('speechSynthesis' in window)) { toast('אין הקראה במכשיר הזה'); return; } if (speechSynthesis.speaking) { speechSynthesis.cancel(); return; } const t = $('#story-text'); if (!t) return; const u = new SpeechSynthesisUtterance(t.innerText.replace('הקרא לי', '').replace(/הערך המלא בוויקיפדיה.*$/s, '')); u.lang = e.dataset.lang; u.rate = 0.95; speechSynthesis.speak(u); toast('לחץ שוב כדי לעצור'); },
  say: (e) => { if (!('speechSynthesis' in window)) { toast('אין השמעה במכשיר הזה'); return; } speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(e.dataset.t); u.lang = 'es-ES'; u.rate = 0.85; speechSynthesis.speak(u); },
  driver: () => { const H = S.hotel || {}; if (!H.name) { A.hotelEdit(); return; } sheet(`<h3>לנהג המונית</h3><div style="font-size:15px">Por favor, lléveme a:</div><div style="font-size:30px;font-weight:800;line-height:1.25" dir="ltr">${esc(H.name)}<br>${esc(H.address || '')}</div><button class="btn soft" data-act="closeSheet">סגירה</button>`); },
  hotelEdit: () => {
    const H = S.hotel || {};
    sheet(`<h3>המלון שלך</h3><span class="muted">נשמר רק בטלפון הזה.</span>
      <label class="lab">שם המלון<input class="field" id="ht-name" value="${esc(H.name || '')}" placeholder="שם המלון"></label>
      <div class="row"><button class="btn soft sm" data-act="htSearch">חפש במפה</button><span class="muted grow" id="ht-geo">${hasGeo(H) ? 'יש מיקום ✓' : 'בלי מיקום'}</span></div>
      <div id="ht-results" style="display:flex;flex-direction:column;gap:6px"></div>
      <label class="lab">כתובת (לנהג המונית)<input class="field" id="ht-addr" value="${esc(H.address || '')}" style="direction:ltr;text-align:right"></label>
      <div class="row"><button class="btn sun grow" data-act="htSave">שמירה</button><button class="btn soft" data-act="closeSheet">ביטול</button></div>`);
    sheetCtx = { kind: 'hotel', pick: hasGeo(H) ? { lat: H.lat, lng: H.lng } : null };
  },
  htSearch: async () => {
    const name = $('#ht-name').value.trim(); if (!name) { toast('כתוב את שם המלון'); return; }
    $('#ht-results').innerHTML = '<span class="muted">מחפש…</span>';
    try { const res = await searchPlaces(name); if (!$('#ht-results')) return; sheetCtx.results = res;
      $('#ht-results').innerHTML = res.length ? res.map((r, k) => `<button class="card" style="border:0;text-align:right;cursor:pointer" data-act="htPick" data-k="${k}"><b>${esc(r.name)}</b><div class="muted">${esc(r.sub)}</div></button>`).join('') : '<span class="muted">לא נמצא. נסה שם באנגלית.</span>';
    } catch (err) { if ($('#ht-results')) $('#ht-results').innerHTML = '<span class="muted">החיפוש צריך חיבור לאינטרנט.</span>'; }
  },
  htPick: (e) => { const r = sheetCtx.results[+e.dataset.k]; sheetCtx.pick = { lat: r.lat, lng: r.lng }; $('#ht-geo').textContent = 'יש מיקום ✓'; if (!$('#ht-addr').value && r.sub) $('#ht-addr').value = r.sub; $('#ht-results').innerHTML = ''; },
  htSave: () => {
    const name = $('#ht-name').value.trim(); if (!name) { toast('צריך שם'); return; }
    const p = sheetCtx.pick || {};
    S.hotel = { name, address: $('#ht-addr').value.trim(), lat: p.lat ?? null, lng: p.lng ?? null };
    S.days.forEach((d) => d.stops.forEach((s) => { if (s.hotelRef) { if (!s.keepName) s.name = name; s.lat = S.hotel.lat; s.lng = S.hotel.lng; } }));
    save(); closeSheet(); render(); toast('המלון נשמר');
  },
  budget: () => { sheet(`<h3>תקציב</h3><label class="lab">תקציב כולל (€)<input class="field" id="bg-v" inputmode="decimal" value="${S.budget}"></label><label class="lab">עמלת כרטיס אשראי (%)<input class="field" id="bg-f" inputmode="decimal" value="${S.cardFee}"></label><button class="btn sun" data-act="budgetSave">שמירה</button>`); },
  budgetSave: () => { S.budget = parseFloat($('#bg-v').value) || S.budget; S.cardFee = parseFloat($('#bg-f').value) || 0; save(); closeSheet(); render(); },
  expAdd: () => {
    const cur = curIdx();
    sheet(`<h3>הוצאה חדשה</h3><label class="lab">על מה<input class="field" id="ex-t" placeholder="למשל: כרטיסים לפארק גואל"></label>
      <div class="grid2"><label class="lab">סכום<input class="field" id="ex-a" inputmode="decimal"></label><label class="lab">מטבע<select class="field" id="ex-c"><option value="EUR">€ אירו</option><option value="ILS">₪ שקל</option></select></label>
      <label class="lab">קטגוריה<select class="field" id="ex-k">${['אוכל', 'אטרקציות', 'תחבורה', 'קניות', 'לינה', 'אחר'].map((c) => `<option>${c}</option>`).join('')}</select></label>
      <label class="lab">יום<select class="field" id="ex-d">${META.map((m, k) => `<option ${k === cur ? 'selected' : ''}>${m.short} ${m.num}.12</option>`).join('')}</select></label></div>
      <button class="btn sun" data-act="expSave">שמירה</button>`);
  },
  expSave: () => { const a = parseFloat(($('#ex-a').value || '').replace(',', '.')); const t = $('#ex-t').value.trim(); if (!t || !a) { toast('צריך תיאור וסכום'); return; } S.expenses.push({ id: uid(), title: t, amount: a, cur: $('#ex-c').value, cat: $('#ex-k').value, day: $('#ex-d').value }); save(); closeSheet(); render(); toast('נוסף'); },
  expDel: (e) => { S.expenses = S.expenses.filter((x) => x.id !== e.dataset.id); save(); render(); },
  pack: (e) => { const it = S.packing[+e.dataset.g].items.find((x) => x.id === e.dataset.id); it.done = !it.done; save(); render(); },
  packDel: (e) => { const g = S.packing[+e.dataset.g]; g.items = g.items.filter((x) => x.id !== e.dataset.id); save(); render(); },
  packAdd: (e) => { const gi = +e.dataset.g; const v = $('#pk-' + gi).value.trim(); if (!v) return; S.packing[gi].items.push({ id: uid(), t: v, done: false }); save(); render(); },
  insSave: () => { S.insurance = { policy: $('#ins-policy').value.trim(), phone: $('#ins-phone').value.trim() }; save(); render(); toast('נשמר'); },
  flSave: () => { ['out', 'back'].forEach((k) => { S.flights[k] = { no: $(`#fl-${k}-no`).value.trim(), term: $(`#fl-${k}-term`).value.trim(), date: $(`#fl-${k}-date`).value, time: $(`#fl-${k}-time`).value }; }); save(); render(); toast('נשמר'); }
};
function daySheet(cb) {
  sheet(`<h3>לאיזה יום?</h3><div style="display:flex;flex-direction:column;gap:8px">${META.map((m, k) => `<button class="btn" style="background:${m.color};color:#fff;justify-content:flex-start" data-act="daySheetPick" data-i="${k}">${m.short} ${m.num}.12 · ${esc(m.title)}</button>`).join('')}</div><button class="btn soft" data-act="closeSheet">ביטול</button>`);
  sheetCtx = { kind: 'day', cb };
}
A.daySheetPick = (e) => { const cb = sheetCtx.cb; closeSheet(); cb(+e.dataset.i); };

document.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-act]'); if (!el) return;
  const fn = A[el.dataset.act]; if (!fn) return; ev.preventDefault(); fn(el);
});
document.addEventListener('toggle', async (ev) => {
  const d = ev.target; if (!d.open || d.dataset.tr == null) return;
  const w = Object.values(articles).find((x) => x && x.sections && d.closest('.story') && x.lang === 'en' && x.sections[+d.dataset.tr] && (x.sections[+d.dataset.tr].titleHe || x.sections[+d.dataset.tr].title) === d.querySelector('summary').textContent);
  if (!w) return; const sec = w.sections[+d.dataset.tr]; if (sec.bodyHe) return;
  try { sec.bodyHe = await Enrich.translate(cut(sec.body, 1500)); try { localStorage.setItem(`bcn.wk:en:${w.title}`, JSON.stringify(w)); } catch (e) { /* full */ } }
  catch (err) { sec.bodyHe = ''; d.querySelector('div').innerHTML = paras(sec.body) + '<p class="muted">התרגום לא זמין כרגע, מוצג באנגלית.</p>'; return; }
  d.querySelector('div').innerHTML = paras(sec.bodyHe);
}, true);
document.addEventListener('input', (ev) => {
  if (ev.target.id === 'conv') { convEur = ev.target.value.replace(',', '.'); const pos = ev.target.selectionStart; render(); const n = $('#conv'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (e) {} } }
});

/* ---------- shared links (share target + paste) ---------- */
function addShared(text, title) {
  const m = (text || '').match(/https?:\/\/\S+/); if (!m) { toast('לא מצאתי קישור. צריך קישור שמתחיל ב־https://'); return false; }
  const url = m[0]; const k = srcKind(url);
  let name = (title || text.replace(url, '')).trim().replace(/\s+/g, ' ').slice(0, 80);
  if (!name) name = k === 'ig' ? 'פוסט מאינסטגרם' : k === 'tt' ? 'סרטון מטיקטוק' : k === 'pin' ? 'מקום מ־Google Maps' : 'קישור חדש';
  const x = { id: uid(), url, title: name, fav: false }; S.saved.unshift(x); save(); savedTab = 'inbox';
  if (location.hash !== '#saved') location.hash = '#saved'; else render();
  toast('נוסף לשמורים · מזהה את המקום…');
  identify(x, [title, text].filter(Boolean).join('\n'));
  return true;
}
(function handleShare() {
  const p = new URLSearchParams(location.search);
  if (p.has('url') || p.has('text')) {
    const text = [p.get('url'), p.get('text')].filter(Boolean).join(' ');
    history.replaceState(null, '', location.pathname + '#saved');
    setTimeout(() => addShared(text, p.get('title') || ''), 50);
  }
})();

render();
setTimeout(enrichAllSlowly, 2500);
loadWeather();
loadRate();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').then((r) => r.update()).catch(() => {});
})();
