import { Language } from "@/lib/types";

/**
 * Interface defining the complete multilingual dictionary schema
 * for the FairShift platform UI components.
 */
export interface TranslationStrings {
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

/**
 * Comprehensive UI Multilingual Dictionary supporting English (en),
 * Tamil (ta), and Hindi (hi) across all FairShift platform modules.
 */
export const TRANSLATIONS: Record<Language, TranslationStrings> = {
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

export default TRANSLATIONS;
