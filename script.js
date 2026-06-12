"use strict";

// ─── FLAGS ───────────────────────────────────────────────────────────────────
const F = {
  MEX:'🇲🇽', RSA:'🇿🇦', KOR:'🇰🇷', CZE:'🇨🇿', CAN:'🇨🇦', BIH:'🇧🇦', QAT:'🇶🇦', SUI:'🇨🇭',
  BRA:'🇧🇷', MAR:'🇲🇦', HAI:'🇭🇹', SCO:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', USA:'🇺🇸', PAR:'🇵🇾', AUS:'🇦🇺', TUR:'🇹🇷',
  GER:'🇩🇪', CUW:'🇨🇼', CIV:'🇨🇮', ECU:'🇪🇨', NED:'🇳🇱', JPN:'🇯🇵', SWE:'🇸🇪', TUN:'🇹🇳',
  BEL:'🇧🇪', EGY:'🇪🇬', IRN:'🇮🇷', NZL:'🇳🇿', ESP:'🇪🇸', CPV:'🇨🇻', KSA:'🇸🇦', URU:'🇺🇾',
  FRA:'🇫🇷', SEN:'🇸🇳', IRQ:'🇮🇶', NOR:'🇳🇴', ARG:'🇦🇷', ALG:'🇩🇿', AUT:'🇦🇹', JOR:'🇯🇴',
  POR:'🇵🇹', COD:'🇨🇩', UZB:'🇺🇿', COL:'🇨🇴', ENG:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', CRO:'🇭🇷', GHA:'🇬🇭', PAN:'🇵🇦',
};

// ─── GROUPS ──────────────────────────────────────────────────────────────────
const GROUPS = {
  A: ['MEX','RSA','KOR','CZE'], B: ['CAN','BIH','QAT','SUI'],
  C: ['BRA','MAR','HAI','SCO'], D: ['USA','PAR','AUS','TUR'],
  E: ['GER','CUW','CIV','ECU'], F: ['NED','JPN','SWE','TUN'],
  G: ['BEL','EGY','IRN','NZL'], H: ['ESP','CPV','KSA','URU'],
  I: ['FRA','SEN','IRQ','NOR'], J: ['ARG','ALG','AUT','JOR'],
  K: ['POR','COD','UZB','COL'], L: ['ENG','CRO','GHA','PAN'],
};
const GC = {
  A:'#ef4444', B:'#f97316', C:'#f59e0b', D:'#22c55e',
  E:'#14b8a6', F:'#06b6d4', G:'#3b82f6', H:'#8b5cf6',
  I:'#a855f7', J:'#ec4899', K:'#10b981', L:'#84cc16',
};

// ─── GROUP STAGE FIXTURES (UTC, verified June 2026) ───────────────────────────
// Sources: Al Jazeera GMT schedule, KickoffClock JSON, Sky Sports BST, ESPN ET
// id:20 AUS vs TUR: 04:00 UTC Jun 14 confirmed by Al Jazeera (9pm PDT Jun 13)
// id:21 TUR vs PAR: FIXED 03:00 UTC Jun 20 (was 04:00 UTC Jun 19)
const GM = [
  // GROUP A
  { id:1,  d:'2026-06-11T19:00:00Z', h:'MEX', a:'RSA', g:'A' },
  { id:2,  d:'2026-06-12T02:00:00Z', h:'KOR', a:'CZE', g:'A' },
  { id:3,  d:'2026-06-18T16:00:00Z', h:'CZE', a:'RSA', g:'A' },
  { id:4,  d:'2026-06-19T01:00:00Z', h:'MEX', a:'KOR', g:'A' },
  { id:5,  d:'2026-06-25T01:00:00Z', h:'CZE', a:'MEX', g:'A' },
  { id:6,  d:'2026-06-25T01:00:00Z', h:'RSA', a:'KOR', g:'A' },
  // GROUP B
  { id:7,  d:'2026-06-12T19:00:00Z', h:'CAN', a:'BIH', g:'B' },
  { id:8,  d:'2026-06-13T19:00:00Z', h:'QAT', a:'SUI', g:'B' },
  { id:9,  d:'2026-06-18T19:00:00Z', h:'SUI', a:'BIH', g:'B' },
  { id:10, d:'2026-06-18T22:00:00Z', h:'CAN', a:'QAT', g:'B' },
  { id:11, d:'2026-06-24T19:00:00Z', h:'SUI', a:'CAN', g:'B' },
  { id:12, d:'2026-06-24T19:00:00Z', h:'BIH', a:'QAT', g:'B' },
  // GROUP C
  { id:13, d:'2026-06-13T22:00:00Z', h:'BRA', a:'MAR', g:'C' },
  { id:14, d:'2026-06-14T01:00:00Z', h:'HAI', a:'SCO', g:'C' },
  { id:15, d:'2026-06-19T22:00:00Z', h:'SCO', a:'MAR', g:'C' },
  { id:16, d:'2026-06-20T00:30:00Z', h:'BRA', a:'HAI', g:'C' },
  { id:17, d:'2026-06-24T22:00:00Z', h:'SCO', a:'BRA', g:'C' },
  { id:18, d:'2026-06-24T22:00:00Z', h:'MAR', a:'HAI', g:'C' },
  // GROUP D — id:21 corrected: Jun 20 03:00 UTC (was Jun 19 04:00)
  { id:19, d:'2026-06-13T01:00:00Z', h:'USA', a:'PAR', g:'D' },
  { id:20, d:'2026-06-14T04:00:00Z', h:'AUS', a:'TUR', g:'D' },
  { id:21, d:'2026-06-20T03:00:00Z', h:'TUR', a:'PAR', g:'D' },
  { id:22, d:'2026-06-19T19:00:00Z', h:'USA', a:'AUS', g:'D' },
  { id:23, d:'2026-06-26T02:00:00Z', h:'TUR', a:'USA', g:'D' },
  { id:24, d:'2026-06-26T02:00:00Z', h:'PAR', a:'AUS', g:'D' },
  // GROUP E
  { id:25, d:'2026-06-14T17:00:00Z', h:'GER', a:'CUW', g:'E' },
  { id:26, d:'2026-06-14T23:00:00Z', h:'CIV', a:'ECU', g:'E' },
  { id:27, d:'2026-06-20T20:00:00Z', h:'GER', a:'CIV', g:'E' },
  { id:28, d:'2026-06-21T00:00:00Z', h:'ECU', a:'CUW', g:'E' },
  { id:29, d:'2026-06-25T20:00:00Z', h:'CUW', a:'CIV', g:'E' },
  { id:30, d:'2026-06-25T20:00:00Z', h:'ECU', a:'GER', g:'E' },
  // GROUP F
  { id:31, d:'2026-06-14T20:00:00Z', h:'NED', a:'JPN', g:'F' },
  { id:32, d:'2026-06-15T02:00:00Z', h:'SWE', a:'TUN', g:'F' },
  { id:33, d:'2026-06-20T17:00:00Z', h:'NED', a:'SWE', g:'F' },
  { id:34, d:'2026-06-21T04:00:00Z', h:'TUN', a:'JPN', g:'F' },
  { id:35, d:'2026-06-25T23:00:00Z', h:'JPN', a:'SWE', g:'F' },
  { id:36, d:'2026-06-25T23:00:00Z', h:'TUN', a:'NED', g:'F' },
  // GROUP G
  { id:37, d:'2026-06-15T19:00:00Z', h:'BEL', a:'EGY', g:'G' },
  { id:38, d:'2026-06-16T01:00:00Z', h:'IRN', a:'NZL', g:'G' },
  { id:39, d:'2026-06-21T19:00:00Z', h:'BEL', a:'IRN', g:'G' },
  { id:40, d:'2026-06-22T01:00:00Z', h:'NZL', a:'EGY', g:'G' },
  { id:41, d:'2026-06-27T03:00:00Z', h:'EGY', a:'IRN', g:'G' },
  { id:42, d:'2026-06-27T03:00:00Z', h:'NZL', a:'BEL', g:'G' },
  // GROUP H
  { id:43, d:'2026-06-15T16:00:00Z', h:'ESP', a:'CPV', g:'H' },
  { id:44, d:'2026-06-15T22:00:00Z', h:'KSA', a:'URU', g:'H' },
  { id:45, d:'2026-06-21T16:00:00Z', h:'ESP', a:'KSA', g:'H' },
  { id:46, d:'2026-06-21T22:00:00Z', h:'URU', a:'CPV', g:'H' },
  { id:47, d:'2026-06-27T00:00:00Z', h:'CPV', a:'KSA', g:'H' },
  { id:48, d:'2026-06-27T00:00:00Z', h:'URU', a:'ESP', g:'H' },
  // GROUP I
  { id:49, d:'2026-06-16T19:00:00Z', h:'FRA', a:'SEN', g:'I' },
  { id:50, d:'2026-06-16T22:00:00Z', h:'IRQ', a:'NOR', g:'I' },
  { id:51, d:'2026-06-22T21:00:00Z', h:'FRA', a:'IRQ', g:'I' },
  { id:52, d:'2026-06-23T00:00:00Z', h:'NOR', a:'SEN', g:'I' },
  { id:53, d:'2026-06-26T19:00:00Z', h:'NOR', a:'FRA', g:'I' },
  { id:54, d:'2026-06-26T19:00:00Z', h:'SEN', a:'IRQ', g:'I' },
  // GROUP J
  { id:55, d:'2026-06-17T01:00:00Z', h:'ARG', a:'ALG', g:'J' },
  { id:56, d:'2026-06-17T04:00:00Z', h:'AUT', a:'JOR', g:'J' },
  { id:57, d:'2026-06-22T17:00:00Z', h:'ARG', a:'AUT', g:'J' },
  { id:58, d:'2026-06-23T03:00:00Z', h:'JOR', a:'ALG', g:'J' },
  { id:59, d:'2026-06-28T02:00:00Z', h:'ALG', a:'AUT', g:'J' },
  { id:60, d:'2026-06-28T02:00:00Z', h:'JOR', a:'ARG', g:'J' },
  // GROUP K
  { id:61, d:'2026-06-17T17:00:00Z', h:'POR', a:'COD', g:'K' },
  { id:62, d:'2026-06-18T02:00:00Z', h:'UZB', a:'COL', g:'K' },
  { id:63, d:'2026-06-23T17:00:00Z', h:'POR', a:'UZB', g:'K' },
  { id:64, d:'2026-06-24T02:00:00Z', h:'COL', a:'COD', g:'K' },
  { id:65, d:'2026-06-27T23:30:00Z', h:'COL', a:'POR', g:'K' },
  { id:66, d:'2026-06-27T23:30:00Z', h:'COD', a:'UZB', g:'K' },
  // GROUP L
  { id:67, d:'2026-06-17T20:00:00Z', h:'ENG', a:'CRO', g:'L' },
  { id:68, d:'2026-06-17T23:00:00Z', h:'GHA', a:'PAN', g:'L' },
  { id:69, d:'2026-06-23T20:00:00Z', h:'ENG', a:'GHA', g:'L' },
  { id:70, d:'2026-06-23T23:00:00Z', h:'PAN', a:'CRO', g:'L' },
  { id:71, d:'2026-06-27T21:00:00Z', h:'PAN', a:'ENG', g:'L' },
  { id:72, d:'2026-06-27T21:00:00Z', h:'CRO', a:'GHA', g:'L' },
];

// ─── KNOCKOUT FIXTURES (UTC, verified) ───────────────────────────────────────
// id:74 FIXED: 20:30 UTC Jun 29 (was 17:00; src: AJ "4:30pm ET=20:30 GMT – Boston")
// id:75 FIXED: 01:00 UTC Jun 30 (was 20:30 Jun 29; src: Sky "2am BST=01:00 UTC, Guadalupe")
// id:82 FIXED: 20:00 UTC Jul 1  (was 00:00 Jul 2; src: Sky "9pm BST=20:00 UTC, Seattle")
const KO = [
  // ROUND OF 32
  { id:73,  d:'2026-06-28T19:00:00Z', hs:{t:'pos',g:'A',p:2}, as:{t:'pos',g:'B',p:2}, st:'r32' },
  { id:74,  d:'2026-06-29T20:30:00Z', hs:{t:'pos',g:'E',p:1}, as:{t:'3rd',gs:'ABCDF'}, st:'r32' },
  { id:75,  d:'2026-06-30T01:00:00Z', hs:{t:'pos',g:'F',p:1}, as:{t:'pos',g:'C',p:2}, st:'r32' },
  { id:76,  d:'2026-06-29T17:00:00Z', hs:{t:'pos',g:'C',p:1}, as:{t:'pos',g:'F',p:2}, st:'r32' },
  { id:77,  d:'2026-06-30T21:00:00Z', hs:{t:'pos',g:'I',p:1}, as:{t:'3rd',gs:'CDFGH'}, st:'r32' },
  { id:78,  d:'2026-06-30T17:00:00Z', hs:{t:'pos',g:'E',p:2}, as:{t:'pos',g:'I',p:2}, st:'r32' },
  { id:79,  d:'2026-07-01T01:00:00Z', hs:{t:'pos',g:'A',p:1}, as:{t:'3rd',gs:'CEFHI'}, st:'r32' },
  { id:80,  d:'2026-07-01T16:00:00Z', hs:{t:'pos',g:'L',p:1}, as:{t:'3rd',gs:'EHIJK'}, st:'r32' },
  { id:81,  d:'2026-07-02T00:00:00Z', hs:{t:'pos',g:'D',p:1}, as:{t:'3rd',gs:'BEFIJ'}, st:'r32' },
  { id:82,  d:'2026-07-01T20:00:00Z', hs:{t:'pos',g:'G',p:1}, as:{t:'3rd',gs:'AEHIJ'}, st:'r32' },
  { id:83,  d:'2026-07-02T23:00:00Z', hs:{t:'pos',g:'K',p:2}, as:{t:'pos',g:'L',p:2}, st:'r32' },
  { id:84,  d:'2026-07-02T19:00:00Z', hs:{t:'pos',g:'H',p:1}, as:{t:'pos',g:'J',p:2}, st:'r32' },
  { id:85,  d:'2026-07-03T03:00:00Z', hs:{t:'pos',g:'B',p:1}, as:{t:'3rd',gs:'EFGIJ'}, st:'r32' },
  { id:86,  d:'2026-07-03T22:00:00Z', hs:{t:'pos',g:'J',p:1}, as:{t:'pos',g:'H',p:2}, st:'r32' },
  { id:87,  d:'2026-07-04T01:30:00Z', hs:{t:'pos',g:'K',p:1}, as:{t:'3rd',gs:'DEIJL'}, st:'r32' },
  { id:88,  d:'2026-07-03T18:00:00Z', hs:{t:'pos',g:'D',p:2}, as:{t:'pos',g:'G',p:2}, st:'r32' },
  // ROUND OF 16
  { id:89,  d:'2026-07-04T21:00:00Z', hs:{t:'w',r:74}, as:{t:'w',r:77}, st:'r16' },
  { id:90,  d:'2026-07-04T17:00:00Z', hs:{t:'w',r:73}, as:{t:'w',r:75}, st:'r16' },
  { id:91,  d:'2026-07-05T20:00:00Z', hs:{t:'w',r:76}, as:{t:'w',r:78}, st:'r16' },
  { id:92,  d:'2026-07-06T00:00:00Z', hs:{t:'w',r:79}, as:{t:'w',r:80}, st:'r16' },
  { id:93,  d:'2026-07-06T19:00:00Z', hs:{t:'w',r:83}, as:{t:'w',r:84}, st:'r16' },
  { id:94,  d:'2026-07-07T00:00:00Z', hs:{t:'w',r:81}, as:{t:'w',r:82}, st:'r16' },
  { id:95,  d:'2026-07-07T16:00:00Z', hs:{t:'w',r:86}, as:{t:'w',r:88}, st:'r16' },
  { id:96,  d:'2026-07-07T20:00:00Z', hs:{t:'w',r:85}, as:{t:'w',r:87}, st:'r16' },
  // QUARTER-FINALS
  { id:97,  d:'2026-07-09T20:00:00Z', hs:{t:'w',r:89}, as:{t:'w',r:90}, st:'qf' },
  { id:98,  d:'2026-07-10T19:00:00Z', hs:{t:'w',r:93}, as:{t:'w',r:94}, st:'qf' },
  { id:99,  d:'2026-07-11T21:00:00Z', hs:{t:'w',r:91}, as:{t:'w',r:92}, st:'qf' },
  { id:100, d:'2026-07-12T01:00:00Z', hs:{t:'w',r:95}, as:{t:'w',r:96}, st:'qf' },
  // SEMI-FINALS
  { id:101, d:'2026-07-14T19:00:00Z', hs:{t:'w',r:97},  as:{t:'w',r:98},  st:'sf' },
  { id:102, d:'2026-07-15T19:00:00Z', hs:{t:'w',r:99},  as:{t:'w',r:100}, st:'sf' },
  // THIRD PLACE & FINAL
  { id:103, d:'2026-07-18T21:00:00Z', hs:{t:'l',r:101}, as:{t:'l',r:102}, st:'fin', lbl:'Third place' },
  { id:104, d:'2026-07-19T19:00:00Z', hs:{t:'w',r:101}, as:{t:'w',r:102}, st:'fin', lbl:'Final' },
];

const ALL  = [...GM, ...KO];
const byId = {};
ALL.forEach(m => byId[m.id] = m);

// ─── STATE ────────────────────────────────────────────────────────────────────
let apiSc  = {};
let manual = JSON.parse(localStorage.getItem('wc26s') || '{}');
let editId = null;
const collapsed = { grp: false, t3: false, r32: false };
const simSet = new Set();   // IDs of matches whose scores were generated by simulate()

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function sc(id)  { return manual[id] !== undefined ? manual[id] : apiSc[id]; }

function mst(m) {
  const n = Date.now(), k = new Date(m.d).getTime();
  if (n < k) return 'up';
  if (n < k + 115 * 60000) return 'live';
  return 'done';
}

function fmtDT(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString(undefined, { day:'numeric', month:'short' })
    + ' · ' + dt.toLocaleTimeString(undefined, { hour:'2-digit', minute:'2-digit' });
}

// Compact date+time for SVG bracket cards
function fmtDTShort(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString(undefined, { day:'numeric', month:'short' })
    + ' · ' + dt.toLocaleTimeString(undefined, { hour:'2-digit', minute:'2-digit' });
}

function nextTwo() {
  return ALL.filter(m => mst(m) === 'up')
    .sort((a, b) => new Date(a.d) - new Date(b.d))
    .slice(0, 2).map(m => m.id);
}

// ─── STANDINGS ───────────────────────────────────────────────────────────────
function applyRes(ht, at, hg, ag) {
  ht.P++; at.P++;
  ht.GF += hg; ht.GA += ag; at.GF += ag; at.GA += hg;
  if      (hg > ag) { ht.W++; at.L++; ht.PTS += 3; }
  else if (hg < ag) { at.W++; ht.L++; at.PTS += 3; }
  else              { ht.D++; at.D++; ht.PTS++;     at.PTS++; }
}

function standings(g) {
  const t = {};
  GROUPS[g].forEach((c, i) => t[c] = { c, seed:i, P:0, W:0, D:0, L:0, GF:0, GA:0, GD:0, PTS:0 });
  const gms = GM.filter(m => m.g === g);
  gms.forEach(m => { const s = sc(m.id); if (s) applyRes(t[m.h], t[m.a], s.h, s.a); });
  Object.values(t).forEach(x => x.GD = x.GF - x.GA);
  let rows = Object.values(t).sort((a, b) =>
    b.PTS - a.PTS || (b.GD - a.GD) || (b.GF - a.GF) || a.seed - b.seed);
  let i = 0;
  while (i < rows.length) {
    let j = i + 1;
    while (j < rows.length && rows[j].PTS === rows[i].PTS &&
           rows[j].GD === rows[i].GD && rows[j].GF === rows[i].GF) j++;
    if (j - i > 1) {
      const tied = new Set(rows.slice(i, j).map(r => r.c));
      const h2h  = {};
      rows.slice(i, j).forEach(r => h2h[r.c] = { PTS:0, GF:0, GA:0 });
      gms.filter(m => tied.has(m.h) && tied.has(m.a)).forEach(m => {
        const s = sc(m.id); if (!s) return;
        const H = h2h[m.h], A = h2h[m.a];
        H.GF += s.h; H.GA += s.a; A.GF += s.a; A.GA += s.h;
        if      (s.h > s.a) H.PTS += 3;
        else if (s.h < s.a) A.PTS += 3;
        else                { H.PTS++; A.PTS++; }
      });
      const sub = rows.slice(i, j).sort((a, b) => {
        const ha = h2h[a.c], hb = h2h[b.c];
        return hb.PTS - ha.PTS || (hb.GF - hb.GA) - (ha.GF - ha.GA) || hb.GF - ha.GF || a.seed - b.seed;
      });
      rows.splice(i, j - i, ...sub);
    }
    i = j;
  }
  return rows;
}

function grpDone(g) { return GM.filter(m => m.g === g).every(m => sc(m.id)); }

// ─── KNOCKOUT RESOLUTION ─────────────────────────────────────────────────────
function thirdAlloc() {
  const thirds = Object.keys(GROUPS)
    .map(g => ({ g, row: standings(g)[2] }))
    .sort((a, b) => b.row.PTS - a.row.PTS || (b.row.GD - a.row.GD) || b.row.GF - a.row.GF);
  const used = new Set(), out = {};
  KO.filter(m => m.as && m.as.t === '3rd')
    .sort((a, b) => a.id - b.id)
    .forEach(m => {
      const pick = thirds.find(x => m.as.gs.includes(x.g) && !used.has(x.g));
      if (pick) { used.add(pick.g); out[m.id] = pick.row.c; }
    });
  return out;
}

function resolve(slot, tMap, mid) {
  if (!slot) return null;
  if (slot.t === 'pos') {
    const row = standings(slot.g)[slot.p - 1];
    return { code: row.c, conf: grpDone(slot.g) };
  }
  if (slot.t === '3rd') {
    const code = tMap[mid];
    if (!code) return null;
    return { code, conf: Object.keys(GROUPS).every(grpDone) };
  }
  const ref = byId[slot.r], s = sc(slot.r);
  const th = resolve(ref.hs, tMap, slot.r), ta = resolve(ref.as, tMap, slot.r);
  if (!th || !ta || !s) return null;
  if (s.h === s.a) return null;
  const winner = s.h > s.a ? th : ta, loser = s.h > s.a ? ta : th;
  return { code: (slot.t === 'w' ? winner : loser).code, conf: th.conf && ta.conf };
}

function slotLbl(slot) {
  if (!slot) return 'TBD';
  if (slot.t === 'pos') {
    const p = slot.p === 1 ? '1st' : slot.p === 2 ? '2nd' : '3rd';
    return `${p} Group ${slot.g}`;
  }
  if (slot.t === '3rd') return `3rd (${slot.gs.split('').join('/')})`;
  return (slot.t === 'w' ? 'W' : 'L') + ' M' + slot.r;
}

function slotLblShort(slot) {
  if (!slot) return '?';
  if (slot.t === 'pos') return `${slot.p}G-${slot.g}`;
  if (slot.t === '3rd') return `3rd`;
  return (slot.t === 'w' ? 'W' : 'L') + slot.r;
}

// ─── COLLAPSIBLE SECTIONS ─────────────────────────────────────────────────────
function toggleSection(key) {
  // Prevent toggling t3 when section is hidden (groups complete)
  if (key === 't3') {
    const sec = document.getElementById('t3-sec');
    if (sec && sec.style.display === 'none') return;
  }
  collapsed[key] = !collapsed[key];
  const contentId = { grp: 'gg', t3: 't3rd', r32: 'r32' }[key];
  const el  = document.getElementById(contentId);
  const arr = document.getElementById(key + '-arr');
  if (el)  el.style.display = collapsed[key] ? 'none' : '';
  if (arr) arr.textContent  = collapsed[key] ? '\u25B8' : '\u25BE';
}

// ─── RENDERING ───────────────────────────────────────────────────────────────
function render() {
  const next = nextTwo(), tMap = thirdAlloc();
  renderGroups(next);
  renderThirdTracker();
  renderKO('r32', next, tMap);
  renderBracket();        // R16 → Final always as bracket SVG
}

// ── Group stage ────────────────────────────────────────────────────────────────
function renderGroups(next) {
  let h = '';
  Object.keys(GROUPS).forEach(g => {
    const rows = standings(g);
    h += `<div class="gc"><div class="gh" style="background:${GC[g]}">GROUP ${g}<span class="gl">${g}</span></div>`;
    GM.filter(m => m.g === g).sort((a, b) => new Date(a.d) - new Date(b.d)).forEach(m => {
      const st = mst(m), s = sc(m.id);
      const cls = next.includes(m.id) ? 'next' : st === 'live' ? 'live' : st === 'done' ? 'done' : '';
      const resCls = (st === 'done' && s)
        ? s.h > s.a ? ' res-h' : s.h < s.a ? ' res-a' : ' res-d' : '';
      const hv = s ? s.h : '', av = s ? s.a : '';
      h += `<div class="mb ${cls}">
        <div class="mt">${st === 'live' ? 'LIVE · ' : ''}${fmtDT(m.d)}</div>
        <div class="mr${resCls}" data-id="${m.id}">
          <div class="tm"><span class="fl">${F[m.h]||'🏳'}</span><span class="cd">${m.h}</span></div>
          <div class="sc"><div class="sb">${hv}</div><div class="sb">${av}</div></div>
          <div class="tm aw"><span class="fl">${F[m.a]||'🏳'}</span><span class="cd">${m.a}</span></div>
        </div></div>`;
    });
    h += `<table class="st"><tr><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr>`;
    rows.forEach((r, i) => {
      const gd = (r.GD > 0 ? '+' : '') + r.GD;
      h += `<tr class="${i < 2 ? 'q' : ''}">
        <td class="tc">${F[r.c]||''} ${r.c}</td>
        <td>${r.P}</td><td>${r.W}</td><td>${r.D}</td><td>${r.L}</td>
        <td>${gd}</td><td class="pts">${r.PTS}</td></tr>`;
    });
    h += `</table></div>`;
  });
  document.getElementById('gg').innerHTML = h;
}

// ── Round of 32 grid ──────────────────────────────────────────────────────────
function renderKO(stage, next, tMap) {
  const el = document.getElementById(stage);
  if (!el) return;
  const matches = KO.filter(m => m.st === stage).sort((a, b) => new Date(a.d) - new Date(b.d));
  let h = '';
  matches.forEach(m => {
    const s   = sc(m.id);
    const cls = next.includes(m.id) ? 'next' : '';
    const rh  = resolve(m.hs, tMap, m.id), ra = resolve(m.as, tMap, m.id);
    const hv  = s ? s.h : '', av = s ? s.a : '';
    h += `<div class="kc ${cls}">`;
    if (m.lbl) h += `<div class="klbl">${m.lbl}</div>`;
    h += `<div class="kt">M${m.id} · ${fmtDT(m.d)}</div>
      <div class="kr" data-id="${m.id}">
        ${koSlotHTML(rh, m.hs, '')}
        <div class="sc"><div class="sb">${hv}</div><div class="sb">${av}</div></div>
        ${koSlotHTML(ra, m.as, 'aw')}
      </div>
      <div class="ksl">${slotLbl(m.hs)} · ${slotLbl(m.as)}</div>
    </div>`;
  });
  el.innerHTML = h;
}

function koSlotHTML(r, slot, side) {
  if (r) return `<div class="ks ${side} ${r.conf ? '' : 'prov'}"><div class="ksc">${F[r.code]||'🏳'} ${r.code}</div></div>`;
  return `<div class="ks ${side}"><div class="ksc" style="color:var(--t3);font-weight:500;font-size:10px">${slotLbl(slot)}</div></div>`;
}

// ── Best third-place tracker ──────────────────────────────────────────────────
function renderThirdTracker() {
  const secEl = document.getElementById('t3-sec');
  const el    = document.getElementById('t3rd');
  if (!el || !secEl) return;
  if (Object.keys(GROUPS).every(grpDone)) {
    secEl.style.display = 'none';
    el.innerHTML = '';
    return;
  }
  secEl.style.display = '';

  const tMap = thirdAlloc();
  const thirds = Object.keys(GROUPS).map(g => {
    const row = standings(g)[2];
    return { g, ...row };
  }).sort((a, b) => b.PTS - a.PTS || (b.GD - a.GD) || b.GF - a.GF);

  const grpToSlot = {};
  Object.entries(tMap).forEach(([mid, code]) => {
    const g = Object.keys(GROUPS).find(gr => GROUPS[gr].includes(code));
    if (g) grpToSlot[g] = +mid;
  });

  let h = `<div class="t3-wrap"><table class="t3-tbl">
    <thead><tr>
      <th></th><th>Team</th><th>Group</th>
      <th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th><th>R32 slot</th>
    </tr></thead><tbody>`;
  thirds.forEach((r, i) => {
    const qual = i < 8;
    const gd   = (r.GD > 0 ? '+' : '') + r.GD;
    const slot = qual && grpToSlot[r.g] ? `M${grpToSlot[r.g]}` : '\u2014';
    h += `<tr class="${qual ? 'q3' : ''}">
      <td class="t3-rank">${i + 1}</td>
      <td class="t3-team">${F[r.c] || ''} ${r.c}</td>
      <td class="t3-grp">Group ${r.g}</td>
      <td>${r.P}</td><td>${r.W}</td><td>${r.D}</td><td>${r.L}</td>
      <td>${gd}</td><td class="pts">${r.PTS}</td>
      <td class="t3-slot">${slot}</td>
    </tr>`;
  });
  h += `</tbody></table>
    <p class="t3-note">Top 8 advance · R32 slot assignment is provisional</p>
  </div>`;
  el.innerHTML = h;
}

// ─── BRACKET SVG (R16 → Final, always shown) ─────────────────────────────────
function svgCard(id, cx, yc, tMap) {
  const m = byId[id];
  if (!m) return '';
  const s   = sc(id);
  const rh  = resolve(m.hs, tMap, id);
  const ra  = resolve(m.as, tMap, id);
  const mW  = 130, mH = 52, rH = 26, sW = 20, sX = mW - sW - 4;
  const x   = cx, y = yc - 26;
  const hs  = s != null ? s.h : '';
  const as_ = s != null ? s.a : '';
  const winH = s != null && s.h > s.a;
  const winA = s != null && s.h < s.a;
  const timeLbl  = fmtDTShort(m.d);
  const matchLbl = m.lbl ? m.lbl.toUpperCase() : '';

  const row = (r, slot, yOff) => {
    const flag = r ? (F[r.code] || '') : '';
    const code = r ? r.code : slotLblShort(slot).slice(0, 7);
    const prov = !!(r && !r.conf);
    const p    = prov ? ' bk-prov' : '';
    const cy   = yOff + 13;
    const sc_  = yOff === 0 ? hs : as_;
    return `<text x="5" y="${cy}" dominant-baseline="central" class="bk-flag${p}">${flag}</text>
      <text x="23" y="${cy}" dominant-baseline="central" class="bk-t${p}">${code}</text>
      <rect x="${sX}" y="${yOff + 4}" width="${sW}" height="${sW}" rx="3" class="bk-sb"/>
      <text x="${sX + 10}" y="${cy}" dominant-baseline="central" text-anchor="middle" class="bk-m">${sc_}</text>`;
  };

  return `<g transform="translate(${x},${y})" data-id="${id}" class="bk-card">
    ${matchLbl ? `<text x="${mW/2}" y="-17" text-anchor="middle" class="bk-lbl">${matchLbl}</text>` : ''}
    <text x="${mW/2}" y="-5" text-anchor="middle" class="bk-dim">${timeLbl}</text>
    <defs><clipPath id="bkcp${id}"><rect width="${mW}" height="${mH}" rx="5"/></clipPath></defs>
    <rect width="${mW}" height="${mH}" rx="5" class="bk-bg"/>
    ${winH ? `<g clip-path="url(#bkcp${id})"><rect width="${mW}" height="${rH}" class="bk-win-h"/></g>` : ''}
    ${winA ? `<g clip-path="url(#bkcp${id})"><rect y="${rH}" width="${mW}" height="${rH}" class="bk-win-a"/></g>` : ''}
    ${row(rh, m.hs, 0)}
    <line x1="0" y1="${rH}" x2="${mW}" y2="${rH}" class="bk-div"/>
    ${row(ra, m.as, rH)}
  </g>`;
}

function renderBracket() {
  const el = document.getElementById('ko-bkt');
  if (!el) return;
  const tMap = thirdAlloc();
  const mW = 130, svgW = 1130, svgH = 520;

  // Column x positions (left edge of each match column)
  const C = { r16l:5, qfl:170, sfl:335, fin:500, sfr:665, qfr:830, r16r:995 };

  // R16 yc pushed to 90 for more clearance above round labels with time text
  // Left half: M89, M90, M93, M94 → M97, M98 → M101 → M104
  // Right half: M91, M92, M95, M96 → M99, M100 → M102 → M104
  const LAYOUT = [
    [89,'r16l',90], [90,'r16l',210], [93,'r16l',330], [94,'r16l',450],
    [97,'qfl',150], [98,'qfl',390],
    [101,'sfl',270],
    [91,'r16r',90], [92,'r16r',210], [95,'r16r',330], [96,'r16r',450],
    [99,'qfr',150], [100,'qfr',390],
    [102,'sfr',270],
    [104,'fin',270],
    [103,'fin',410],
  ];

  // Vertical stub x-coords for bracket connectors
  const LS1 = C.r16l + mW + 18;  // 153
  const LS2 = C.qfl  + mW + 18;  // 318
  const RS1 = C.r16r - 18;        // 977
  const RS2 = C.qfr  - 18;        // 812

  const paths = [
    // Left R16 pair 1 (M89 yc=90, M90 yc=210) → QF M97 (yc=150)
    `M ${C.r16l+mW},90 H ${LS1} V 210 H ${C.r16l+mW} M ${LS1},150 H ${C.qfl}`,
    // Left R16 pair 2 (M93 yc=330, M94 yc=450) → QF M98 (yc=390)
    `M ${C.r16l+mW},330 H ${LS1} V 450 H ${C.r16l+mW} M ${LS1},390 H ${C.qfl}`,
    // Left QF pair (M97 yc=150, M98 yc=390) → SF M101 (yc=270)
    `M ${C.qfl+mW},150 H ${LS2} V 390 H ${C.qfl+mW} M ${LS2},270 H ${C.sfl}`,
    // SF-L → Final
    `M ${C.sfl+mW},270 H ${C.fin}`,
    // Right R16 pair 1 (M91 yc=90, M92 yc=210) → QF M99 (yc=150)
    `M ${C.r16r},90 H ${RS1} V 210 H ${C.r16r} M ${RS1},150 H ${C.qfr+mW}`,
    // Right R16 pair 2 (M95 yc=330, M96 yc=450) → QF M100 (yc=390)
    `M ${C.r16r},330 H ${RS1} V 450 H ${C.r16r} M ${RS1},390 H ${C.qfr+mW}`,
    // Right QF pair (M99 yc=150, M100 yc=390) → SF M102 (yc=270)
    `M ${C.qfr},150 H ${RS2} V 390 H ${C.qfr} M ${RS2},270 H ${C.sfr+mW}`,
    // SF-R → Final
    `M ${C.sfr},270 H ${C.fin+mW}`,
  ];

  let inner = '';
  paths.forEach(d => { inner += `<path class="bk-conn" d="${d}"/>`; });
  LAYOUT.forEach(([id, col, yc]) => { inner += svgCard(id, C[col], yc, tMap); });

  // Round column labels
  [
    [C.r16l+65,'R16'],[C.qfl+65,'QF'],[C.sfl+65,'SF'],
    [C.fin+65,'Final'],
    [C.sfr+65,'SF'],[C.qfr+65,'QF'],[C.r16r+65,'R16'],
  ].forEach(([lx, lt]) => {
    inner += `<text x="${lx}" y="15" text-anchor="middle" class="bk-lbl">${lt}</text>`;
  });

  el.innerHTML = `<div class="bkt-scroll"><svg viewBox="0 0 ${svgW} ${svgH}" class="bkt-svg" xmlns="http://www.w3.org/2000/svg">${inner}</svg></div>`;
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
document.getElementById('gg').addEventListener('click', e => {
  const el = e.target.closest('[data-id]');
  if (el) openModal(+el.dataset.id);
});
document.getElementById('r32').addEventListener('click', e => {
  const el = e.target.closest('[data-id]');
  if (el) openModal(+el.dataset.id);
});
document.getElementById('ko-bkt').addEventListener('click', e => {
  const card = e.target.closest('[data-id]');
  if (card) openModal(+card.dataset.id);
});

function openModal(id) {
  const m = byId[id]; if (!m) return;
  editId = id;
  const s = sc(id);
  let title;
  if (m.h && m.a) {
    title = `${F[m.h]||''} ${m.h} vs ${m.a} ${F[m.a]||''}`;
  } else {
    const tMap = thirdAlloc();
    const rh = resolve(m.hs, tMap, id), ra = resolve(m.as, tMap, id);
    title = (rh && ra) ? `${F[rh.code]||''} ${rh.code} vs ${ra.code} ${F[ra.code]||''}` : `Match ${id}`;
  }
  document.getElementById('mtt').textContent = title;
  document.getElementById('mst').textContent = fmtDT(m.d);
  document.getElementById('sh').value = s ? s.h : '';
  document.getElementById('sa').value = s ? s.a : '';
  document.getElementById('ov').classList.add('open');
  document.getElementById('sh').focus();
}

function closeModal() { document.getElementById('ov').classList.remove('open'); editId = null; }

function saveScore() {
  if (editId === null) return;
  const h = parseInt(document.getElementById('sh').value, 10);
  const a = parseInt(document.getElementById('sa').value, 10);
  if (isNaN(h) || isNaN(a) || h < 0 || a < 0) { alert('Enter valid scores (0 or more)'); return; }
  manual[editId] = { h, a };
  localStorage.setItem('wc26s', JSON.stringify(manual));
  closeModal(); render();
}

function clearScore() {
  if (editId === null) return;
  delete manual[editId];
  localStorage.setItem('wc26s', JSON.stringify(manual));
  closeModal(); render();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Enter' && editId !== null) saveScore();
});

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
function updateCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const now = Date.now();
  const lives = ALL.filter(m => mst(m) === 'live');
  if (lives.length) {
    const live = lives[0];
    const nH = live.h ? `${F[live.h]||''}${live.h}` : `M${live.id}`;
    const nA = live.a ? `${live.a}${F[live.a]||''}` : '';
    const more = lives.length > 1 ? ` +${lives.length - 1}` : '';
    el.innerHTML = `\u25CF LIVE \u00A0 ${nH}${nA ? ' vs ' + nA : ''}${more}`;
    el.className = 'live'; el.style.display = ''; return;
  }
  const nxt = ALL.filter(m => mst(m) === 'up').sort((a,b) => new Date(a.d)-new Date(b.d))[0];
  if (!nxt) { el.style.display = 'none'; return; }
  const diff = new Date(nxt.d).getTime() - now;
  if (diff <= 0) { render(); return; }
  const ss = Math.floor(diff / 1000);
  const hh = Math.floor(ss / 3600), mm = Math.floor((ss % 3600) / 60), sec = ss % 60;
  const nH = nxt.h ? `${F[nxt.h]||''}\u202F${nxt.h}` : `M${nxt.id}`;
  const nA = nxt.a ? `${nxt.a}\u202F${F[nxt.a]||''}` : '';
  const teams = nA ? `${nH} vs ${nA}` : nH;
  const t = hh > 0
    ? `${hh}h\u202F${String(mm).padStart(2,'0')}m\u202F${String(sec).padStart(2,'0')}s`
    : mm > 0 ? `${mm}m\u202F${String(sec).padStart(2,'0')}s` : `${sec}s`;
  el.innerHTML = `Next \u00B7 ${teams} \u00A0<span class="cd-time">${t}</span>`;
  el.className = ''; el.style.display = '';
}

// ─── SCORE FETCH ──────────────────────────────────────────────────────────────
const NAME_TO_CODE = {
  'Mexico':'MEX','South Africa':'RSA','South Korea':'KOR','Czech Republic':'CZE',
  'Canada':'CAN','Bosnia & Herzegovina':'BIH','Qatar':'QAT','Switzerland':'SUI',
  'Brazil':'BRA','Morocco':'MAR','Haiti':'HAI','Scotland':'SCO',
  'USA':'USA','Paraguay':'PAR','Australia':'AUS','Turkey':'TUR',
  'Germany':'GER','Curaçao':'CUW','Ivory Coast':'CIV','Ecuador':'ECU',
  'Netherlands':'NED','Japan':'JPN','Sweden':'SWE','Tunisia':'TUN',
  'Belgium':'BEL','Egypt':'EGY','Iran':'IRN','New Zealand':'NZL',
  'Spain':'ESP','Cape Verde':'CPV','Saudi Arabia':'KSA','Uruguay':'URU',
  'France':'FRA','Senegal':'SEN','Iraq':'IRQ','Norway':'NOR',
  'Argentina':'ARG','Algeria':'ALG','Austria':'AUT','Jordan':'JOR',
  'Portugal':'POR','DR Congo':'COD','Uzbekistan':'UZB','Colombia':'COL',
  'England':'ENG','Croatia':'CRO','Ghana':'GHA','Panama':'PAN',
};
// Build (homeCode+awayCode) → match id lookup from group stage fixtures
const PAIR_TO_ID = {};
GM.forEach(m => { PAIR_TO_ID[m.h + '|' + m.a] = m.id; });

async function fetchScores() {
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json',
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return;
    const j = await res.json();
    const arr = j.matches || [];
    let hit = false;
    arr.forEach(m => {
      if (!m.score) return;
      const hc = NAME_TO_CODE[m.team1];
      const ac = NAME_TO_CODE[m.team2];
      if (!hc || !ac) return;
      const id = PAIR_TO_ID[hc + '|' + ac];
      if (!id) return;
      const [h, a] = m.score.ft;
      apiSc[id] = { h, a };
      hit = true;
    });
    if (hit) render();
  } catch (_) {}
}

// ─── THEME ────────────────────────────────────────────────────────────────────
function setThemeBtn() { /* theme symbol handled by CSS ::before */ }
function toggleTheme() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const nxt  = dark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nxt);
  localStorage.setItem('wc26t', nxt);
  setThemeBtn();
  renderBracket(); // SVG CSS vars need a re-render on theme change
}

// ─── SIMULATION ──────────────────────────────────────────────────────────────
// Weighted realistic goal distribution: mean ~1.3 goals per team per match
function rg() {
  const r = Math.random();
  if (r < 0.28) return 0;
  if (r < 0.55) return 1;
  if (r < 0.75) return 2;
  if (r < 0.88) return 3;
  if (r < 0.95) return 4;
  return 5;
}

function simulate() {
  // Remove any previously simulated scores first
  simSet.forEach(id => delete manual[id]);
  simSet.clear();

  // ── Group stage: any result including draws ─────────────────────────────────
  GM.forEach(m => {
    manual[m.id] = { h: rg(), a: rg() };
    simSet.add(m.id);
  });

  // ── KO matches: no draws (no AET/pens in this model) ───────────────────────
  // Process in bracket order so resolve() sees upstream results correctly,
  // but since we score all at once in manual and render() re-derives everything
  // from scratch, order doesn't matter here — just ensure h ≠ a.
  KO.forEach(m => {
    let h = rg(), a = rg();
    while (h === a) a = rg();   // re-roll away goals until we have a winner
    manual[m.id] = { h, a };
    simSet.add(m.id);
  });

  localStorage.setItem('wc26s', JSON.stringify(manual));
  updateSimUI();
  render();
}

function revertSim() {
  // Remove only the scores generated by simulate(); preserve real manual entries
  simSet.forEach(id => delete manual[id]);
  simSet.clear();
  localStorage.setItem('wc26s', JSON.stringify(manual));
  updateSimUI();
  render();
}

function updateSimUI() {
  const active  = simSet.size > 0;
  const simBtn  = document.getElementById('sim-btn');
  const revBtn  = document.getElementById('rev-btn');
  const simInd  = document.getElementById('sim-ind');
  if (simBtn) simBtn.textContent = active ? 'Re-simulate' : 'Simulate';
  if (revBtn) revBtn.style.display = active ? '' : 'none';
  if (simInd) simInd.style.display = active ? '' : 'none';
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
render();
fetchScores();
setInterval(fetchScores, 120000);  // every 2 minutes
setInterval(render, 30000);
updateCountdown();
setInterval(updateCountdown, 1000);
// Prevent load animations re-triggering on every 30s re-render
setTimeout(() => document.body.classList.add('loaded'), 900);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch(err => console.warn('SW:', err));
  });
}
