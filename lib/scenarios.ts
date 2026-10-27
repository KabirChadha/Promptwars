import { WorkerPayload } from "@/lib/types";

/**
 * Interface representing a worker audit scenario in the demonstration roster.
 */
export interface WorkerScenario {
  id: string;
  pillTitle: string;
  pillBadge: string;
  payload: WorkerPayload;
}

/**
 * 5 Diverse Hackathon Worker Scenarios covering different industries,
 * working hours, overtime, and safety violation profiles.
 */
export const FIVE_WORKER_ROSTER: WorkerScenario[] = [
  {
    id: "suresh",
    pillTitle: "👷 Suresh K.",
    pillBadge: "Metro Construction • 58h, 7d, 18h OT • 440V Scaffolding Hazard",
    payload: {
      workerId: "WRK-MAS-7492",
      workerName: "Suresh Kumar",
      roleTitle: "Senior Scaffolding Rig Specialist",
      industry: "construction",
      language: "en",
      shiftHours: 8,
      consecutiveDays: 7,
      hourlyRate: 160,
      overtimeHours: 18,
      grievanceRawText:
        "Exposed 440V industrial wiring touching metal scaffold tower 3 in standing rainwater. Supervisor Sharma ordered us to keep pouring concrete despite electrocution sparks near worker Suresh.",
      acquiredSkills: [
        "Hydraulic Rig Operation Level 1",
        "Working at Heights & Scaffold Safety",
      ],
    },
  },
  {
    id: "rajesh",
    pillTitle: "🧱 Rajesh V.",
    pillBadge: "Metro Construction • 48h, 6d, 12h OT • Unpaid Night Shift Premium",
    payload: {
      workerId: "WRK-MAS-2841",
      workerName: "Rajesh Varma",
      roleTitle: "Structural Steel Rebar Fabricator",
      industry: "construction",
      language: "hi",
      shiftHours: 8,
      consecutiveDays: 6,
      hourlyRate: 140,
      overtimeHours: 12,
      grievanceRawText:
        "Sub-contractor Gupta deducted ₹3,200 from monthly wages for tool breakage without audit breakdown. Night shift overtime hours were paid at 1x base rate instead of statutory 2x overtime rate for Rajesh Varma.",
      acquiredSkills: [
        "Bar Bending & Structural Rebar Assembly",
        "Welding Safety Grade A",
      ],
    },
  },
  {
    id: "anil",
    pillTitle: "🏗️ Anil M.",
    pillBadge: "Metro Construction • 70h, 9d straight, 22h OT • Critical Crane Fatigue",
    payload: {
      workerId: "WRK-MAS-9104",
      workerName: "Anil Mishra",
      roleTitle: "Heavy Tower Crane Master Operator",
      industry: "construction",
      language: "en",
      shiftHours: 10,
      consecutiveDays: 9,
      hourlyRate: 220,
      overtimeHours: 22,
      grievanceRawText:
        "Completed 9 consecutive night shifts operating 45-meter tower crane in monsoon winds without cabin heating. Contractor refused relief operator, causing critical micro-sleep episodes during heavy steel beam lifts.",
      acquiredSkills: [
        "Tower Crane Precision Operation",
        "Heavy Lift Rigging Engineering",
      ],
    },
  },
  {
    id: "priya",
    pillTitle: "🧪 Priya M.",
    pillBadge: "SRMIST Campus • 40h, 5d, 6h OT • HazMat Chemical Glove Deficit",
    payload: {
      workerId: "WRK-SRM-3011",
      workerName: "Priya Mani",
      roleTitle: "Campus Facility & HazMat Custodian",
      industry: "campus",
      language: "ta",
      shiftHours: 8,
      consecutiveDays: 5,
      hourlyRate: 130,
      overtimeHours: 6,
      grievanceRawText:
        "Chemical stripping acid supplied without nitrile gloves or organic vapor masks in chemistry lab block. Contractor Kumar refused replacement PPE and threatened wage deductions for worker Priya.",
      acquiredSkills: [
        "Institutional Sanitization & HazMat Level 2",
        "Campus Facility Emergency First Aid",
      ],
    },
  },
  {
    id: "deepak",
    pillTitle: "🍲 Deepak S.",
    pillBadge: "SRMIST Campus • 64h, 7d straight, 16h OT • Dining Hall Burnout",
    payload: {
      workerId: "WRK-SRM-5120",
      workerName: "Deepak Sharma",
      roleTitle: "University Central Mess & Culinary Steward",
      industry: "campus",
      language: "hi",
      shiftHours: 9,
      consecutiveDays: 7,
      hourlyRate: 120,
      overtimeHours: 16,
      grievanceRawText:
        "Kitchen staff logging 16-hour double shifts continuously for 7 days preparing 4,500 student meals during exam rush. Exhaust fans non-functional causing heat exhaustion and minor oil burns. Supervisor denied sick leave for Deepak Sharma.",
      acquiredSkills: [
        "Commercial Kitchen Hygiene & HACCP",
        "Industrial Steam Equipment Safety",
      ],
    },
  },
];

export default FIVE_WORKER_ROSTER;
