export const NEWS_CATEGORIES = ['sponsor', 'team', 'development', 'event'];

export const newsPosts = [
  {
    id: 1,
    slug: 'first-full-team-workshop-day',
    category: 'team',
    title: 'First Full-Team Workshop Day',
    description:
      'All sub-teams gathered for a full-day session on campus — technical reviews, cross-department alignment, and hands-on manufacturing work marked the start of our intensive build phase.',
    date: '2026-03-01',
    image: '/images/team.jpg',
    body: [
      'On the 1st of March 2026, Boğaziçi Racing held its first full-team workshop day of the year, bringing together all sub-teams under one roof for a structured day of collaborative engineering work.',
      'The session opened with a joint technical review led by the chief engineer, covering progress across mechanical, electrical, aerodynamics, and software departments. Key milestones were assessed against the project timeline, and outstanding design tasks were reprioritised ahead of the manufacturing phase.',
      'Throughout the afternoon, teams moved into focused hands-on sessions. The chassis group continued preparation work on the primary frame jig, while the electronics team ran integration tests on the newly assembled wiring harness. The aerodynamics department presented updated CFD results and discussed geometry adjustments needed before final mould preparation.',
      'Cross-department alignment was a central theme of the day. Engineers from structural and powertrain worked together to finalise mounting geometry for the engine sub-frame, resolving a key interface conflict that had been flagged in the previous design review.',
      'The workshop concluded with a short debrief and a revised task board. The team leaves the session energised and with a clearer shared vision heading into the most critical phase of the build calendar.',
    ],
  },
  {
    id: 2,
    slug: 'aerodynamics-initial-cfd-results',
    category: 'development',
    title: 'Aerodynamics: Initial CFD Results',
    description:
      'Our aero sub-team completed the first round of CFD simulations for the front wing assembly, confirming positive downforce targets and setting the direction for the next design iteration.',
    date: '2026-02-28',
    image: '/images/hero.jpg',
    body: [
      'The aerodynamics sub-team has completed the first round of computational fluid dynamics (CFD) simulations for the front wing assembly, marking a significant step forward in the vehicle\'s development programme.',
      'Using ANSYS Fluent on a meshed geometry derived from the latest CAD revision, the team ran steady-state RANS simulations across a speed range of 40–120 km/h. Results confirmed a positive downforce coefficient that meets the preliminary targets set during concept review, with drag figures within acceptable bounds for an entry-level Formula Student configuration.',
      'Pressure distribution across the main plane and flap profiles was particularly encouraging — the leading-edge stagnation zone behaved as predicted, and no unexpected flow separation was observed at the design operating angles. The team has flagged a localised low-pressure region at the endplate junction that will be addressed in the next geometry iteration.',
      'The simulation data has been handed to the structural engineering group to inform composite lay-up decisions for the wing skin. Load cases derived from the CFD output will feed directly into the finite element analysis workflow.',
      'The next step is a second simulation campaign incorporating a revised endplate design and a modified flap angle range. The team is targeting final front wing geometry sign-off within the next three weeks, ahead of mould manufacture.',
    ],
  },
  {
    id: 3,
    slug: 'new-member-recruitment-open',
    category: 'team',
    title: 'New Member Recruitment Open',
    description:
      'Applications are open for all sub-teams including mechanical, electrical, software, and business. We welcome students from all years and disciplines at Boğaziçi University.',
    date: '2026-02-20',
    image: null,
    body: [
      'Boğaziçi Racing is opening applications for new members across all departments. Whether you are a first-year student curious about motorsport engineering or a final-year student looking to apply your expertise on a real competition vehicle, there is a place for you on the team.',
      'We are currently recruiting for the following sub-teams: Chassis and Structural Engineering, Powertrain and Drivetrain, Aerodynamics, Electronics and Data Acquisition, Software and Controls, and Business and Sponsorship.',
      'No prior Formula Student experience is required. What matters most is enthusiasm, a willingness to learn, and the ability to commit to the team\'s schedule. We provide full onboarding, mentoring from senior members, and direct access to professional-grade engineering tools through our sponsor partnerships.',
      'Applications are open to all students currently enrolled at Boğaziçi University. The process involves a short application form and an informal interview with the relevant sub-team lead. Successful candidates will be invited to join the team immediately and take part in ongoing project work.',
      'To apply, visit our contact page or reach out through our official Instagram channel. Applications close on the 10th of March 2026. We look forward to meeting you.',
    ],
  },
  {
    id: 4,
    slug: 'bias-muhendislik-joins-as-technical-sponsor',
    category: 'sponsor',
    title: 'BİAS Mühendislik Joins as Technical Sponsor',
    description:
      'We are proud to welcome BİAS Mühendislik as a technical sponsor. Their simulation and analysis software will directly accelerate our vehicle development programme.',
    date: '2026-02-15',
    image: null,
    body: [
      'Boğaziçi Racing is delighted to announce that BİAS Mühendislik has joined the team as an official technical sponsor for the 2025/26 competition season.',
      'BİAS Mühendislik is a leading Turkish engineering software and services company with deep expertise in structural simulation, finite element analysis, and design validation. Their tools are widely used across the Turkish automotive and aerospace industries, and their decision to partner with Boğaziçi Racing reflects a shared commitment to advancing engineering education and competition performance.',
      'Under the sponsorship agreement, BİAS will provide the team with software licences, technical training, and direct engineering support. This gives our structural and chassis engineers access to industry-standard FEA workflows that would otherwise be inaccessible to a student team, significantly raising the quality and reliability of our design validation process.',
      'The partnership was established following an introduction through the Boğaziçi University Engineering Faculty, and we are grateful to BİAS for their confidence in the team\'s potential. Their investment in our programme goes beyond software — the mentorship and professional guidance their engineers bring will be invaluable as we approach the competition season.',
      'We welcome BİAS Mühendislik to the Boğaziçi Racing family and look forward to building a long-term relationship that benefits both the team and the wider engineering community.',
    ],
  },
  {
    id: 5,
    slug: 'chassis-design-freeze-achieved',
    category: 'development',
    title: 'Chassis Design Freeze Achieved',
    description:
      'A significant milestone — the structural engineering team has reached design freeze on the primary chassis, allowing manufacturing preparation and material procurement to begin.',
    date: '2026-02-10',
    image: null,
    body: [
      'The structural engineering team has formally achieved design freeze on the primary chassis of the BR-01, a milestone that unlocks the manufacturing preparation and material procurement phases of the project.',
      'Design freeze was reached following the final internal review session, in which the chassis geometry was validated against all relevant Formula Student 2026 safety and dimensional requirements. Torsional stiffness targets, driver egress clearances, and harness mounting provisions were all confirmed to be compliant.',
      'The final chassis design features a space-frame architecture constructed from 25CrMo4 chromoly steel tubing, selected for its favourable strength-to-weight ratio and weldability. Key interfaces with the suspension, powertrain, and aerodynamics packages have been frozen and shared with the respective sub-teams as locked reference geometry.',
      'With the design now frozen, the team has initiated material procurement through its supplier network and confirmed jig fabrication timelines with the university workshop. The first cuts on primary structure tubing are scheduled for the week of the 2nd of March.',
      'Reaching design freeze on schedule is a testament to the discipline and coordination of the structural team. The project remains on track for a complete rolling chassis build by the end of March, ahead of first integration testing in April.',
    ],
  },
  {
    id: 6,
    slug: 'bogazici-racing-at-the-engineering-fair',
    category: 'event',
    title: 'Boğaziçi Racing at the Engineering Fair',
    description:
      'The team presented the project to over 500 students at the Boğaziçi University Engineering Fair, generating strong interest in Formula Student and opening new recruitment pathways.',
    date: '2026-02-05',
    image: null,
    body: [
      'On the 5th of February 2026, Boğaziçi Racing participated in the annual Boğaziçi University Engineering Fair, one of the most significant student engagement events on the university calendar.',
      'The team set up a dedicated stand in the engineering faculty atrium, featuring technical displays covering the vehicle design, sub-system breakdowns, and the Formula Student competition itself. CAD renderings, simulation outputs, and component samples were on display to give visitors a tangible sense of the engineering work underway.',
      'Over the course of the day, the stand was visited by more than 500 students, including a significant number of first and second-year undergraduates who had not previously heard of Formula Student. The team\'s senior members spoke about their experiences, the skills developed through competition, and the career pathways that motorsport engineering opens up.',
      'The response was overwhelmingly positive. A large number of students expressed interest in joining the team, and more than 80 contact details were collected through a sign-up form managed at the stand. This intake will feed directly into the recruitment process currently under way.',
      'The Engineering Fair proved to be an excellent platform for raising the profile of Boğaziçi Racing across campus. We thank the Faculty of Engineering for the invitation to participate and look forward to attending again next year with, hopefully, a completed car on display.',
    ],
  },
  {
    id: 7,
    slug: 'electronics-integration-daq-system-live',
    category: 'development',
    title: 'Electronics Integration: DAQ System Live',
    description:
      'The electronics team successfully integrated the data acquisition system, enabling real-time telemetry logging and laying the groundwork for the first on-car testing phase.',
    date: '2026-01-30',
    image: null,
    body: [
      'The electronics sub-team has successfully completed the integration of the data acquisition system, bringing a key component of the BR-01\'s onboard infrastructure live for the first time.',
      'The DAQ system is built around a compact, motorsport-grade logging unit selected for its low weight, robust CAN bus interface, and compatibility with the sensor suite specified by the team\'s data engineer. The system is capable of logging over 50 channels simultaneously at up to 1000 Hz, covering parameters including throttle position, brake pressure, suspension travel, wheel speed, battery voltage, and coolant temperature.',
      'Initial bench testing confirmed stable data capture across all primary channels, with CAN communication verified between the DAQ unit, the engine control unit, and the dashboard display module. Ground loops and EMI issues that appeared in early testing were resolved through revised cable routing and the addition of differential signal conditioning on sensor inputs.',
      'The system\'s real-time telemetry output has been validated against a laptop-based monitoring tool, giving engineers a live view of vehicle state during test runs. This capability will be central to the team\'s testing and development methodology once the car is running.',
      'Integration of the DAQ system on the physical chassis is planned to coincide with the rolling chassis build milestone in March. The electronics team is now focused on wiring harness fabrication and instrument cluster integration ahead of that deadline.',
    ],
  },
  {
    id: 8,
    slug: 'hexagon-manufacturing-intelligence-partners',
    category: 'sponsor',
    title: 'Hexagon Manufacturing Intelligence Partners with Boğaziçi Racing',
    description:
      'Hexagon Manufacturing Intelligence has joined as a key technology partner, providing world-class metrology and manufacturing software to our engineering teams.',
    date: '2026-01-20',
    image: null,
    body: [
      'Boğaziçi Racing is proud to announce a technology partnership with Hexagon Manufacturing Intelligence, a global leader in digital reality solutions for manufacturing and engineering.',
      'Hexagon Manufacturing Intelligence provides industry-leading software and hardware solutions used by automotive manufacturers, aerospace companies, and motorsport teams worldwide. Their portfolio spans metrology, quality management, simulation, and production control — tools that are directly relevant to the engineering challenges faced by the Boğaziçi Racing project.',
      'Through this partnership, the team will gain access to Hexagon\'s manufacturing software suite, enabling more precise component quality verification and tighter tolerances in the production of critical chassis and suspension parts. The collaboration will also involve training sessions delivered by Hexagon engineers, giving team members exposure to professional-grade workflows used in the wider industry.',
      'This partnership is particularly significant for the team\'s quality assurance process. Having access to metrology-grade verification tools means we can validate manufactured components against design intent with a level of accuracy that is rarely available to student teams. This directly improves the safety and performance confidence of the final vehicle.',
      'We are honoured to be supported by an organisation of Hexagon\'s calibre and look forward to demonstrating the results of this partnership at competition. Their investment in student engineering talent reflects the kind of long-term thinking that makes Formula Student such a valuable programme.',
    ],
  },
  {
    id: 9,
    slug: 'formula-student-regulation-study-session',
    category: 'event',
    title: 'Formula Student Regulation Study Session',
    description:
      'The team held a structured internal session to align all members on FS2026 rules, static event requirements, and safety standards ahead of formal competition registration.',
    date: '2026-01-15',
    image: null,
    body: [
      'On the 15th of January 2026, Boğaziçi Racing held an internal Formula Student regulation study session, bringing together all team members to work through the FS2026 rulebook in a structured and collaborative format.',
      'The session was organised in response to the publication of the updated FS2026 regulations, which introduced several changes to static event requirements, safety system specifications, and documentation submission processes. With competition registration approaching, it was essential for all members — not just technical leads — to have a working understanding of the rules that govern the project.',
      'The two-hour session was divided into sections covering the dynamic events, the engineering design event, cost analysis, and business presentation requirements. Each section was led by the relevant sub-team lead, who summarised the key rules, highlighted changes from the previous year\'s rulebook, and answered questions from the wider team.',
      'Key outcomes from the session included a revised interpretation of the impact attenuator specification that affects the chassis team\'s design, an updated checklist for the scrutineering documentation package, and a clearer shared understanding of the cost event requirements that will shape material procurement decisions.',
      'Regular regulation review sessions will continue throughout the build period. Staying aligned with the rules from an early stage is one of the most effective ways to avoid costly late-stage design changes, and the team is committed to maintaining this discipline as competition approaches.',
    ],
  },
];
