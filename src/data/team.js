// ─────────────────────────────────────────────────────────────────────────────
// Team roster — edit this file to keep the Team page current.
//
// SEASONS              : seasons the Team page offers in its selector.
//                        When length > 1, the Team page shows a selector.
//                        When length === 1, no selector is rendered.
//                        Append upcoming seasons here — they appear as a tab
//                        straight away, but only become the default once they
//                        actually have members.
// LATEST_SEASON        : newest season in SEASONS.
// DEFAULT_SEASON       : season selected on page load — the newest one with a
//                        roster, falling back to LATEST_SEASON when none has
//                        members yet. Sanity can override this at runtime.
// MEMBER_COUNT_DISPLAY : shown in the stats bar — update manually when needed.
//
// rosterBySeason       : member list keyed by season string.
//   Each member:
//     name     (string)  — full name
//     role     (string)  — job title / position
//     dept     (string)  — must match a key in DEPT_ORDER
//     photo    (string|null) — path from /public root, e.g. "/images/team/doe.jpg"
//     linkedin (string|null) — full URL, or null to hide the link
//
// DEPT_ORDER  : controls the display order of department groups.
// DEPT_LABELS : department heading text, keyed by language code.
// ─────────────────────────────────────────────────────────────────────────────

export const SEASONS = ['2025/26', '2026/27', '2027/28']; // add '2028/29' etc. here when the season is ready

// Orders season strings like '2025/26' chronologically (oldest → newest).
// Falls back to a plain string compare for anything that isn't year-prefixed.
export const compareSeasons = (a, b) => {
  const yearA = parseInt(a, 10);
  const yearB = parseInt(b, 10);
  if (Number.isNaN(yearA) || Number.isNaN(yearB)) return String(a).localeCompare(String(b));
  return yearA - yearB || String(a).localeCompare(String(b));
};

// Newest declared season, regardless of whether it has a roster yet.
export const LATEST_SEASON = [...SEASONS].sort(compareSeasons).at(-1);

// Picks the newest season that has at least one member, or null if none does.
export const latestSeasonWithMembers = (seasonList, hasMembers) =>
  [...seasonList].sort(compareSeasons).filter(hasMembers).at(-1) ?? null;

export const MEMBER_COUNT_DISPLAY = '17+';

export const rosterBySeason = {
  '2025/26': [
    // ── Mechanical Design ──────────────────────────────────────────────────
    { name: 'Ahmet Yılmaz',    role: 'Mechanical Lead',           dept: 'mechanical_design', photo: null, linkedin: null },
    { name: 'Kaan Şahin',      role: 'Suspension Engineer',       dept: 'mechanical_design', photo: null, linkedin: null },
    { name: 'Mert Demir',      role: 'Chassis Engineer',          dept: 'mechanical_design', photo: null, linkedin: null },
    { name: 'Berk Arslan',     role: 'Powertrain Engineer',       dept: 'mechanical_design', photo: null, linkedin: null },

    // ── Electric & Software ───────────────────────────────────────────────
    { name: 'Ece Kaya',        role: 'Electrical Lead',           dept: 'electric_software', photo: null, linkedin: null },
    { name: 'Burak Çelik',     role: 'Wiring Harness Engineer',   dept: 'electric_software', photo: null, linkedin: null },
    { name: 'Selin Aydın',     role: 'PCB Designer',              dept: 'electric_software', photo: null, linkedin: null },
    { name: 'Ozan Güner',      role: 'Control Systems Lead',      dept: 'electric_software', photo: null, linkedin: null },
    { name: 'Deniz Polat',     role: 'ECU Engineer',              dept: 'electric_software', photo: null, linkedin: null },
    { name: 'Ayşe Doğan',      role: 'Software Lead',             dept: 'electric_software', photo: null, linkedin: null },
    { name: 'Umut Koç',        role: 'Simulation Engineer',       dept: 'electric_software', photo: null, linkedin: null },

    // ── Team Operations ───────────────────────────────────────────────────
    { name: 'Emir Hamurcu',    role: 'Team Principal',            dept: 'team_ops',   photo: null, linkedin: null },
    { name: 'İrem Özdemir',    role: 'Finance Lead',              dept: 'team_ops',   photo: null, linkedin: null },
    { name: 'Kerem Yıldız',    role: 'Sponsorship Coordinator',   dept: 'team_ops',   photo: null, linkedin: null },
    { name: 'Nisan Öztürk',    role: 'Marketing Lead',            dept: 'team_ops',   photo: null, linkedin: null },
    { name: 'Barış Çetin',     role: 'Social Media & Content',    dept: 'team_ops',   photo: null, linkedin: null },
  ],

  '2026/27': [
    // Add 2026/27 members here when the season begins.
  ],

  '2027/28': [
    // Add 2027/28 members here when the season begins.
  ],
};

// Season the Team page opens on before Sanity answers: the newest one with a
// roster here, or the newest declared season if no roster is filled in yet.
export const DEFAULT_SEASON =
  latestSeasonWithMembers(SEASONS, (s) => rosterBySeason[s]?.length > 0) ?? LATEST_SEASON;

// Controls the display order of department groups in the roster.
export const DEPT_ORDER = [
  'mechanical_design',
  'electric_software',
  'team_ops',
];

// Department heading labels, keyed by language code.
export const DEPT_LABELS = {
  en: {
    leadership:        'Leadership',
    mechanical_design: 'Mechanical Design',
    electric_software: 'Electric & Software',
    team_ops:          'Team Operations',
  },
  tr: {
    leadership:        'LİDERLİK',
    mechanical_design: 'MEKANİK TASARIM',
    electric_software: 'ELEKTRİK VE YAZILIM',
    team_ops:          'Takım Operasyonları',
  },
};
