import { NextRequest, NextResponse } from "next/server";
import { AnalysisResponse } from "@/lib/types";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const inputContent: string = (body?.content || body?.text || "").trim();
    const scenarioId: string = body?.scenarioId || "";

    // Simulated 1.2s network latency as required
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Determine tailored response based on scenario or text
    let mockResponse: AnalysisResponse;

    if (scenarioId === "factory-labor" || inputContent.toLowerCase().includes("factory") || inputContent.toLowerCase().includes("overtime")) {
      mockResponse = {
        overallScore: 54,
        status: "Critical",
        summary:
          "High-risk labor compliance gaps detected across production shifts. Excessive mandatory overtime, unindexed hazardous material handling, and lack of verified overtime wage premiums violate UN SDG Target 8.8 and local statutory rest periods.",
        findings: [
          {
            title: "Excessive Overtime & Mandatory Weekend Shifts",
            severity: "high",
            description:
              "Workers in Assembly Line B log an average of 68 hours weekly during peak quarters, exceeding statutory limits by 20 hours with punitive attendance rules.",
            recommendation:
              "Institute digital time-tracking lockouts after 48 continuous weekly hours and re-negotiate voluntary surge rosters with 1.5x shift premiums.",
            sdgTargetRef: "Target 8.8: Protect labour rights & promote safe working environments",
          },
          {
            title: "Uncertified Solvent Exposure Without PPE Protocols",
            severity: "high",
            description:
              "Volatile organic compound (VOC) levels in the finishing plant exceed threshold limit values (TLVs) by 32%, with intermittent mask supply.",
            recommendation:
              "Commission immediate HVAC localized extraction ventilation and implement mandatory certified N95/half-mask respirators with biometric log verification.",
            sdgTargetRef: "Target 8.8: Safe and secure working environments for all workers",
          },
          {
            title: "Opaque Piece-Rate Deductions & Bonus Clawbacks",
            severity: "medium",
            description:
              "Variable quality deductions reduce net hourly wages below the regional living wage threshold in 18% of monthly cycles.",
            recommendation:
              "Transition to guaranteed transparent floor wage baselines with quality incentives detached from minimum statutory take-home pay.",
            sdgTargetRef: "Target 8.5: Decent work & equal pay for work of equal value",
          },
          {
            title: "Absence of Worker-Led Safety Committee",
            severity: "low",
            description:
              "Safety reviews are conducted solely by facility management without shop-floor representation or anonymous whistleblowing channels.",
            recommendation:
              "Charter a Joint Occupational Health and Safety (OHS) Committee comprising 50% democratically elected worker delegates.",
            sdgTargetRef: "Target 8.8: Safe working environments and worker representation",
          },
        ],
        actionPlan: [
          {
            step: 1,
            action: "Halt mandatory 60+ hour overtime rosters and deploy automated biometric punch-out enforcement.",
            impact: "Immediate elimination of acute fatigue-related occupational hazards (-85% risk).",
          },
          {
            step: 2,
            action: "Upgrade localized solvent vapor scrubbers and mandate certified respirator issuance.",
            impact: "Ensures 100% OSHA and WHO airborne chemical concentration compliance.",
          },
          {
            step: 3,
            action: "Publish baseline living wage guarantees and abolish non-consensual defect wage clawbacks.",
            impact: "Brings 100% of the operational workforce above UN living-wage benchmarks.",
          },
          {
            step: 4,
            action: "Formalize bi-weekly worker OHS council meetings with protected whistleblowing hotline.",
            impact: "Fosters transparent labor relations and aligns with ILO Convention 155.",
          },
        ],
        generatedDocument: `# UN SDG 8 COMPLIANCE AUDIT REPORT: INDUSTRIAL SECTOR
**Evaluation Date**: ${new Date().toISOString().split("T")[0]}
**Audited Target**: Industrial Manufacturing & Assembly Operations
**Benchmark Standards**: UN SDG 8 (Decent Work & Economic Growth) | ILO Core Labour Conventions

---

## 1. Executive Summary
The facility registered an Overall Compliance Index of **54/100 (Status: Critical)**. Multiple critical vulnerabilities were identified relating to Target 8.8 (Labour Rights and Workplace Safety) and Target 8.5 (Decent Work & Living Wages).

## 2. Key Findings & Target Alignment
- **Target 8.8**: Excessive overtime hours (68h peak weekly average) without restorative breaks.
- **Target 8.8**: Industrial chemical air contaminants exceeding permissible safety exposure limits.
- **Target 8.5**: Deductive penalties pushing seasonal take-home pay beneath living-wage thresholds.

## 3. Statutory & Corrective Roadmap
1. **Week 1-2**: Cap weekly shifts at 48 hours maximum; enable whistleblower grievance ticketing.
2. **Week 3-4**: Air filtration retrofit and ergonomic equipment deployment.
3. **Month 2**: Independent living wage certification audit and worker-elected safety board inauguration.

---
*Report generated by SDG 8 Engine v1.0. Certified compliance hash: SHA256-SDG8-ENG-8472*`,
      };
    } else if (scenarioId === "gig-contractor" || inputContent.toLowerCase().includes("gig") || inputContent.toLowerCase().includes("contractor")) {
      mockResponse = {
        overallScore: 68,
        status: "Warning",
        summary:
          "Algorithmic labor allocation exhibits systemic security vulnerabilities: algorithmic deactivation without due process, lack of health micro-insurance, and misclassification of full-time dependent gig contractors.",
        findings: [
          {
            title: "Automated Algorithmic Termination Without Appeal",
            severity: "high",
            description:
              "Contractors face automated account suspensions triggered by customer review anomalies without human review or arbitrated appeal mechanisms.",
            recommendation:
              "Mandate human-in-the-loop review before termination, paired with a 72-hour formal dispute window and case evidence disclosure.",
            sdgTargetRef: "Target 8.5: Productive employment and decent work for all women and men",
          },
          {
            title: "Absence of Healthcare & Injury Micro-Insurance",
            severity: "medium",
            description:
              "Field couriers and dispatchers lack platform-sponsored accidental insurance coverage while actively logged into delivery dispatches.",
            recommendation:
              "Embed portable per-hour micro-insurance policies covering third-party liability and medical coverage during active shift hours.",
            sdgTargetRef: "Target 8.8: Protect labour rights and promote safe working environments",
          },
          {
            title: "Sub-Minimum Unpaid Standby & Waiting Times",
            severity: "medium",
            description:
              "Between-dispatch idle intervals average 26% of online duration and receive zero engagement stipends, diluting effective hourly earnings.",
            recommendation:
              "Implement active engagement minimum floor rates and transparent surge pricing disclosures for queued waiting intervals.",
            sdgTargetRef: "Target 8.5: Equal pay for work of equal value & living wage protection",
          },
        ],
        actionPlan: [
          {
            step: 1,
            action: "Institute an Independent Grievance & Appeal Panel for algorithmic deactivations.",
            impact: "Restores procedural justice and fair hearing rights for 100% of platform workers.",
          },
          {
            step: 2,
            action: "Partner with digital insurtech for automated transit accident micro-coverage.",
            impact: "Guarantees comprehensive health coverage for couriers during shift hours.",
          },
          {
            step: 3,
            action: "Establish transparent dispatch fee schedules inclusive of verified idle stand-by time.",
            impact: "Guarantees average net income reaches 115% of regional minimum wage.",
          },
        ],
        generatedDocument: `# UN SDG 8 COMPLIANCE AUDIT REPORT: PLATFORM & GIG ECONOMY
**Evaluation Date**: ${new Date().toISOString().split("T")[0]}
**Audited Target**: On-Demand Gig Workforce & Dispatch Logistics
**Benchmark Standards**: UN SDG 8 (Decent Work & Economic Growth) | Fairwork Platform Principles

---

## 1. Platform Evaluation Summary
The platform achieved an Overall Compliance Score of **68/100 (Status: Warning)**. While flexible access to work is supported, structural risks remain in algorithmic transparency, wage predictability, and safety coverage.

## 2. Priority Risk Matrix
- **Deactivation Protocol**: Automated algorithmic bans without transparent human adjudication.
- **Safety Net**: Complete absence of operational injury insurance during active route deliveries.
- **Fair Pay**: Non-compensated standby time degrades real net hourly yield.

---
*Report generated by SDG 8 Engine v1.0. Certified compliance hash: SHA256-SDG8-GIG-9912*`,
      };
    } else {
      // Default / Supply chain scenario
      mockResponse = {
        overallScore: 82,
        status: "Compliant",
        summary:
          "High alignment with core SDG 8 standards. Supply chain traceability, formal apprenticeship pathways, and gender wage parity show strong baseline compliance with minor monitoring gaps in tier-2 subcontractors.",
        findings: [
          {
            title: "Tier-2 Subcontractor Overtime Visibility Deficit",
            severity: "medium",
            description:
              "While Tier-1 suppliers maintain certified electronic time tracking, secondary textile mills lack centralized auditing access for seasonal peak hours.",
            recommendation:
              "Deploy decentralized digital ledger supplier audits requiring Tier-2 suppliers to log anonymized payroll and clock-in records quarterly.",
            sdgTargetRef: "Target 8.7: Eradicate forced labour, modern slavery and human trafficking",
          },
          {
            title: "Youth Apprenticeship Formalization Opportunity",
            severity: "low",
            description:
              "Vocational training programs for young workers are currently ad-hoc and lack accredited certification upon program completion.",
            recommendation:
              "Partner with regional polytechnic universities to convert informal internships into certified, fully compensated dual-education pathways.",
            sdgTargetRef: "Target 8.6: Substantially reduce youth not in employment, education or training (NEET)",
          },
          {
            title: "Proactive Ergonomics & Repetitive Strain Mitigation",
            severity: "low",
            description:
              "Packaging stations show elevated repetitive strain instances during double-shift periods.",
            recommendation:
              "Implement mandatory ergonomic rotation schedules every 90 minutes and introduce anti-fatigue matting.",
            sdgTargetRef: "Target 8.8: Promote safe and secure working environments",
          },
        ],
        actionPlan: [
          {
            step: 1,
            action: "Expand supplier compliance portal to encompass all Tier-2 secondary subcontractors.",
            impact: "Ensures 100% end-to-end supply chain transparency and zero-tolerance modern slavery compliance.",
          },
          {
            step: 2,
            action: "Establish formal accreditation partnerships for youth vocational apprenticeships.",
            impact: "Directly contributes to Target 8.6 NEET reduction with accredited career credentials.",
          },
          {
            step: 3,
            action: "Standardize micro-ergonomic job rotation protocols across all packaging hubs.",
            impact: "Expected 45% reduction in repetitive strain complaints within 6 months.",
          },
        ],
        generatedDocument: `# UN SDG 8 COMPLIANCE AUDIT REPORT: GLOBAL SUPPLY CHAIN
**Evaluation Date**: ${new Date().toISOString().split("T")[0]}
**Audited Target**: Multi-tier Supply Chain & Vocational Operations
**Benchmark Standards**: UN SDG 8 (Decent Work & Economic Growth) | OECD Due Diligence Guidance

---

## 1. Compliance Audit Overview
The audited supply chain operations scored **82/100 (Status: Compliant)**. Baseline performance across fair remuneration, non-discrimination, and fundamental safety is high, with actionable recommendations to solidify secondary supplier transparency.

## 2. Key Commendations & Opportunities
- **Commendation**: 100% verified living wage adherence in all primary Tier-1 manufacturing facilities.
- **Target 8.7 Action**: Extend audit visibility protocols down to auxiliary raw material processors.
- **Target 8.6 Action**: Accredit vocational training modules to advance youth career progression.

---
*Report generated by SDG 8 Engine v1.0. Certified compliance hash: SHA256-SDG8-SUP-3301*`,
      };
    }

    return NextResponse.json(mockResponse, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred during SDG 8 analysis." },
      { status: 500, headers: corsHeaders }
    );
  }
}
