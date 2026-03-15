// ─────────────────────────────────────────────────────────────────────────────
// Team roster — edit this file to keep the Team page current.
//
// SEASONS              : seasons with active rosters.
//                        When length > 1, the Team page should show a selector.
//                        When length === 1, no selector is rendered.
// CURRENT_SEASON       : default selected season on page load.
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

export const SEASONS = ['2025/26', '2026/27']; // add '2027/28' etc. here when the season is ready
export const CURRENT_SEASON = '2025/26';
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

// Controls the display order of department groups in the roster.
export const DEPT_ORDER = [
  'mechanical_design',
  'electric_software',
  'team_ops',
];

// Department heading labels, keyed by language code.
export const DEPT_LABELS = {
  en: {
    mechanical_design: 'Mechanical Design',
    electric_software: 'Electric & Software',
    team_ops:          'Team Operations',
  },
  tr: {
    mechanical_design: 'Mekanik Tasarım',
    electric_software: 'Elektrik ve Yazılım',
    team_ops:          'Takım Operasyonları',
  },
};
