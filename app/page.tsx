"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import {
  Industry,
  UserRole,
  Language,
  WorkerPayload,
  FairShiftIntelResponse,
} from "@/lib/types";
import {
  HardHat,
  Building2,
  User,
  ShieldCheck,
  AlertTriangle,
  IndianRupee,
  Award,
  CheckCircle2,
  RefreshCw,
  Volume2,
  VolumeX,
  Mic,
  Copy,
  Check,
  Sparkles,
  Activity,
  Zap,
  Lock,
  Eye,
  Sliders,
  TrendingDown,
  AlertOctagon,
  CheckSquare,
  Square,
  BarChart3,
  QrCode,
} from "lucide-react";

// Client-side PII scrubber helper
function clientScrubPII(rawText: string, workerName?: string, workerId?: string): string {
  if (!rawText) return "";
  let sanitized = rawText;

  if (workerName && workerName.trim().length > 1) {
    const escaped = workerName.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    sanitized = sanitized.replace(new RegExp(`\\b${escaped}\\b`, "gi"), "[REDACTED]");
  }

  if (workerId && workerId.trim().length > 1) {
    const escapedId = workerId.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    sanitized = sanitized.replace(new RegExp(`\\b${escapedId}\\b`, "gi"), "[REDACTED]");
  }

  sanitized = sanitized.replace(/\b(?:EMP|WRK|ID|BADGE)[-:#]?\s*[A-Z0-9-]+\b/gi, "[REDACTED]");
  sanitized = sanitized.replace(
    /\b(?:supervisor|foreman|manager|contractor|in-charge|boss)(?:\s+[A-Z][a-z]+)?\b/gi,
    "[REDACTED]"
  );
  sanitized = sanitized.replace(
    /\b(?:Mr\.|Mrs\.|Ms\.|Shri|Smt\.)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/gi,
    "[REDACTED]"
  );
  sanitized = sanitized.replace(
    /(?:\+?\d{1,3}[-.\s]?)?(?:\d{5}[-.\s]?\d{5}|\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})/g,
    "[REDACTED]"
  );
  sanitized = sanitized.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    "[REDACTED]"
  );

  return sanitized;
}

// Comprehensive UI Multilingual Dictionary
const TRANSLATIONS: Record<
  Language,
  {
    appTitle: string;
    appBadge: string;
    appSubtitle: string;
    workerViewTab: string;
    employerCenterTab: string;
    industryLabel: string;
    constructionIndustry: string;
    campusIndustry: string;
    languageLabel: string;
    capabilitiesTitle: string;
    capabilitiesCount: string;
    scenariosTitle: string;
    scenariosSubtitle: string;
    // Feature 1
    feature1Badge: string;
    feature1Title: string;
    feature1Subtitle: string;
    zeroDeductions: string;
    basePayLabel: string;
    overtimeLabel: string;
    statutoryMultiplier: string;
    grossPayLabel: string;
    guaranteedBadge: string;
    hoursAudited: string;
    explanationTitle: string;
    listenAudio: string;
    stopAudio: string;
    // Feature 2
    feature2Badge: string;
    feature2Title: string;
    feature2Subtitle: string;
    piiRedactedBadge: string;
    incidentLabel: string;
    voiceNoteButton: string;
    recordingAudio: string;
    placeholderGrievance: string;
    scrubButton: string;
    scrubbingButton: string;
    dispatchedBadge: string;
    ticketLabel: string;
    violationLabel: string;
    actionLabel: string;
    // Feature 3
    feature3Badge: string;
    feature3Title: string;
    feature3Subtitle: string;
    w3cBadge: string;
    credentialIdLabel: string;
    copyButton: string;
    copiedButton: string;
    verifiedBadgesTitle: string;
    hoursLabel: string;
    nextMilestoneLabel: string;
    readinessLabel: string;
    qrMobilityLabel: string;
    // Feature 4
    feature4Badge: string;
    feature4Title: string;
    feature4Subtitle: string;
    fatigueScoreLabel: string;
    riskSafe: string;
    riskDanger: string;
    lockoutAlertTitle: string;
    stressFactorLabel: string;
    optimalMessage: string;
    // Feature 5
    feature5Badge: string;
    feature5Title: string;
    feature5Subtitle: string;
    complianceRatingLabel: string;
    criticalRating: string;
    warningRating: string;
    compliantRating: string;
    alignedTargetsTitle: string;
    oshaStatusTitle: string;
    // Feature 6
    feature6Badge: string;
    feature6Title: string;
    feature6Subtitle: string;
    attritionRiskLabel: string;
    attritionDrivers: string;
    rootCauseTitle: string;
    checklistTitle: string;
    checklistEscalation: string;
    // Feature 7
    feature7Badge: string;
    feature7Title: string;
    feature7Subtitle: string;
    workerNameLabel: string;
    workerIdLabel: string;
    shiftHoursLabel: string;
    consecutiveDaysLabel: string;
    hourlyRateLabel: string;
    overtimeHoursLabel: string;
    rawGrievanceLabel: string;
    recalculateButton: string;
    recalculatingButton: string;
    auditUpdatedToast: string;
  }
> = {
  en: {
    appTitle: "FairShift",
    appBadge: "UN SDG 8 Intelligence Engine",
    appSubtitle: "Decent Work, Overtime Transparency & Zero-Retaliation Grievance Protection",
    workerViewTab: "👷 Worker Mobile View",
    employerCenterTab: "🏢 Employer Intel Center",
    industryLabel: "Industry:",
    constructionIndustry: "🏗️ Metro Construction Site",
    campusIndustry: "🎓 SRMIST Campus Operations",
    languageLabel: "Language:",
    capabilitiesTitle: "Platform Capabilities: 7/7 Active Modules",
    capabilitiesCount: "7/7 OPERATIONAL",
    scenariosTitle: "Live Audit Scenarios (5-Worker Roster):",
    scenariosSubtitle: "Click any worker to hydrate audit parameters & PII vault instantly",
    // Feature 1
    feature1Badge: "[Feature 1] Transparent Vernacular Payslip & Statutory 2x Overtime Ledger",
    feature1Title: "Plain-Language Payslip Ledger",
    feature1Subtitle: "Indian Factories Act Section 59 Verified",
    zeroDeductions: "Zero Deductions",
    basePayLabel: "Base Pay",
    overtimeLabel: "Overtime Pay",
    statutoryMultiplier: "2x Statutory",
    grossPayLabel: "Net Take-Home Pay (Audited)",
    guaranteedBadge: "100% Guaranteed",
    hoursAudited: "Total Hours Audited",
    explanationTitle: "Plain-Language Explanation",
    listenAudio: "Listen Out Loud",
    stopAudio: "Stop Audio",
    // Feature 2
    feature2Badge: "[Feature 2] Zero-Retaliation Grievance & Whistleblower PII Redaction Vault",
    feature2Title: "Whistleblower Grievance Vault",
    feature2Subtitle: "Zero-Retaliation Protocol • Encrypted",
    piiRedactedBadge: "100% PII Redacted",
    incidentLabel: "Report Incident / Working Conditions:",
    voiceNoteButton: "Voice Note Simulation",
    recordingAudio: "Recording Audio...",
    placeholderGrievance: "Enter confidential report (e.g. electrical hazards, withheld PPE, excessive shifts)...",
    scrubButton: "Scrub PII & Log Grievance",
    scrubbingButton: "Scrubbing PII...",
    dispatchedBadge: "🛡️ 100% PII Redacted & Anonymously Dispatched",
    ticketLabel: "TICKET",
    violationLabel: "Violation",
    actionLabel: "Action",
    // Feature 3
    feature3Badge: "[Feature 3] Portable Cryptographic Skill Passport & QR Mobility",
    feature3Title: "Portable Skill Passport & QR Mobility",
    feature3Subtitle: "W3C Verifiable Micro-Credentials",
    w3cBadge: "Target 8.6 Certified",
    credentialIdLabel: "Digital Credential ID",
    copyButton: "Copy Hash",
    copiedButton: "Copied!",
    verifiedBadgesTitle: "Verified Industry Badges:",
    hoursLabel: "Hours",
    nextMilestoneLabel: "Next Career Milestone",
    readinessLabel: "Readiness",
    qrMobilityLabel: "QR Scan & Verification",
    // Feature 4
    feature4Badge: "[Feature 4] Physiological Fatigue Radar & Mandatory Rest Lockout",
    feature4Title: "Physiological Fatigue & Rest Gauge",
    feature4Subtitle: "Continuous Circadian & Roster Modeling",
    fatigueScoreLabel: "Fatigue Strain Score",
    riskSafe: "0 Safe",
    riskDanger: "100 Risk",
    lockoutAlertTitle: "Mandated Rest Lockout",
    stressFactorLabel: "Primary Stress Factor:",
    optimalMessage: "Workload is within healthy circadian limits. Normal statutory rest.",
    // Feature 5
    feature5Badge: "[Feature 5] Systemic Safety Violation Heatmap & OSHA Audit Tracker",
    feature5Title: "Safety Violation Heatmap & Compliance Index",
    feature5Subtitle: "UN SDG 8 Metric • OSHA & Indian Factories Act",
    complianceRatingLabel: "Site Statutory Compliance Rating",
    criticalRating: "CRITICAL RISK",
    warningRating: "ELEVATED RISK",
    compliantRating: "COMPLIANT",
    alignedTargetsTitle: "Aligned Global Targets",
    oshaStatusTitle: "OSHA Audit Priority Matrix:",
    // Feature 6
    feature6Badge: "[Feature 6] Predictive Workforce Attrition & Wage Gap Matrix",
    feature6Title: "Predictive Workforce Attrition & Root Cause",
    feature6Subtitle: "Algorithmic Friction & Wage Gap Diagnosis",
    attritionRiskLabel: "30-Day Attrition Risk:",
    attritionDrivers: "Drivers: High consecutive overtime hours, wage deductions, and unresolved hazards.",
    rootCauseTitle: "Structural Root-Cause Analysis",
    checklistTitle: "Mandatory Plant Manager Checklist:",
    checklistEscalation: "*Failure to clear critical checklist items escalates audit violation to regional labor commissioner.",
    // Feature 7
    feature7Badge: "[Feature 7] Cross-Industry Dynamic Adaptation (Construction ⟷ Higher Ed Campus)",
    feature7Title: "Shift Input Simulator & Industry Engine",
    feature7Subtitle: "Interactive Parameter Testing & Cross-Industry Adaptation",
    workerNameLabel: "Worker Name & Identifier:",
    workerIdLabel: "Worker ID",
    shiftHoursLabel: "Shift Hours/Day:",
    consecutiveDaysLabel: "Consecutive Days:",
    hourlyRateLabel: "Hourly Rate (₹):",
    overtimeHoursLabel: "Overtime Hours:",
    rawGrievanceLabel: "Raw Incident/Grievance Notes:",
    recalculateButton: "Recalculate Audit & Risk Model",
    recalculatingButton: "Auditing Shift...",
    auditUpdatedToast: "✓ Audit Updated Live",
  },
  ta: {
    appTitle: "FairShift",
    appBadge: "UN SDG 8 நுண்ணறிவு இயந்திரம்",
    appSubtitle: "கண்ணியமான பணி, கூடுதல் நேர வெளிப்படைத்தன்மை & பழிவாங்கல் இல்லாத குறைதீர்ப்பு",
    workerViewTab: "👷 தொழிலாளர் மொபைல் பார்வை",
    employerCenterTab: "🏢 முதலாளி நுண்ணறிவு மையம்",
    industryLabel: "தொழில்துறை:",
    constructionIndustry: "🏗️ மெட்ரோ கட்டுமான தளம்",
    campusIndustry: "🎓 எஸ்.ஆர்.எம் வளாக செயல்பாடுகள்",
    languageLabel: "மொழி:",
    capabilitiesTitle: "தளத்தின் திறன்கள்: 7/7 செயலில் உள்ள தொகுதிகள்",
    capabilitiesCount: "7/7 செயல்பாட்டில்",
    scenariosTitle: "நேரடி தணிக்கை காட்சிகள் (5 தொழிலாளர் பட்டியல்):",
    scenariosSubtitle: "தணிக்கை அளவுருக்கள் & PII பெட்டகத்தை உடனடியாக நிரப்ப கிளிக் செய்யவும்",
    // Feature 1
    feature1Badge: "[Feature 1] வெளிப்படையான ஊதியப் பட்டியல் & சட்டப்பூர்வ 2x கூடுதல் நேர லெட்ஜர்",
    feature1Title: "எளிய மொழி ஊதியப் பட்டியல் லெட்ஜர்",
    feature1Subtitle: "இந்திய தொழிற்சாலைகள் சட்டம் பிரிவு 59 அங்கீகரிக்கப்பட்டது",
    zeroDeductions: "பூஜ்ஜிய பிடித்தங்கள்",
    basePayLabel: "அடிப்படை ஊதியம்",
    overtimeLabel: "கூடுதல் நேர ஊதியம்",
    statutoryMultiplier: "2x சட்டப்பூர்வ விகிதம்",
    grossPayLabel: "மொத்த ஊதியம் (நிகர வரவு)",
    guaranteedBadge: "100% உத்தரவாதம்",
    hoursAudited: "மொத்த தணிக்கை நேரம்",
    explanationTitle: "எளிய மொழி விளக்கம்",
    listenAudio: "ஆடியோ கேட்க",
    stopAudio: "ஆடியோ நிறுத்து",
    // Feature 2
    feature2Badge: "[Feature 2] பழிவாங்கல்-எதிர்ப்பு குறைதீர்வு & விசில்ப்ளோவர் PII மறைப்பு பெட்டகம்",
    feature2Title: "விசில்ப்ளோவர் குறைதீர்வு பெட்டகம்",
    feature2Subtitle: "பழிவாங்கல் பூஜ்ஜிய நெறிமுறை • மறைகுறியாக்கப்பட்டது",
    piiRedactedBadge: "100% PII மறைக்கப்பட்டது",
    incidentLabel: "சம்பவம் / பணி நிலைமைகள் அறிக்கை:",
    voiceNoteButton: "குரல் குறிப்பு உருவகப்படுத்துதல்",
    recordingAudio: "ஆடியோ பதிவு செய்யப்படுகிறது...",
    placeholderGrievance: "ரகசிய புகாரை உள்ளிடவும் (எ.கா. மின் ஆபத்துகள், பாதுகாப்பு கியர் இல்லாமை)...",
    scrubButton: "PII மறைத்து குறையைப் பதிவு செய்",
    scrubbingButton: "PII மறைக்கப்படுகிறது...",
    dispatchedBadge: "🛡️ 100% PII மறைக்கப்பட்டு அநாமதேயமாக அனுப்பப்பட்டது",
    ticketLabel: "டிக்கெட்",
    violationLabel: "மீறல்",
    actionLabel: "நடவடிக்கை",
    // Feature 3
    feature3Badge: "[Feature 3] கையடக்க குறியாக்க திறன் கடவுச்சீட்டு & QR இயக்கம்",
    feature3Title: "கையடக்க திறன் பாஸ்போர்ட் & QR இயக்கம்",
    feature3Subtitle: "W3C சரிபார்க்கக்கூடிய மைக்ரோ-சான்றுகள்",
    w3cBadge: "இலக்கு 8.6 சான்றளிக்கப்பட்டது",
    credentialIdLabel: "டிஜிட்டல் சான்றளிப்பு ஐடி",
    copyButton: "ஐடி நகலெடு",
    copiedButton: "நகலெடுக்கப்பட்டது!",
    verifiedBadgesTitle: "சரிபார்க்கப்பட்ட தொழில்துறை பேட்ஜ்கள்:",
    hoursLabel: "மணிநேரம்",
    nextMilestoneLabel: "அடுத்த தொழில் மைல்கல்",
    readinessLabel: "தயார்நிலை",
    qrMobilityLabel: "QR சரிபார்ப்பு & இயக்கம்",
    // Feature 4
    feature4Badge: "[Feature 4] உடலியல் சோர்வு ரேடார் & கட்டாய ஓய்வு லாக்அவுட்",
    feature4Title: "உடலியல் சோர்வு & ஓய்வு அளவுமானி",
    feature4Subtitle: "தொடர்ச்சியான உடல் சுழற்சி & பணி அட்டவணை மாதிரி",
    fatigueScoreLabel: "சோர்வு மன அழுத்த மதிப்பீடு",
    riskSafe: "0 பாதுகாப்பு",
    riskDanger: "100 ஆபத்து",
    lockoutAlertTitle: "கட்டாய ஓய்வு லாக்அவுட்",
    stressFactorLabel: "முக்கிய மன அழுத்த காரணி:",
    optimalMessage: "வேலைப்பளு ஆரோக்கியமான வரம்பிற்குள் உள்ளது. இயல்பான சட்டப்பூர்வ ஓய்வு.",
    // Feature 5
    feature5Badge: "[Feature 5] அமைப்பு ரீதியான பாதுகாப்பு மீறல் வரைபடம் & OSHA தணிக்கை கண்காணிப்பாளர்",
    feature5Title: "பாதுகாப்பு மீறல் வரைபடம் & இணக்கக் குறியீடு",
    feature5Subtitle: "UN SDG 8 அளவீடு • OSHA மற்றும் இந்திய தொழிற்சாலைகள் சட்டம்",
    complianceRatingLabel: "தள சட்டப்பூர்வ இணக்க மதிப்பீடு",
    criticalRating: "ஆபத்தான நிலை",
    warningRating: "எச்சரிக்கை நிலை",
    compliantRating: "இணக்கமானது",
    alignedTargetsTitle: "இணைக்கப்பட்ட உலகளாவிய இலக்குகள்",
    oshaStatusTitle: "OSHA தணிக்கை முன்னுரிமை மேட்ரிக்ஸ்:",
    // Feature 6
    feature6Badge: "[Feature 6] முன்கணிப்பு பணியாளர் விலகல் & ஊதிய இடைவெளி அணி",
    feature6Title: "முன்கணிப்பு பணியாளர் விலகல் & மூலக் காரணம்",
    feature6Subtitle: "முறைமை உராய்வு & ஊதிய இடைவெளி நோயறிதல்",
    attritionRiskLabel: "30-நாள் பணி விலகல் ஆபத்து:",
    attritionDrivers: "காரணிகள்: அதிக கூடுதல் நேர வேலை, ஊதியப் பிடித்தம் மற்றும் தீர்க்கப்படாத ஆபத்துகள்.",
    rootCauseTitle: "கட்டமைப்பு மூலக் காரண பகுப்பாய்வு",
    checklistTitle: "ஆலை மேலாளருக்கான கட்டாய சரிபார்ப்புப் பட்டியல்:",
    checklistEscalation: "*முக்கிய சரிபார்ப்புப் பொருட்களைத் தீர்க்கத் தவறினால் தணிக்கை மீறல் பிராந்திய தொழிலாளர் ஆணையாளருக்கு அனுப்பப்படும்.",
    // Feature 7
    feature7Badge: "[Feature 7] குறுக்கு-தொழில் மாறும் தழுவல் (கட்டுமானம் ⟷ உயர்கல்வி வளாகம்)",
    feature7Title: "ஷிப்ட் உள்ளீட்டு சிமுலேட்டர் & தொழில் என்ஜின்",
    feature7Subtitle: "ஊடாடும் அளவுரு சோதனை & குறுக்கு-தொழில் தழுவல்",
    workerNameLabel: "தொழிலாளர் பெயர் & அடையாளம்:",
    workerIdLabel: "தொழிலாளர் ஐடி",
    shiftHoursLabel: "ஷிப்ட் மணிநேரம்/நாள்:",
    consecutiveDaysLabel: "தொடர்ச்சியான நாட்கள்:",
    hourlyRateLabel: "மணிநேர ஊதியம் (₹):",
    overtimeHoursLabel: "கூடுதல் நேரம் (மணிநேரம்):",
    rawGrievanceLabel: "சம்பவ / குறை குறிப்புகள்:",
    recalculateButton: "தணிக்கை & இடர் மாதிரியை மறு கணக்கீடு செய்",
    recalculatingButton: "ஷிப்ட் தணிக்கை செய்யப்படுகிறது...",
    auditUpdatedToast: "✓ தணிக்கை நேரலையாக புதுப்பிக்கப்பட்டது",
  },
  hi: {
    appTitle: "FairShift",
    appBadge: "UN SDG 8 इंटेलिजेंस इंजन",
    appSubtitle: "गरिमापूर्ण कार्य, ओवरटाइम पारदर्शिता और शून्य-प्रतिशोध शिकायत सुरक्षा",
    workerViewTab: "👷 श्रमिक मोबाइल दृश्य",
    employerCenterTab: "🏢 नियोक्ता इंटेलिजेंस सेंटर",
    industryLabel: "उद्योग:",
    constructionIndustry: "🏗️ मेट्रो निर्माण स्थल",
    campusIndustry: "🎓 एसआरएमआईईएसटी परिसर संचालन",
    languageLabel: "भाषा:",
    capabilitiesTitle: "प्लेटफ़ॉर्म क्षमताएं: 7/7 सक्रिय मॉड्यूल",
    capabilitiesCount: "7/7 चालू",
    scenariosTitle: "लाइव ऑडिट परिदृश्य (5-श्रमिक रोस्टर):",
    scenariosSubtitle: "ऑडिट पैरामीटर और PII वॉल्ट को तुरंत अपडेट करने के लिए किसी भी श्रमिक पर क्लिक करें",
    // Feature 1
    feature1Badge: "[Feature 1] पारदर्शी सरल भाषा पेस्लिप और 2x वैधानिक ओवरटाइम बहीखाता",
    feature1Title: "सरल भाषा पेस्लिप बहीखाता",
    feature1Subtitle: "भारतीय कारखाना अधिनियम धारा 59 सत्यापित",
    zeroDeductions: "शून्य छिपी कटौती",
    basePayLabel: "मूल वेतन",
    overtimeLabel: "ओवरटाइम वेतन",
    statutoryMultiplier: "2x वैधानिक दर",
    grossPayLabel: "कुल शुद्ध देय राशि (ऑडिट की गई)",
    guaranteedBadge: "100% गारंटीकृत",
    hoursAudited: "कुल ऑडिट किए गए घंटे",
    explanationTitle: "सरल भाषा व्याख्या",
    listenAudio: "ऑडियो सुनें",
    stopAudio: "ऑडियो रोकें",
    // Feature 2
    feature2Badge: "[Feature 2] प्रतिशोध-मुक्त शिकायत और व्हिसलब्लोअर PII गोपनीयता वॉल्ट",
    feature2Title: "व्हिसलब्लोअर शिकायत वॉल्ट",
    feature2Subtitle: "शून्य-प्रतिशोध प्रोटोकॉल • एन्क्रिप्टेड",
    piiRedactedBadge: "100% PII हटाई गई",
    incidentLabel: "घटना / कार्य स्थिति रिपोर्ट दर्ज करें:",
    voiceNoteButton: "वॉयस नोट सिमुलेशन",
    recordingAudio: "ऑडियो रिकॉर्ड हो रहा है...",
    placeholderGrievance: "गोपनीय रिपोर्ट दर्ज करें (उदा. बिजली के खतरे, सुरक्षा उपकरण न मिलना, अत्यधिक काम)...",
    scrubButton: "PII हटाएं और शिकायत दर्ज करें",
    scrubbingButton: "PII हटाई जा रही है...",
    dispatchedBadge: "🛡️ 100% PII हटाई गई और अज्ञात रूप से प्रेषित",
    ticketLabel: "टिकट",
    violationLabel: "उल्लंघन",
    actionLabel: "कार्रवाई",
    // Feature 3
    feature3Badge: "[Feature 3] पोर्टेबल क्रिप्टोग्राफिक कौशल पासपोर्ट और QR गतिशीलता",
    feature3Title: "पोर्टेबल स्किल पासपोर्ट और QR मोबिलिटी",
    feature3Subtitle: "W3C सत्यापन योग्य क्रेडेंशियल",
    w3cBadge: "लक्ष्य 8.6 प्रमाणित",
    credentialIdLabel: "डिजिटल क्रेडेंशियल आईडी",
    copyButton: "आईडी कॉपी करें",
    copiedButton: "कॉपी हो गया!",
    verifiedBadgesTitle: "सत्यापित उद्योग बैज:",
    hoursLabel: "घंटे",
    nextMilestoneLabel: "अगला करियर मील का पत्थर",
    readinessLabel: "तैयारी स्कोर",
    qrMobilityLabel: "QR सत्यापन और गतिशीलता",
    // Feature 4
    feature4Badge: "[Feature 4] शारीरिक थकान रडार और अनिवार्य विश्राम लॉकडाउन",
    feature4Title: "शारीरिक थकान और विश्राम मीटर",
    feature4Subtitle: "निरंतर जैविक घड़ी और रोस्टर मॉडलिंग",
    fatigueScoreLabel: "थकान तनाव स्कोर",
    riskSafe: "0 सुरक्षित",
    riskDanger: "100 जोखिम",
    lockoutAlertTitle: "अनिवार्य विश्राम लॉकडाउन",
    stressFactorLabel: "प्राथमिक तनाव कारक:",
    optimalMessage: "कार्यभार सुरक्षित जैविक सीमा के भीतर है। सामान्य वैधानिक विश्राम।",
    // Feature 5
    feature5Badge: "[Feature 5] व्यवस्थागत सुरक्षा उल्लंघन हीटमैप और OSHA ऑडिट ट्रैकर",
    feature5Title: "सुरक्षा उल्लंघन हीटमैप और अनुपालन सूचकांक",
    feature5Subtitle: "UN SDG 8 मीट्रिक • OSHA और भारतीय कारखाना अधिनियम",
    complianceRatingLabel: "कार्यस्थल वैधानिक अनुपालन रेटिंग",
    criticalRating: "गंभीर जोखिम",
    warningRating: "चेतावनी स्तर",
    compliantRating: "अनुपालन पूर्ण",
    alignedTargetsTitle: "संरेखित वैश्विक लक्ष्य",
    oshaStatusTitle: "OSHA ऑडिट प्राथमिकता मैट्रिक्स:",
    // Feature 6
    feature6Badge: "[Feature 6] पूर्वानुमानात्मक कार्यबल क्षरण और वेतन अंतराल मैट्रिक्स",
    feature6Title: "कार्यबल क्षरण और मूल कारण विश्लेषण",
    feature6Subtitle: "प्रणालीगत घर्षण और वेतन अंतर निदान",
    attritionRiskLabel: "30-दिवसीय कार्यबल पलायन जोखिम:",
    attritionDrivers: "कारक: लगातार अत्यधिक ओवरटाइम, वेतन कटौती और अनसुलझे खतरे।",
    rootCauseTitle: "संरचनात्मक मूल कारण विश्लेषण",
    checklistTitle: "प्लांट मैनेजर के लिए अनिवार्य चेकलिस्ट:",
    checklistEscalation: "*महत्वपूर्ण चेकलिस्ट आइटम साफ़ न करने पर क्षेत्रीय श्रम आयुक्त को ऑडिट उल्लंघन भेजा जाता है।",
    // Feature 7
    feature7Badge: "[Feature 7] क्रॉस-उद्योग गतिशील अनुकूलन (निर्माण ⟷ उच्च शिक्षा परिसर)",
    feature7Title: "शिफ्ट इनपुट सिम्युलेटर और उद्योग इंजन",
    feature7Subtitle: "इंटरैक्टिव पैरामीटर परीक्षण और क्रॉस-उद्योग अनुकूलन",
    workerNameLabel: "श्रमिक का नाम और पहचान:",
    workerIdLabel: "श्रमिक आईडी",
    shiftHoursLabel: "शिफ्ट घंटे/दिन:",
    consecutiveDaysLabel: "लगातार दिन:",
    hourlyRateLabel: "प्रति घंटा दर (₹):",
    overtimeHoursLabel: "ओवरटाइम घंटे:",
    rawGrievanceLabel: "कच्ची घटना / शिकायत नोट्स:",
    recalculateButton: "ऑडिट और जोखिम मॉडल की पुनः गणना करें",
    recalculatingButton: "शिफ्ट का ऑडिट हो रहा है...",
    auditUpdatedToast: "✓ ऑडिट लाइव अपडेट हुआ",
  },
};

// 5 Diverse Hackathon Worker Scenarios
interface WorkerScenario {
  id: string;
  pillTitle: string;
  pillBadge: string;
  payload: WorkerPayload;
}

const FIVE_WORKER_ROSTER: WorkerScenario[] = [
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

export default function FairShiftDashboard() {
  // Navigation & Control States
  const [userRole, setUserRole] = useState<UserRole>("worker");
  const [industry, setIndustry] = useState<Industry>("construction");
  const [language, setLanguage] = useState<Language>("en");

  // Fully controlled Shift Input Simulator Form state
  const [simulatorForm, setSimulatorForm] = useState<WorkerPayload>(
    FIVE_WORKER_ROSTER[0].payload
  );

  // Intel Response & Dynamic UI States
  const [intelResult, setIntelResult] = useState<FairShiftIntelResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuditingShift, setIsAuditingShift] = useState<boolean>(false);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [activeScenario, setActiveScenario] = useState<string>("suresh");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedCredential, setCopiedCredential] = useState<boolean>(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [completedChecklist, setCompletedChecklist] = useState<Record<number, boolean>>({});
  const [grievanceDispatchedBadge, setGrievanceDispatchedBadge] = useState<boolean>(false);
  const [auditUpdatedPulse, setAuditUpdatedPulse] = useState<boolean>(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Core Audit Analysis Dispatcher
  const executeAnalysis = useCallback(
    async (payload: WorkerPayload, isManualRecalc = false) => {
      if (isManualRecalc) {
        setIsAuditingShift(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        const data: FairShiftIntelResponse = await response.json();
        setIntelResult(data);

        if (isManualRecalc) {
          setAuditUpdatedPulse(true);
          showToast(t.auditUpdatedToast);
          setTimeout(() => setAuditUpdatedPulse(false), 4500);
        } else {
          showToast("FairShift audit processed. Intel hydrated.");
        }
      } catch (err) {
        console.error("Analysis execution error:", err);
        showToast("Intelligence server offline. Retaining local model.");
      } finally {
        setIsLoading(false);
        setIsAuditingShift(false);
      }
    },
    [t.auditUpdatedToast]
  );

  // Initial live hydration on mount
  useEffect(() => {
    executeAnalysis(FIVE_WORKER_ROSTER[0].payload);
  }, [executeAnalysis]);

  // Activate any of the 5 worker roster scenarios
  const handleSelectScenario = (scenario: WorkerScenario) => {
    setActiveScenario(scenario.id);
    setIndustry(scenario.payload.industry);
    setSimulatorForm({ ...scenario.payload });
    setCompletedChecklist({});
    setGrievanceDispatchedBadge(false);

    executeAnalysis(scenario.payload);
  };

  // Industry Switcher Sync
  const handleSwitchIndustry = (newInd: Industry) => {
    setIndustry(newInd);
    const updatedForm: WorkerPayload = {
      ...simulatorForm,
      industry: newInd,
      roleTitle:
        newInd === "campus"
          ? "Campus Facility & HazMat Custodian"
          : "Senior Scaffolding Rig Specialist",
      acquiredSkills:
        newInd === "campus"
          ? ["Institutional Sanitization & HazMat Level 2", "Campus Facility Emergency First Aid"]
          : ["Hydraulic Rig Operation Level 1", "Working at Heights & Scaffold Safety"],
    };
    setSimulatorForm(updatedForm);
    executeAnalysis(updatedForm);
  };

  // Recalculate Button Handler in Shift Input Simulator
  const handleRecalculateSimulator = () => {
    const payload: WorkerPayload = {
      workerId: simulatorForm.workerId || "FS-WRK-001",
      workerName: simulatorForm.workerName || "Worker",
      roleTitle:
        simulatorForm.roleTitle ||
        (simulatorForm.industry === "construction"
          ? "Senior Scaffolding Rig Specialist"
          : "Campus Facility & HazMat Custodian"),
      industry: simulatorForm.industry || industry,
      language: language,
      shiftHours: Number(simulatorForm.shiftHours) || 8,
      consecutiveDays: Number(simulatorForm.consecutiveDays) || 5,
      hourlyRate: Number(simulatorForm.hourlyRate) || 120,
      overtimeHours: Number(simulatorForm.overtimeHours) || 0,
      grievanceRawText: simulatorForm.grievanceRawText,
      acquiredSkills:
        (simulatorForm.industry || industry) === "construction"
          ? ["Hydraulic Rig Operation Level 1", "Working at Heights & Scaffold Safety"]
          : ["Institutional Sanitization & HazMat Level 2", "Campus Facility Emergency First Aid"],
    };

    executeAnalysis(payload, true);
  };

  // Wire "Scrub PII & Log Grievance" Button in Worker View
  const handleScrubAndLogGrievance = async () => {
    setIsScrubbing(true);
    const raw = simulatorForm.grievanceRawText || "";
    const scrubbed = clientScrubPII(raw, simulatorForm.workerName, simulatorForm.workerId);

    // Update form with scrubbed text immediately
    const updatedForm = { ...simulatorForm, grievanceRawText: scrubbed };
    setSimulatorForm(updatedForm);

    try {
      const payload: WorkerPayload = {
        ...updatedForm,
        language,
        shiftHours: Number(updatedForm.shiftHours) || 8,
        consecutiveDays: Number(updatedForm.consecutiveDays) || 5,
        hourlyRate: Number(updatedForm.hourlyRate) || 120,
        overtimeHours: Number(updatedForm.overtimeHours) || 0,
        acquiredSkills:
          updatedForm.industry === "construction"
            ? ["Hydraulic Rig Operation Level 1", "Working at Heights & Scaffold Safety"]
            : ["Institutional Sanitization & HazMat Level 2", "Campus Facility Emergency First Aid"],
      };

      await executeAnalysis(payload);
      setGrievanceDispatchedBadge(true);
      showToast(t.dispatchedBadge);
      setTimeout(() => setGrievanceDispatchedBadge(false), 5500);
    } finally {
      setIsScrubbing(false);
    }
  };

  // Voice Note Simulation
  const handleSimulateVoiceGrievance = () => {
    if (isRecordingVoice) return;
    setIsRecordingVoice(true);
    showToast(t.recordingAudio);

    setTimeout(() => {
      const simulatedVoiceText =
        industry === "construction"
          ? "Site foreman Singh instructed double shift on tower crane without emergency harnesses after 14 continuous hours in high wind."
          : "Contractor withheld acid-resistant boots and face visors for floor deep-cleaning squad in university hostels.";

      const updatedForm = { ...simulatorForm, grievanceRawText: simulatedVoiceText };
      setSimulatorForm(updatedForm);
      setIsRecordingVoice(false);
      showToast("Voice grievance transcribed and PII redaction active.");

      executeAnalysis(updatedForm);
    }, 2000);
  };

  // Text-to-Speech Read Aloud Simulation
  const handleSpeakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      showToast("Audio synthesizer not supported in current browser.");
    }
  };

  // Credential Copy Action with Tooltip Checkmark
  const handleCopyCredential = (id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedCredential(true);
      showToast(`${t.copiedButton} ${id}`);
      setTimeout(() => setCopiedCredential(false), 2500);
    }
  };

  // Toggle Checklist
  const toggleChecklist = (idx: number) => {
    setCompletedChecklist((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Mathematical fallback calculations
  const computedBasePay = Math.round(
    (simulatorForm.shiftHours || 8) * (simulatorForm.hourlyRate || 160)
  );
  const computedOvertimePay = Math.round(
    (simulatorForm.overtimeHours || 0) * ((simulatorForm.hourlyRate || 160) * 2)
  );
  const computedGrossPay = computedBasePay + computedOvertimePay;

  // Plain-Language summary binds dynamically to selected language
  const plainLanguageExplanation =
    intelResult?.payslip?.plainLanguageSummary?.[language] ||
    `You completed ${simulatorForm.shiftHours} regular hours (₹${computedBasePay}) plus ${simulatorForm.overtimeHours} overtime hours at 2x rate (₹${computedOvertimePay}). Total payout is ₹${computedGrossPay}. Zero hidden deductions.`;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Global Top Navbar */}
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-900 border border-orange-500/40 text-zinc-100 shadow-2xl shadow-orange-500/20 text-xs font-medium animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
        {/* ========================================================= */}
        {/* PLATFORM CAPABILITIES: 7/7 ACTIVE MODULES BAR             */}
        {/* ========================================================= */}
        <section
          aria-label="Platform Capabilities Bar"
          className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-md"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-bold text-zinc-100 tracking-wide uppercase">
              {t.capabilitiesTitle}
            </span>
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              {t.capabilitiesCount}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[11px] font-medium">
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F1: Payslip Ledger
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F2: PII Vault
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F3: Skill Passport & QR
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F4: Fatigue Radar
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F5: OSHA Violation Heatmap
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F6: Predictive Attrition
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
              F7: Dynamic Cross-Industry
            </span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 1: TOP UTILITY HEADER & MULTI-SWITCH BAR          */}
        {/* ========================================================= */}
        <section
          aria-label="System Controls"
          className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl backdrop-blur-md space-y-4"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: App Title & SDG Status */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-lg shadow-orange-500/10">
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-zinc-50">
                    {t.appTitle}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/15 border border-orange-500/30 text-orange-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                    {t.appBadge}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {t.appSubtitle}
                </p>
              </div>
            </div>

            {/* Right: Dual Perspective Segmented Control */}
            <div
              role="tablist"
              aria-label="User Perspective Selector"
              className="inline-flex p-1 rounded-xl bg-zinc-950 border border-zinc-800 self-start lg:self-auto"
            >
              <button
                role="tab"
                aria-selected={userRole === "worker"}
                onClick={() => setUserRole("worker")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  userRole === "worker"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-zinc-950 shadow-md shadow-orange-500/20 font-bold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <User className="w-4 h-4" />
                <span>{t.workerViewTab}</span>
              </button>

              <button
                role="tab"
                aria-selected={userRole === "employer"}
                onClick={() => setUserRole("employer")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  userRole === "employer"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-zinc-950 shadow-md shadow-orange-500/20 font-bold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{t.employerCenterTab}</span>
              </button>
            </div>
          </div>

          {/* Sub-Control Ribbon: Industry + Language */}
          <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Industry Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-medium hidden sm:inline">{t.industryLabel}</span>
              <div className="inline-flex rounded-lg bg-zinc-950 p-1 border border-zinc-800">
                <button
                  onClick={() => handleSwitchIndustry("construction")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    industry === "construction"
                      ? "bg-zinc-800 text-orange-400 border border-orange-500/30"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <HardHat className="w-3.5 h-3.5 text-orange-400" />
                  <span>{t.constructionIndustry}</span>
                </button>
                <button
                  onClick={() => handleSwitchIndustry("campus")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    industry === "campus"
                      ? "bg-zinc-800 text-orange-400 border border-orange-500/30"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>{t.campusIndustry}</span>
                </button>
              </div>
            </div>

            {/* Multilingual Selector */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-medium hidden sm:inline">{t.languageLabel}</span>
              <div className="inline-flex rounded-lg bg-zinc-950 p-1 border border-zinc-800">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    language === "en"
                      ? "bg-zinc-800 text-zinc-50 border border-zinc-700 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("ta")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    language === "ta"
                      ? "bg-zinc-800 text-zinc-50 border border-zinc-700 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  தமிழ்
                </button>
                <button
                  onClick={() => setLanguage("hi")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    language === "hi"
                      ? "bg-zinc-800 text-zinc-50 border border-zinc-700 font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: 5 DIVERSE HACKATHON WORKER ROSTER SCENARIOS    */}
        {/* ========================================================= */}
        <section
          aria-label="Hackathon Scenarios Roster"
          className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/90 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400 animate-pulse shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                {t.scenariosTitle}
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
              {t.scenariosSubtitle}
            </span>
          </div>

          {/* 5 Worker Scenario Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {FIVE_WORKER_ROSTER.map((scenario) => {
              const isActive = activeScenario === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => handleSelectScenario(scenario)}
                  className={`p-2.5 rounded-xl text-left border transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 flex flex-col justify-between ${
                    isActive
                      ? "bg-orange-500/15 border-orange-500 text-orange-200 shadow-md shadow-orange-500/15 scale-[1.01]"
                      : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60"
                  }`}
                >
                  <span className="font-bold text-xs leading-snug line-clamp-1">
                    {scenario.pillTitle}
                  </span>
                  <span
                    className={`mt-1.5 text-[10px] font-mono leading-tight block ${
                      isActive ? "text-orange-300" : "text-zinc-400"
                    }`}
                  >
                    {scenario.pillBadge}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: WORKER PERSPECTIVE VIEW                        */}
        {/* ========================================================= */}
        {userRole === "worker" && (
          <div className="space-y-6">
            {/* Worker Mobile Banner / Context Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-lg">
                  {simulatorForm.workerName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-zinc-50">{simulatorForm.workerName}</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {simulatorForm.workerId}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                    <span>{simulatorForm.roleTitle}</span>
                    <span>•</span>
                    <span className="text-orange-400 font-medium capitalize">
                      {simulatorForm.industry} Sector
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
                <div className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-right">
                  <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                    Logged Cycle
                  </span>
                  <span className="font-bold text-zinc-200">
                    {simulatorForm.consecutiveDays} Consecutive Days ({simulatorForm.shiftHours}h/shift)
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-right">
                  <span className="text-[10px] uppercase font-mono text-orange-400 block">
                    Statutory Rate
                  </span>
                  <span className="font-bold text-orange-300">₹{simulatorForm.hourlyRate}/hr</span>
                </div>
              </div>
            </div>

            {/* Grid for Features 1 to 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* FEATURE 1: PLAIN-LANGUAGE PAYSLIP LEDGER */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg relative overflow-hidden">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
                    {t.feature1Badge}
                  </span>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <IndianRupee className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-50">{t.feature1Title}</h3>
                        <p className="text-[11px] text-zinc-400">{t.feature1Subtitle}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {t.zeroDeductions}
                    </span>
                  </div>
                </div>

                {/* Mathematical Ledger Breakdown */}
                {isLoading ? (
                  <div className="space-y-3 animate-pulse py-4">
                    <div className="h-4 bg-zinc-800 rounded w-3/4" />
                    <div className="h-8 bg-zinc-800 rounded w-1/2" />
                    <div className="h-4 bg-zinc-800 rounded w-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {/* Base Pay Calculation */}
                      <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                          {t.basePayLabel} ({simulatorForm.shiftHours}h × ₹{simulatorForm.hourlyRate})
                        </span>
                        <span className="text-lg font-bold text-zinc-100 mt-1 block">
                          ₹{intelResult?.payslip?.basePay ?? computedBasePay}
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-0.5 block">
                          Standard Statutory Hours
                        </span>
                      </div>

                      {/* Overtime Pay Calculation */}
                      <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30">
                        <span className="text-[10px] font-mono text-orange-400 uppercase flex items-center justify-between">
                          <span>
                            {t.overtimeLabel} ({simulatorForm.overtimeHours}h)
                          </span>
                          <span className="px-1 rounded bg-orange-500/20 text-[9px] font-bold">
                            {t.statutoryMultiplier}
                          </span>
                        </span>
                        <span className="text-lg font-bold text-orange-300 mt-1 block">
                          ₹{intelResult?.payslip?.overtimePay ?? computedOvertimePay}
                        </span>
                        <span className="text-[10px] text-orange-400/80 mt-0.5 block">
                          Rate: ₹{simulatorForm.hourlyRate * 2}/hr (200%)
                        </span>
                      </div>
                    </div>

                    {/* Total Gross Payout Highlight */}
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">
                          {t.grossPayLabel}
                        </span>
                        <span className="text-2xl font-extrabold text-zinc-50">
                          ₹{intelResult?.payslip?.grossPay ?? computedGrossPay}
                        </span>
                      </div>
                      <div className="text-right text-[11px] text-zinc-400">
                        <span className="font-medium text-emerald-400 flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {t.guaranteedBadge}
                        </span>
                        <span>
                          {simulatorForm.shiftHours + simulatorForm.overtimeHours} {t.hoursAudited}
                        </span>
                      </div>
                    </div>

                    {/* Multilingual Plain-Language Explanation */}
                    <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
                          <Volume2 className="w-3.5 h-3.5 text-orange-400" />
                          {t.explanationTitle} ({language.toUpperCase()}):
                        </span>
                        <button
                          onClick={() => handleSpeakText(plainLanguageExplanation)}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300 hover:text-orange-400 flex items-center gap-1 border border-zinc-700 transition-colors"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3 h-3 text-red-400" /> {t.stopAudio}
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-orange-400" /> {t.listenAudio}
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed italic bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60">
                        &quot;{plainLanguageExplanation}&quot;
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* FEATURE 2: WHISTLEBLOWER GRIEVANCE VAULT */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg relative">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
                    {t.feature2Badge}
                  </span>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-50">{t.feature2Title}</h3>
                        <p className="text-[11px] text-zinc-400">{t.feature2Subtitle}</p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <Lock className="w-3 h-3" /> {t.piiRedactedBadge}
                    </span>
                  </div>
                </div>

                {/* Grievance Input & Simulation Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <label
                      htmlFor="grievanceInput"
                      className="font-medium text-zinc-300 flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-zinc-400" />
                      {t.incidentLabel}
                    </label>

                    <button
                      onClick={handleSimulateVoiceGrievance}
                      disabled={isRecordingVoice}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        isRecordingVoice
                          ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
                          : "bg-zinc-800 text-orange-300 hover:bg-zinc-700 border border-zinc-700"
                      }`}
                    >
                      <Mic className="w-3 h-3" />
                      <span>{isRecordingVoice ? t.recordingAudio : t.voiceNoteButton}</span>
                    </button>
                  </div>

                  <textarea
                    id="grievanceInput"
                    rows={2}
                    value={simulatorForm.grievanceRawText}
                    onChange={(e) =>
                      setSimulatorForm((prev) => ({ ...prev, grievanceRawText: e.target.value }))
                    }
                    placeholder={t.placeholderGrievance}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    {/* Animated Confirmation Badge */}
                    {grievanceDispatchedBadge ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-in fade-in zoom-in-95">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{t.dispatchedBadge}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-zinc-500 italic">
                        All personal names, employee IDs, and supervisor tags are replaced with [REDACTED].
                      </span>
                    )}

                    <button
                      onClick={handleScrubAndLogGrievance}
                      disabled={isScrubbing || isLoading}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-orange-500 hover:bg-orange-600 text-zinc-950 transition-all shadow-md shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-75 shrink-0"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isScrubbing ? t.scrubbingButton : t.scrubButton}</span>
                    </button>
                  </div>
                </div>

                {/* Redacted Grievance Display Card */}
                {isLoading ? (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 animate-pulse space-y-2">
                    <div className="h-4 bg-zinc-800 rounded w-1/3" />
                    <div className="h-10 bg-zinc-800 rounded w-full" />
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-zinc-400">
                        {t.ticketLabel}: {intelResult?.grievanceAnalysis?.id || "GRV-SRM-8821"}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          intelResult?.grievanceAnalysis?.severity === "CRITICAL"
                            ? "bg-red-500/15 text-red-400 border border-red-500/30"
                            : intelResult?.grievanceAnalysis?.severity === "ELEVATED"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {intelResult?.grievanceAnalysis?.severity || "ROUTINE"} SEVERITY
                      </span>
                    </div>

                    {/* Redacted text highlight */}
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      &quot;
                      {intelResult?.grievanceAnalysis?.redactedReport
                        ? intelResult.grievanceAnalysis.redactedReport
                            .split("[REDACTED]")
                            .map((part, i, arr) => (
                              <React.Fragment key={i}>
                                {part}
                                {i < arr.length - 1 && (
                                  <span className="inline-block px-1.5 py-0.2 mx-1 rounded bg-orange-500/20 text-orange-300 font-mono text-[11px] font-semibold border border-orange-500/40">
                                    [REDACTED]
                                  </span>
                                )}
                              </React.Fragment>
                            ))
                        : "Grievance securely logged. All supervisor tags and worker identifiers anonymized."}
                      &quot;
                    </p>

                    <div className="pt-2 border-t border-zinc-800/80 text-[11px] space-y-1">
                      <div className="text-zinc-400">
                        <span className="text-orange-400 font-semibold">{t.violationLabel}: </span>
                        {intelResult?.grievanceAnalysis?.complianceViolation ||
                          "Indian Factories Act Sec 36 / OSHA 1926.404"}
                      </div>
                      <div className="text-zinc-400">
                        <span className="text-emerald-400 font-semibold">{t.actionLabel}: </span>
                        {intelResult?.grievanceAnalysis?.suggestedAction ||
                          "Conduct immediate site OHS inspection and isolate hazards."}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* FEATURE 4: PHYSIOLOGICAL FATIGUE RADAR & MANDATORY REST LOCKOUT */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg relative">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
                    {t.feature4Badge}
                  </span>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-50">{t.feature4Title}</h3>
                        <p className="text-[11px] text-zinc-400">{t.feature4Subtitle}</p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        intelResult?.fatigueRisk?.level === "DANGER"
                          ? "bg-red-500/15 text-red-400 border-red-500/40 animate-pulse"
                          : intelResult?.fatigueRisk?.level === "WARNING"
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/40"
                          : "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                      }`}
                    >
                      {intelResult?.fatigueRisk?.level || "OPTIMAL"} LEVEL
                    </span>
                  </div>
                </div>

                {/* Score & Gauge Presentation */}
                {isLoading ? (
                  <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 animate-pulse space-y-3">
                    <div className="h-6 bg-zinc-800 rounded w-1/4" />
                    <div className="h-10 bg-zinc-800 rounded w-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                          {t.fatigueScoreLabel}
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-3xl font-extrabold text-zinc-50">
                            {intelResult?.fatigueRisk?.score ?? 89}
                          </span>
                          <span className="text-xs font-mono text-zinc-400">/ 100</span>
                        </div>
                      </div>

                      {/* Visual Meter Bar */}
                      <div className="w-40 space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                          <span>{t.riskSafe}</span>
                          <span>{t.riskDanger}</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden relative">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              intelResult?.fatigueRisk?.level === "DANGER"
                                ? "bg-red-500"
                                : intelResult?.fatigueRisk?.level === "WARNING"
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{
                              width: `${intelResult?.fatigueRisk?.score ?? 89}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mandated Rest Lockout Alert */}
                    {(intelResult?.fatigueRisk?.mandatedRestHours ?? 24) > 0 ? (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <span className="font-bold text-red-300 block">
                            {t.lockoutAlertTitle}: {intelResult?.fatigueRisk?.mandatedRestHours ?? 24} Hours
                          </span>
                          <span className="text-zinc-300 mt-0.5 block">
                            {intelResult?.fatigueRisk?.mitigationProtocol ||
                              "Immediate 24-hour mandatory rest lockout enforced on biometric gate."}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{t.optimalMessage}</span>
                      </div>
                    )}

                    <div className="text-xs text-zinc-400">
                      <span className="font-semibold text-zinc-300">{t.stressFactorLabel} </span>
                      {intelResult?.fatigueRisk?.primaryFactor ||
                        "Excessive consecutive shift hours without mandatory weekend cycle."}
                    </div>
                  </div>
                )}
              </div>

              {/* FEATURE 3: PORTABLE CRYPTOGRAPHIC SKILL PASSPORT & QR MOBILITY */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg relative">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
                    {t.feature3Badge}
                  </span>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-50">{t.feature3Title}</h3>
                        <p className="text-[11px] text-zinc-400">{t.feature3Subtitle}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                      {t.w3cBadge}
                    </span>
                  </div>
                </div>

                {isLoading ? (
                  <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 animate-pulse space-y-3">
                    <div className="h-6 bg-zinc-800 rounded w-1/3" />
                    <div className="h-12 bg-zinc-800 rounded w-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Credential Hash, QR Code Simulation & Copy */}
                    <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
                      {/* Simulated QR Mobility Code Badge */}
                      <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-zinc-700 shadow-sm">
                        <QrCode className="w-full h-full text-zinc-950" />
                      </div>

                      <div className="space-y-0.5 flex-1 min-w-0">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                          {t.credentialIdLabel}
                        </span>
                        <span className="font-mono text-xs font-bold text-orange-400 tracking-wider truncate block">
                          {intelResult?.skillPassport?.digitalCredentialId || "VEC-SRM-53555245"}
                        </span>
                        <span className="text-[9px] text-zinc-500 font-mono block">
                          {t.qrMobilityLabel}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          handleCopyCredential(
                            intelResult?.skillPassport?.digitalCredentialId || "VEC-SRM-53555245"
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors shrink-0"
                      >
                        {copiedCredential ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" /> {t.copiedButton}
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-zinc-400" /> {t.copyButton}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Verified Badges Array */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold text-zinc-300 block">
                        {t.verifiedBadgesTitle}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {(intelResult?.skillPassport?.verifiedBadges || [
                          {
                            title: "Hydraulic Rig Operation Level 1",
                            hoursCompleted: 140,
                            certifiedBy: "NSDC India",
                          },
                          {
                            title: "Working at Heights & Scaffold Safety",
                            hoursCompleted: 80,
                            certifiedBy: "DGFASLI",
                          },
                        ]).map((badge, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between"
                          >
                            <span className="font-semibold text-zinc-200 text-[11px]">
                              {badge.title}
                            </span>
                            <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-400">
                              <span>
                                {badge.hoursCompleted} {t.hoursLabel}
                              </span>
                              <span className="text-orange-400/90 font-mono">
                                {badge.certifiedBy}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Next Recommended Career Milestone */}
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/25 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-orange-400 block">
                          {t.nextMilestoneLabel}
                        </span>
                        <span className="font-medium text-zinc-200 mt-0.5 block">
                          {intelResult?.skillPassport?.nextRecommendedMilestone ||
                            "Heavy Earthmoving Equipment Specialist (HEMM-2)"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-zinc-400 block">
                          {t.readinessLabel}
                        </span>
                        <span className="font-bold text-orange-400">
                          {intelResult?.skillPassport?.marketReadinessScore ?? 88}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SECTION 4: EMPLOYER INTEL CENTER VIEW                     */}
        {/* ========================================================= */}
        {userRole === "employer" && (
          <div className="space-y-6">
            {/* Header Ribbon for Employer Center */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-orange-400" />
                  <h2 className="text-base font-bold text-zinc-50">
                    {t.employerCenterTab}
                  </h2>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Real-time statutory compliance audit, attrition risk forecasting, and root-cause intelligence.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {industry === "construction" ? "SITE: METRO CORRIDOR 4" : "SITE: SRM CAMPUS FACILITY"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  Active Shifts: 148 Workers
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* FEATURE 5: SYSTEMIC SAFETY VIOLATION HEATMAP & OSHA AUDIT TRACKER */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
                    {t.feature5Badge}
                  </span>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-50">{t.feature5Title}</h3>
                        <p className="text-[11px] text-zinc-400">{t.feature5Subtitle}</p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-800 text-zinc-300">
                      Target 8.8
                    </span>
                  </div>
                </div>

                {/* Score Index Meter */}
                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center text-center space-y-2">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                    {t.complianceRatingLabel}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-5xl font-extrabold ${
                        (intelResult?.meta?.complianceIndex ?? 48) < 60
                          ? "text-red-400"
                          : (intelResult?.meta?.complianceIndex ?? 48) < 80
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {intelResult?.meta?.complianceIndex ?? 48}
                    </span>
                    <span className="text-sm font-mono text-zinc-400">/ 100</span>
                  </div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      (intelResult?.meta?.complianceIndex ?? 48) < 60
                        ? "bg-red-500/15 text-red-400 border border-red-500/30"
                        : (intelResult?.meta?.complianceIndex ?? 48) < 80
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {(intelResult?.meta?.complianceIndex ?? 48) < 60
                      ? t.criticalRating
                      : (intelResult?.meta?.complianceIndex ?? 48) < 80
                      ? t.warningRating
                      : t.compliantRating}
                  </span>
                </div>

                {/* Safety Violation Heatmap Breakdown */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                    {t.oshaStatusTitle}
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-300">Electrical Grounding (Sec 36)</span>
                      <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-mono text-[10px]">
                        HIGH RISK
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-300">HazMat PPE & Gloves (1910.138)</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                        ELEVATED
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-300">Scaffold Stability Anchors</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                        MONITORED
                      </span>
                    </div>
                  </div>
                </div>

                {/* SDG Targets Ribbon */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                    {t.alignedTargetsTitle}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(intelResult?.meta?.sdgAlignment || [
                      "Target 8.8 (Labour Rights)",
                      "Target 8.5 (Decent Work)",
                      "Target 8.6 (Skills)",
                    ]).map((targetItem, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-zinc-950 text-zinc-300 border border-zinc-800"
                      >
                        {targetItem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* FEATURE 6: PREDICTIVE WORKFORCE ATTRITION & WAGE GAP MATRIX */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
                    {t.feature6Badge}
                  </span>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <AlertOctagon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-50">{t.feature6Title}</h3>
                        <p className="text-[11px] text-zinc-400">{t.feature6Subtitle}</p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-orange-500/10 text-orange-400 border border-orange-500/30">
                      Live Cluster
                    </span>
                  </div>
                </div>

                {/* Attrition Risk Meter */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                      {t.attritionRiskLabel}
                    </span>
                    <span className="font-bold text-red-400">
                      {intelResult?.employerInsights?.attritionRiskPercentage ?? 68}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                      style={{
                        width: `${intelResult?.employerInsights?.attritionRiskPercentage ?? 68}%`,
                      }}
                    />
                  </div>
                  <span className="text-[11px] text-zinc-400 block pt-1">
                    {t.attritionDrivers}
                  </span>
                </div>

                {/* Root Cause Narrative */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                    {t.rootCauseTitle}
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {intelResult?.employerInsights?.clusterRootCause ||
                      "High overtime fatigue coupling with unaddressed electrical and scaffold safety hazards creates peak 30-day voluntary turnover risk."}
                  </p>
                </div>

                {/* Actionable Plant Manager Checklist */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-200">
                      {t.checklistTitle}
                    </span>
                    <span className="text-[10px] font-mono text-orange-400">
                      {
                        Object.values(completedChecklist).filter(Boolean).length
                      }{" "}
                      / {intelResult?.employerInsights?.actionChecklist?.length || 3} Done
                    </span>
                  </div>

                  <div className="space-y-2">
                    {(intelResult?.employerInsights?.actionChecklist || [
                      "Deploy automated 12-hour mandatory inter-shift lockout on biometric attendance gates.",
                      "Mandate daily morning safety huddle & scaffold tag verification with certified supervisor sign-off.",
                      "Audit sub-contractor payslips to enforce 2x overtime rate under Indian Factories Act.",
                    ]).map((actionText, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleChecklist(idx)}
                        className={`w-full p-2.5 rounded-lg border text-left flex items-start gap-2.5 transition-all text-xs ${
                          completedChecklist[idx]
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                            : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                        }`}
                      >
                        {completedChecklist[idx] ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                        )}
                        <span
                          className={`leading-snug ${
                            completedChecklist[idx] ? "line-through text-zinc-500" : ""
                          }`}
                        >
                          {actionText}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 italic">
                  {t.checklistEscalation}
                </div>
              </div>

              {/* FEATURE 7: CROSS-INDUSTRY DYNAMIC ADAPTATION & SHIFT INPUT SIMULATOR */}
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 uppercase tracking-wide inline-block">
                    {t.feature7Badge}
                  </span>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-zinc-50">{t.feature7Title}</h3>
                        <p className="text-[11px] text-zinc-400">{t.feature7Subtitle}</p>
                      </div>
                    </div>

                    {auditUpdatedPulse ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                        {t.auditUpdatedToast}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-800 text-zinc-300">
                        Custom Audit
                      </span>
                    )}
                  </div>
                </div>

                {/* Parameter Inputs Fully Controlled via simulatorForm */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-zinc-400 block font-medium mb-1">
                      {t.workerNameLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={simulatorForm.workerName}
                        onChange={(e) =>
                          setSimulatorForm((prev) => ({ ...prev, workerName: e.target.value }))
                        }
                        placeholder="Name"
                        className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
                      />
                      <input
                        type="text"
                        value={simulatorForm.workerId}
                        onChange={(e) =>
                          setSimulatorForm((prev) => ({ ...prev, workerId: e.target.value }))
                        }
                        placeholder={t.workerIdLabel}
                        className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-zinc-400 block font-medium mb-1">
                        {t.shiftHoursLabel}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={simulatorForm.shiftHours}
                        onChange={(e) =>
                          setSimulatorForm((prev) => ({
                            ...prev,
                            shiftHours: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block font-medium mb-1">
                        {t.consecutiveDaysLabel}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={simulatorForm.consecutiveDays}
                        onChange={(e) =>
                          setSimulatorForm((prev) => ({
                            ...prev,
                            consecutiveDays: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-zinc-400 block font-medium mb-1">
                        {t.hourlyRateLabel}
                      </label>
                      <input
                        type="number"
                        min="50"
                        max="2000"
                        value={simulatorForm.hourlyRate}
                        onChange={(e) =>
                          setSimulatorForm((prev) => ({
                            ...prev,
                            hourlyRate: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block font-medium mb-1">
                        {t.overtimeHoursLabel}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={simulatorForm.overtimeHours}
                        onChange={(e) =>
                          setSimulatorForm((prev) => ({
                            ...prev,
                            overtimeHours: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-400 block font-medium mb-1">
                      {t.rawGrievanceLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={simulatorForm.grievanceRawText}
                      onChange={(e) =>
                        setSimulatorForm((prev) => ({ ...prev, grievanceRawText: e.target.value }))
                      }
                      placeholder="Add raw observation..."
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs resize-none"
                    />
                  </div>
                </div>

                {/* Audit Submission Button */}
                <button
                  onClick={handleRecalculateSimulator}
                  disabled={isAuditingShift || isLoading}
                  className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-75"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isAuditingShift || isLoading ? "animate-spin" : ""}`}
                  />
                  <span>
                    {isAuditingShift ? t.recalculatingButton : t.recalculateButton}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
