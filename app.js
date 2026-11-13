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
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  book: '<path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M8 8h6M8 12h6"/>',
  party: '<path d="M4 20l5-14 9 9z"/><path d="M14 4l1 2M19 9l2-1M17 3l-1 3"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10h6M7 14h10"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>', check: '<path d="M5 12l5 5 9-10"/>', x: '<path d="M6 6l12 12M18 6L6 18"/>',
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
  if (!S.wish) S.wish = [];
  if (!S.journal) S.journal = [];
  if (!S.gems) S.gems = {};
  // The hotel is no longer a stop: every day starts and ends there on its own
  if (!S.hotelImplicit) { S.days.forEach((d) => { d.stops = d.stops.filter((s) => !s.hotelRef); }); S.hotelImplicit = 1; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* full */ } }
  if (!S.dayStart) S.dayStart = {};
  if (!S.diet) S.diet = { celiac: true, vegan: true, lang: 'es' };
})();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('לא הצלחתי לשמור במכשיר'); } };
const META = T.days;
const VERSION = '26 · 13.11';

/* ---------- helpers ---------- */
let toastT;
let undoFn = null;
function toast(m, undo) {
  const el = $('#toast'); undoFn = undo || null;
  el.innerHTML = `<span>${esc(m)}</span>${undo ? '<button data-act="undo">ביטול</button>' : ''}`;
  el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => { el.classList.remove('show'); undoFn = null; }, undo ? 5000 : 2400);
}
const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const haptic = (ms) => { try { if (navigator.vibrate && !reduced()) navigator.vibrate(ms || 10); } catch (e) { /* not supported */ } };
// Bottom sheets: slide up, drag down to close
function sheet(html) {
  const host = $('#sheet'); const again = !!host.firstChild;
  host.innerHTML = `<div class="sheet-bg ${again ? 'still' : ''}" data-act="closeSheet"></div><div class="sheet-body ${again ? 'still' : ''}" role="dialog" aria-modal="true"><div class="grab" aria-hidden="true"></div>${html}</div>`;
  dragToClose(host.querySelector('.sheet-body'), host.querySelector('.sheet-bg'));
}
function closeSheet() {
  const host = $('#sheet'); if (!host.firstChild) return;
  const ghost = document.createElement('div'); ghost.className = 'sheet-ghost';
  while (host.firstChild) ghost.appendChild(host.firstChild);
  document.body.appendChild(ghost);
  const body = ghost.querySelector('.sheet-body'), bg = ghost.querySelector('.sheet-bg');
  if (reduced()) { ghost.remove(); return; }
  requestAnimationFrame(() => { body.style.transition = 'transform .22s cubic-bezier(.4,0,1,1)'; body.style.transform = 'translateY(105%)'; bg.style.transition = 'opacity .22s'; bg.style.opacity = '0'; });
  setTimeout(() => ghost.remove(), 260);
}
function dragToClose(body, bg) {
  let y0 = null, dy = 0, t0 = 0;
  body.addEventListener('touchstart', (e) => { if (body.scrollTop > 0 || e.target.closest('input,textarea,select')) { y0 = null; return; } y0 = e.touches[0].clientY; dy = 0; t0 = Date.now(); body.style.transition = 'none'; }, { passive: true });
  body.addEventListener('touchmove', (e) => { if (y0 == null) return; dy = Math.max(0, e.touches[0].clientY - y0); if (dy > 0) { body.style.transform = `translateY(${dy}px)`; bg.style.opacity = String(Math.max(0.2, 1 - dy / 400)); } }, { passive: true });
  body.addEventListener('touchend', () => { if (y0 == null) return; const v = dy / Math.max(1, Date.now() - t0); y0 = null; if (dy > 110 || (dy > 30 && v > 0.6)) { closeSheet(); return; } body.style.transition = 'transform .3s cubic-bezier(.2,.9,.3,1.15)'; body.style.transform = ''; bg.style.opacity = ''; });
}
// Loading placeholders
const skel = (n) => `<div class="list">${Array.from({ length: n || 4 }, () => '<div class="li"><span class="sk sk-tile"></span><div class="grow"><span class="sk sk-l"></span><span class="sk sk-s"></span></div></div>').join('')}</div>`;
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

/* ---------- time plan ---------- */
const toMin = (t) => { const m = String(t || '').match(/^(\d{1,2}):(\d{2})/); return m ? +m[1] * 60 + +m[2] : null; };
const fmtT = (m) => `${String(Math.floor((((m % 1440) + 1440) % 1440) / 60)).padStart(2, '0')}:${String(((m % 60) + 60) % 60).padStart(2, '0')}`;
const DUR = { museum: 90, gaudi: 90, church: 60, park: 75, view: 45, food: 60, bar: 75, market: 45, shop: 60, show: 90, walk: 90, port: 60, hotel: 0, star: 60 };
const durOf = (s) => (s.dur != null ? s.dur : s.hotelRef ? 0 : DUR[s.kind] ?? 60);
function rawHours(s) { const r = s.rule && T.rules[s.rule]; if (r && r.raw) return r.raw; return (s.details && s.details.hoursRaw) || ''; }
const atCity = (date, min) => new Date(`${date}T${fmtT(min)}:00+01:00`);
// Walk through the day: travel by the chosen mode, wait for fixed entry times, check opening hours at arrival.
// Every day starts and ends at the hotel (when its location is known)
const hotelPt = () => (S.hotel && S.hotel.lat != null ? { id: 'hotel', kind: 'hotel', name: S.hotel.name || 'המלון', lat: S.hotel.lat, lng: S.hotel.lng } : null);
function hotelLeg(a, b) { const L = legInfo(a, b); const mode = L.rec; return { mode, min: (mode === 'walk' ? L.walk : L.transit) || 0 }; }
function schedule(di) {
  const day = S.days[di]; const date = META[di].date; const start = toMin(S.dayStart[di]) ?? 570; let t = start; const out = [];
  const H = hotelPt(); const geo = day.stops.filter(hasGeo);
  out.start = start; out.out = H && geo.length ? hotelLeg(H, day.stops.find(hasGeo)) : null;
  day.stops.forEach((s, si) => {
    let travel = 0;
    if (si === 0 && out.out && hasGeo(s)) { travel = out.out.min; t += travel; }
    if (si > 0) { const pv = day.stops[si - 1]; const L = legInfo(pv, s); const mode = S.legs[pv.id + '>' + s.id] || L.rec; travel = (mode === 'walk' ? L.walk : L.transit) || 15; t += travel; }
    let arrive = t, wait = 0, late = 0; const fx = toMin(s.time);
    if (fx != null) { if (arrive < fx) { wait = fx - arrive; arrive = fx; } else if (arrive > fx) late = arrive - fx; }
    const dur = durOf(s); const leave = arrive + dur; let closed = '';
    const raw = rawHours(s);
    if (raw && window.Enrich && dur > 0) {
      const a = Enrich.openAt(raw, atCity(date, arrive)); const b = Enrich.openAt(raw, atCity(date, leave - 5));
      if (a === false) closed = 'לפי שעות הפתיחה, המקום סגור בשעה שתגיע'; else if (b === false) closed = 'המקום ייסגר לפני שתסיים. אפשר להגיע מוקדם יותר או לקצר';
    }
    out.push({ s, arrive, leave, wait, late, closed, travel });
    t = leave;
  });
  if (H && geo.length) { const b = hotelLeg(geo[geo.length - 1], H); out.back = { ...b, arrive: t + b.min }; }
  return out;
}
function bookingFor(s) { const n = normName(s.name) + ' ' + (s.story || ''); return T.booking.find((b) => b.keys.some((k) => n.includes(normName(k)))); }
const needsBooking = (s) => !!bookingFor(s) && !(s.booking && s.booking.booked);
const evOn = (date) => T.events.filter((e) => e.from <= date && date <= e.to);
const evRec = (e) => reg({ id: 'ev' + e.id, name: e.name, nameHe: e.he, lat: e.lat, lng: e.lng, kind: e.kind, note: e.he, what: '', details: { at: Date.now(), hoursRaw: e.raw || '', hours: { text: e.hours, closed: [] }, photos: null } });

/* ---------- files on the phone (tickets, journal photos): IndexedDB, works offline ---------- */
const FILES = (() => {
  let p; const open = () => p || (p = new Promise((res, rej) => { const r = indexedDB.open('bcn-files', 1); r.onupgradeneeded = () => r.result.createObjectStore('f'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }));
  const tx = async (mode, fn) => { const db = await open(); return new Promise((res, rej) => { const t = db.transaction('f', mode); const rq = fn(t.objectStore('f')); t.oncomplete = () => res(rq && rq.result); t.onerror = () => rej(t.error); }); };
  return { put: (k, v) => tx('readwrite', (st) => st.put(v, k)), get: (k) => tx('readonly', (st) => st.get(k)), del: (k) => tx('readwrite', (st) => st.delete(k)) };
})();
const fileUrls = {};
async function shrink(file, max) {
  if (!/^image\//.test(file.type)) return file;
  try {
    const bmp = await createImageBitmap(file); const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k); c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise((res) => c.toBlob((b) => res(b || file), 'image/jpeg', 0.82));
  } catch (e) { return file; }
}
async function storeFiles(list, max) { const ids = []; for (const f of list) { const id = 'f' + uid(); const b = await shrink(f, max || 1600); await FILES.put(id, b); ids.push({ id, type: b.type || f.type, name: f.name }); } return ids; }
async function fileURL(id) { if (fileUrls[id]) return fileUrls[id]; const b = await FILES.get(id); if (!b) return null; fileUrls[id] = URL.createObjectURL(b); return fileUrls[id]; }
function hydrateFiles() { document.querySelectorAll('[data-file]').forEach(async (el) => { const u = await fileURL(el.dataset.file); if (!u) return; if (el.tagName === 'IMG') el.src = u; else el.href = u; }); }

/* ---------- remote data ---------- */
let weather = null, rate = null, climate = null;
// Real forecast: opens 16 days before the trip. Until then: the average of the last 10 years for the same dates.
async function loadWeather() {
  try {
    const cached = JSON.parse(sessionStorage.getItem('bcn.w2') || 'null');
    if (cached) { weather = cached; } else {
      const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.17&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,wind_speed_10m_max,sunrise,sunset&hourly=temperature_2m,precipitation_probability,weather_code&timezone=Europe%2FMadrid&start_date=2026-12-13&end_date=2026-12-17');
      if (r.ok) {
        const j = await r.json();
        if (j.daily) {
          weather = {}; const D = j.daily; const tm = (x) => (x || '').slice(11, 16);
          D.time.forEach((d, i) => { weather[d] = { max: Math.round(D.temperature_2m_max[i]), min: Math.round(D.temperature_2m_min[i]), rain: D.precipitation_probability_max[i], code: D.weather_code[i], wind: Math.round(D.wind_speed_10m_max[i]), sunrise: tm(D.sunrise[i]), sunset: tm(D.sunset[i]), hours: [] }; });
          (j.hourly && j.hourly.time || []).forEach((t, i) => { const w = weather[t.slice(0, 10)]; const h = +t.slice(11, 13); if (w && h >= 8 && h <= 22 && h % 2 === 0) w.hours.push({ h, t: Math.round(j.hourly.temperature_2m[i]), p: j.hourly.precipitation_probability[i], c: j.hourly.weather_code[i] }); });
          sessionStorage.setItem('bcn.w2', JSON.stringify(weather)); render();
        }
      }
    }
  } catch (e) { /* forecast not available yet */ }
  loadClimate();
}
async function loadClimate() {
  try { const c = JSON.parse(localStorage.getItem('bcn.clim') || 'null'); if (c) { climate = c; return; } } catch (e) { /* ignore */ }
  try {
    const r = await fetch('https://archive-api.open-meteo.com/v1/archive?latitude=41.39&longitude=2.17&start_date=2015-12-13&end_date=2025-12-17&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&timezone=Europe%2FMadrid');
    const j = await r.json(); if (!j.daily) return; const D = j.daily; const by = {};
    D.time.forEach((t, i) => { const md = t.slice(5); if (md < '12-13' || md > '12-17' || D.temperature_2m_max[i] == null) return; (by[md] = by[md] || []).push(i); });
    const avg = (ix, a) => ix.reduce((s2, i) => s2 + a[i], 0) / ix.length;
    climate = {}; Object.entries(by).forEach(([md, ix]) => { const last = ix[ix.length - 1]; climate[md] = { max: Math.round(avg(ix, D.temperature_2m_max)), min: Math.round(avg(ix, D.temperature_2m_min)), rainy: Math.round(100 * ix.filter((i) => D.precipitation_sum[i] >= 1).length / ix.length), years: ix.length, sunrise: (D.sunrise[last] || '').slice(11, 16), sunset: (D.sunset[last] || '').slice(11, 16) }; });
    localStorage.setItem('bcn.clim', JSON.stringify(climate)); render();
  } catch (e) { /* offline */ }
}
const WMO = (c) => c == null ? ['', ''] : c === 0 ? ['☀️', 'בהיר'] : c <= 2 ? ['🌤️', 'מעונן חלקית'] : c === 3 ? ['☁️', 'מעונן'] : c <= 48 ? ['🌫️', 'ערפל'] : c <= 57 ? ['🌦️', 'טפטוף'] : c <= 67 ? ['🌧️', 'גשם'] : c <= 77 ? ['❄️', 'שלג'] : c <= 82 ? ['🌦️', 'ממטרים'] : ['⛈️', 'סופת רעמים'];
const climOf = (date) => climate && climate[date.slice(5)];
function wear(max, min, rain) {
  const t = [];
  if (min <= 7) t.push('מעיל חם, צעיף וכובע לערב'); else if (min <= 11) t.push('מעיל קל ושכבות, בערב מתקרר'); else t.push('ז׳קט קל או סווטשירט');
  if (max >= 17) t.push('בצהריים נעים, אפשר להוריד שכבה');
  if (rain >= 40) t.push('מטרייה קטנה ונעליים שלא נרטבות');
  t.push('נעלי הליכה נוחות: הולכים הרבה');
  return t;
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
  if (s.wikiFixed) return s.wikiFixed;
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
    if (stop.wikiFixed) d.wiki = stop.wikiFixed;
    if (!d.hoursRaw && stop.details && stop.details.hoursRaw) { d.hoursRaw = stop.details.hoursRaw; d.hours = stop.details.hours; }
    stop.details = d; if (REC[stop.id]) saveRecs(); if (d.osm && !stop.osm) stop.osm = d.osm;
    if ((!stop.kind || stop.kind === 'star') && d.kind) stop.kind = d.kind;
    save();
    const h = location.hash;
    syncLinked(stop);
    if (h.startsWith('#place/') || h === '#today' || h === '' || h === '#places' || h === '#saved' || h === '#discover') render(); else if (h === '#map') drawMarkers(false);
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
  if (opts.bare) return `<svg class="tiles" viewBox="0 0 390 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g stroke="#F6F8FC" stroke-width="3" stroke-linejoin="round">${heroTiles(false)}</g></svg>`;
  const tiles = heroTiles(small);
  if (opts.day) return `<div class="dayhero ${opts.img ? 'has-photo' : ''}"><div class="dh-mos"></div>${opts.img ? `<div class="dh-photo"><img class="hero-img" src="${esc(opts.img)}" alt=""></div>` : ''}${opts.chips || ''}</div>`;
  const h = small ? 104 : 200;
  return heroWrap(small, h, tiles, opts);
}
function heroTiles(small) {
  return small
    ? '<path class="tile-anim" d="M0 0h60l-8 46-52 6z" fill="#2453C9"/><path d="M60 0h56l4 42-68 4z" fill="#F2A900"/><path class="tile-anim d2" d="M116 0h62l-12 48-46-6z" fill="#fff"/><path d="M178 0h56l6 44-74 4z" fill="#1E9E8F"/><path class="tile-anim d3" d="M234 0h58l-8 40-50 4z" fill="#E8553D"/><path d="M292 0h54l8 46-70-6z" fill="#2453C9"/><path class="tile-anim" d="M346 0h44v52l-36-6z" fill="#C2417F"/><path d="M0 52l52-6 14 58H0z" fill="#E8553D"/><path class="tile-anim d2" d="M52 46l68-4-6 62-48 0z" fill="#13213D"/><path d="M120 42l46 6 20 56-72 0z" fill="#F2A900"/><path class="tile-anim d3" d="M166 48l74-4 2 60-56 0z" fill="#2453C9"/><path d="M240 44l44-4 14 64-56 0z" fill="#fff"/><path class="tile-anim" d="M284 40l70 6-4 58-52 0z" fill="#1E9E8F"/><path d="M354 46l36 6v52h-40z" fill="#F2A900"/>'
    : '<path class="tile-anim" d="M0 0h58l-10 44-48 8z" fill="#2453C9"/><path class="tile-anim d2" d="M58 0h52l6 38-68 6z" fill="#F2A900"/><path d="M110 0h60l-14 46-40-8z" fill="#fff"/><path class="tile-anim d3" d="M170 0h54l4 42-72 4z" fill="#1E9E8F"/><path d="M224 0h58l-8 36-46 6z" fill="#E8553D"/><path class="tile-anim" d="M282 0h56l10 44-74-8z" fill="#2453C9"/><path d="M338 0h52v50l-42-6z" fill="#F2A900"/><path d="M0 52l48-8 12 50-60 6z" fill="#E8553D"/><path class="tile-anim d3" d="M48 44l68-6-4 52-52 4z" fill="#13213D"/><path d="M116 38l40 8 22 44-66 0z" fill="#2453C9"/><path class="tile-anim" d="M156 46l72-4 0 50-50-2z" fill="#F2A900"/><path d="M228 42l46-6 14 52-60 4z" fill="#fff"/><path class="tile-anim d2" d="M274 36l74 8-6 46-54-2z" fill="#1E9E8F"/><path d="M348 44l42 6v44l-48-4z" fill="#C2417F"/><path d="M0 100l60-6 8 56-68 4z" fill="#1E9E8F"/><path d="M60 94l52-4 10 58-54 2z" fill="#F2A900"/><path class="tile-anim d2" d="M112 90h66l-6 60-50-2z" fill="#C2417F"/><path d="M178 90l50 2 8 56-64 2z" fill="#2453C9"/><path class="tile-anim d3" d="M228 92l60-4-4 60-48 0z" fill="#E8553D"/><path d="M288 88l54 2 4 58-62 0z" fill="#F2A900"/><path class="tile-anim" d="M342 90l48 4v56l-44-2z" fill="#2453C9"/><path d="M0 154l68-4 2 60H0z" fill="#2453C9"/><path d="M68 150l54-2-4 62-48 0z" fill="#fff"/><path d="M122 148l50 2 10 60-64 0z" fill="#1E9E8F"/><path d="M172 150l64-2-6 62-48 0z" fill="#F2A900"/><path d="M236 148h48l8 62-62 0z" fill="#13213D"/><path d="M284 148l62 0-2 62h-52z" fill="#E8553D"/><path d="M346 148l44 2v60h-46z" fill="#1E9E8F"/>';
}
(function mosaicBg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 200"><rect width="390" height="200" fill="#fff"/><g stroke="#fff" stroke-width="5" stroke-linejoin="round">${heroTiles(false).replace(/ class="[^"]*"/g, '')}</g></svg>`;
  document.documentElement.style.setProperty('--mosaic', `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
})();
function heroWrap(small, h, tiles, opts) {
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
const MOSAIC = ['#2453C9', '#F2A900', '#E8553D', '#1E9E8F', '#C2417F', '#13213D', '#F2A900', '#2453C9', '#E8553D', '#1E9E8F', '#C2417F', '#F2A900'];
const mosaicStrip = () => `<svg class="mstrip" viewBox="0 0 120 8" preserveAspectRatio="none" aria-hidden="true">${MOSAIC.map((c, k) => `<path d="M${k * 10 + (k % 2 ? 1 : 0)} 0h9l-1 8h-9z" fill="${c}"/>`).join('')}</svg>`;
const backBtn = (back) => `<a class="ph-back" href="${back}" data-act="goBack" data-href="${back}" aria-label="חזרה">${ic('back')}</a>`;
// Page header: large title that collapses into a slim bar when scrolling
const pageHead = (title, sub, back) => `<div class="topbar" aria-hidden="true">${back ? backBtn(back) : ''}<b>${esc(title)}</b></div>
  <header class="ph"><div class="ph-mos" aria-hidden="true"></div>${back ? backBtn(back) : ''}<span class="eyebrow">${esc(sub)}</span><h1>${esc(title)}</h1></header>`;
// Detail header: full-width photo (or mosaic), title on top of it
function detailHead(title, sub, back, img) {
  return `<div class="topbar" aria-hidden="true">${backBtn(back)}<b>${esc(title)}</b></div>
  <div class="dhero ${img ? '' : 'noimg'}">${img ? `<img class="dh-img" src="${esc(img)}" alt="" data-act="lightbox" data-i="0">` : '<div class="dh-mosaic"></div>'}<div class="dh-shade"></div>
    ${backBtn(back)}<div class="dh-text"><span class="eyebrow">${esc(sub)}</span><h1>${esc(title)}</h1></div></div>`;
}
const actbar = (btns) => `<div class="actbar">${btns}</div>`;
const wx = (date) => weather && weather[date] ? `${WMO(weather[date].code)[0]} ${weather[date].max}°/${weather[date].min}° · ${weather[date].rain}% גשם` : climOf(date) ? `ממוצע: ${climOf(date).max}°/${climOf(date).min}°` : null;

/* ---------- recommendations: one registry so every suggestion opens the same place page ---------- */
let REC = {}; try { REC = JSON.parse(sessionStorage.getItem('bcn.recs') || '{}'); } catch (e) { REC = {}; }
function saveRecs() { try { sessionStorage.setItem('bcn.recs', JSON.stringify(REC)); } catch (e) { /* full */ } }
const reg = (o) => { REC[o.id] = Object.assign(REC[o.id] || {}, o); return REC[o.id]; };
const WHAT = { clothes: 'בגדים', shoes: 'נעליים', department_store: 'כלבו', fashion_accessories: 'אקססוריז', restaurant: 'מסעדה', cafe: 'בית קפה', fast_food: 'אוכל מהיר', ice_cream: 'גלידה', bar: 'בר', pub: 'פאב', biergarten: 'גן בירה', attraction: 'אטרקציה', museum: 'מוזיאון', viewpoint: 'תצפית', gallery: 'גלריה', monument: 'אנדרטה', castle: 'מבצר', church: 'כנסייה', palace: 'ארמון', archaeological_site: 'אתר ארכאולוגי', park: 'פארק', garden: 'גן', marketplace: 'שוק' };
const whatHe = (r) => WHAT[r.what] || (r.lang ? 'ערך בוויקיפדיה' : '') || r.note || '';
const allStops = () => S.days.flatMap((d, di) => d.stops.map((st) => ({ st, di })));
function sameSpot(a, b) {
  if (a.osm && b.osm && a.osm.id === b.osm.id) return true;
  if (!hasGeo(a) || !hasGeo(b)) return false;
  const na = normName(a.name), nb = normName(b.name);
  return km(a, b) < 0.06 && (na.includes(nb) || nb.includes(na) || km(a, b) < 0.015);
}
const inRoute = (r) => allStops().find((o) => !o.st.hotelRef && sameSpot(o.st, r));
const inSaved = (r) => S.saved.find((x) => hasGeo(x) && sameSpot({ ...x, name: x.name || x.title }, r));
function openState(r) { const raw = (r.details && r.details.hoursRaw) || ''; return raw && window.Enrich ? Enrich.openAt(raw) : null; }
const openBadge = (o) => (o === true ? '<span class="badge" style="color:var(--teal)">פתוח עכשיו</span>' : o === false ? '<span class="badge" style="color:var(--red)">סגור עכשיו</span>' : '');
function recStop(r) {
  const ns = { id: uid(), kind: r.kind || 'star', name: r.nameHe && !/[a-z]/i.test(r.name) ? r.nameHe : r.name, note: whatHe(r), lat: r.lat, lng: r.lng, osm: r.osm || null };
  if (r.wikiFixed) ns.wikiFixed = r.wikiFixed; if (r.gem) ns.gem = r.gem;
  if (r.details && r.details.photos) ns.details = r.details;
  else if (r.details && r.details.hoursRaw) ns.details = { at: 0, hoursRaw: r.details.hoursRaw, hours: r.details.hours, partial: true };
  return ns;
}
function addRecToDay(r, di) {
  const ns = recStop(r); S.days[di].stops.push(ns); if (r.gem) S.gems[r.gem] = 'yes'; save(); render();
  toast(`נוסף ליום ${META[di].short} · מופיע במסלול, במפה ובניווט`);
  if (!ns.details || !ns.details.photos) enrichStop(ns, true);
}
function saveRec(r) {
  if (inSaved(r)) { toast('כבר בשמורים'); return; }
  const x = { id: uid(), title: r.name, name: r.name, url: gmSearch(r), fav: true, lat: r.lat, lng: r.lng, osm: r.osm || null, kind: r.kind, status: 'found' };
  if (r.wikiFixed) x.wikiFixed = r.wikiFixed; if (r.gem) x.gem = r.gem; if (r.details && r.details.photos) x.details = r.details;
  S.saved.unshift(x); save(); render(); toast('נשמר במועדפים ★'); if (!x.details) enrichStop(x, true);
}
// What you like: kinds you saved or put in the route count a little in the ranking
function taste() { const t = {}; [...S.saved, ...allStops().map((o) => o.st)].forEach((x) => { if (x.kind) t[x.kind] = (t[x.kind] || 0) + 1; }); return t; }
function rankRecs(list, from) {
  const t = taste(); const tot = Object.values(t).reduce((a, b) => a + b, 0) || 1;
  return list.map((r) => {
    const P = from ? areaPts(from) : []; let d = 0, nearP = null;
    if (P.length) { d = Infinity; P.forEach((p) => { const k2 = km(p, r); if (k2 < d) { d = k2; nearP = p; } }); }
    const o = openState(r); const det = r.details || {};
    const score = d - (det.vegan === 'only' ? 0.3 : det.vegan === 'yes' ? 0.15 : 0) - (/^(yes|only)$/.test(det.gf || '') ? 0.2 : 0) - (o === true ? 0.15 : o === false ? -0.4 : 0) - (r.hasWiki || r.lang ? 0.2 : 0) - 0.3 * ((t[r.kind] || 0) / tot);
    return { r, d, o, score: score - (r.verified ? 0.4 : 0) + (r.noDiet ? 0.3 : 0), near: P.length > 1 ? nearP : null };
  }).sort((a, b) => a.score - b.score);
}
// Live results around a point, kept for 30 minutes
const live = {};
const areaPts = (c) => (c.pts ? c.pts : [c]);
function liveKey(cat, c) { return cat + ':' + areaPts(c).map((p) => `${p.lat.toFixed(3)},${p.lng.toFixed(3)}`).join('|'); }
const LIVE_TTL = 12 * 3600e3;
function loadLive(cat, c) {
  const k = liveKey(cat, c); const cur = live[k]; const pts = areaPts(c);
  if (cur && (cur.loading || Date.now() - cur.at < (cur.err ? 60e3 : LIVE_TTL))) return cur;
  try { const ss = JSON.parse(localStorage.getItem('bcn.live:' + k) || 'null'); if (ss && Date.now() - ss.at < LIVE_TTL && ss.items.length) { live[k] = ss; ss.items.forEach(reg); return ss; } } catch (e) { /* ignore */ }
  live[k] = { loading: true, at: Date.now(), items: [] };
  const refresh = () => { if (location.hash === '#map') { drawMarkers(false); renderMapSheet(); } else if (['#discover', '#today', '', '#shopping'].includes(location.hash)) render(); };
  const radius = c.radius || (cat === 'shop' ? 1200 : pts.length > 1 ? 450 : 800);
  // Quick first answer from Photon while OpenStreetMap is still thinking (not for food: Photon has no diet data)
  if (!['eat', 'wiki'].includes(cat)) Enrich.photonNearby(cat, pts, radius).then((items) => { if (live[k] && live[k].loading && items.length) { items.forEach(reg); live[k] = { loading: true, partial: true, at: Date.now(), items }; refresh(); } }).catch(() => {});
  const job = cat === 'wiki'
    ? (async () => { const pick = pts.length <= 3 ? pts : [pts[0], pts[Math.floor(pts.length / 2)], pts[pts.length - 1]]; const got = await Promise.allSettled(pick.map((p) => Enrich.wikiNearby(p.lat, p.lng, pts.length > 1 ? 600 : 1000))); const all = []; got.forEach((g) => { if (g.status === 'fulfilled') g.value.forEach((x) => { if (!all.some((y) => y.id === x.id)) all.push(x); }); }); if (!all.length) throw new Error('none'); return all; })()
    : Enrich.nearby(cat, pts, radius);
  job.then((items) => { items.forEach(reg); saveRecs(); live[k] = { at: Date.now(), items }; try { localStorage.setItem('bcn.live:' + k, JSON.stringify(live[k])); } catch (e) { pruneLive(); } })
    .catch(() => { const prev = live[k]; live[k] = prev && prev.partial ? { at: Date.now(), items: prev.items } : { at: Date.now(), items: [], err: true }; })
    .finally(() => { refresh(); prefetchNext(); });
  return live[k];
}
function pruneLive() { try { Object.keys(localStorage).filter((x) => x.startsWith('bcn.live:')).forEach((x) => { const v = JSON.parse(localStorage.getItem(x) || 'null'); if (!v || Date.now() - v.at > LIVE_TTL) localStorage.removeItem(x); }); } catch (e) { /* ignore */ } }
setTimeout(pruneLive, 5000);
// Load the other categories quietly, one at a time, so switching is instant
const prefetchQ = [];
function prefetchArea(A) { LIVE_CATS.forEach(([cat]) => { const k = liveKey(cat, A); if (!live[k] && !prefetchQ.some((q) => q.k === k)) prefetchQ.push({ k, cat, A }); }); prefetchNext(); }
function prefetchNext() {
  if (Object.values(live).some((v) => v && v.loading)) return;
  const n = prefetchQ.shift(); if (!n) return;
  if (live[n.k]) { prefetchNext(); return; }
  setTimeout(() => loadLive(n.cat, n.A), 400);
}
function recRow(x, n, opts = {}) {
  const r = x.r; const st = inRoute(r); const sv = inSaved(r); const det = r.details || {};
  const tags = [];
  if (x.o === true) tags.push('<span class="tg ok">פתוח עכשיו</span>'); else if (x.o === false) tags.push('<span class="tg no">סגור עכשיו</span>');
  if (det.vegan === 'only') tags.push('<span class="tg ok">טבעוני לגמרי</span>'); else if (det.vegan === 'yes') tags.push('<span class="tg ok">יש טבעוני</span>');
  if (/^(yes|only)$/.test(det.gf || '')) tags.push('<span class="tg ok">ללא גלוטן</span>');
  if (r.verified) tags.push('<span class="tg ok">מהרשימה שבדקנו</span>');
  if (r.noDiet && !r.verified) tags.push('<span class="tg mut">אין מידע על טבעוני</span>');
  if (sv) tags.push('<span class="tg">★ שמור</span>');
  const near = x.near && x.near.name ? `ליד ${esc(cut(x.near.name, 22))} · ` : '';
  return `<div class="li">${r.thumb ? `<img class="thumb" src="${esc(r.thumb)}" alt="" loading="lazy">` : `<span class="tile" style="--c:${opts.color || 'var(--navy)'}">${ic(r.kind)}</span>`}
    <a class="grow li-main" href="#place/r/${r.id}"><div class="li-t">${esc(r.name)}${r.nameHe && r.nameHe !== r.name ? ` <span class="muted">${esc(r.nameHe)}</span>` : ''}</div>
    <div class="li-m">${opts.why ? esc(opts.why) : `${near}${esc(whatHe(r))}${x.d ? ' · ' + fmtKm(x.d) : ''}`}</div>${tags.length ? `<div class="li-tags">${tags.join('')}</div>` : ''}</a>
    ${st ? `<span class="li-done">✓ ${META[st.di].short}</span>` : `<button class="add" data-act="recAdd" data-id="${r.id}" ${opts.day != null ? `data-d="${opts.day}"` : ''} aria-label="הוסף למסלול">${ic('plus')}</button>`}</div>`;
}
const recList = (rows) => `<div class="list">${rows.join('')}</div>`;

// The food rule: show only fully vegan places with gluten-free options.
const isVeganGF = (r) => { const d = r.details || {}; const v = r.vegan || d.vegan; const g = r.gf || d.gf; return (v === 'only' || /vegan/.test(d.cuisine || '')) && /^(yes|only|limited)$/.test(g || ''); };
const VEG_FOOD = () => T.discover.food.filter(isVeganGF);
// A food stop in the plan that is known not to be fully vegan
function notVeganStop(s) {
  if (s.kind !== 'food') return false;
  if (VEG_FOOD().some((f) => normName(s.name).includes(normName(f.name.split(' (')[0])))) return false;
  if (T.discover.notVegan.some((n) => normName(s.name).includes(normName(n)))) return true;
  const d = s.details || {}; return !!d.vegan && d.vegan !== 'only' && !/vegan/.test(d.cuisine || '');
}
function veganSwap(s) { return hasGeo(s) ? nearest(VEG_FOOD(), s, 1)[0] || null : null; }

/* ---------- views ---------- */
const V = {};

V.today = () => {
  const i = curIdx(); const m = META[i]; const day = S.days[i]; setDayColor(i);
  const dtf = daysToFlight();
  const chips = `<div class="chips"><span class="chip">${dtf > 0 ? `עוד ${dtf} ימים לטיסה` : dtf > -5 ? `יום ${1 - dtf} מתוך 5` : 'הטיול הסתיים'}</span><span class="chip dark">${wx(m.date) || 'ממוצע בדצמבר: 9°–15°'}</span></div>`;
  // short alerts, one line each
  const alerts = [];
  day.stops.forEach((s) => {
    const cn = closedNote(s, m.date); if (cn) { const to = suggestDay(s, i); alerts.push(`<div class="alert">${ic('warn')}<span class="grow"><b>${esc(s.name)}</b> · ${cn}</span>${to != null ? `<button class="mini" data-act="moveTo" data-d="${i}" data-id="${s.id}" data-to="${to}">להעביר ל־${META[to].short}</button>` : ''}</div>`); }
    const inf = infoNote(s, m.date); if (inf) alerts.push(`<div class="alert info">${ic('warn')}<span><b>${esc(s.name)}</b> · ${inf}</span></div>`);
  });
  if (i === 4 && S.flights.back.time) alerts.push(`<div class="alert">${ic('plane')}<span>טיסה ב־${esc(S.flights.back.time)} · לצאת מהמלון עד <b>${leaveBy()}</b></span></div>`);
  if (weather && weather[m.date] && weather[m.date].rain >= 60 && day.stops.some((s) => ['park', 'view'].includes(s.kind))) alerts.push(`<div class="alert">${ic('warn')}<span>צפוי גשם (${weather[m.date].rain}%) וביום הזה יש מקומות בחוץ</span></div>`);
  day.stops.forEach((s) => { if (!notVeganStop(s)) return; const w = veganSwap(s); alerts.push(`<div class="alert info">${ic('food')}<span class="grow"><b>${esc(s.name)}</b> לא מסעדה טבעונית${w ? ` · חלופה טבעונית וללא גלוטן: <b>${esc(w.name)}</b> (${fmtKm(w.dist)})` : ''}</span>${w ? `<button class="mini" data-act="veganSwap" data-d="${i}" data-id="${s.id}">להחליף</button>` : ''}</div>`); });
  const needB = day.stops.filter(needsBooking);
  if (needB.length) alerts.push(`<a class="alert" href="#tickets">${ic('ticket')}<span class="grow">להזמין מראש: ${needB.map((x) => esc(x.name)).join(', ')}</span><span class="mini">לכרטיסים</span></a>`);
  const idea = ideasData(i);
  const ideasBar = idea.recs.length || idea.evs.length || idea.gems.length ? `<button class="ideas" data-act="ideas" data-d="${i}"><span class="tile" style="--c:#2453C9">${ic('star')}</span><span class="grow"><b>רעיונות להיום</b><span class="muted">${[idea.gems.length ? `💎 ${idea.gems.length} פנינים` : '', idea.evs.length ? `${idea.evs.length} אירועים` : '', idea.recs.length ? `${idea.recs.length} המלצות לפי השעה` : ''].filter(Boolean).join(' · ')}</span></span><span class="chev">›</span></button>` : '';
  const nx = day.stops[0]; const plan = schedule(i);
  let list = '';
  day.stops.forEach((s, si) => {
    const cn = closedNote(s, m.date); const P = plan[si];
    const tl = `<div class="tl"><span dir="ltr">${fmtT(P.arrive)}${P.leave > P.arrive ? '–' + fmtT(P.leave) : ''}</span>${s.time ? `<span class="tk">${ic('ticket')}${esc(s.time)}</span>` : ''}${needsBooking(s) ? '<span class="tk warnc">להזמין</span>' : ''}${s.visited ? '<span class="tk okc">✓</span>' : ''}</div>`;
    const note = P.late ? `תגיע ${P.late} דק׳ אחרי שעת הכניסה` : P.closed ? P.closed : cn ? cn : '';
    list += `<div class="tstop ${cn || P.closed || P.late ? 'closed' : ''}" data-pid="${s.id}">
      <div class="tn"><span class="tnum">${si + 1}</span></div>
      <div class="tc"><span class="tkind tk-lg">${ic(s.kind)}</span><a href="#place/${i}/${s.id}" class="tc-a"><div class="ttime" dir="ltr">${fmtT(P.arrive)}${P.leave > P.arrive ? `–${fmtT(P.leave)}` : ''}</div><div class="t">${esc(s.name)}</div>${s.note ? `<div class="muted">${esc(s.note)}</div>` : ''}
        <div class="tl">${s.time ? `<span class="tk">${ic('ticket')}${esc(s.time)}</span>` : ''}${needsBooking(s) ? '<span class="tk warnc">להזמין</span>' : ''}${s.visited ? '<span class="tk okc">✓ ביקרתי</span>' : ''}</div>
        ${note ? `<div class="hours-tag">${note}</div>` : ''}${P.wait >= 20 ? `<div class="muted">${P.wait} דק׳ פנויות לפני · <span class="lnk" data-act="liveFrom" data-d="${i}" data-id="${(day.stops[si - 1] || s).id}">מה יש בסביבה</span></div>` : ''}</a>
      ${s.hotelRef && !(S.hotel && S.hotel.name) ? `<button class="mini solid" data-act="hotelEdit">הוסף מלון</button>` : `<a class="icon-btn" href="${gmDir(null, s, 'walking')}" target="_blank" rel="noopener" aria-label="נווט ב־Google Maps">${ic('pin')}</a>`}</div></div>`;
    const n = day.stops[si + 1]; if (!n) return;
    const L = legInfo(s, n); const key = s.id + '>' + n.id; const mode = S.legs[key] || L.rec;
    list += `<div class="tleg"><div class="tn"></div><div class="tlegc"><button class="lg ${mode === 'walk' ? 'on' : ''}" data-act="leg" data-k="${key}" data-m="walk">${ic('walk')}${L.walk ? `${L.walk} דק׳` : 'ברגל'}</button><button class="lg ${mode === 'transit' ? 'on' : ''}" data-act="leg" data-k="${key}" data-m="transit">${ic('metro')}${L.transit ? `≈${L.transit} דק׳` : 'תחבורה'}</button><a class="lg-go" href="${gmDir(s, n, mode === 'walk' ? 'walking' : 'transit')}" target="_blank" rel="noopener">ניווט ›</a></div></div>`;
  });
  const H = hotelPt(); const dayUrl = 'https://www.google.com/maps/dir/' + (H ? [H, ...day.stops, H] : day.stops).map((s) => q(s)).join('/');
  const hName = esc((S.hotel && S.hotel.name) || 'המלון'); const mWord = (o) => (o.mode === 'walk' ? `${o.min} דק׳ ברגל` : `כ־${o.min} דק׳ בתחבורה`);
  const hStart = `<div class="thotel">${ic('hotel')}<span>${i === 0 ? 'צ׳ק־אין ב' : 'יוצאים מ'}${hName}${plan.out ? ` · ${mWord(plan.out)} לתחנה הראשונה` : ''}</span>${!H ? '<button class="lnk" data-act="hotelEdit">הוסף כתובת מלון</button>' : ''}</div>`;
  const hEnd = day.stops.length ? `<div class="thotel">${ic('hotel')}<span>${i === 4 ? `חוזרים ל${hName} לאסוף מזוודות${S.flights.back.time ? ` · לצאת לשדה עד <b dir="ltr">${leaveBy()}</b>` : ' ומשם לשדה'}` : `חזרה ל${hName}`}${plan.back ? ` · ${mWord(plan.back)}, בערך <b dir="ltr">${fmtT(plan.back.arrive)}</b>` : ''}</span></div>` : '';
  return hero({ chips, img: dayPhoto(i), day: true }) + `
  <div class="head"><span class="eyebrow">יום ${i + 1} מתוך 5 · ${m.short} ${m.num}.12</span><h1>${esc(m.title)}</h1></div>
  <div class="days" role="tablist" aria-label="ימי הטיול"><span class="dind" style="--x:${lastDay ?? i};--c:${m.color}"></span>${META.map((d, k) => `<button class="dayb ${k === i ? 'on' : ''}" style="--c:${d.color}" role="tab" aria-selected="${k === i}" data-act="day" data-i="${k}"><b>${d.num}</b><span>${d.short}</span>${weather && weather[d.date] ? `<i>${weather[d.date].max}°</i>` : ''}</button>`).join('')}</div>
  ${installEvt && !standalone() ? `<div class="section"><button class="btn navy sm" data-act="install">${ic('plus')}התקן את האפליקציה בטלפון</button></div>` : ''}
  ${nx ? `<div class="next pop"><div class="lbl"><span class="dot"></span>הבא בתור</div><div class="name">${esc(nx.name)}</div>
    <div class="row"><a class="btn sun sm grow" href="${gmDir(null, nx, 'walking')}" target="_blank" rel="noopener">${ic('pin')}נווט</a><a class="btn ghost sm" href="#place/${i}/${nx.id}">על המקום</a></div></div>` : ''}
  <div class="section">
    ${alerts.join('')}
    ${ideasBar}
    <div class="row" style="margin-top:6px"><h2 class="grow">המסלול</h2><button class="chipbtn" data-act="sortDay">${ic('sort')}סדר</button><a class="chipbtn" href="#places">${ic('pen')}עריכה</a><a class="chipbtn" href="${dayUrl}" target="_blank" rel="noopener">${ic('pin')}כל היום</a></div>
    <div class="timebar"><label for="day-start">יוצאים ב־</label><input type="time" id="day-start" value="${fmtT(toMin(S.dayStart[i]) ?? 570)}" data-d="${i}">${plan.length ? `<span class="grow">${plan.back ? 'במלון בערך' : 'סיום משוער'} <b>${fmtT(plan.back ? plan.back.arrive : plan[plan.length - 1].leave)}</b></span>` : ''}</div>
    ${hStart}
    ${list ? `<div class="tline">${list}</div>` : '<div class="card muted">אין עדיין מקומות ביום הזה. לחץ על "+ מקום".</div>'}
    ${hEnd}
    <div style="height:64px"></div>
  </div>
  <button class="fab" data-act="placeAdd" data-d="${i}" aria-label="הוסף מקום">${ic('plus')}מקום</button>`;
};

// Ideas for the day: by the Barcelona clock, the weather, the first stop and what you saved
function ideasData(i) {
  const res = { recs: [], evs: [], gems: [] };
  res.gems = window.GEMS.filter((g) => !S.gems[g.id] && !inRoute({ ...g }) && ((n) => n && n.di === i && n.d < 1.5)(gemNear(g))).sort((a, b) => b.score - a.score);
  if (!window.Enrich) return res;
  const day = S.days[i]; const m = META[i];
  res.evs = evOn(m.date).map((e) => ({ e, d: Math.min(...day.stops.filter(hasGeo).map((st) => km(st, e)).concat([99])) })).filter((o) => o.d < 2 && !inRoute(evRec(o.e))).sort((a, b) => a.d - b.d);
  const anchor = day.stops.find((x) => hasGeo(x) && !x.hotelRef) || day.stops.find(hasGeo); if (!anchor) return res;
  const { min } = cityNowMin();
  const rain = weather && weather[m.date] && weather[m.date].rain >= 60;
  const out = res.recs; const used = new Set();
  const push = (r, why, color) => { if (out.length >= 4 || used.has(r.id) || inRoute(r)) return; used.add(r.id); out.push({ r, why, color }); };
  S.saved.filter((x) => hasGeo(x) && !linkedStop(x)).map((x) => ({ x, d: Math.min(...day.stops.filter(hasGeo).map((st) => km(st, x))) })).filter((o) => o.d < 1.5).sort((a, b) => a.d - b.d).slice(0, 1)
    .forEach(({ x, d }) => push(reg({ id: 'sv' + x.id, name: x.name || x.title, lat: x.lat, lng: x.lng, osm: x.osm, kind: x.kind || 'star', details: x.details, wikiFixed: x.wikiFixed, savedId: x.id }), `שמרת אותו · ${fmtKm(d)} מהמסלול`, '#D99400'));
  const meal = (min >= 720 && min <= 930) || (min >= 1170 && min <= 1350); const evening = min >= 1080 || min < 120;
  const cur = (list, cat) => list.map((d, k) => reg({ id: 'c' + cat + k, ...d, what: '', verified: true }));
  const near = (list) => rankRecs(list.filter(hasGeo), anchor).slice(0, 4);
  const A1 = { pts: [anchor] };
  const liveEat = meal ? loadLive('eat', A1) : live[liveKey('eat', A1)]; const liveDrink = evening ? loadLive('drink', A1) : live[liveKey('drink', A1)];
  if (meal) near([...cur(T.discover.food, 'food').filter(isVeganGF), ...((liveEat && liveEat.items) || []).filter(isVeganGF)]).forEach((x) => push(x.r, `זמן לאכול · ${fmtKm(x.d)} מ${anchor.name}`, '#1E9E8F'));
  if (evening) near([...cur(T.discover.bars, 'bars'), ...((liveDrink && liveDrink.items) || [])]).forEach((x) => push(x.r, `לערב · ${fmtKm(x.d)} מ${anchor.name}`, '#C2417F'));
  if (rain) near(cur(T.discover.tops, 'tops').filter((r) => ['museum', 'church', 'market', 'show'].includes(r.kind))).forEach((x) => push(x.r, 'צפוי גשם · מקום מקורה', '#13213D'));
  near(cur(T.discover.tops, 'tops')).forEach((x) => push(x.r, `מומלץ · ${fmtKm(x.d)} מ${anchor.name}`, '#E8553D'));
  res.anchor = anchor; return res;
}
function cityNowMin() { const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()); const g = (t) => +(f.find((x) => x.type === t) || {}).value; return { min: g('hour') * 60 + g('minute') }; }

// A photo for the day: from the most important place that already has photos
function dayPhoto(i) {
  const st = [...S.days[i].stops].filter((x) => !x.hotelRef).sort((a, b) => (b.story ? 1 : 0) - (a.story ? 1 : 0));
  for (const x of st) { const ph = x.details && x.details.photos; if (ph && ph.length) return ph[0]; }
  return null;
}
let lastDay = null;
function leaveBy() {
  const [h, mm] = (S.flights.back.time || '00:00').split(':').map(Number);
  const t = h * 60 + mm - 180 - 40; const hh = Math.floor(((t % 1440) + 1440) % 1440 / 60), m2 = ((t % 60) + 60) % 60;
  return `${String(hh).padStart(2, '0')}:${String(m2).padStart(2, '0')}`;
}

/* map */
let map, layer;
let mapSheet = 'peek';
V.map = () => { if (mapDay == null) mapDay = curIdx(); return `<div class="mapwrap"><div id="leaflet" aria-label="מפת המסלול"></div>
  <div class="mtop">${mapTopInner()}</div>
  <button class="icon-btn map-loc" data-act="locate" aria-label="המיקום שלי">${ic('locate')}</button>
  <div class="mcard ${mapSel ? 'on' : ''}">${mapCardInner()}</div></div>`; };
// Map layers you can turn on together with the day's route
const MAP_LAYERS = [['gems', '💎 פנינים', '#2453C9'], ['food', 'טבעוני וללא גלוטן', '#1E9E8F'], ['shop', 'אופנה וקניות', '#D99400'], ['recs', 'ברים והמלצות', '#C2417F'], ['saved', 'שמורים', '#8A5CD0']];
let mapLayers = new Set();
const routePts = () => (typeof mapDay === 'number' ? S.days[mapDay].stops.filter((x) => hasGeo(x) && !x.hotelRef) : []);
function layerItems(k) {
  const P = routePts(); const col = MAP_LAYERS.find((l) => l[0] === k)[2];
  const dist = (x) => (P.length ? Math.min(...P.map((p) => km(p, x))) : 0);
  let arr = [];
  if (k === 'gems') arr = allGems().filter((g) => S.gems[g.id] !== 'no').map((g) => ({ id: 'Lg' + g.id, rec: gemRec(g).id, name: g.name, kind: g.kind, lat: g.lat, lng: g.lng, gem: g.id, note: g.score ? `ציון ${g.score.toFixed(1)} · ${g.he || g.area}` : `🌍 Wikivoyage · ${g.area}` }));
  if (k === 'food') arr = T.discover.food.map((d, i) => reg({ id: 'cfood' + i, ...d, what: '', verified: true })).filter((r) => isVeganGF(r) && hasGeo(r)).map((r) => ({ id: 'L' + r.id, rec: r.id, name: r.name, kind: 'food', lat: r.lat, lng: r.lng, note: r.note }));
  if (k === 'recs') arr = [...T.discover.bars.map((d, i) => reg({ id: 'cbars' + i, ...d, what: '' })), ...T.discover.tops.map((d, i) => reg({ id: 'ctops' + i, ...d, what: '' }))].filter(hasGeo).map((r) => ({ id: 'L' + r.id, rec: r.id, name: r.name, kind: r.kind, lat: r.lat, lng: r.lng, note: r.note }));
  if (k === 'saved') arr = S.saved.filter(hasGeo).filter((x) => !linkedStop(x)).map((x) => ({ id: 'Ls' + x.id, saved: x.id, name: x.name || x.title, kind: x.kind || 'star', lat: x.lat, lng: x.lng, note: 'מהשמורים' }));
  if (k === 'shop') {
    if (!P.length || !window.Enrich) return [];
    const res = loadLive('shop', { pts: P, name: '', di: mapDay });
    arr = (res.items || []).filter(hasGeo).map((r) => ({ id: 'L' + r.id, rec: r.id, name: r.name, kind: 'shop', lat: r.lat, lng: r.lng, note: whatHe(r) || 'חנות' }));
    if (res.loading) arr.loading = true;
  }
  const out = arr.filter((x) => !inRoute(x)).map((x) => ({ ...x, layer: k, color: col, d: dist(x) })).sort((p, q) => p.d - q.d).slice(0, k === 'gems' ? 40 : 30);
  out.loading = arr.loading; return out;
}
const overlayItems = () => [...mapLayers].flatMap(layerItems);
const ovHref = (x) => (x.saved ? `#place/s/${x.saved}` : `#place/r/${x.rec}`);
function ovCard(sel) {
  const g = sel.gem && gemById(sel.gem); const L = MAP_LAYERS.find((l) => l[0] === sel.layer);
  return `<div class="ms-sel ov"><div class="row"><span class="tile" style="--c:${sel.color}">${ic(sel.kind)}</span><div class="grow"><b>${esc(sel.name)}</b><div class="muted">${L[1]}${sel.d ? ` · ${fmtKm(sel.d)} מהמסלול` : ''}</div></div>${g && g.score ? `<span class="gem-sc big">${g.score.toFixed(1)}</span>` : ''}<button class="icon-btn" data-act="mapClose" aria-label="סגירה">${ic('x')}</button></div>
    ${g ? `<div class="li-tags">${gemTags(g)}${popDots(g.wiki ? gemPv[g.wiki] : null)}</div><p class="gem-bg sm">${esc(cut(gemBg(g), 170))}</p>${g.go ? `<div class="gem-why"><b>למה ללכת</b>${esc(g.go)}</div>` : ''}${gemFacts(g)}` : sel.note ? `<div class="muted">${esc(cut(sel.note, 120))}</div>` : ''}
    <div class="row"><button class="btn sun sm grow" data-act="mapAddOv" data-id="${sel.id}">${ic('plus')}לשלב ביום ${META[mapDay].short}</button><a class="btn soft sm" href="${ovHref(sel)}">${ic('pin')}פרטים</a><a class="btn soft sm" href="${gmDir(null, sel, 'walking')}" target="_blank" rel="noopener" aria-label="ניווט">${ic('walk')}</a></div>
    ${g ? `<button class="lnk muted" data-act="mapGemNo" data-id="${sel.id}" style="align-self:flex-start">לא בשבילי, להסתיר</button>` : ''}</div>`;
}
let mtOpen = null;
function mapTopInner() {
  const items = mapStops().filter(hasGeo); const m = META[mapDay];
  return `<div class="mt-days">${META.map((d, k) => `<button class="${k === mapDay ? 'on' : ''}" style="--c:${d.color}" data-act="mapDay" data-i="${k}"><b>${d.num}</b><span>${d.short}</span></button>`).join('')}</div>
    <div class="mt-row"><button class="mt-btn ${mtOpen === 'route' ? 'on' : ''}" style="--c:${m.color}" data-act="mtOpen" data-k="route"><span class="dot"></span><span class="grow">המסלול · ${items.length} מקומות</span><span class="chev">${mtOpen === 'route' ? '▴' : '▾'}</span></button>
      <button class="mt-btn ${mtOpen === 'lays' ? 'on' : ''}" data-act="mtOpen" data-k="lays">${ic('list')}<span class="grow">שכבות${mapLayers.size ? ` · ${mapLayers.size}` : ''}</span><span class="chev">${mtOpen === 'lays' ? '▴' : '▾'}</span></button></div>
    ${mapLayers.size && mtOpen !== 'lays' ? `<div class="mt-on">${[...mapLayers].map((k) => { const L = MAP_LAYERS.find((l) => l[0] === k); return `<span style="--c:${L[2]}"><i></i>${L[1]}</span>`; }).join('')}</div>` : ''}
    ${mtOpen === 'lays' ? `<div class="mt-panel"><div class="ms-lays">${MAP_LAYERS.map(([k, t, c]) => { const n = mapLayers.has(k) ? layerItems(k) : null; return `<button class="pill ${mapLayers.has(k) ? 'on' : ''}" style="--c:${c}" data-act="mapLayer" data-k="${k}" aria-pressed="${mapLayers.has(k)}">${mapLayers.has(k) ? '✓ ' : ''}${t}${n ? (n.loading && !n.length ? ' · מחפש…' : ` · ${n.length}`) : ''}</button>`; }).join('')}</div><span class="muted" style="font-size:12px">השכבות מוצגות ליד המסלול של היום שבחרת. לחץ על סמן כדי לראות פרטים.</span></div>` : ''}
    ${mtOpen === 'route' ? `<div class="mt-panel"><div class="list">${items.map((x, n) => `<div class="li ${x.id === mapSel ? 'sel' : ''}" data-act="mapPick" data-id="${x.id}"><span class="ms-n" style="--c:${x.color}">${n + 1}</span><span class="tile" style="--c:${x.color}">${ic(x.kind)}</span><div class="grow"><div class="li-t">${esc(x.name)}</div>${x.note ? `<div class="li-m">${esc(cut(x.note, 44))}</div>` : ''}</div></div>`).join('') || '<div class="li muted">אין ביום הזה מקומות עם מיקום.</div>'}</div>
      <div class="thotel">${ic('hotel')}<span>${hotelPt() ? `היום מתחיל ונגמר ב${esc(S.hotel.name || 'מלון')} (הסמן האפור הקטן)` : 'הוסף כתובת מלון כדי שכל יום יתחיל וייגמר בו'}</span>${hotelPt() ? '' : '<button class="lnk" data-act="hotelEdit">הוספה</button>'}</div>
      <div class="edrow"><button class="chipbtn" data-act="mapSort">${ic('sort')}סדר לי את היום</button><button class="chipbtn" data-act="placeAdd" data-d="${mapDay}">${ic('plus')}הוסף מקום</button><span class="muted grow">או לחיצה ארוכה במפה</span></div></div>` : ''}`;
}
function mapCardInner() {
  const items = mapStops().filter(hasGeo); if (!mapSel) return '';
  const sel = items.find((x) => x.id === mapSel) || overlayItems().find((x) => x.id === mapSel); if (!sel) return '';
  if (sel.layer) return ovCard(sel);
  return `<div class="ms-sel"><div class="row"><span class="ms-n" style="--c:${sel.color}">${items.indexOf(sel) + 1}</span><span class="tile" style="--c:${sel.color}">${ic(sel.kind)}</span><div class="grow"><b>${esc(sel.name)}</b><div class="muted">${esc(sel.note || '')}</div></div><button class="icon-btn" data-act="mapClose" aria-label="סגירה">${ic('x')}</button></div>
      <div class="row"><a class="btn sun sm grow" href="${gmDir(null, sel, 'walking')}" target="_blank" rel="noopener">${ic('walk')}ברגל</a><a class="btn soft sm grow" href="${gmDir(null, sel, 'transit')}" target="_blank" rel="noopener">${ic('metro')}תחבורה</a><a class="btn soft sm" href="#place/${mapDay}/${sel.id}">על המקום</a></div>
      <div class="edrow"><button class="chipbtn" data-act="mapMove" data-dir="-1" aria-label="מוקדם יותר">${ic('up')}מוקדם</button><button class="chipbtn" data-act="mapMove" data-dir="1" aria-label="מאוחר יותר">${ic('down')}מאוחר</button><button class="chipbtn" data-act="mapToDay">${ic('list')}ליום אחר</button><button class="chipbtn" data-act="mapEdit">${ic('pen')}עריכה</button>${sel.hotelRef ? '' : `<button class="chipbtn danger" data-act="mapDel">${ic('trash')}</button>`}</div>
      <span class="muted" style="font-size:12px">אפשר גם לגרור את הסמן במפה כדי להזיז את המקום.</span></div>`;
}
function addHereSheet(lat, lng) {
  haptic(15);
  sheet(`<h3>מקום חדש כאן?</h3><span class="muted" id="ah-sub">מחפש מה יש בנקודה הזו…</span>
    <label class="lab">שם המקום<input class="field" id="ah-name" placeholder="שם"></label>
    <div class="lab">לאיזה יום?<div class="ms-days" id="ah-days">${META.map((d, k) => `<button class="${k === (typeof mapDay === 'number' ? mapDay : curIdx()) ? 'on' : ''}" style="--c:${d.color}" data-act="ahDay" data-i="${k}"><b>${d.num}</b><span>${d.short}</span></button>`).join('')}</div></div>
    <button class="btn sun" data-act="ahSave">הוסף למסלול</button>`);
  sheetCtx = { kind: 'addHere', lat, lng, day: typeof mapDay === 'number' ? mapDay : curIdx(), osm: null, k: null };
  fetch(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lng}&limit=1&radius=0.08`).then((r) => r.json()).then((j) => {
    const f = (j.features || [])[0]; if (!f || !$('#ah-name') || sheetCtx.kind !== 'addHere') return; const pr = f.properties;
    const nm = pr.name || [pr.street, pr.housenumber].filter(Boolean).join(' ');
    if (nm && !$('#ah-name').value) $('#ah-name').value = nm;
    $('#ah-sub').textContent = pr.name ? 'מצאתי מקום בנקודה הזו. אפשר לשנות את השם.' : 'כתוב שם למקום.';
    if (pr.osm_id && pr.name) sheetCtx.osm = { type: pr.osm_type === 'N' ? 'node' : pr.osm_type === 'W' ? 'way' : 'relation', id: pr.osm_id };
    sheetCtx.k = window.Enrich ? Enrich.kindFrom(pr.osm_key, pr.osm_value) : null;
  }).catch(() => { if ($('#ah-sub')) $('#ah-sub').textContent = 'כתוב שם למקום.'; });
}
function renderMapSheet() { const t = $('.mtop'); if (t) t.innerHTML = mapTopInner(); const c = $('.mcard'); if (c) { c.innerHTML = mapCardInner(); c.classList.toggle('on', !!c.innerHTML); } }
function bindMapSheet() { /* the card has its own close button; tapping the map closes it */ }
let mapDay = null, mapSel = null, meMarker = null;
function mapStops() {
  if (typeof mapDay !== 'number') mapDay = curIdx();
  return S.days[mapDay].stops.map((s) => ({ ...s, color: META[mapDay].color }));
}
const isLayer = () => false;
function mountMap() {
  if (!window.L) { $('#leaflet').innerHTML = '<div class="section muted">המפה צריכה חיבור לאינטרנט.</div>'; return; }
  if (mapDay == null) mapDay = curIdx();
  map = L.map('leaflet', { zoomControl: false, attributionControl: false }).setView([41.39, 2.17], 13);
  L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map);
  // Long press on the map: add a place right there
  map.on('contextmenu', (e) => addHereSheet(e.latlng.lat, e.latlng.lng));
  map.on('click', () => { if (mapSel || mtOpen) { mapSel = null; mtOpen = null; drawMarkers(false); renderMapSheet(); } });
  let tileErrs = 0, tileOk = 0;
  const tl = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
  tl.on('tileload', () => { tileOk++; const n = $('#map-msg'); if (n) n.remove(); });
  tl.on('tileerror', () => { tileErrs++; if (tileErrs === 4 && !tileOk && !$('#map-msg')) { const d = document.createElement('div'); d.id = 'map-msg'; d.className = 'warn'; d.style.cssText = 'position:absolute;top:150px;right:12px;left:12px;z-index:600'; d.textContent = 'רקע המפה לא נטען. בדוק חיבור לאינטרנט. העצירות והניווט עובדים גם בלי הרקע.'; $('.mapwrap').appendChild(d); } });
  setTimeout(() => map && map.invalidateSize(), 300);
  bindMapSheet();
  drawMarkers(true);
}
function drawMarkers(fit) {
  if (!map) return; if (layer) layer.remove(); layer = L.layerGroup().addTo(map);
  const pts = mapStops().filter(hasGeo);
  const line = [];
  pts.forEach((s, k) => {
    const icon = L.divIcon({ className: '', html: `<div class="mk" style="--c:${s.color};transform:rotate(${[-6, 5, -4, 6][k % 4]}deg)">${isLayer() ? ic(s.kind) : k + 1}</div>`, iconSize: [36, 36], iconAnchor: [18, 18] });
    const mk = L.marker([s.lat, s.lng], { icon, title: s.name, draggable: !isLayer() && !s.hotelRef }).addTo(layer).on('click', () => { mapSel = s.id; mtOpen = null; drawMarkers(false); renderMapSheet(); haptic(6); });
    if (!isLayer()) mk.on('dragend', () => { const st = S.days[mapDay].stops.find((x) => x.id === s.id); if (!st) return; const old = { lat: st.lat, lng: st.lng }; const ll = mk.getLatLng(); st.lat = ll.lat; st.lng = ll.lng; delete st.details; delete st.osm; save(); drawMarkers(false); renderMapSheet(); haptic(10); toast(`${st.name} הוזז`, () => { st.lat = old.lat; st.lng = old.lng; save(); drawMarkers(false); renderMapSheet(); }); enrichStop(st, true); });
    line.push([s.lat, s.lng]);
  });
  if (line.length > 1) L.polyline(line, { color: pts[0].color, weight: 4, dashArray: '2 10', lineCap: 'round' }).addTo(layer);
  const H = hotelPt();
  if (H) {
    L.marker([H.lat, H.lng], { icon: L.divIcon({ className: '', html: `<div class="mk hotel" title="${esc(H.name)}">${ic('hotel')}</div>`, iconSize: [26, 26], iconAnchor: [13, 13] }), title: H.name, zIndexOffset: -50 }).addTo(layer)
      .bindTooltip(`${esc(H.name)} · תחילת היום וסופו`, { direction: 'top', offset: [0, -12] });
    if (line.length) L.polyline([[H.lat, H.lng], line[0]], { color: '#8A93A8', weight: 2, dashArray: '1 7', lineCap: 'round', opacity: 0.8 }).addTo(layer);
    if (line.length) L.polyline([line[line.length - 1], [H.lat, H.lng]], { color: '#8A93A8', weight: 2, dashArray: '1 7', lineCap: 'round', opacity: 0.8 }).addTo(layer);
  }
  overlayItems().forEach((o) => {
    const icon = L.divIcon({ className: '', html: `<div class="mk ov ${o.id === mapSel ? 'sel' : ''}" style="--c:${o.color}">${ic(o.kind)}</div>`, iconSize: [28, 28], iconAnchor: [14, 14] });
    L.marker([o.lat, o.lng], { icon, title: o.name, zIndexOffset: -100 }).addTo(layer).on('click', () => { mapSel = o.id; mtOpen = null; drawMarkers(false); renderMapSheet(); haptic(6); });
  });
  if (fit && line.length) map.fitBounds(line, { paddingTopLeft: [40, 40], paddingBottomRight: [40, 200], maxZoom: 15 });
}
function rerenderMapOverlay() { renderMapSheet(); }

/* discover */
let discTab = 'food';
let here = null;
let discMode = 'live', liveCat = 'eat', liveDay = null, livePlace = 'all', liveOpen = false;
const LIVE_CATS = [['eat', 'לאכול', '#1E9E8F', 'food'], ['drink', 'לשתות', '#C2417F', 'bar'], ['see', 'לראות', '#E8553D', 'view'], ['wiki', 'סיפורים', '#2453C9', 'museum'], ['shop', 'קניות', '#D99400', 'shop']];
function liveArea() {
  if (liveDay === 'here' && here) return { pts: [{ lat: here.lat, lng: here.lng, name: 'המיקום שלך' }], name: 'המיקום שלך' };
  const di = typeof liveDay === 'number' ? liveDay : curIdx();
  const stops = S.days[di].stops.filter((x) => hasGeo(x) && !x.hotelRef);
  if (livePlace !== 'all') { const st = stops.find((x) => x.id === livePlace); if (st) return { pts: [st], name: st.name, di }; }
  return { pts: stops.length ? stops : [{ lat: 41.3851, lng: 2.1734, name: 'מרכז העיר' }], name: `כל המסלול של יום ${META[di].short}`, di };
}
function liveView() {
  const A = liveArea(); const cat = LIVE_CATS.find((x) => x[0] === liveCat);
  const res = window.Enrich ? loadLive(liveCat, A) : { items: [], err: true };
  if (window.Enrich && !res.loading) setTimeout(() => prefetchArea(A), 600);
  let items = res.items || [];
  let farFood = [];
  if (liveCat === 'eat') {
    const cur = T.discover.food.map((d, k) => reg({ id: 'cfood' + k, ...d, what: '', verified: true })).filter(isVeganGF);
    items = [...cur.filter((r) => hasGeo(r) && A.pts.some((p) => km(p, r) < 1.2)), ...items.filter((r) => isVeganGF(r) && !T.discover.food.some((f) => normName(f.name) === normName(r.name)))];
    if (!items.length) farFood = rankRecs(cur, A).slice(0, 3);
  }
  if (liveCat === 'drink') items = [...T.discover.bars.map((d, k) => reg({ id: 'cbars' + k, ...d, what: '', verified: true })).filter((r) => hasGeo(r) && A.pts.some((p) => km(p, r) < 1.2)), ...items];
  let rows = rankRecs(items, A); if (liveOpen) rows = rows.filter((x) => x.o === true);
  const di = A.di ?? curIdx(); const stops = typeof A.di === 'number' ? S.days[A.di].stops.filter((x) => hasGeo(x) && !x.hotelRef) : [];
  const fromPhoton = (res.items || []).some((r) => r.src === 'photon');
  const nearMe = liveDay === 'here';
  return `<div class="where"><button class="${nearMe ? '' : 'on'}" data-act="liveRoute">${ic('pin')}לאורך המסלול</button><button class="${nearMe ? 'on' : ''}" data-act="liveHere">${ic('locate')}קרוב אליי עכשיו</button></div>
    <div class="cats">${LIVE_CATS.map((t) => `<button class="pill ${t[0] === liveCat ? 'on' : ''}" style="--c:${t[2]}" data-act="liveCat" data-t="${t[0]}">${t[1]}</button>`).join('')}</div>
    ${nearMe ? `<div class="herebar">${ic('locate')}<span class="grow">מחפש סביב המיקום שלך עכשיו</span><button class="chipbtn" data-act="liveHere">רענן מיקום</button></div>`
      : `<div class="selrow"><label class="lab">איזה יום<select class="field" id="lv-day">${META.map((m, k) => `<option value="${k}" ${k === di ? 'selected' : ''}>${m.short} ${m.num}.12 · ${esc(cut(m.title, 22))}</option>`).join('')}</select></label>
    <label class="lab">סביב<select class="field" id="lv-place"><option value="all">כל המסלול של היום</option>${stops.map((x) => `<option value="${x.id}" ${livePlace === x.id ? 'selected' : ''}>${esc(cut(x.name, 28))}</option>`).join('')}</select></label></div>`}
    <div class="row"><span class="muted grow">${res.loading && !rows.length ? 'מחפש…' : `${rows.length} מקומות · ${esc(A.name)}${res.loading ? ' · מעדכן…' : ''}`}</span>${liveCat === 'wiki' ? '' : `<button class="chipbtn ${liveOpen ? 'on' : ''}" data-act="liveOpen">${liveOpen ? '✓ ' : ''}פתוח עכשיו</button>`}</div>
    ${farFood.length ? `<div class="card muted">אין לאורך המסלול הזה מסעדה טבעונית עם ללא גלוטן. הכי קרובות:</div>${recList(farFood.map((x, n) => recRow(x, n, { color: cat[2] })))}` : ''}
    ${farFood.length ? '' : res.loading && !rows.length ? skel(5) : res.err && !rows.length ? '<div class="card muted">החיפוש החי לא ענה כרגע (צריך אינטרנט, ולפעמים השרת עמוס). נסה שוב עוד רגע.</div><button class="btn soft sm" data-act="liveRetry">לחפש שוב</button>' : rows.length ? recList(rows.slice(0, 30).map((x, n) => recRow(x, n, { color: cat[2] }))) : `<div class="card muted">${liveOpen ? 'אין כרגע מקומות פתוחים כאן. בטל את "פתוח עכשיו".' : 'לא מצאתי מקומות כאן. נסה יום אחר או קטגוריה אחרת.'}</div>`}
    ${liveCat === 'eat' && !res.loading ? '<span class="muted">רק מקומות טבעוניים לגמרי עם אפשרויות ללא גלוטן: מהרשימה שבדקנו, ומ־OpenStreetMap כשהמקום מסומן שם בשני התנאים. כדאי לוודא במקום.</span>' : ''}`;
}

/* gems: places most visitors miss, one card at a time */
let gemCat = 'all', gemView = 'deck', gemDayF = null, gemImgs = {}, gemPv = {}, gemsWarm = false, voyageItems = null, voyageState = '';
const WV_HE = (() => { try { return JSON.parse(localStorage.getItem('bcn.wvhe') || '{}'); } catch (e) { return {}; } })();
function wvCat(t) {
  t = t.toLowerCase();
  if (/museum|gallery|exhibit|art\b|artist/.test(t)) return 'art';
  if (/market|mercat/.test(t)) return 'market';
  if (/park|garden|jard/.test(t)) return 'green';
  if (/view|lookout|mirador|panoram|hill/.test(t)) return 'view';
  if (/church|cathedral|basilica|monaster|chapel|roman|medieval|civil war|history/.test(t)) return 'history';
  if (/modernis|gaud|building|house|casa|palau|palace|architect/.test(t)) return 'arch';
  return 'odd';
}
const CAT_KIND = { art: 'museum', market: 'market', green: 'park', view: 'view', history: 'church', arch: 'arch', odd: 'walk' };
function voyageGems() {
  if (!voyageItems) return [];
  const known = [...window.GEMS, ...allStops().map((o) => o.st).filter(hasGeo)];
  return voyageItems.filter((v) => !known.some((k) => km(k, v) < 0.12 || normName(k.name) === normName(v.name))).map((v) => {
    const c = wvCat(v.name + ' ' + v.content);
    return { id: 'wv' + normName(v.name).replace(/\s+/g, '').slice(0, 24), name: v.name, he: v.alt || '', cat: [c], kind: CAT_KIND[c], lat: v.lat, lng: v.lng, area: DISTRICT_HE[v.district] || v.district, score: null, crowd: null, dur: '', price: v.price, best: v.hours, wiki: v.wiki, bg: v.content, go: '', skip: '', wv: true, url: v.url, page: v.page };
  });
}
const DISTRICT_HE = { 'Ciutat Vella': 'העיר העתיקה', Eixample: 'אישאמפלה', 'Gràcia': 'גרסיה', 'Sants-Montjuïc': 'סנטס ומונז׳ואיק', 'Sant Martí': 'סנט מרטי', 'Horta-Guinardó': 'אורטה וגינרדו', 'Les Corts': 'לס קורטס', 'Sarrià-Sant Gervasi': 'סריה וסנט ז׳רווסי', 'Nou Barris': 'נואו באריס', 'Sant Andreu': 'סנט אנדראו', Barcelona: 'ברצלונה' };
// How well known: yearly Wikipedia readers on a 1–5 scale
const popLevel = (n) => (n == null ? 0 : n < 5000 ? 1 : n < 20000 ? 2 : n < 80000 ? 3 : n < 300000 ? 4 : 5);
const popDots = (n) => { const l = popLevel(n); return l ? `<span class="pop" title="${fmtPv(n)} קוראים בשנה">כמה מוכר <i>${'●'.repeat(l)}<s>${'●'.repeat(5 - l)}</s></i></span>` : ''; };
let gemPhotos = (() => { try { return JSON.parse(localStorage.getItem('bcn.gph') || '{}'); } catch (e) { return {}; } })();
// A photo for a place with no Wikipedia article: Commons photos taken at the spot
function gemImg(g) {
  const w = g.wiki ? gemImgs[g.wiki] : ''; if (w) return w;
  if (g.id in gemPhotos) return gemPhotos[g.id];
  if (window.Enrich && !gemImg.busy && (!g.wiki || g.wiki in gemImgs)) {
    gemImg.busy = true;
    Enrich.photosNear({ lat: g.lat, lng: g.lng, name: g.name }).then((ph) => { gemPhotos[g.id] = ph[0] || ''; try { localStorage.setItem('bcn.gph', JSON.stringify(gemPhotos)); } catch (e) { /* full */ } })
      .catch(() => {}).finally(() => { gemImg.busy = false; gemRefresh(); });
  }
  return '';
}
const allGems = () => [...window.GEMS, ...voyageGems()];
const gemById = (id) => allGems().find((g) => g.id === id);
function gemNear(g) {
  let best = null;
  S.days.forEach((d, di) => d.stops.forEach((s) => { if (s.hotelRef || !hasGeo(s)) return; const k = km(s, g); if (!best || k < best.d) best = { d: k, di, s }; }));
  return best;
}
function loadVoyage() {
  if (voyageState || !window.Enrich) return; voyageState = 'loading';
  Enrich.voyage().then((items) => { voyageItems = items; voyageState = 'ok'; const t = allGems().map((g) => g.wiki).filter(Boolean); Enrich.leadImages(t).then((c) => { gemImgs = c; gemRefresh(); }); Enrich.pageviews(voyageGems().map((g) => g.wiki).filter(Boolean)).then((c) => { Object.assign(gemPv, c); gemRefresh(); }); gemRefresh(); })
    .catch(() => { voyageState = 'err'; gemRefresh(); });
}
function warmGems() {
  if (gemsWarm || !window.Enrich) return; gemsWarm = true;
  const titles = window.GEMS.map((g) => g.wiki).filter(Boolean);
  Enrich.leadImages(titles).then((c) => { gemImgs = c; gemRefresh(); }).catch(() => {});
  Enrich.pageviews(titles).then((c) => { Object.assign(gemPv, c); gemRefresh(); }).catch(() => {});
  setTimeout(loadVoyage, 1500);
}
let gemDragging = false;
function gemRefresh() { if (gemDragging) return; if (location.hash === '#discover') render(); else if (location.hash === '#map' && mapLayers.has('gems')) { drawMarkers(false); renderMapSheet(); } }
const fmtPv = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)} מיליון` : n >= 1000 ? `${Math.round(n / 1000)} אלף` : String(n));
function gemTags(g) {
  const pv = g.wiki ? gemPv[g.wiki] : null; const t = [];
  const hidden = g.wv ? popLevel(pv) && popLevel(pv) <= 2 : g.crowd === 1 && popLevel(pv) <= 3;
  if (hidden) t.push('<span class="tg gemt">💎 פנינה נסתרת</span>');
  if (g.crowd === 3 || popLevel(pv) === 5) t.push('<span class="tg mut">עמוס בתיירים</span>');
  if (/חינם/.test(g.price || '') && !/€/.test((g.price || '').split(',')[0])) t.push('<span class="tg ok">חינם</span>');
  return t.join('');
}
function gemRank(g) { const n = gemNear(g); const d = n ? n.d : 5; return g.wv ? -10 + Math.log10((gemPv[g.wiki] || 10)) - d * 0.3 : g.score - Math.min(d, 6) * 0.07; }
function gemQueue() {
  const list = allGems().filter((g) => !S.gems[g.id] && (gemCat === 'all' || (gemCat === 'wv' ? g.wv : g.cat.includes(gemCat))) && (gemDayF == null || ((n) => n && n.di === gemDayF && n.d < 1.5)(gemNear(g))))
    .sort((a, b) => gemRank(b) - gemRank(a));
  // Mix: after every 3 of ours, one from Wikivoyage, so both show up early
  const ours = list.filter((g) => !g.wv), wv = list.filter((g) => g.wv); const out = [];
  while (ours.length || wv.length) { out.push(...ours.splice(0, 3)); if (wv.length) out.push(wv.shift()); }
  return out;
}
function gemRec(g) {
  return reg({ id: 'g_' + g.id, name: g.name, nameHe: g.he, kind: g.kind, lat: g.lat, lng: g.lng, what: '', note: g.area, gem: g.id, thumb: gemImgs[g.wiki] || '', wikiFixed: g.wiki ? { lang: 'en', title: decodeURIComponent(g.wiki).replace(/_/g, ' '), needsHe: true } : undefined });
}
function gemBg(g) {
  if (!g.wv) return g.bg;
  if (WV_HE[g.id]) return WV_HE[g.id];
  if (window.Enrich && !gemBg.busy) { gemBg.busy = true; Enrich.translate(g.bg).then((t) => { if (t) { WV_HE[g.id] = t; try { localStorage.setItem('bcn.wvhe', JSON.stringify(WV_HE)); } catch (e) { /* full */ } } }).catch(() => {}).finally(() => { gemBg.busy = false; gemRefresh(); }); }
  return g.bg;
}
function gemFacts(g) {
  const f = [];
  if (g.dur) f.push(`<span>${ic('clock')}${esc(g.dur)}</span>`);
  if (g.price) f.push(`<span>${ic('coin')}${esc(cut(g.price, 60))}</span>`);
  if (g.best) f.push(`<span>${ic(g.wv ? 'clock' : 'sun')}${g.wv ? 'שעות: ' : ''}${esc(cut(g.best, 70))}</span>`);
  return f.length ? `<div class="gem-facts">${f.join('')}</div>` : '';
}
function gemCard(g) {
  const n = gemNear(g); const img = gemImg(g); const pv = g.wiki ? gemPv[g.wiki] : null;
  return `<article class="gem${g.wv ? ' wvc' : ''}" id="gemcard" data-id="${g.id}">
    <div class="gem-ph ${img ? '' : 'noimg'}">${img ? `<img src="${esc(img)}" alt="${esc(g.name)}">` : `<span class="gem-ic">${ic(g.kind)}</span>`}
      ${g.score ? `<span class="gem-score"><b>${g.score.toFixed(1)}</b><small>הציון שלנו</small></span>` : '<span class="gem-src">🌍 מ־Wikivoyage<small>מדריך הטיולים הפתוח</small></span>'}
      <span class="gem-yes">שמור ★</span><span class="gem-no">לא בשבילי</span></div>
    <div class="gem-b">
      <h3>${esc(g.name)}</h3>${g.he && g.he !== g.name ? `<div class="gem-he">${esc(g.he)}</div>` : ''}
      <div class="gem-near">${ic('pin')}${esc(g.area)}${n ? ` · ${fmtKm(n.d)} מ${esc(cut(n.s.name, 22))} (יום ${META[n.di].short})` : ''}</div>
      <div class="li-tags">${gemTags(g)}${popDots(pv)}</div>
      ${g.wv ? `<div class="gem-lbl">${WV_HE[g.id] ? 'מה כתוב עליו ב־Wikivoyage (תורגם)' : 'מה כתוב עליו ב־Wikivoyage · מתרגם…'}</div>` : ''}
      <p class="gem-bg">${esc(gemBg(g))}</p>
      ${g.go ? `<div class="gem-why"><b>למה ללכת</b>${esc(g.go)}</div>` : ''}
      ${g.skip ? `<div class="gem-skip"><b>פחות מתאים</b>${esc(g.skip)}</div>` : ''}
      ${gemFacts(g)}
      <div class="row"><span class="grow">${g.wv && g.page ? `<a class="lnk muted" href="https://en.wikivoyage.org/wiki/${encodeURIComponent(g.page.replace(/ /g, '_'))}" target="_blank" rel="noopener">המקור ←</a>` : ''}</span><a class="lnk" href="#place/r/g_${g.id}" data-act="gemOpen" data-id="${g.id}">עוד על המקום ←</a></div>
    </div>
    <div class="gem-acts"><button class="gx" data-act="gemNo" data-id="${g.id}">✕<span>לא בשבילי</span></button><button class="gs" data-act="gemSave" data-id="${g.id}">★<span>שמור</span></button><button class="gd" data-act="gemDay" data-id="${g.id}" data-d="${n ? n.di : curIdx()}">+<span>ליום ${META[n ? n.di : curIdx()].short}</span></button></div>
  </article>`;
}
function gemRow(g, day) {
  const n = gemNear(g); const img = g.wiki ? gemImgs[g.wiki] : gemPhotos[g.id] || ''; const r = gemRec(g); const st = inRoute(r);
  return `<div class="li">${img ? `<img class="thumb" src="${esc(img)}" alt="" loading="lazy">` : `<span class="tile" style="--c:#2453C9">${ic(g.kind)}</span>`}
    <a class="grow li-main" href="#place/r/g_${g.id}" data-act="gemOpen" data-id="${g.id}"><div class="li-t">${esc(g.name)}</div><div class="li-m">${g.score ? `<b class="gem-sc">${g.score.toFixed(1)}</b> · ` : '🌍 Wikivoyage · '}${n ? `ליד יום ${META[n.di].short} · ${fmtKm(n.d)}` : esc(g.area)}</div><div class="li-tags">${gemTags(g)}</div></a>
    ${st ? `<span class="li-done">✓ ${META[st.di].short}</span>` : `<button class="add" data-act="recAdd" data-id="g_${g.id}" ${day != null ? `data-d="${day}"` : ''} aria-label="הוסף למסלול">${ic('plus')}</button>`}</div>`;
}
function gemsView() {
  warmGems();
  const q = gemQueue(); const dec = Object.entries(S.gems); const yes = dec.filter((x) => x[1] === 'yes').length; const no = dec.length - yes;
  const nWv = voyageGems().filter((g) => !S.gems[g.id]).length;
  const wvPill = `<button class="pill wvp ${gemCat === 'wv' ? 'on' : ''}" style="--c:#1E9E8F" data-act="gemCat" data-t="wv">🌍 ${voyageState === 'ok' ? `עוד ${nWv} ` : 'עוד '}מ־Wikivoyage${voyageState === 'loading' ? ' (טוען…)' : ''}</button>`;
  const head = `<div class="cats">${window.GEM_CATS.map(([k, t]) => `<button class="pill ${k === gemCat ? 'on' : ''}" style="--c:#2453C9" data-act="gemCat" data-t="${k}">${t}</button>`).join('')}${wvPill}</div>
    ${gemCat === 'wv' ? `<div class="card wv-note">${voyageState === 'err' ? 'Wikivoyage לא ענה כרגע (צריך אינטרנט). <button class="lnk" data-act="wvRetry">לנסות שוב</button>' : voyageState === 'loading' ? 'טוען מקומות מ־Wikivoyage…' : 'מקומות ש־Wikivoyage, מדריך הטיולים הפתוח, ממליץ עליהם בכל שכונה. אין להם ציון שלנו: לידם מופיע כמה הם מוכרים, לפי מספר הקוראים בוויקיפדיה. התיאור מתורגם אוטומטית.'}</div>` : ''}
    ${gemDayF != null ? `<div class="herebar">${ic('pin')}<span class="grow">רק ליד המסלול של יום ${META[gemDayF].short}</span><button class="chipbtn" data-act="gemDayF">הצג הכל ✕</button></div>` : ''}
    <div class="row"><span class="muted grow">${q.length ? `${q.length} לגלות` : 'עברת על הכל'}${yes ? ` · שמרת ${yes}` : ''}</span><button class="chipbtn" data-act="gemView">${gemView === 'deck' ? `${ic('list')}רשימה` : `${ic('star')}כרטיסים`}</button></div>`;
  let body;
  if (!q.length) body = `<div class="card gem-end"><b>אין עוד פנינים כאן</b><span class="muted">${gemCat !== 'all' || gemDayF != null ? 'נסה קטגוריה אחרת או את כל העיר.' : 'עברת על כל הרשימה.'}</span>${no ? `<button class="btn soft sm" data-act="gemReset">להחזיר את ${no} שדילגתי עליהם</button>` : ''}${yes ? '<a class="btn soft sm" href="#saved">לשמורים ★</a>' : ''}</div>`;
  else if (gemView === 'list') body = recList(q.map((g) => gemRow(g)));
  else body = gemCard(q[0]) + (q[1] ? `<div class="gem-next muted">הבא: ${esc(q[1].name)}</div>` : '');
  const foot = `<span class="muted" style="font-size:12px">הציון והטקסטים: מחקר שלנו מוויקיפדיה, Wikivoyage ומדריכי טיול. "פנינה נסתרת" לפי כמה מבקרים יש ולפי כמה קוראים את הערך בוויקיפדיה. מחירים ושעות בערך, כדאי לבדוק לפני.</span>${voyageState === 'err' ? '<span class="muted" style="font-size:12px">Wikivoyage לא ענה כרגע. ננסה שוב בפעם הבאה.</span>' : ''}`;
  return head + body + (no && q.length ? `<button class="lnk muted" data-act="gemReset" style="align-self:flex-start">דילגת על ${no} · להחזיר</button>` : '') + foot;
}
function gemBlock(s) {
  const g = s.gem && gemById(s.gem); if (!g) return '';
  return `<div class="card gem-info">${g.score ? `<div class="row"><span class="gem-sc big">${g.score.toFixed(1)}</span><span class="grow"><b>הציון שלנו</b><div class="li-tags">${gemTags(g)}${popDots(g.wiki ? gemPv[g.wiki] : null)}</div></span></div>` : `<div class="li-tags"><span class="tg">🌍 מ־Wikivoyage</span>${gemTags(g)}${popDots(g.wiki ? gemPv[g.wiki] : null)}</div>`}
    <p class="gem-bg">${esc(gemBg(g))}</p>${g.go ? `<div class="gem-why"><b>למה ללכת</b>${esc(g.go)}</div>` : ''}${g.skip ? `<div class="gem-skip"><b>פחות מתאים</b>${esc(g.skip)}</div>` : ''}${gemFacts(g)}${g.url ? `<a class="lnk" href="${esc(g.url)}" target="_blank" rel="noopener">האתר הרשמי ←</a>` : ''}</div>`;
}
function gemDecide(id, v, el) {
  const card = $('#gemcard'); haptic(v === 'no' ? 6 : 12);
  const go = () => { S.gems[id] = v; save(); withTransition('tab', render); };
  if (card && card.dataset.id === id) { card.classList.add(v === 'no' ? 'fly-no' : 'fly-yes'); setTimeout(go, 230); } else go();
}
function bindGemSwipe() {
  const c = $('#gemcard'); if (!c || c.dataset.bound) return; c.dataset.bound = 1;
  let x0 = null, y0 = 0, dx = 0, lock = null;
  c.addEventListener('pointerdown', (e) => { if (e.target.closest('button,a')) return; x0 = e.clientX; y0 = e.clientY; dx = 0; lock = null; });
  c.addEventListener('pointermove', (e) => {
    if (x0 == null) return; dx = e.clientX - x0; const dy = e.clientY - y0;
    if (!lock) { if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) { lock = 'x'; gemDragging = true; c.setPointerCapture(e.pointerId); c.classList.add('drag'); } else if (Math.abs(dy) > 10) { lock = 'y'; x0 = null; return; } else return; }
    c.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`; c.style.setProperty('--yes', Math.max(0, Math.min(1, dx / 110))); c.style.setProperty('--no', Math.max(0, Math.min(1, -dx / 110)));
  });
  const end = () => {
    if (x0 == null) return; x0 = null; gemDragging = false; c.classList.remove('drag');
    if (lock === 'x' && Math.abs(dx) > 100) { const id = c.dataset.id; if (dx > 0) A.gemSave({ dataset: { id } }); else A.gemNo({ dataset: { id } }); return; }
    c.style.transform = ''; c.style.setProperty('--yes', 0); c.style.setProperty('--no', 0);
  };
  c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
}
V.discover = () => pageHead('גלה את העיר', 'מקומות שכדאי להכיר, עם ציון ורקע להחלטה') + `<div class="section">${gemsView()}</div>`;

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
function addSavedToDay(x, di) {
  const ns = { id: uid(), kind: x.kind || 'star', name: x.name || x.title || 'מקום מהשמורים', note: SRC[srcKind(x.url || '')][0], lat: x.lat ?? null, lng: x.lng ?? null, osm: x.osm || null, url: x.url, savedId: x.id };
  if (x.details) ns.details = x.details; if (x.wikiFixed) ns.wikiFixed = x.wikiFixed; if (x.gem) ns.gem = x.gem;
  S.days[di].stops.push(ns); x.day = META[di].short; save(); render();
  if (!ns.details) enrichStop(ns, true);
  if (!hasGeo(ns)) { identifySheet(x); toast('נוסף. בוא נזהה את המקום כדי שיופיע במפה ובניווט'); } else toast(`נוסף ליום ${META[di].short} · מופיע במסלול, במפה ובניווט`);
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
const savedSeg = () => `<div class="seg three"><button class="${savedTab === 'inbox' ? 'on' : ''}" data-act="savedTab" data-t="inbox">נכנסו · ${S.saved.filter((x) => !x.fav).length}</button><button class="${savedTab === 'fav' ? 'on' : ''}" data-act="savedTab" data-t="fav">★ מועדפים · ${S.saved.filter((x) => x.fav).length}</button><button class="${savedTab === 'recs' ? 'on' : ''}" data-act="savedTab" data-t="recs">המומלצים שלנו</button></div>`;
const srcKind = (u) => /instagram\.com/.test(u) ? 'ig' : /tiktok\.com/.test(u) ? 'tt' : /(maps\.app\.goo\.gl|google\.[a-z.]+\/maps|goo\.gl\/maps)/.test(u) ? 'pin' : 'link';
const SRC = { ig: ['אינסטגרם', '#C2417F'], tt: ['טיקטוק', '#13213D'], pin: ['Google Maps', '#1E9E8F'], link: ['קישור', '#2453C9'] };
const photosOf = (s, w) => [...new Set([...(w && w.images ? w.images : []), ...((s.details && s.details.photos) || [])])];
const thumbOf = (x) => ((x.details && x.details.photos) || [])[0] || x.thumb || null;
function curatedView() {
  const tabs = [['food', 'טבעוני · ללא גלוטן', '#1E9E8F'], ['bars', 'ברים', '#C2417F'], ['tops', 'מקומות', '#E8553D']];
  const c = tabs.find((t) => t[0] === discTab)[2];
  const di = curIdx(); const A = { pts: S.days[di].stops.filter((x) => hasGeo(x) && !x.hotelRef) };
  const items = T.discover[discTab].map((d, k) => reg({ id: 'c' + discTab + k, ...d, what: '', verified: discTab === 'food' }));
  const rows = A.pts.length ? rankRecs(items, A) : items.map((r) => ({ r, d: 0, o: null }));
  return `<div class="cats">${tabs.map((t) => `<button class="pill ${t[0] === discTab ? 'on' : ''}" style="--c:${t[2]}" data-act="disc" data-t="${t[0]}">${t[1]}</button>`).join('')}</div>
    <span class="muted">רשימות שבדקנו מראש · ממוין לפי הקרבה למסלול של יום ${META[di].short}</span>
    ${recList(rows.map((x, n) => recRow(x, n, { color: c, why: `${x.r.note}${x.d ? ' · ' + fmtKm(x.d) : ''}` })))}`;
}
V.saved = () => {
  if (savedTab === 'recs') return pageHead('שמורים', 'קישורים, מועדפים והמומלצים שלנו') + `<div class="section">${savedSeg()}${curatedView()}</div>`;
  const list = S.saved.map((x, i) => ({ x, i })).filter((o) => savedTab === 'fav' ? o.x.fav : !o.x.fav);
  return pageHead('שמורים', 'קישורים, סרטונים ומקומות שאהבת') + `
  <div class="section">
    <div class="card" style="display:flex;flex-direction:column;gap:8px">
      <label class="lab" for="sv-link" style="color:var(--pink)">הדבק קישור מאינסטגרם, טיקטוק או Google Maps</label>
      <div class="row"><input id="sv-link" class="field" type="url" inputmode="url" placeholder="https://www.instagram.com/p/…" style="direction:ltr;text-align:left"><button class="btn navy" style="background:var(--pink)" data-act="addLink">הוסף</button></div>
      <span class="muted">או ישר מהאפליקציה: "שיתוף" ← "ברצלונה"</span>
    </div>
    ${savedSeg()}
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
  if (di === 'r') return recPage(id);
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
  const bar = fromSaved
    ? actbar(`<a class="ab main" href="${gmDir(null, s, 'walking')}" target="_blank" rel="noopener">${ic('walk')}נווט</a>${link ? `<a class="ab" href="#place/${link.di}/${link.st.id}">${ic('check')}ביום ${META[link.di].short}</a>` : `<button class="ab" data-act="savedToDayById" data-id="${s.id}">${ic('plus')}למסלול</button>`}`)
    : actbar(`<a class="ab main" href="${gmDir(null, s, 'walking')}" target="_blank" rel="noopener">${ic('walk')}נווט ברגל</a><a class="ab" href="${gmDir(null, s, 'transit')}" target="_blank" rel="noopener">${ic('metro')}תחבורה</a>${s.hotelRef ? '' : `<button class="ab ${s.visited ? 'on' : ''}" data-act="visited" data-d="${di}" data-id="${s.id}">${ic('check')}${s.visited ? 'ביקרתי' : 'ביקרתי?'}</button>`}`);
  return detailHead(s.name || s.title, fromSaved ? `מהשמורים · ${SRC[srcKind(s.url || '')][0]}${link ? ' · ביום ' + META[link.di].short : ''}` : `יום ${m.short} ${m.num}.12${s.note ? ' · ' + s.note : ''}`, fromSaved ? '#saved' : '#today', imgs[0]) + bar + `<div class="section">
    ${cn ? (() => { const to = suggestDay(s, di); return `<div class="warn">${ic('warn')}<span class="grow">${cn}.${to != null ? `<br><button class="btn sun sm" style="margin-top:6px" data-act="moveTo" data-d="${di}" data-id="${s.id}" data-to="${to}">להעביר ליום ${META[to].short} ${META[to].num}.12</button>` : ''}</span></div>`; })() : ''}
    ${m && infoNote(s, m.date) ? `<div class="warn" style="background:#EEF2FA;color:var(--ink)">${ic('warn')}<span>${infoNote(s, m.date)}.</span></div>` : ''}
    ${imgs.length > 1 ? `<div class="gallery">${imgs.slice(1).map((u, k) => `<img src="${esc(u)}" alt="תמונה ${k + 2} של ${esc(s.name || '')}" loading="lazy" data-act="lightbox" data-i="${k + 1}">`).join('')}</div>` : (enriching.has(s.id) && !imgs.length ? '<div class="gallery">' + '<span class="sk sk-ph"></span>'.repeat(3) + '</div>' : '')}
    ${!fromSaved && !s.hotelRef ? bookingCard(s, di) : ''}
    ${!fromSaved && !s.hotelRef ? `<button class="btn soft sm" data-act="journalAdd" data-d="${di}" data-id="${s.id}">${ic('camera')}זיכרון ליומן</button>` : ''}
    ${!fromSaved ? journalFor(s.id) : ''}
    ${['food', 'bar'].includes(s.kind) ? `<a class="btn soft sm" href="#card">${ic('card')}כרטיס תזונה למלצר (ספרדית)</a>` : ''}
    ${src && src.url ? `<a class="btn soft sm" href="${esc(src.url)}" target="_blank" rel="noopener">${ic(srcKind(src.url))}הפוסט המקורי (${SRC[srcKind(src.url)][0]})</a>` : ''}
    ${src && src.caption ? `<div class="card muted" style="white-space:pre-line;font-size:13px">${esc(cut(src.caption, 300))}</div>` : ''}
    ${gemBlock(s)}
    ${infoCard(s)}
    ${storyHTML(s, w)}
    ${hasGeo(s) && s.kind !== 'food' ? `<h2>טבעוני וללא גלוטן קרוב</h2>${nearest(VEG_FOOD(), s, 3).map((f) => `<div class="card row"><span class="tile" style="--c:var(--teal)">${ic('food')}</span><div class="grow"><div style="font-weight:800">${esc(f.name)}</div><div class="muted">${fmtKm(f.dist)} · ${esc(f.note)}</div></div><a class="icon-btn" href="${gmDir(s, f, 'walking')}" target="_blank" rel="noopener" aria-label="ניווט">${ic('pin')}</a></div>`).join('')}` : ''}
    <div class="row"><a class="btn soft sm grow" href="${gmSearch(s)}" target="_blank" rel="noopener">תמונות וביקורות ב־Google Maps</a>${fromSaved ? `<button class="btn soft sm" data-act="savedIdentify" data-id="${s.id}">${ic('pen')}מקום אחר</button>` : `<button class="btn soft sm" data-act="placeEditById" data-d="${di}" data-id="${s.id}">${ic('pen')}עריכה</button>`}</div>
  </div>`;
};

function recPage(id) {
  if (!REC[id] && id.startsWith('g_')) { const g = gemById(id.slice(2)); if (g) gemRec(g); }
  const r = REC[id];
  if (!r) return pageHead('ההמלצה לא נמצאה', 'חפש אותה שוב בגלה', '#discover');
  if (r.savedId && S.saved.some((x) => x.id === r.savedId)) { location.replace('#place/s/' + r.savedId); return ''; }
  const st = inRoute(r); if (st) { location.replace(`#place/${st.di}/${st.st.id}`); return ''; }
  const w = articleFor(r);
  if (!r.details || !r.details.photos) { if (!retried.has(r.id)) { retried.add(r.id); enrichStop(r, true); } }
  const imgs = photosOf(r, w); if (r.thumb && !imgs.length) imgs.push(r.thumb); galleryImgs = imgs;
  const o = openState(r); const sv = inSaved(r);
  return detailHead(r.name, r.gem ? `פנינה · ${r.note || ''}` : `המלצה · ${whatHe(r)}`, '#discover', imgs[0]) + actbar(`<a class="ab main" href="${gmDir(null, r, 'walking')}" target="_blank" rel="noopener">${ic('walk')}נווט</a><button class="ab" data-act="recAdd" data-id="${r.id}">${ic('plus')}למסלול</button>${sv ? `<a class="ab on" href="#place/s/${sv.id}">${ic('star')}שמור</a>` : `<button class="ab" data-act="recSave" data-id="${r.id}">${ic('star')}שמור</button>`}`) + `<div class="section">
    ${o != null ? `<div>${openBadge(o)}</div>` : ''}
    ${imgs.length > 1 ? `<div class="gallery">${imgs.slice(1).map((u, k) => `<img src="${esc(u)}" alt="תמונה ${k + 2} של ${esc(r.name)}" loading="lazy" data-act="lightbox" data-i="${k + 1}">`).join('')}</div>` : (enriching.has(r.id) && !imgs.length ? '<div class="gallery">' + '<span class="sk sk-ph"></span>'.repeat(3) + '</div>' : '')}
    ${gemBlock(r)}
    ${infoCard(r)}
    ${storyHTML(r, w)}
    ${r.kind !== 'food' ? `<h2>טבעוני וללא גלוטן קרוב</h2>${nearest(VEG_FOOD(), r, 3).map((f) => `<div class="card row"><span class="tile" style="--c:var(--teal)">${ic('food')}</span><div class="grow"><div style="font-weight:800">${esc(f.name)}</div><div class="muted">${fmtKm(f.dist)} · ${esc(f.note)}</div></div><a class="icon-btn" href="${gmDir(r, f, 'walking')}" target="_blank" rel="noopener" aria-label="ניווט">${ic('pin')}</a></div>`).join('')}` : ''}
    <a class="btn soft sm" href="${gmSearch(r)}" target="_blank" rel="noopener">תמונות וביקורות ב־Google Maps</a>
  </div>`;
}
function bookingCard(s, di) {
  const b = bookingFor(s); const bk = s.booking || {};
  if (!b && !s.time && !bk.booked && !bk.ref) return `<button class="btn soft sm" data-act="bookEdit" data-d="${di}" data-id="${s.id}">${ic('ticket')}יש לי כרטיס או הזמנה למקום הזה</button>`;
  return `<div class="card" style="display:flex;flex-direction:column;gap:8px;border-inline-start:5px solid ${bk.booked ? 'var(--teal)' : 'var(--sun)'}">
    <div class="row"><span class="tile" style="--c:${bk.booked ? 'var(--teal)' : '#D99400'}">${ic('ticket')}</span><div class="grow"><b>${bk.booked ? 'הוזמן ✓' : b ? 'צריך להזמין מראש' : 'כרטיס / הזמנה'}</b><div class="muted">${s.time ? `כניסה ב־${esc(s.time)}` : b ? esc(b.text) : ''}${bk.ref ? ` · הזמנה ${esc(bk.ref)}` : ''}</div></div><button class="icon-btn" data-act="bookEdit" data-d="${di}" data-id="${s.id}" aria-label="עריכה">${ic('pen')}</button></div>
    ${b && !bk.booked ? `<a class="btn sun sm" href="${esc(b.url)}" target="_blank" rel="noopener">לאתר הרשמי להזמנה ←</a>` : ''}
    ${(bk.files || []).length ? `<div class="gallery">${bk.files.map((f) => /^image/.test(f.type) ? `<a data-file="${f.id}" target="_blank" rel="noopener"><img data-file="${f.id}" alt="כרטיס" style="height:110px"></a>` : `<a class="btn soft sm" data-file="${f.id}" target="_blank" rel="noopener">${ic('ticket')}${esc(f.name || 'קובץ')}</a>`).join('')}</div><span class="muted">שמור בטלפון, נפתח גם בלי אינטרנט</span>` : ''}
    ${bk.url ? `<a class="muted" href="${esc(bk.url)}" target="_blank" rel="noopener">קישור לכרטיס ←</a>` : ''}</div>`;
}
function journalFor(stopId) {
  const list = S.journal.filter((j) => j.stopId === stopId); if (!list.length) return '';
  return `<h2>מהיומן</h2>${list.map(jEntry).join('')}`;
}
function jEntry(j) {
  const st = j.stopId && allStops().find((o) => o.st.id === j.stopId);
  return `<div class="card" style="display:flex;flex-direction:column;gap:6px">${j.photos && j.photos.length ? `<div class="gallery">${j.photos.map((f, k) => `<img data-file="${f.id}" alt="תמונה מהיומן" data-act="jPhoto" data-j="${j.id}" data-i="${k}">`).join('')}</div>` : ''}
    ${j.text ? `<div style="white-space:pre-line">${esc(j.text)}</div>` : ''}
    <div class="row"><span class="muted grow">${new Date(j.at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}${st ? ` · <a href="#place/${st.di}/${st.st.id}">${esc(st.st.name)}</a>` : ''}</span><button class="icon-btn danger" data-act="jDel" data-id="${j.id}" aria-label="מחיקה">${ic('trash')}</button></div></div>`;
}
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
  if (w === 'loading') wikiPart = '<span class="sk sk-l"></span><span class="sk sk-l"></span><span class="sk sk-s"></span>';
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
    <div class="warn" style="display:block;background:#EEF2FA;color:var(--ink);margin:10px 0"><b>הידעת?</b> ${esc(st.fact)}</div>
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
    ${[['#places', 'list', 'המקומות', 'עריכה והעברה בין ימים', '#2453C9'], ['#expenses', 'coin', 'הוצאות', `€${Math.round(spent())} מתוך €${S.budget}`, '#E8553D'], ['#packing', 'bag', 'ציוד', `${packCount()}`, '#1E9E8F'], ['#flights', 'plane', 'טיסות', S.flights.back.time ? `חזרה ${S.flights.back.time}` : 'הוסף פרטי טיסה', '#13213D'], ['#transport', 'metro', 'תחבורה', 'מהשדה, כרטיסים, מטרו', '#2453C9'], ['#phrases', 'chat', 'ספרדית', 'משפטים עם השמעה', '#C2417F'], ['#shopping', 'tag', 'קניות', S.wish && S.wish.length ? `${S.wish.length} ברשימה` : 'רשימה, מחירים, חנויות', '#D99400'], ['#weather', 'sun', 'מזג אוויר', weather ? 'תחזית לימי הטיול' : 'ממוצע ושקיעות', '#2453C9'], ['#tickets', 'ticket', 'כרטיסים', (() => { const n = allStops().filter((o) => needsBooking(o.st)).length; return n ? `${n} צריך להזמין` : 'הזמנות ושעות'; })(), '#13213D'], ['#events', 'party', 'אירועים', 'חגים ושווקי חג', '#C2417F'], ['#journal', 'book', 'יומן', S.journal.length ? `${S.journal.length} זיכרונות` : 'תמונות וזיכרונות', '#1E9E8F'], ['#card', 'card', 'כרטיס תזונה', 'צליאק וטבעוני בספרדית', '#2453C9'], ['#emergency', 'sos', 'חירום', '112 · ביטוח · בית מרקחת', '#E8553D']]
      .map(([h, k, t, s, c]) => `<a class="tool" href="${h}"><span class="tile" style="--c:${c}">${ic(k)}</span><span class="grow"><b>${t}</b><span>${esc(s)}</span></span></a>`).join('')}
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
/* events */
V.events = () => pageHead('חגים ואירועים', 'מה קורה בעיר ב־13–17.12', '#more') + `<div class="section">
  <div class="card" style="background:#E6F6F3"><b>חגים:</b> ${esc(T.holidays.note)} <a class="muted" href="${T.holidays.src}" target="_blank" rel="noopener">מקור</a></div>
  <h2>בימים שלך</h2>
  ${T.events.filter((e) => e.from <= '2026-12-17' && e.to >= '2026-12-13').map((e, n) => { const r = evRec(e); const days = META.filter((m) => e.from <= m.date && m.date <= e.to).map((m) => m.short); const st = inRoute(r); return `<div class="card pop" style="display:flex;flex-direction:column;gap:6px">
    <div class="row"><span class="tile ${ROT[n % 4]}" style="--c:#D99400">${ic(e.kind)}</span><a class="grow" href="#place/r/${r.id}" style="text-decoration:none;color:inherit"><b>${esc(e.he)}</b><div class="muted" dir="ltr" style="text-align:right">${esc(e.name)}</div></a></div>
    <div style="font-size:14px">${esc(e.note)}</div>
    <div class="muted">${days.length === 5 ? 'כל ימי הטיול' : 'בימים ' + days.join(', ')} · ${esc(e.hours)}${e.approx ? ' · <b>תאריכי 2026 משוערים, יתפרסמו קרוב לעונה</b>' : ''}</div>
    <div class="row"><a class="btn soft sm grow" href="${gmDir(null, e, 'walking')}" target="_blank" rel="noopener">${ic('pin')}ניווט</a>${st ? `<a class="btn soft sm grow" href="#place/${st.di}/${st.st.id}">✓ ביום ${META[st.di].short}</a>` : `<button class="btn sun sm grow" data-act="recAdd" data-id="${r.id}">${ic('plus')}הוסף ליום…</button>`}${e.url ? `<a class="icon-btn" href="${esc(e.url)}" target="_blank" rel="noopener" aria-label="אתר">${ic('link')}</a>` : ''}</div></div>`; }).join('')}
  <h2>שווה לדעת</h2>
  ${T.eventsNear.map((e) => `<a class="card row" href="${esc(e.url)}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><div class="grow"><b>${esc(e.name)}</b><div class="muted">${esc(e.when)} · ${esc(e.why)}</div></div>${ic('link')}</a>`).join('')}
  <span class="muted">נבדק ב־11.11.2026. כדאי לבדוק שוב באתרים הרשמיים כשבוע לפני הטיול.</span></div>`;

/* tickets */
V.tickets = () => {
  const rows = allStops().filter((o) => !o.st.hotelRef && (bookingFor(o.st) || o.st.time || (o.st.booking && (o.st.booking.booked || o.st.booking.ref))));
  const need = rows.filter((o) => needsBooking(o.st));
  return pageHead('כרטיסים והזמנות', need.length ? `${need.length} עוד לא הוזמנו` : 'הכל מסודר', '#more') + `<div class="section">
  ${need.length ? `<div class="warn">${ic('warn')}<span>בדצמבר הכרטיסים לסגרדה פמיליה ולפארק גואל נגמרים. כדאי להזמין עכשיו, ולסמן כאן עם השעה.</span></div>` : ''}
  ${rows.length ? rows.map(({ st, di }) => { const b = bookingFor(st); const bk = st.booking || {}; return `<div class="card row" style="align-items:flex-start;border-inline-start:5px solid ${bk.booked ? 'var(--teal)' : b ? 'var(--sun)' : 'var(--line)'}">
    <span class="tile" style="--c:${META[di].color}">${ic('ticket')}</span>
    <a class="grow" href="#place/${di}/${st.id}" style="text-decoration:none;color:inherit"><b>${esc(st.name)}</b><div class="muted">${META[di].short} ${META[di].num}.12${st.time ? ` · כניסה ${esc(st.time)}` : ' · עוד בלי שעה'}${bk.ref ? ` · ${esc(bk.ref)}` : ''}</div>
    <div>${bk.booked ? '<span class="badge" style="color:var(--teal)">✓ הוזמן</span>' : b ? '<span class="badge" style="color:#8A4B00">צריך להזמין</span>' : ''}${(bk.files || []).length ? ` <span class="badge">📎 ${bk.files.length} קבצים</span>` : ''}</div></a>
    <div style="display:flex;flex-direction:column;gap:6px">${b && !bk.booked ? `<a class="icon-btn" href="${esc(b.url)}" target="_blank" rel="noopener" aria-label="להזמנה">${ic('link')}</a>` : ''}<button class="icon-btn" data-act="bookEdit" data-d="${di}" data-id="${st.id}" aria-label="עריכה">${ic('pen')}</button></div></div>`; }).join('') : '<div class="card muted">אין עדיין כרטיסים. בכל עמוד מקום אפשר להוסיף כרטיס או הזמנה עם שעה.</div>'}
  <span class="muted">שעת הכניסה שתזין נכנסת לציר הזמן של היום, והאפליקציה מתריעה אם לא תספיק להגיע.</span></div>`;
};

/* journal */
// The journal as a vertical journey: each day, its places as steps on one line, memories and photos on the steps
let jmap = null;
function tripStats() {
  let walk = 0, places = 0;
  S.days.forEach((d) => { const v = d.stops.filter((x) => x.visited && hasGeo(x)); places += d.stops.filter((x) => x.visited).length; v.forEach((x, k) => { if (k) { const L = legInfo(v[k - 1], x); if ((S.legs[v[k - 1].id + '>' + x.id] || L.rec) === 'walk') walk += L.k * 1.3; } }); });
  const photos = S.journal.reduce((t, j) => t + (j.photos || []).length, 0);
  return { walk, places, photos, memories: S.journal.length };
}
V.journal = () => {
  const st = tripStats(); const daysWith = META.filter((m, di) => S.days[di].stops.some((x) => x.visited) || S.journal.some((j) => j.di === di)).length;
  const fmtTime = (t) => new Date(t).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
  return pageHead('יומן הטיול', 'המסע שלך, צעד אחרי צעד') + `<div class="section">
  <div class="jstats">${[['ימים', daysWith, ''], ['מקומות', st.places, ''], ['ק״מ ברגל', st.walk, '1'], ['תמונות', st.photos, '']].map(([k, v, dec]) => `<div><b data-count="${v}" data-dec="${dec}">0</b><span>${k}</span></div>`).join('')}</div>
  <div id="jmap" class="jmap" aria-label="מפת המסע"></div>
  <div class="journey">
  ${META.map((m, di) => {
    const stops = S.days[di].stops.filter((x) => !x.hotelRef); const done = stops.filter((x) => x.visited).length;
    const loose = S.journal.filter((j) => j.di === di && !j.stopId);
    let html = `<div class="jday" style="--c:${m.color}"><div class="jd-node"><b>${m.num}</b><small>${m.short}</small></div>
      <div class="jd-body"><b>${esc(m.title)}</b><span class="muted">${done} מתוך ${stops.length} מקומות${done ? ' · ' + (done === stops.length ? 'יום מלא ✓' : 'בדרך') : ''}</span></div>
      <button class="add" data-act="journalAdd" data-d="${di}" aria-label="זיכרון ליום">${ic('camera')}</button></div>`;
    stops.forEach((x, k) => {
      const ents = S.journal.filter((j) => j.stopId === x.id); const pics = ents.flatMap((j) => (j.photos || []).map((f) => ({ f, j })));
      const nx = stops[k + 1]; const L = nx && hasGeo(x) && hasGeo(nx) ? legInfo(x, nx) : null;
      html += `<div class="jstep ${x.visited ? 'done' : 'todo'}" style="--c:${m.color}"><div class="js-node">${x.visited ? ic('check') : ''}</div>
        <details class="js-card" ${ents.length ? 'open' : ''}><summary><span class="tkind">${ic(x.kind)}</span><span class="grow"><b>${esc(x.name)}</b><span class="muted">${x.visited ? 'ביקרת ב־' + fmtTime(x.visited) : 'עוד לא'}${ents.length ? ` · ${ents.length} זיכרונות` : ''}</span></span>${pics[0] ? `<img data-file="${pics[0].f.id}" alt="" class="js-thumb">` : ''}</summary>
          ${pics.length ? `<div class="js-photos">${pics.map((p, n) => `<img data-file="${p.f.id}" alt="תמונה מהיומן" data-act="jPhoto" data-j="${p.j.id}" data-i="${(p.j.photos || []).indexOf(p.f)}">`).join('')}</div>` : ''}
          ${ents.filter((j) => j.text).map((j) => `<p class="js-text">“${esc(j.text)}”<span class="muted"> · ${fmtTime(j.at)}</span></p>`).join('')}
          <div class="edrow"><button class="chipbtn ${x.visited ? 'on' : ''}" data-act="visited" data-d="${di}" data-id="${x.id}">${ic('check')}${x.visited ? 'ביקרתי' : 'ביקרתי?'}</button><button class="chipbtn" data-act="journalAdd" data-d="${di}" data-id="${x.id}">${ic('camera')}זיכרון</button><a class="chipbtn" href="#place/${di}/${x.id}">לעמוד המקום</a></div>
        </details></div>`;
      if (L) html += `<div class="jgap" style="--c:${m.color}">${ic('walk')}${fmtKm(L.k * 1.3)} · ${L.walk} דק׳ ברגל</div>`;
    });
    loose.forEach((j) => { html += `<div class="jstep done note" style="--c:${m.color}"><div class="js-node">${ic('book')}</div><div class="js-card open">${(j.photos || []).length ? `<div class="js-photos">${j.photos.map((f, n) => `<img data-file="${f.id}" alt="" data-act="jPhoto" data-j="${j.id}" data-i="${n}">`).join('')}</div>` : ''}${j.text ? `<p class="js-text">“${esc(j.text)}”<span class="muted"> · ${fmtTime(j.at)}</span></p>` : ''}<div class="edrow"><button class="chipbtn danger" data-act="jDel" data-id="${j.id}">${ic('trash')}</button></div></div></div>`; });
    return html;
  }).join('')}
  <div class="jend"><a class="btn sun" href="#summary">${ic('star')}סיכום הטיול</a></div>
  </div></div>`;
};
function mountJournal() {
  // count-up numbers
  document.querySelectorAll('[data-count]').forEach((el) => { const to = +el.dataset.count; const dec = el.dataset.dec ? 1 : 0; const t0 = performance.now(); const step = (t) => { const k = Math.min(1, (t - t0) / 700); el.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(dec); if (k < 1) requestAnimationFrame(step); }; if (reduced()) el.textContent = to.toFixed(dec); else requestAnimationFrame(step); });
  if (!window.L || !$('#jmap')) return;
  jmap = L.map('jmap', { zoomControl: false, attributionControl: false, scrollWheelZoom: false }).setView([41.39, 2.17], 12);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(jmap);
  const all = [];
  S.days.forEach((d, di) => {
    const pts = d.stops.filter((x) => hasGeo(x) && !x.hotelRef); if (!pts.length) return;
    L.polyline(pts.map((x) => [x.lat, x.lng]), { color: META[di].color, weight: 3, opacity: 0.8, dashArray: '1 7', lineCap: 'round' }).addTo(jmap);
    pts.forEach((x) => { all.push([x.lat, x.lng]); L.circleMarker([x.lat, x.lng], { radius: x.visited ? 6 : 4, color: '#fff', weight: 2, fillColor: META[di].color, fillOpacity: x.visited ? 1 : 0.45 }).addTo(jmap); });
  });
  if (all.length) jmap.fitBounds(all, { padding: [20, 20], maxZoom: 14, animate: false });
  const m = jmap; setTimeout(() => { if (jmap === m && document.body.contains(m.getContainer())) m.invalidateSize({ animate: false }); }, 250);
}
V.summary = () => {
  let walkKm = 0; const visited = [];
  S.days.forEach((d, di) => { const v = d.stops.filter((x) => x.visited && hasGeo(x)); v.forEach((x, k) => { visited.push({ x, di }); if (k) { const pv = v[k - 1]; const L = legInfo(pv, x); if ((S.legs[pv.id + '>' + x.id] || L.rec) === 'walk') walkKm += L.k * 1.3; } }); });
  const photos = S.journal.flatMap((j) => (j.photos || []).map((f) => f.id)).slice(0, 24);
  return pageHead('סיכום הטיול', 'ברצלונה · 13–17.12.2026', '#journal') + `<div class="section">
  <div class="grid2">${[['מקומות', visited.length], ['ק״מ ברגל (בערך)', walkKm.toFixed(1)], ['זיכרונות', S.journal.length], ['הוצאות', '€' + Math.round(spent())]].map(([k, v], n) => `<div class="big" style="--c:${['#2453C9', '#1E9E8F', '#C2417F', '#E8553D'][n]};min-height:80px"><b>${v}</b><span>${k}</span></div>`).join('')}</div>
  ${photos.length ? `<div class="gallery">${photos.map((id) => `<img data-file="${id}" alt="">`).join('')}</div>` : ''}
  ${META.map((m, di) => { const v = S.days[di].stops.filter((x) => x.visited); const j = S.journal.filter((x) => x.di === di && x.text); return v.length || j.length ? `<div class="card"><b style="color:${m.color}">${m.short} ${m.num}.12 · ${esc(m.title)}</b><div class="muted">${v.map((x) => esc(x.name)).join(' · ')}</div>${j.slice(0, 2).map((x) => `<div style="font-size:14px;margin-top:4px">“${esc(cut(x.text, 140))}”</div>`).join('')}</div>` : ''; }).join('')}
  <button class="btn sun" data-act="shareSummary">שתף את הסיכום</button>
  <span class="muted">הק״מ מחושבים לפי המרחק בין המקומות שסימנת שביקרת, במקטעים שבחרת ללכת ברגל.</span></div>`;
};

/* diet card */
const CARD = {
  es: { celiac: 'Tengo celiaquía. No puedo comer gluten: trigo, cebada, centeno ni avena, ni siquiera trazas.', cross: 'Por favor, eviten la contaminación cruzada: la misma freidora, plancha, tabla, utensilios o harina.', vegan: 'No como ningún producto de origen animal: carne, pescado, marisco, huevos, leche, queso, mantequilla ni miel.', ask: '¿Qué platos puedo comer? ¡Muchas gracias!' },
  ca: { celiac: 'Tinc celiaquia. No puc menjar gluten: blat, ordi, sègol ni civada, ni tan sols traces.', cross: 'Si us plau, eviteu la contaminació creuada: la mateixa fregidora, planxa, taulell, estris o farina.', vegan: 'No menjo cap producte d’origen animal: carn, peix, marisc, ous, llet, formatge, mantega ni mel.', ask: 'Quins plats puc menjar? Moltes gràcies!' },
  en: { celiac: 'I have celiac disease. I cannot eat gluten: wheat, barley, rye or oats, not even traces.', cross: 'Please avoid cross-contamination: the same fryer, grill, board, utensils or flour.', vegan: 'I do not eat any animal products: meat, fish, seafood, eggs, milk, cheese, butter or honey.', ask: 'Which dishes can I eat? Thank you very much!' }
};
const CARD_Q = [['¿Tiene opciones sin gluten?', 'יש לכם אפשרויות ללא גלוטן?'], ['¿Se fríe en un aceite aparte?', 'מטגנים בשמן נפרד?'], ['¿Lleva huevo, leche o mantequilla?', 'יש בזה ביצה, חלב או חמאה?'], ['¿La salsa lleva harina o soja?', 'יש ברוטב קמח או סויה?'], ['¿Es apto para veganos?', 'זה מתאים לטבעונים?']];
const HIDDEN = ['קרוקטס (croquetas) ומשהו "rebozado" (מצופה): קמח ופירורי לחם', 'פטטס בראבס וצ׳יפס: לרוב מטוגנים באותו שמן עם מצופים', 'סייטן (seitán): עשוי מגלוטן חיטה, לא מתאים לצליאקים', 'רוטב סויה רגיל: מכיל חיטה. לבקש tamari sin gluten', 'בירה (cerveza): יש שעורה. לבקש cerveza sin gluten', 'פאייה וטורטייה: בדרך כלל בלי גלוטן, אבל לשאול על ציר וביצים'];
V.card = () => {
  const D = S.diet; const L = CARD[D.lang] || CARD.es;
  return pageHead('כרטיס למלצר', 'להראות את המסך בזמן ההזמנה', '#more') + `<div class="section">
  <div class="row"><button class="pill ${D.celiac ? 'on' : ''}" style="--c:var(--teal)" data-act="dietT" data-k="celiac">ללא גלוטן (צליאק)</button><button class="pill ${D.vegan ? 'on' : ''}" style="--c:var(--teal)" data-act="dietT" data-k="vegan">טבעוני</button></div>
  <div class="seg" style="display:grid;grid-template-columns:repeat(3,1fr)">${[['es', 'Español'], ['ca', 'Català'], ['en', 'English']].map(([k, t]) => `<button class="${D.lang === k ? 'on' : ''}" data-act="dietL" data-k="${k}">${t}</button>`).join('')}</div>
  <div class="dcard" dir="ltr" lang="${D.lang}">${D.celiac ? `<p><b>${esc(L.celiac)}</b></p><p>${esc(L.cross)}</p>` : ''}${D.vegan ? `<p><b>${esc(L.vegan)}</b></p>` : ''}<p>${esc(L.ask)}</p></div>
  <div class="row"><button class="btn sun grow" data-act="cardFull">מסך מלא</button><button class="btn soft grow" data-act="say" data-t="${esc([D.celiac ? CARD.es.celiac + ' ' + CARD.es.cross : '', D.vegan ? CARD.es.vegan : '', CARD.es.ask].join(' '))}">${ic('speaker')}השמע בספרדית</button></div>
  <h2>שאלות קצרות</h2>
  ${CARD_Q.map(([es, he], k) => `<div class="card row"><div class="grow"><div class="muted">${esc(he)}</div><div dir="ltr" style="font-weight:800;text-align:right">${esc(es)}</div></div><button class="icon-btn ${ROT[k % 4]}" style="background:var(--teal);color:#fff;width:44px;height:44px" data-act="say" data-t="${esc(es)}" aria-label="השמעה">${ic('speaker')}</button></div>`).join('')}
  ${D.celiac ? `<h2>גלוטן נסתר באוכל הספרדי</h2><div class="card" style="font-size:14px;display:flex;flex-direction:column;gap:4px">${HIDDEN.map((h) => '• ' + esc(h)).join('<br>')}</div>` : ''}
  <span class="muted">הכרטיס שמור בטלפון ועובד גם בלי אינטרנט. לא מחליף שאלה ישירה במקום.</span></div>`;
};

/* weather */
V.weather = () => {
  const have = !!weather; const dtf = daysToFlight();
  return pageHead('מזג אוויר', have ? 'תחזית לימי הטיול' : 'ממוצע 10 השנים האחרונות לאותם תאריכים', '#more') + `<div class="section">
  ${have ? '' : `<div class="warn" style="background:#EEF2FA;color:var(--ink)">${ic('warn')}<span>התחזית האמיתית נפתחת כ־16 יום לפני הטיול${dtf > 16 ? `, בעוד ${dtf - 16} ימים` : ''}. עד אז מוצג מה שהיה בממוצע ב־13–17 בדצמבר בשנים האחרונות.</span></div>`}
  ${META.map((m, k) => {
    const f = weather && weather[m.date]; const c = climOf(m.date);
    const mx = f ? f.max : c && c.max, mn = f ? f.min : c && c.min, rain = f ? f.rain : c ? c.rainy : 0;
    const [emo, desc] = f ? WMO(f.code) : ['', 'ממוצע'];
    const sunset = (f && f.sunset) || (c && c.sunset); const sunrise = (f && f.sunrise) || (c && c.sunrise);
    const view = S.days[k].stops.find((s) => s.kind === 'view');
    return `<div class="card pop" style="display:flex;flex-direction:column;gap:8px;border-top:5px solid ${m.color}">
      <div class="row"><div class="grow"><div style="font-weight:800">${m.short} ${m.num}.12 · ${esc(m.title)}</div><div class="muted">${desc}${f ? ` · רוח עד ${f.wind} קמ״ש` : c ? ` · לפי ${c.years} שנים` : ''}</div></div>
      ${mx != null ? `<div style="text-align:left"><div style="font:700 34px var(--display);line-height:.9">${emo} ${mx}°</div><div class="muted">לילה ${mn}°</div></div>` : '<span class="muted">טוען…</span>'}</div>
      ${mx != null ? `<div class="row" style="gap:6px;flex-wrap:wrap"><span class="badge" style="color:${rain >= 40 ? 'var(--red)' : 'var(--teal)'}">${f ? `${rain}% סיכוי לגשם` : `גשם ב־${rain}% מהשנים`}</span>${sunrise ? `<span class="badge">זריחה ${sunrise}</span>` : ''}${sunset ? `<span class="badge" style="color:#8A4B00">שקיעה ${sunset}</span>` : ''}</div>` : ''}
      ${f && f.hours && f.hours.length ? `<div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">${f.hours.map((h) => `<div style="flex:none;text-align:center;background:#F3F5FA;border-radius:12px;padding:6px 8px;min-width:48px"><div class="muted">${String(h.h).padStart(2, '0')}:00</div><div>${WMO(h.c)[0]}</div><div style="font-weight:800">${h.t}°</div>${h.p >= 20 ? `<div style="font-size:11px;color:var(--blue)">${h.p}%</div>` : ''}</div>`).join('')}</div>` : ''}
      ${mx != null ? `<div style="font-size:14px">${wear(mx, mn, rain).map((t) => '• ' + t).join('<br>')}</div>` : ''}
      ${sunset && view ? `<div class="warn" style="display:block;background:#FFF4D6"><b>שקיעה ב־${sunset}:</b> ביום הזה יש תצפית (${esc(view.name)}). כדאי להגיע אליה כחצי שעה לפני.</div>` : ''}
      ${f && f.rain >= 60 && S.days[k].stops.some((s) => ['park', 'view'].includes(s.kind)) ? `<div class="warn">${ic('warn')}<span>צפוי גשם, וביום הזה יש מקומות בחוץ. אפשר להחליף ימים בעריכת המקומות.</span></div>` : ''}
    </div>`;
  }).join('')}
  ${(() => { const rainy = META.some((m) => { const f = weather && weather[m.date]; const c = climOf(m.date); return f ? f.rain >= 40 : c && c.rainy >= 25; }); const hasUmb = S.packing.some((g) => g.items.some((x) => /מטרי/.test(x.t))); return rainy && !hasUmb ? `<button class="btn sun" data-act="addUmbrella">${ic('plus')}הוסף מטרייה לרשימת הציוד</button>` : ''; })()}
  <span class="muted">תחזית: Open-Meteo. ממוצעים: ארכיון Open-Meteo, 2015–2025.</span></div>`;
};

/* shopping */
const BRANDS = ['Zara', 'Mango', 'Uniqlo', 'Pull&Bear', 'Massimo Dutti', 'Bershka', 'H&M', 'אחר'];
const REFUND = 0.13; // tax free: about 13% back after fees (conservative)
function wishCalc(w) {
  const r = rate ? rate.v : 3.9; if (!w.es) return null;
  const esIls = w.es * r; const net = esIls * (1 - REFUND);
  return { esIls, net, save: w.il ? w.il - net : null };
}
let shopDay = null;
V.shopping = () => {
  if (!S.wish) S.wish = [];
  const shopIdx = S.days.map((d, k) => k).filter((k) => S.days[k].stops.some((x) => x.kind === 'shop'));
  const di = shopDay ?? shopIdx.find((k) => dow(META[k].date) !== 0) ?? shopIdx[0] ?? curIdx();
  const c = S.days[di].stops.find((s) => s.kind === 'shop' && hasGeo(s)) || S.days[di].stops.find((s) => hasGeo(s) && !s.hotelRef);
  const res = c && window.Enrich ? loadLive('shop', c) : null;
  const rows = res && res.items ? rankRecs(res.items, c) : [];
  const total = S.wish.reduce((a, w) => { const k = wishCalc(w); return a + (k && k.save ? k.save : 0); }, 0);
  return pageHead('קניות', 'רשימת קניות, מחירים, חנויות ומבצעים', '#more') + `<div class="section">
  <div class="row"><h2 class="grow">רשימת הקניות שלי</h2><button class="btn sun sm" data-act="wishAdd">${ic('plus')}פריט</button></div>
  ${S.wish.length ? S.wish.map((w) => { const k = wishCalc(w); const down = w.prev && w.es < w.prev; const up = w.prev && w.es > w.prev;
    return `<div class="card pop" style="display:flex;flex-direction:column;gap:6px;${w.bought ? 'opacity:.6' : ''}">
      <div class="row"><div class="grow"><div style="font-size:11px;font-weight:800;color:var(--pink)">${esc(w.brand || '')}</div><div style="font-weight:800;font-size:16px">${w.bought ? '✓ ' : ''}${esc(w.name)}</div>
      <div class="muted">${w.es ? `בספרד €${w.es}` : 'אין עדיין מחיר בספרד'}${down ? ` <span class="badge" style="color:var(--teal)">ירד מ־€${w.prev}</span>` : up ? ` <span class="badge" style="color:var(--red)">עלה מ־€${w.prev}</span>` : ''}${w.il ? ` · בארץ ₪${w.il}` : ''}</div></div>
      <button class="icon-btn" data-act="wishEdit" data-id="${w.id}" aria-label="עריכה">${ic('pen')}</button></div>
      ${k ? `<div style="font-size:14px">אחרי החזר מע״מ: <b>₪${Math.round(k.net)}</b>${k.save != null ? ` · ${k.save > 0 ? `<b style="color:var(--teal)">חוסך ₪${Math.round(k.save)} מול הארץ</b>` : `<b style="color:var(--red)">יקר ב־₪${Math.round(-k.save)} מהארץ</b>`}` : ''}</div>` : ''}
      <div class="row">${w.url ? `<a class="btn soft sm grow" href="${esc(w.url)}" target="_blank" rel="noopener">${ic('link')}בדוק מחיר באתר</a>` : ''}<button class="btn soft sm grow" data-act="wishPrice" data-id="${w.id}">עדכן מחיר</button><button class="btn ${w.bought ? 'navy' : 'sun'} sm grow" data-act="wishBought" data-id="${w.id}">${w.bought ? 'בוטל: לא קניתי' : 'קניתי'}</button></div></div>`; }).join('')
    : '<div class="card muted">הוסף פריטים שאתה רוצה לקנות, עם מחיר בארץ ומחיר באתר הספרדי. האפליקציה תחשב אם משתלם, תעקוב אחרי שינויי מחיר שתעדכן, ותכניס להוצאות כשתקנה.</div>'}
  ${total > 0 ? `<div class="card" style="background:#E6F6F3"><b>סה״כ חיסכון צפוי ברשימה: ₪${Math.round(total)}</b><div class="muted">לפי שער ${rate ? rate.v.toFixed(2) : '≈3.9'} והחזר מע״מ של כ־13%</div></div>` : ''}

  <h2>חנויות ליד המסלול</h2>
  <div class="pills">${META.map((m, k) => `<button class="pill ${k === di ? 'on' : ''}" style="--c:${m.color}" data-act="shopDay" data-i="${k}">${m.short} ${m.num}</button>`).join('')}</div>
  ${!c ? '<div class="card muted">אין מקומות עם מיקום ביום הזה.</div>' : res && res.loading ? '<div class="card muted">מחפש חנויות…</div>' : res && res.err ? '<div class="card muted">החיפוש החי לא זמין כרגע (צריך אינטרנט).</div>' : rows.length ? recList(rows.slice(0, 12).map((x, n) => recRow(x, n, { color: '#D99400', why: `${x.r.brand || whatHe(x.r)} · ${fmtKm(x.d)}` }))) : '<div class="card muted">לא מצאתי חנויות רשת בטווח של כקילומטר וחצי.</div>'}
  ${c ? `<span class="muted">סביב ${esc(c.name)} · חנויות רשת מ־OpenStreetMap, עם סימון פתוח או סגור עכשיו</span>` : ''}
  ${dow(META[di].date) === 0 ? `<div class="warn">${ic('warn')}<span>ביום ראשון רוב החנויות סגורות.</span></div>` : ''}

  <h2>מתי יש מבצעים</h2>
  <div class="card" style="display:flex;flex-direction:column;gap:6px;font-size:14px">
    <div><b>בלאק פריידי, 27.11.2026:</b> לפני הטיול. כדאי לבדוק את הרשימה באתרים הספרדיים, ולעדכן כאן את המחירים.</div>
    <div><b>13–17.12:</b> בדרך כלל אין מבצע כללי, רק מבצעי חג נקודתיים.</div>
    <div><b>Rebajas, מ־7.1:</b> עונת המבצעים הגדולה, אחרי הטיול.</div></div>
  <div class="next" style="margin:0;background:var(--sun);color:var(--ink)"><div style="font-family:var(--display);font-size:32px;line-height:.9">החזר מע״מ = ההנחה הכי בטוחה</div><div style="font-size:14px">המע״מ על בגדים בספרד הוא 21%, ולתיירים מחוץ לאיחוד אין סכום מינימום. בקשו בקופה טופס tax free (מראים דרכון), ובשדה, לפני הבידוק, מאשרים אותו במכונת DIVA. אחרי עמלות חוזרים בדרך כלל 13%–16% מהמחיר.</div></div>
  <div class="grid2">${[['ZARA', 'https://www.zara.com/es/', '#13213D'], ['MANGO', 'https://shop.mango.com/es', '#E8553D'], ['UNIQLO', 'https://www.uniqlo.com/es/es/', '#E8553D'], ['Pull&Bear', 'https://www.pullandbear.com/es/', '#2453C9']].map(([n, u, c]) => `<a class="card" href="${u}" target="_blank" rel="noopener" style="text-decoration:none;display:flex;flex-direction:column;gap:6px"><b style="font-family:var(--display);font-size:30px;line-height:.9;color:${c}">${esc(n)}</b><span class="muted">לאתר הספרדי ←</span></a>`).join('')}</div>
  <span class="muted">אתרי החברות לא מאפשרים לאפליקציות לקרוא מחירים, ולכן את המחיר מעדכנים בלחיצה, והאפליקציה עוקבת אחרי השינוי.</span></div>`;
};
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

/* ---------- moving between days (tap or swipe) ---------- */
function goDay(k) {
  const cur = curIdx(); if (k === cur || k < 0 || k >= META.length) return;
  lastDay = cur; S.dayIdx = k; save(); haptic(8);
  withTransition(k > cur ? 'day-next' : 'day-prev', render);
}
(() => {
  let x0 = null, y0 = 0;
  document.addEventListener('touchstart', (e) => { const h = location.hash || '#today'; if (!['#today', ''].includes(h) || e.target.closest('.days,.lg,input,.leaflet-container,#sheet')) { x0 = null; return; } x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) goDay(curIdx() + (dx < 0 ? 1 : -1)); // RTL: swipe left = next day
  }, { passive: true });
})();

/* ---------- render + routing ---------- */
function render() {
  const h = (location.hash || '#today').slice(1); const [name, ...args] = h.split('/');
  const view = V[name] || V.today;
  const top = ['today', 'map', 'discover', 'saved', 'more'];
  const tab = top.includes(name) ? name : name === 'place' && args[0] === 's' ? 'saved' : (['place', 'places'].includes(name) ? 'today' : 'more');
  document.querySelectorAll('.tabbar a').forEach((a) => a.classList.toggle('on', a.dataset.tab === tab));
  $('.tabbar').style.setProperty('--t', String(top.indexOf(tab)));
  document.body.classList.toggle('detail', name === 'place');
  document.body.classList.toggle('on-map', name === 'map');
  if (name !== 'map' && map) { map.remove(); map = null; layer = null; }
  if (jmap) { jmap.remove(); jmap = null; }
  if (name === 'map' && map) { drawMarkers(false); renderMapSheet(); return; } // keep leaflet alive, refresh what changed
  if (!['place'].includes(name)) setDayColor(curIdx());
  $('#app').innerHTML = view(...args);
  if (name === 'map') mountMap();
  if (name === 'journal') mountJournal();
  if (name === 'discover') bindGemSwipe();
  hydrateFiles();
  const ind = $('.dind'); if (ind) requestAnimationFrame(() => requestAnimationFrame(() => { ind.style.setProperty('--x', String(curIdx())); ind.style.setProperty('--c', META[curIdx()].color); }));
  lastDay = null;
  onScroll();
}
// Screen changes: slide forward/back, fade between tabs, morph a card into its page
function withTransition(type, fn) {
  if (!document.startViewTransition || reduced()) { fn(); return null; }
  document.documentElement.dataset.nav = type;
  const vt = document.startViewTransition(() => fn());
  vt.ready.catch(() => {}); vt.updateCallbackDone.catch(() => {});
  vt.finished.catch(() => {}).finally(() => { delete document.documentElement.dataset.nav; document.querySelectorAll('[style*="view-transition-name"]').forEach((el) => { if (el.style.viewTransitionName === 'place-hero') el.style.viewTransitionName = ''; }); });
  return vt;
}
const TOPS = ['#today', '#map', '#discover', '#saved', '#more', ''];
const navStack = [location.hash || '#today']; const scrollPos = {}; let lastPlace = null;
function onScroll() {
  const y = window.scrollY; document.body.classList.toggle('scrolled', y > 64);
  const img = document.querySelector('.dh-img, .hero-img'); if (img && !reduced()) img.style.transform = `translateY(${Math.min(y, 400) * 0.35}px) scale(${1 + Math.min(y, 300) / 3000})`;
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('hashchange', () => {
  const h = location.hash || '#today'; const prev = navStack[navStack.length - 1];
  scrollPos[prev] = window.scrollY;
  let dir;
  if (navStack.length > 1 && navStack[navStack.length - 2] === h) { navStack.pop(); dir = 'back'; }
  else if (TOPS.includes(h) && TOPS.includes(prev)) { navStack.length = 0; navStack.push(h); dir = 'tab'; }
  else { navStack.push(h); dir = 'forward'; }
  closeSheet(); A.lbClose();
  withTransition(dir, () => {
    render();
    window.scrollTo(0, dir === 'back' ? (scrollPos[h] || 0) : 0);
    if (dir === 'back' && lastPlace) { const el = document.querySelector(`[data-pid="${lastPlace}"]`); if (el) el.style.viewTransitionName = 'place-hero'; }
  });
});

/* ---------- sheets ---------- */
function placeSheet(di, si) {
  const editing = si != null; const s = editing ? S.days[di].stops[si] : { name: '', note: '' };
  let pick = editing && hasGeo(s) ? { lat: s.lat, lng: s.lng } : null; let day = di;
  sheet(`<h3>${editing ? 'עריכת מקום' : 'מקום חדש'}</h3>
    <label class="lab">שם המקום<input class="field" id="pl-name" value="${esc(s.name)}" placeholder="למשל: Bunkers del Carmel"></label>
    <div class="row"><button class="btn soft sm" data-act="plSearch">חפש מיקום במפה</button><span class="muted grow" id="pl-geo">${pick ? 'יש מיקום ✓' : 'בלי מיקום, הניווט יחפש לפי השם'}</span></div>
    <div id="pl-results" style="display:flex;flex-direction:column;gap:6px"></div>
    <label class="lab">הערה<input class="field" id="pl-note" value="${esc(s.note || '')}" placeholder="מה לא לפספס"></label>
    <div class="grid2"><label class="lab">שעת כניסה קבועה<input class="field" type="time" id="pl-time" value="${esc(s.time || '')}"></label><label class="lab">כמה זמן להישאר (דק׳)<input class="field" id="pl-dur" inputmode="numeric" value="${editing ? durOf(s) : ''}" placeholder="אוטומטי"></label></div>
    <span class="muted" style="margin-top:-6px">שעה קבועה = כרטיס, הזמנה במסעדה או מופע. ציר הזמן של היום מסתדר סביבה.</span>
    <div class="lab">סוג המקום<div class="pills" id="pl-kinds" style="flex-wrap:wrap">${[['star','כללי'],['food','אוכל'],['bar','בר'],['gaudi','גאודי'],['view','תצפית'],['park','פארק'],['market','שוק'],['shop','קניות'],['show','מופע'],['walk','סיור'],['port','ים'],['hotel','מלון']].map(([k, t]) => `<button class="pill ${(s.kind || 'star') === k ? 'on' : ''}" style="--c:var(--navy)" data-act="plKind" data-k="${k}">${t}</button>`).join('')}</div></div>
    <div class="lab">באיזה יום?<div class="row" id="pl-days">${META.map((m, k) => `<button class="pill ${k === di ? 'on' : ''}" style="--c:${m.color};flex:1" data-act="plDay" data-i="${k}">${m.num}.12</button>`).join('')}</div></div>
    <div class="row"><button class="btn sun grow" data-act="plSave">שמירה</button><button class="btn soft" data-act="closeSheet">ביטול</button></div>`);
  sheetCtx = { kind: 'place', kindSel: s.kind || 'star', di, si, get pick() { return pick; }, set pick(v) { pick = v; }, get day() { return day; }, set day(v) { day = v; } };
}
let sheetCtx = null;

/* ---------- actions ---------- */
const A = {
  closeSheet,
  day: (e) => goDay(+e.dataset.i),
  leg: (e) => { S.legs[e.dataset.k] = e.dataset.m; save(); render(); },
  sortDay: (e) => {
    const i = e && e.dataset && e.dataset.d != null ? +e.dataset.d : curIdx(); const st = S.days[i].stops; const geo = st.filter(hasGeo); const rest = st.filter((s) => !hasGeo(s));
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
  liveRoute: () => { liveDay = curIdx(); livePlace = 'all'; withTransition('tab', render); },
  liveHere: () => {
    if (!navigator.geolocation) { toast('אין גישה למיקום בטלפון הזה'); return; }
    toast('מאתר את המיקום שלך…');
    navigator.geolocation.getCurrentPosition((p) => { here = { lat: p.coords.latitude, lng: p.coords.longitude }; liveDay = 'here'; withTransition('tab', render); }, () => toast('לא קיבלתי הרשאה למיקום. אפשר לאשר בהגדרות הדפדפן.'), { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  },
  goBack: (e) => { if (navStack.length > 1) history.back(); else location.hash = e.dataset.href || '#today'; },
  undo: () => { const f = undoFn; undoFn = null; $('#toast').classList.remove('show'); if (f) { f(); haptic(8); } },
  veganSwap: (e) => {
    const s = S.days[+e.dataset.d].stops.find((x) => x.id === e.dataset.id); const w = s && veganSwap(s); if (!w) return;
    const old = s.name; Object.assign(s, { name: w.name, note: w.note, lat: w.lat, lng: w.lng, kind: 'food' }); delete s.details; delete s.osm; delete s.wiki; delete s.story;
    save(); render(); enrichStop(s, true); toast(`${old} הוחלף ב־${w.name}`);
  },
  visited: (e) => { const s = S.days[+e.dataset.d].stops.find((x) => x.id === e.dataset.id); if (!s) return; if (s.visited) delete s.visited; else s.visited = Date.now(); save(); render(); toast(s.visited ? 'סומן ✓ · נכנס ליומן ולסיכום' : 'בוטל'); },
  bookEdit: (e) => {
    const di = +e.dataset.d; const s = S.days[di].stops.find((x) => x.id === e.dataset.id); const bk = s.booking || {}; const b = bookingFor(s);
    sheet(`<h3>כרטיס / הזמנה</h3><span class="muted">${esc(s.name)} · ${META[di].short} ${META[di].num}.12</span>
      ${b ? `<a class="btn soft sm" href="${esc(b.url)}" target="_blank" rel="noopener">לאתר הרשמי להזמנה ←</a>` : ''}
      <label class="row" style="gap:8px;font-weight:700"><input type="checkbox" id="bk-booked" ${bk.booked ? 'checked' : ''} style="width:22px;height:22px">הזמנתי</label>
      <div class="grid2"><label class="lab">שעת כניסה<input class="field" type="time" id="bk-time" value="${esc(s.time || '')}"></label><label class="lab">מספר הזמנה<input class="field" id="bk-ref" value="${esc(bk.ref || '')}" style="direction:ltr"></label></div>
      <label class="lab">קישור לכרטיס (אם יש)<input class="field" id="bk-url" type="url" value="${esc(bk.url || '')}" style="direction:ltr;text-align:left"></label>
      <label class="lab">צילום מסך או PDF של הכרטיס<input class="field" id="bk-file" type="file" accept="image/*,application/pdf" multiple></label>
      ${(bk.files || []).length ? `<span class="muted">${bk.files.length} קבצים שמורים. <button class="btn soft sm" data-act="bkClearFiles" data-d="${di}" data-id="${s.id}">מחק קבצים</button></span>` : ''}
      <button class="btn sun" data-act="bkSave" data-d="${di}" data-id="${s.id}">שמירה</button>`);
  },
  bkSave: async (e) => {
    const di = +e.dataset.d; const s = S.days[di].stops.find((x) => x.id === e.dataset.id); const bk = s.booking || (s.booking = {});
    bk.booked = $('#bk-booked').checked; bk.ref = $('#bk-ref').value.trim(); bk.url = $('#bk-url').value.trim();
    const tm = $('#bk-time').value; if (tm) s.time = tm; else delete s.time;
    const fl = $('#bk-file').files; if (fl && fl.length) { try { bk.files = (bk.files || []).concat(await storeFiles([...fl], 2000)); if (tm || bk.ref || fl.length) bk.booked = bk.booked || true; } catch (err) { toast('לא הצלחתי לשמור את הקובץ'); } }
    save(); closeSheet(); render(); toast('נשמר · ציר הזמן התעדכן');
  },
  bkClearFiles: async (e) => { const s = S.days[+e.dataset.d].stops.find((x) => x.id === e.dataset.id); for (const f of (s.booking.files || [])) { try { await FILES.del(f.id); } catch (err) { /* ignore */ } } s.booking.files = []; save(); closeSheet(); render(); },
  journalAdd: (e) => {
    const di = +e.dataset.d; const sid = e.dataset.id || '';
    sheet(`<h3>זיכרון ליומן</h3><span class="muted">${META[di].short} ${META[di].num}.12</span>
      <textarea class="field" id="jr-text" rows="4" placeholder="מה היה? מה טעמת? מה הצחיק?"></textarea>
      <label class="lab">תמונות<input class="field" id="jr-files" type="file" accept="image/*" multiple></label>
      <label class="lab">איזה מקום<select class="field" id="jr-stop"><option value="">בלי מקום</option>${S.days[di].stops.map((x) => `<option value="${x.id}" ${x.id === sid ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select></label>
      <button class="btn sun" data-act="jSave" data-d="${di}">שמירה</button>`);
  },
  jSave: async (e) => {
    const di = +e.dataset.d; const text = $('#jr-text').value.trim(); const fl = $('#jr-files').files; const stopId = $('#jr-stop').value || null;
    if (!text && !(fl && fl.length)) { toast('כתוב משהו או הוסף תמונה'); return; }
    let photos = []; if (fl && fl.length) { toast('שומר תמונות…'); try { photos = await storeFiles([...fl], 1600); } catch (err) { toast('לא הצלחתי לשמור את התמונות'); } }
    S.journal.push({ id: uid(), di, stopId, text, photos, at: Date.now() });
    if (stopId) { const st = S.days[di].stops.find((x) => x.id === stopId); if (st && !st.visited) st.visited = Date.now(); }
    save(); closeSheet(); render(); toast('נשמר ביומן');
  },
  jDel: async (e) => { const j = S.journal.find((x) => x.id === e.dataset.id); if (!j || !confirm('למחוק את הזיכרון?')) return; for (const f of (j.photos || [])) { try { await FILES.del(f.id); } catch (err) { /* ignore */ } } S.journal = S.journal.filter((x) => x.id !== j.id); save(); render(); },
  jPhoto: async (e) => { const j = S.journal.find((x) => x.id === e.dataset.j); galleryImgs = await Promise.all(j.photos.map((f) => fileURL(f.id))); openLightbox(+e.dataset.i); },
  shareSummary: async () => {
    const vis = []; S.days.forEach((d, di) => { const v = d.stops.filter((x) => x.visited); if (v.length) vis.push(`${META[di].short} ${META[di].num}.12: ${v.map((x) => x.name).join(', ')}`); });
    const text = `ברצלונה 13–17.12\n${vis.join('\n')}\n${S.journal.length} זיכרונות ביומן`;
    try { if (navigator.share) await navigator.share({ title: 'הטיול לברצלונה', text }); else { await navigator.clipboard.writeText(text); toast('הסיכום הועתק'); } } catch (err) { /* cancelled */ }
  },
  dietT: (e) => { S.diet[e.dataset.k] = !S.diet[e.dataset.k]; if (!S.diet.celiac && !S.diet.vegan) S.diet[e.dataset.k] = true; save(); render(); },
  dietL: (e) => { S.diet.lang = e.dataset.k; save(); render(); },
  cardFull: () => { const el = $('.dcard'); if (el && el.requestFullscreen) el.requestFullscreen().catch(() => el.classList.toggle('full')); else if (el) el.classList.toggle('full'); },
  shopDay: (e) => { shopDay = +e.dataset.i; render(); },
  addUmbrella: () => { const g = S.packing.find((x) => /בגד|ביגוד|לבוש/.test(x.group)) || S.packing[0]; g.items.push({ id: uid(), t: 'מטרייה קטנה', done: false }); save(); render(); toast('נוספה לרשימת הציוד'); },
  wishAdd: () => wishSheet(null),
  wishEdit: (e) => wishSheet(S.wish.find((w) => w.id === e.dataset.id)),
  wishSave: (e) => {
    const name = $('#ws-name').value.trim(); if (!name) { toast('צריך שם לפריט'); return; }
    const num = (id) => { const v = parseFloat(($(id).value || '').replace(',', '.')); return isNaN(v) ? null : v; };
    let w = S.wish.find((x) => x.id === e.dataset.id);
    if (!w) { w = { id: uid(), bought: false }; S.wish.push(w); }
    const es = num('#ws-es'); if (w.es != null && es != null && es !== w.es) w.prev = w.es;
    Object.assign(w, { name, brand: $('#ws-brand').value, url: $('#ws-url').value.trim(), il: num('#ws-il'), es });
    save(); closeSheet(); render(); toast('נשמר');
  },
  wishDel: (e) => { const w = S.wish.find((x) => x.id === e.dataset.id); if (w && w.expId) S.expenses = S.expenses.filter((x) => x.id !== w.expId); S.wish = S.wish.filter((x) => x.id !== e.dataset.id); save(); closeSheet(); render(); toast('נמחק'); },
  wishPrice: (e) => { const w = S.wish.find((x) => x.id === e.dataset.id); sheet(`<h3>מחיר עדכני</h3><span class="muted">${esc(w.name)}${w.es ? ` · היה €${w.es}` : ''}</span><label class="lab">מחיר באתר הספרדי (€)<input class="field" id="wp-es" inputmode="decimal" value="${w.es ?? ''}"></label>${w.url ? `<a class="btn soft sm" href="${esc(w.url)}" target="_blank" rel="noopener">${ic('link')}פתח את המוצר</a>` : ''}<button class="btn sun" data-act="wishPriceSave" data-id="${w.id}">שמירה</button>`); },
  wishPriceSave: (e) => { const w = S.wish.find((x) => x.id === e.dataset.id); const v = parseFloat(($('#wp-es').value || '').replace(',', '.')); if (isNaN(v)) { toast('צריך מספר'); return; } if (w.es != null && v !== w.es) w.prev = w.es; w.es = v; w.checked = Date.now(); save(); closeSheet(); render(); toast(w.prev && v < w.prev ? `ירד ב־€${(w.prev - v).toFixed(2)}!` : 'עודכן'); },
  wishBought: (e) => {
    const w = S.wish.find((x) => x.id === e.dataset.id); w.bought = !w.bought;
    if (w.bought && w.es) { const m = META[curIdx()]; const ex = { id: uid(), title: `${w.brand && w.brand !== 'אחר' ? w.brand + ' · ' : ''}${w.name}`, amount: w.es, cur: 'EUR', cat: 'קניות', day: `${m.short} ${m.num}.12` }; S.expenses.push(ex); w.expId = ex.id; toast('נכנס להוצאות · אל תשכח טופס tax free'); }
    else if (!w.bought && w.expId) { S.expenses = S.expenses.filter((x) => x.id !== w.expId); delete w.expId; toast('הוסר מההוצאות'); }
    save(); render();
  },
  liveCat: (e) => { liveCat = e.dataset.t; withTransition('tab', render); },
  liveOpen: () => { liveOpen = !liveOpen; render(); },
  liveRetry: () => { const c = liveArea(); delete live[liveKey(liveCat, c)]; try { localStorage.removeItem('bcn.live:' + liveKey(liveCat, c)); } catch (e) { /* ignore */ } render(); },
  ideas: (e) => {
    const i = +e.dataset.d; const D = ideasData(i);
    sheet(`<h3>רעיונות להיום</h3><span class="muted">${META[i].short} ${META[i].num}.12 · פנינים, אירועים והמלצות ליד המסלול</span>
      ${D.gems.length ? `<h2>💎 פנינים ליד המסלול</h2>${recList(D.gems.slice(0, 5).map((g) => gemRow(g, i)))}<div class="row"><button class="btn soft sm grow" data-act="gemsOnMap" data-d="${i}">${ic('pin')}להציג על המפה</button>${D.gems.length > 5 ? `<button class="btn soft sm grow" data-act="liveFrom" data-d="${i}">כל ה־${D.gems.length} ›</button>` : ''}</div>` : ''}
      ${D.evs.length ? `<h2>קורה היום ליד המסלול</h2>${recList(D.evs.map(({ e: ev, d }) => recRow({ r: evRec(ev), d: 0, o: null }, 0, { why: `${ev.he} · ${ev.hours}${ev.approx ? ' · תאריכים משוערים' : ''} · ${fmtKm(d)}`, color: '#D99400', day: i })))}` : ''}
      ${D.recs.length ? `<h2>המלצות</h2>${recList(D.recs.map((o, n) => recRow({ r: o.r, d: 0, o: openState(o.r) }, n, { why: o.why, color: o.color, day: i })))}` : ''}
      `);
  },
  gemsOnMap: (e) => { closeSheet(); mapDay = +e.dataset.d; mapLayers.add('gems'); warmGems(); mapSel = null; location.hash = '#map'; },
  gemCat: (e) => { gemCat = e.dataset.t; withTransition('tab', render); },
  wvRetry: () => { voyageState = ''; loadVoyage(); render(); },
  gemView: () => { gemView = gemView === 'deck' ? 'list' : 'deck'; withTransition('tab', render); },
  gemDayF: () => { gemDayF = null; withTransition('tab', render); },
  gemDays: (e) => { closeSheet(); gemDayF = +e.dataset.d; gemCat = 'all'; location.hash = '#discover'; },
  gemReset: () => { const old = { ...S.gems }; Object.keys(S.gems).forEach((k) => { if (S.gems[k] === 'no') delete S.gems[k]; }); save(); render(); toast('הוחזרו לרשימה', () => { S.gems = old; save(); render(); }); },
  gemOpen: (e) => { const g = gemById(e.dataset.id); if (!g) return; gemRec(g); location.hash = '#place/r/g_' + g.id; },
  gemNo: (e) => { const g = gemById(e.dataset.id); if (!g) return; gemDecide(g.id, 'no'); toast(`דילגת על ${cut(g.name, 26)}`, () => { delete S.gems[g.id]; save(); render(); }); },
  gemSave: (e) => {
    const g = gemById(e.dataset.id); if (!g) return; const r = gemRec(g);
    let x = inSaved(r);
    if (!x) { x = { id: uid(), title: g.name, name: g.name, url: gmSearch(r), fav: true, lat: g.lat, lng: g.lng, kind: g.kind, status: 'found', gem: g.id, wikiFixed: r.wikiFixed }; S.saved.unshift(x); }
    r.savedId = x.id; gemDecide(g.id, 'yes');
    toast(`${cut(g.name, 24)} נשמר ★`, () => { S.saved = S.saved.filter((o) => o.id !== x.id); delete S.gems[g.id]; delete r.savedId; save(); render(); });
    if (!x.details) enrichStop(x, true);
  },
  gemDay: (e) => {
    const g = gemById(e.dataset.id); if (!g) return; const di = +e.dataset.d; const r = gemRec(g);
    const ns = recStop(r); S.days[di].stops.push(ns); gemDecide(g.id, 'yes');
    toast(`נוסף ליום ${META[di].short} · במסלול ובמפה`, () => { S.days[di].stops = S.days[di].stops.filter((o) => o.id !== ns.id); delete S.gems[g.id]; save(); render(); });
    enrichStop(ns, true);
  },
  liveFrom: (e) => { gemDayF = e.dataset.d != null ? +e.dataset.d : curIdx(); gemCat = 'all'; closeSheet(); if (location.hash === '#discover') render(); else location.hash = '#discover'; },
  recSave: (e) => { const r = REC[e.dataset.id]; if (r) saveRec(r); },
  recAdd: (e) => {
    const r = REC[e.dataset.id]; if (!r) return;
    if (r.savedId) { const x = S.saved.find((o) => o.id === r.savedId); if (x) { if (e.dataset.d != null) addSavedToDay(x, +e.dataset.d); else daySheet((di) => addSavedToDay(x, di)); return; } }
    if (e.dataset.d != null) { addRecToDay(r, +e.dataset.d); return; }
    daySheet((di) => addRecToDay(r, di));
  },
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
  mapDay: (e) => { mapDay = +e.dataset.i; mapSel = null; drawMarkers(true); rerenderMapOverlay(); },
  mapClose: () => { mapSel = null; renderMapSheet(); },
  mapMove: (e) => { const a = S.days[mapDay].stops; const i = a.findIndex((x) => x.id === mapSel); const j = i + +e.dataset.dir; if (i < 0 || j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; save(); drawMarkers(false); renderMapSheet(); },
  mapToDay: () => { const from = mapDay; const st = S.days[from].stops.find((x) => x.id === mapSel); if (!st) return; daySheet((di) => { if (di === from) return; S.days[from].stops = S.days[from].stops.filter((x) => x.id !== st.id); S.days[di].stops.push(st); save(); mapSel = null; drawMarkers(false); renderMapSheet(); toast(`${st.name} עבר ליום ${META[di].short}`, () => { S.days[di].stops = S.days[di].stops.filter((x) => x.id !== st.id); S.days[from].stops.push(st); save(); drawMarkers(false); renderMapSheet(); }); }); },
  mapEdit: () => { const i = S.days[mapDay].stops.findIndex((x) => x.id === mapSel); if (i >= 0) placeSheet(mapDay, i); },
  mapDel: () => { const a = S.days[mapDay].stops; const i = a.findIndex((x) => x.id === mapSel); if (i < 0) return; const d = mapDay; const [x] = a.splice(i, 1); save(); mapSel = null; drawMarkers(false); renderMapSheet(); toast(`"${x.name}" נמחק`, () => { S.days[d].stops.splice(i, 0, x); save(); drawMarkers(false); renderMapSheet(); }); },
  mapSort: () => { A.sortDay({ dataset: { d: mapDay } }); drawMarkers(true); renderMapSheet(); },
  ahDay: (e) => { sheetCtx.day = +e.dataset.i; document.querySelectorAll('#ah-days button').forEach((b) => b.classList.toggle('on', +b.dataset.i === sheetCtx.day)); },
  ahSave: () => {
    const c = sheetCtx; const name = $('#ah-name').value.trim(); if (!name) { toast('צריך שם למקום'); return; }
    const ns = { id: uid(), kind: c.k || 'star', name, note: '', lat: c.lat, lng: c.lng, osm: c.osm };
    S.days[c.day].stops.push(ns); save(); closeSheet(); mapDay = c.day; mapSel = ns.id; drawMarkers(false); renderMapSheet(); toast(`נוסף ליום ${META[c.day].short}`); enrichStop(ns, true);
  },
  mtOpen: (e) => { mtOpen = mtOpen === e.dataset.k ? null : e.dataset.k; renderMapSheet(); haptic(6); },
  msToggle: () => { mapSheet = mapSheet === 'peek' ? 'half' : 'peek'; const el = $('.msheet'); if (el) el.dataset.state = mapSheet; },
  mapLayer: (e) => { const k = e.dataset.k; if (mapLayers.has(k)) mapLayers.delete(k); else { mapLayers.add(k); if (k === 'gems') warmGems(); } mapSel = null; drawMarkers(false); renderMapSheet(); haptic(6); },
  mapAddOv: (e) => {
    const x = overlayItems().find((o) => o.id === e.dataset.id); if (!x) return; const di = mapDay;
    if (x.saved) { const sv = S.saved.find((o) => o.id === x.saved); if (sv) addSavedToDay(sv, di); }
    else { const r = REC[x.rec]; if (!r) return; const ns = recStop(r); S.days[di].stops.push(ns); if (x.gem) S.gems[x.gem] = 'yes'; save(); mapSel = ns.id; drawMarkers(false); renderMapSheet(); toast(`${cut(x.name, 22)} נוסף ליום ${META[di].short}`, () => { S.days[di].stops = S.days[di].stops.filter((o) => o.id !== ns.id); if (x.gem) delete S.gems[x.gem]; save(); mapSel = null; drawMarkers(false); renderMapSheet(); }); enrichStop(ns, true); }
    haptic(12);
  },
  mapGemNo: (e) => { const x = overlayItems().find((o) => o.id === e.dataset.id); if (!x || !x.gem) return; S.gems[x.gem] = 'no'; save(); mapSel = null; drawMarkers(false); renderMapSheet(); toast(`${cut(x.name, 24)} הוסתר`, () => { delete S.gems[x.gem]; save(); drawMarkers(false); renderMapSheet(); }); },
  mapPick: (e) => { const x = mapStops().find((o) => o.id === e.dataset.id) || overlayItems().find((o) => o.id === e.dataset.id); if (!x) return; mapSel = x.id; mtOpen = null; drawMarkers(false); renderMapSheet(); if (map) map.flyTo([x.lat, x.lng], Math.max(map.getZoom(), 16), { duration: 0.6 }); haptic(6); },
  locate: () => {
    if (!navigator.geolocation) { toast('אין גישה למיקום'); return; }
    navigator.geolocation.getCurrentPosition((p) => { const ll = [p.coords.latitude, p.coords.longitude]; if (meMarker) meMarker.remove(); meMarker = L.marker(ll, { icon: L.divIcon({ className: '', html: '<div class="mk me"></div>', iconSize: [18, 18] }) }).addTo(map); map.setView(ll, 15); }, () => toast('לא קיבלתי הרשאה למיקום'));
  },
  disc: (e) => { discTab = e.dataset.t; withTransition('tab', render); },
  discSave: (e) => { const d = T.discover[discTab][+e.dataset.k]; const x = { id: uid(), title: d.name, name: d.name, url: gmSearch(d), fav: true, lat: d.lat, lng: d.lng, kind: d.kind, status: 'found' }; S.saved.unshift(x); save(); toast('נשמר במועדפים ★'); if (hasGeo(x)) enrichStop(x, true); },
  discAdd: (e) => { const d = T.discover[discTab][+e.dataset.k]; daySheet((di) => { const ns = { id: uid(), kind: d.kind, name: d.name, note: d.note, lat: d.lat, lng: d.lng }; S.days[di].stops.push(ns); save(); toast(`נוסף ליום ${META[di].short} · מופיע במפה ובניווט`); enrichStop(ns, true); }); },
  addLink: () => { const v = $('#sv-link').value.trim(); addShared(v, ''); },
  savedTab: (e) => { savedTab = e.dataset.t; withTransition('tab', render); },
  savedFav: (e) => { const x = S.saved[+e.dataset.i]; x.fav = !x.fav; save(); render(); toast(x.fav ? 'נשמר במועדפים ★' : 'הוסר מהמועדפים'); },
  savedDel: (e) => { const i = +e.dataset.i; const [x] = S.saved.splice(i, 1); save(); render(); toast('נמחק', () => { S.saved.splice(i, 0, x); save(); render(); }); },
  savedToDay: (e) => {
    const i = +e.dataset.i; const x = S.saved[i];
    const l = linkedStop(x); if (l) { location.hash = `#place/${l.di}/${l.st.id}`; return; }
    if (e.dataset.d != null) addSavedToDay(x, +e.dataset.d); else daySheet((di) => addSavedToDay(x, di));
  },
  placeAdd: (e) => placeSheet(+e.dataset.d, null),
  placeEdit: (e) => placeSheet(+e.dataset.d, +e.dataset.s),
  placeEditById: (e) => { const di = +e.dataset.d; placeSheet(di, S.days[di].stops.findIndex((s) => s.id === e.dataset.id)); },
  placeDel: (e) => { const di = +e.dataset.d, si = +e.dataset.s; const [x] = S.days[di].stops.splice(si, 1); save(); render(); toast(`"${x.name}" נמחק`, () => { S.days[di].stops.splice(si, 0, x); save(); render(); }); },
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
    const note = $('#pl-note').value.trim(); const tm = $('#pl-time').value; const du = parseInt($('#pl-dur').value, 10);
    let item;
    if (c.si != null) { item = S.days[c.di].stops.splice(c.si, 1)[0]; } else { item = { id: uid(), kind: 'star' }; }
    const changed = item.name !== name || !!c.pick && (c.pick.lat !== item.lat || c.pick.lng !== item.lng);
    Object.assign(item, { name, note, kind: c.kindSel || item.kind || 'star' }); if (c.pick) { item.lat = c.pick.lat; item.lng = c.pick.lng; }
    if (tm) item.time = tm; else delete item.time;
    if (!isNaN(du) && du !== (DUR[item.kind] ?? 60)) item.dur = du; else if (isNaN(du)) delete item.dur;
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
function wishSheet(w) {
  w = w || {};
  sheet(`<h3>${w.id ? 'עריכת פריט' : 'פריט לקנייה'}</h3>
    <label class="lab">מה<input class="field" id="ws-name" value="${esc(w.name || '')}" placeholder="למשל: מעיל צמר שחור"></label>
    <label class="lab">מותג<select class="field" id="ws-brand">${BRANDS.map((b) => `<option ${w.brand === b ? 'selected' : ''}>${b}</option>`).join('')}</select></label>
    <label class="lab">קישור למוצר באתר הספרדי<input class="field" id="ws-url" type="url" value="${esc(w.url || '')}" style="direction:ltr;text-align:left" placeholder="https://www.zara.com/es/…"></label>
    <div class="grid2"><label class="lab">מחיר בארץ (₪)<input class="field" id="ws-il" inputmode="decimal" value="${w.il ?? ''}"></label><label class="lab">מחיר בספרד (€)<input class="field" id="ws-es" inputmode="decimal" value="${w.es ?? ''}"></label></div>
    <div class="row"><button class="btn sun grow" data-act="wishSave" data-id="${w.id || ''}">שמירה</button>${w.id ? `<button class="btn soft" style="color:var(--red)" data-act="wishDel" data-id="${w.id}">מחיקה</button>` : ''}</div>`);
}
function daySheet(cb) {
  sheet(`<h3>לאיזה יום?</h3><div style="display:flex;flex-direction:column;gap:8px">${META.map((m, k) => `<button class="btn" style="background:${m.color};color:#fff;justify-content:flex-start" data-act="daySheetPick" data-i="${k}">${m.short} ${m.num}.12 · ${esc(m.title)}</button>`).join('')}</div><button class="btn soft" data-act="closeSheet">ביטול</button>`);
  sheetCtx = { kind: 'day', cb };
}
A.daySheetPick = (e) => { const cb = sheetCtx.cb; closeSheet(); cb(+e.dataset.i); };

const HAPTIC = new Set(['recAdd', 'daySheetPick', 'visited', 'recSave', 'savedFav', 'discAdd', 'discSave', 'plSave', 'wishBought', 'veganSwap', 'leg', 'pack', 'addLink', 'jSave', 'bkSave', 'idPick', 'sortDay', 'moveTo']);
document.addEventListener('click', (ev) => {
  const link = ev.target.closest('a[href^="#place/"]');
  if (link && !ev.target.closest('[data-act]')) {
    const card = link.closest('[data-pid], .li, .tc, .card') || link; document.querySelectorAll('[style*="place-hero"]').forEach((x) => { x.style.viewTransitionName = ''; });
    card.style.viewTransitionName = 'place-hero'; lastPlace = link.getAttribute('href').split('/').pop();
  }
  const el = ev.target.closest('[data-act]'); if (!el) return;
  const fn = A[el.dataset.act]; if (!fn) return; ev.preventDefault();
  if (HAPTIC.has(el.dataset.act)) haptic(10);
  fn(el);
});
document.addEventListener('toggle', async (ev) => {
  const d = ev.target; if (!d.open || d.dataset.tr == null) return;
  const w = Object.values(articles).find((x) => x && x.sections && d.closest('.story') && x.lang === 'en' && x.sections[+d.dataset.tr] && (x.sections[+d.dataset.tr].titleHe || x.sections[+d.dataset.tr].title) === d.querySelector('summary').textContent);
  if (!w) return; const sec = w.sections[+d.dataset.tr]; if (sec.bodyHe) return;
  try { sec.bodyHe = await Enrich.translate(cut(sec.body, 1500)); try { localStorage.setItem(`bcn.wk:en:${w.title}`, JSON.stringify(w)); } catch (e) { /* full */ } }
  catch (err) { sec.bodyHe = ''; d.querySelector('div').innerHTML = paras(sec.body) + '<p class="muted">התרגום לא זמין כרגע, מוצג באנגלית.</p>'; return; }
  d.querySelector('div').innerHTML = paras(sec.bodyHe);
}, true);
document.addEventListener('change', (ev) => {
  if (ev.target.id === 'day-start') { S.dayStart[+ev.target.dataset.d] = ev.target.value; save(); render(); }
  if (ev.target.id === 'lv-place') { livePlace = ev.target.value; render(); }
  if (ev.target.id === 'lv-day') {
    const v = ev.target.value; livePlace = 'all';
    if (v !== 'here') { liveDay = +v; render(); return; }
    if (!navigator.geolocation) { toast('אין גישה למיקום'); render(); return; }
    navigator.geolocation.getCurrentPosition((p) => { here = { lat: p.coords.latitude, lng: p.coords.longitude }; liveDay = 'here'; render(); }, () => { toast('לא קיבלתי הרשאה למיקום'); render(); });
  }
});
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
setTimeout(() => { if (window.Enrich && navigator.onLine) prefetchArea(liveArea()); }, 6000);
loadWeather();
loadRate();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').then((r) => r.update()).catch(() => {});
})();
