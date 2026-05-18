import { TrendDataPoint, FoodPriceRecord, AIInsight, DashboardStats, AIRecommendation, PredictivePoint, ResourceAllocation, DistrictRanking } from "@/types";

export const trendData: TrendDataPoint[] = [
  { month: "Jun 2025", attendance: 78.2, mealParticipation: 72.1, riskScore: 52, foodPriceIndex: 102 },
  { month: "Jul 2025", attendance: 74.5, mealParticipation: 68.3, riskScore: 56, foodPriceIndex: 108 },
  { month: "Aug 2025", attendance: 76.1, mealParticipation: 70.8, riskScore: 54, foodPriceIndex: 112 },
  { month: "Sep 2025", attendance: 79.3, mealParticipation: 74.2, riskScore: 50, foodPriceIndex: 106 },
  { month: "Oct 2025", attendance: 81.7, mealParticipation: 76.9, riskScore: 47, foodPriceIndex: 104 },
  { month: "Nov 2025", attendance: 80.4, mealParticipation: 75.1, riskScore: 49, foodPriceIndex: 107 },
  { month: "Dec 2025", attendance: 72.8, mealParticipation: 65.4, riskScore: 58, foodPriceIndex: 115 },
  { month: "Jan 2026", attendance: 70.1, mealParticipation: 62.8, riskScore: 62, foodPriceIndex: 118 },
  { month: "Feb 2026", attendance: 73.6, mealParticipation: 67.2, riskScore: 59, foodPriceIndex: 114 },
  { month: "Mar 2026", attendance: 75.9, mealParticipation: 70.5, riskScore: 55, foodPriceIndex: 110 },
  { month: "Apr 2026", attendance: 68.4, mealParticipation: 60.1, riskScore: 65, foodPriceIndex: 122 },
  { month: "May 2026", attendance: 65.2, mealParticipation: 56.8, riskScore: 68, foodPriceIndex: 128 },
];

export const foodPriceData: FoodPriceRecord[] = [
  { month: "Jun 2025", rice: 38, wheat: 32, dal: 95, vegetables: 42, milk: 54, index: 102 },
  { month: "Jul 2025", rice: 40, wheat: 33, dal: 98, vegetables: 48, milk: 55, index: 108 },
  { month: "Aug 2025", rice: 42, wheat: 35, dal: 102, vegetables: 52, milk: 56, index: 112 },
  { month: "Sep 2025", rice: 39, wheat: 33, dal: 96, vegetables: 45, milk: 55, index: 106 },
  { month: "Oct 2025", rice: 38, wheat: 32, dal: 94, vegetables: 40, milk: 54, index: 104 },
  { month: "Nov 2025", rice: 39, wheat: 34, dal: 97, vegetables: 46, milk: 55, index: 107 },
  { month: "Dec 2025", rice: 43, wheat: 37, dal: 105, vegetables: 55, milk: 58, index: 115 },
  { month: "Jan 2026", rice: 45, wheat: 38, dal: 108, vegetables: 58, milk: 60, index: 118 },
  { month: "Feb 2026", rice: 42, wheat: 36, dal: 104, vegetables: 52, milk: 58, index: 114 },
  { month: "Mar 2026", rice: 40, wheat: 34, dal: 100, vegetables: 48, milk: 56, index: 110 },
  { month: "Apr 2026", rice: 46, wheat: 39, dal: 112, vegetables: 62, milk: 62, index: 122 },
  { month: "May 2026", rice: 48, wheat: 42, dal: 118, vegetables: 68, milk: 65, index: 128 },
];

export const aiInsights: AIInsight[] = [
  {
    id: "ai1", type: "alert", severity: "critical",
    title: "Severe attendance decline in Shravasti",
    description: "Attendance in Shravasti district has dropped 18.3% over the past 6 weeks, correlating with a 26% rise in local food prices. Immediate intervention recommended for 3 schools.",
    districtId: "d3", timestamp: "2026-05-14T08:30:00Z", confidence: 0.94,
  },
  {
    id: "ai2", type: "prediction", severity: "high",
    title: "Predicted hunger-risk escalation in Kalahandi",
    description: "AI models predict Kalahandi's risk score will rise from 72 to 81 within 4 weeks based on monsoon-season patterns and projected food price increases.",
    districtId: "d2", timestamp: "2026-05-14T07:15:00Z", confidence: 0.87,
  },
  {
    id: "ai3", type: "anomaly", severity: "high",
    title: "Unusual meal participation drop in Anantapur",
    description: "Midday meal participation in Rayadurg PS dropped 23% in 2 weeks despite stable attendance. Possible supply chain disruption or quality issues detected.",
    districtId: "d1", schoolId: "s1", timestamp: "2026-05-13T16:45:00Z", confidence: 0.91,
  },
  {
    id: "ai4", type: "recommendation", severity: "moderate",
    title: "Expand Nandurbar meal program to adjacent blocks",
    description: "Current intervention in Nandurbar shows 34% improvement in meal participation. AI recommends expanding coverage to 3 neighboring tribal blocks.",
    districtId: "d4", timestamp: "2026-05-13T14:20:00Z", confidence: 0.82,
  },
  {
    id: "ai5", type: "prediction", severity: "critical",
    title: "Monsoon-driven food price surge expected",
    description: "Historical patterns and current market signals predict a 15-22% food price increase across eastern UP and Odisha in the next 8 weeks.",
    timestamp: "2026-05-13T10:00:00Z", confidence: 0.89,
  },
  {
    id: "ai6", type: "alert", severity: "moderate",
    title: "Koraput school dropout correlation detected",
    description: "AI detected a 0.87 correlation between meal participation decline and early dropout indicators in 2 Koraput schools.",
    districtId: "d7", timestamp: "2026-05-12T18:30:00Z", confidence: 0.85,
  },
];

export const dashboardStats: DashboardStats = {
  totalSchools: 50,
  totalStudents: 68600,
  childrenAtRisk: 24180,
  activeInterventions: 17,
  aiPredictions: 342,
  districtsMonitored: 8,
  avgRiskScore: 65.8,
  mealsServedToday: 41200,
};

export const interventions = [
  {
    id: "int1", districtId: "d1", districtName: "Anantapur", type: "meal_program" as const,
    status: "active" as const, priority: 1, title: "Emergency Midday Meal Boost — Rayadurg Block",
    description: "Expanded meal coverage to include breakfast and afternoon snack for 3 high-risk schools.",
    startDate: "2026-04-15", beneficiaries: 4900, impactScore: 72,
  },
  {
    id: "int2", districtId: "d3", districtName: "Shravasti", type: "food_bank" as const,
    status: "active" as const, priority: 1, title: "Community Food Bank — Ikauna Cluster",
    description: "Partnered with Akshaya Patra to establish a food bank serving 6 villages around Ikauna.",
    startDate: "2026-03-20", beneficiaries: 3200, impactScore: 65,
  },
  {
    id: "int3", districtId: "d4", districtName: "Nandurbar", type: "nutrition_education" as const,
    status: "active" as const, priority: 2, title: "Tribal Nutrition Awareness Program",
    description: "Community-led nutrition education workshops for parents of school-age children.",
    startDate: "2026-02-10", beneficiaries: 1800, impactScore: 81,
  },
  {
    id: "int4", districtId: "d2", districtName: "Kalahandi", type: "emergency_aid" as const,
    status: "planned" as const, priority: 1, title: "Pre-Monsoon Emergency Preparedness",
    description: "Stockpiling dry rations and establishing distribution channels before monsoon season.",
    startDate: "2026-06-01", beneficiaries: 5600,
  },
  {
    id: "int5", districtId: "d7", districtName: "Koraput", type: "family_support" as const,
    status: "active" as const, priority: 2, title: "Family Income Support Linkage",
    description: "Connecting at-risk families with MGNREGA and other social protection schemes.",
    startDate: "2026-04-01", beneficiaries: 2100, impactScore: 58,
  },
];

export const aiReports = [
  {
    id: "r1",
    title: "Shravasti District — Critical Hunger Risk Assessment",
    type: "district_summary" as const,
    districtId: "d3", districtName: "Shravasti",
    summary: "Shravasti district has reached critical hunger-risk levels with a composite score of 82/100. Immediate multi-stakeholder intervention is required.",
    confidence: 0.92, generatedAt: "2026-05-14T06:00:00Z",
    keyFindings: [
      "Attendance has declined 18.3% over 6 weeks across all monitored schools",
      "Midday meal participation is at a 12-month low of 49.3%",
      "Local dal prices have surged 24% since March, straining household budgets",
      "Seasonal agricultural labor migration has intensified, impacting child supervision",
      "2 schools report over 30% chronic absenteeism among girls aged 10-14",
    ],
    recommendations: [
      "Deploy emergency food rations to Ikauna and Bhinga clusters within 7 days",
      "Activate community kitchen partnerships with Akshaya Patra Foundation",
      "Launch targeted outreach program for migrant worker families",
      "Coordinate with District Magistrate for MGNREGA wage disbursement acceleration",
      "Install real-time attendance tracking in 4 priority schools",
    ],
    content: `## Executive Summary\n\nShravasti district in Uttar Pradesh has entered a critical phase of nutritional risk. Our AI analysis, incorporating 12 months of multi-dimensional data, indicates a systemic deterioration across all key indicators.\n\n## Data Analysis\n\n### Attendance Patterns\nAverage attendance across 6 monitored schools has dropped from 72.1% in October 2025 to 58.7% in May 2026 — a decline of 13.4 percentage points. The decline accelerated sharply in April 2026, coinciding with early summer agricultural labor demands.\n\n### Meal Participation\nMidday meal uptake has fallen to 49.3%, the lowest recorded value in our dataset. This represents a 22.8% decline from the October 2025 peak of 72.1%. Critically, the gap between attendance and meal participation has widened from 3.9% to 9.4%, suggesting that even children who attend school are increasingly skipping meals.\n\n### Food Price Impact\nThe local food price index has risen from 104 (Oct 2025) to 128 (May 2026). Dal, a critical protein source for school meals, has seen the sharpest increase at 24%. This has directly impacted the quality and quantity of midday meals served.\n\n## Risk Factors\n\n| Factor | Weight | Score | Contribution |\n|--------|--------|-------|--------------|\n| Attendance Decline | 30% | 89/100 | 26.7 |\n| Meal Participation | 25% | 85/100 | 21.3 |\n| Food Inflation | 20% | 78/100 | 15.6 |\n| Seasonal Risk | 10% | 82/100 | 8.2 |\n| Historical Pattern | 15% | 68/100 | 10.2 |\n| **Composite** | **100%** | | **82.0** |\n\n## Conclusion\n\nWithout immediate intervention, our models predict Shravasti's risk score will exceed 90 within 3 weeks. The convergence of food price inflation, seasonal labor migration, and declining meal quality creates a compounding risk spiral that requires coordinated district, state, and NGO action.`,
  },
  {
    id: "r2",
    title: "National Trend Analysis — Q1 2026",
    type: "trend_analysis" as const,
    summary: "Cross-district trend analysis reveals concerning patterns of synchronized risk escalation in eastern India, driven primarily by food price inflation.",
    confidence: 0.88, generatedAt: "2026-05-13T12:00:00Z",
    keyFindings: [
      "5 of 8 monitored districts show worsening or stable-high risk trends",
      "Food price index has risen 25% nationally over the past 6 months",
      "Eastern states (UP, Odisha, WB) show synchronized risk escalation",
      "Kerala (Ernakulam) demonstrates model effectiveness — risk at historic low",
      "AI prediction accuracy has reached 89% for 4-week forecasts",
    ],
    recommendations: [
      "Prioritize pre-monsoon preparedness in Odisha and eastern UP",
      "Expand Ernakulam best practices to other southern districts",
      "Deploy mobile monitoring units in districts with limited connectivity",
      "Recommend policy briefing on food price stabilization to state governments",
    ],
    content: "Detailed national trend analysis for Q1 2026 covering all 8 monitored districts...",
  },
];

// V2 — AI Intervention Recommendations
export const aiRecommendations: AIRecommendation[] = [
  {
    id: "rec1", districtId: "d3", districtName: "Shravasti",
    urgency: "immediate",
    title: "Deploy Emergency Nutrition Kits to Ikauna Cluster",
    description: "AI analysis indicates a convergence of attendance decline (-18.3%), food inflation (+26%), and seasonal migration risk. Children in Ikauna face imminent nutritional crisis.",
    triggerFactors: ["Attendance decline >15%", "Food price index >125", "Migration impact score >40", "Meal participation <50%"],
    actionPlan: [
      "Distribute 3,200 emergency nutrition kits within 48 hours",
      "Activate Akshaya Patra community kitchen network",
      "Deploy 4 mobile health checkup units",
      "Establish daily attendance monitoring hotline",
    ],
    impactPrediction: { childrenHelped: 3200, riskReduction: 18, timeframe: "2 weeks" },
    estimatedBudget: 850000,
    confidence: 0.94,
  },
  {
    id: "rec2", districtId: "d1", districtName: "Anantapur",
    urgency: "urgent",
    title: "Expand Midday Meal Fortification in Rayadurg Block",
    description: "Meal participation drop of 23% in Rayadurg suggests supply chain issues. Fortifying meals with micronutrients can address hidden hunger while maintaining participation.",
    triggerFactors: ["Meal participation drop >20%", "Supply chain anomaly detected", "Risk score >75"],
    actionPlan: [
      "Partner with local dairy cooperatives for milk fortification",
      "Add iron-fortified rice to 8 school meal programs",
      "Conduct weekly meal quality audits",
      "Train 12 school cooks on nutrition-optimized meal prep",
    ],
    impactPrediction: { childrenHelped: 4900, riskReduction: 12, timeframe: "4 weeks" },
    estimatedBudget: 420000,
    confidence: 0.88,
  },
  {
    id: "rec3", districtId: "d2", districtName: "Kalahandi",
    urgency: "urgent",
    title: "Pre-Monsoon Food Security Buffer for Eastern Odisha",
    description: "Historical monsoon patterns predict 15-22% food price surge. Pre-positioning dry rations can prevent crisis escalation during July-September.",
    triggerFactors: ["Monsoon forecast >120% normal", "Historical price volatility >18%", "Projected risk 30d >80"],
    actionPlan: [
      "Stockpile 45 metric tons of dry rations across 3 distribution points",
      "Activate emergency school-feeding contingency protocol",
      "Partner with FCI for subsidized grain allocation",
      "Establish flood-resistant storage at 2 block-level warehouses",
    ],
    impactPrediction: { childrenHelped: 9870, riskReduction: 15, timeframe: "12 weeks" },
    estimatedBudget: 1200000,
    confidence: 0.87,
  },
  {
    id: "rec4", districtId: "d6", districtName: "Dakshin Dinajpur",
    urgency: "moderate",
    title: "Community-Based Nutrition Surveillance Network",
    description: "Deploying community health workers (ASHAs) with mobile reporting tools can provide early warning and improve response times by 60%.",
    triggerFactors: ["Risk trend: worsening", "Limited monitoring infrastructure", "Migration impact >30"],
    actionPlan: [
      "Train 24 ASHA workers on nutrition surveillance protocol",
      "Deploy mobile reporting app to 7 schools",
      "Establish weekly community nutrition review meetings",
      "Link surveillance data to Asha Intelligence dashboard",
    ],
    impactPrediction: { childrenHelped: 10230, riskReduction: 8, timeframe: "8 weeks" },
    estimatedBudget: 350000,
    confidence: 0.82,
  },
];

// V2 — Predictive Risk Timeline (national aggregate)
export const predictiveTimeline: PredictivePoint[] = [
  // Past 14 days (actual data available)
  { day: "May 3", actual: 62, predicted: 63, lower: 60, upper: 66 },
  { day: "May 4", actual: 63, predicted: 63, lower: 60, upper: 66 },
  { day: "May 5", actual: 61, predicted: 62, lower: 59, upper: 65 },
  { day: "May 6", actual: 64, predicted: 63, lower: 60, upper: 66 },
  { day: "May 7", actual: 63, predicted: 64, lower: 61, upper: 67 },
  { day: "May 8", actual: 65, predicted: 64, lower: 61, upper: 67 },
  { day: "May 9", actual: 64, predicted: 65, lower: 62, upper: 68 },
  { day: "May 10", actual: 66, predicted: 65, lower: 62, upper: 68 },
  { day: "May 11", actual: 65, predicted: 66, lower: 63, upper: 69 },
  { day: "May 12", actual: 67, predicted: 66, lower: 63, upper: 69 },
  { day: "May 13", actual: 66, predicted: 67, lower: 64, upper: 70 },
  { day: "May 14", actual: 68, predicted: 67, lower: 64, upper: 70 },
  { day: "May 15", actual: 67, predicted: 68, lower: 65, upper: 71 },
  { day: "May 16", actual: 68, predicted: 68, lower: 65, upper: 71 },
  // Future predictions (7-day)
  { day: "May 17", predicted: 69, lower: 65, upper: 73 },
  { day: "May 18", predicted: 69, lower: 65, upper: 73 },
  { day: "May 19", predicted: 70, lower: 66, upper: 74 },
  { day: "May 20", predicted: 70, lower: 65, upper: 75 },
  { day: "May 21", predicted: 71, lower: 66, upper: 76 },
  { day: "May 22", predicted: 72, lower: 66, upper: 78 },
  { day: "May 23", predicted: 72, lower: 66, upper: 78 },
  // 30-day extension
  { day: "May 30", predicted: 74, lower: 67, upper: 81 },
  { day: "Jun 6", predicted: 76, lower: 68, upper: 84 },
  { day: "Jun 13", predicted: 78, lower: 69, upper: 87 },
  // 90-day extension
  { day: "Jul 1", predicted: 80, lower: 70, upper: 90 },
  { day: "Jul 15", predicted: 79, lower: 68, upper: 90 },
  { day: "Aug 1", predicted: 76, lower: 66, upper: 86 },
  { day: "Aug 15", predicted: 73, lower: 64, upper: 82 },
];

// V2 — Resource Allocation Simulation
export const resourceAllocations: ResourceAllocation[] = [
  { districtId: "d3", districtName: "Shravasti", allocatedBudget: 1200000, foodKg: 45000, volunteers: 48, coveragePercent: 85, impactEstimate: 82, priority: 1 },
  { districtId: "d1", districtName: "Anantapur", allocatedBudget: 950000, foodKg: 38000, volunteers: 36, coveragePercent: 78, impactEstimate: 74, priority: 2 },
  { districtId: "d7", districtName: "Koraput", allocatedBudget: 800000, foodKg: 32000, volunteers: 28, coveragePercent: 72, impactEstimate: 68, priority: 3 },
  { districtId: "d2", districtName: "Kalahandi", allocatedBudget: 750000, foodKg: 30000, volunteers: 24, coveragePercent: 70, impactEstimate: 65, priority: 4 },
  { districtId: "d6", districtName: "Dakshin Dinajpur", allocatedBudget: 600000, foodKg: 24000, volunteers: 20, coveragePercent: 65, impactEstimate: 60, priority: 5 },
  { districtId: "d4", districtName: "Nandurbar", allocatedBudget: 450000, foodKg: 18000, volunteers: 16, coveragePercent: 60, impactEstimate: 55, priority: 6 },
  { districtId: "d5", districtName: "Jaisalmer", allocatedBudget: 350000, foodKg: 14000, volunteers: 12, coveragePercent: 55, impactEstimate: 48, priority: 7 },
  { districtId: "d8", districtName: "Ernakulam", allocatedBudget: 100000, foodKg: 4000, volunteers: 4, coveragePercent: 95, impactEstimate: 92, priority: 8 },
];

// V2 — District Severity Rankings
export const districtRankings: DistrictRanking[] = [
  { districtId: "d3", districtName: "Shravasti", hungerSeverity: 92, interventionUrgency: 95, educationalImpact: 88, compositeRank: 1 },
  { districtId: "d1", districtName: "Anantapur", hungerSeverity: 85, interventionUrgency: 88, educationalImpact: 78, compositeRank: 2 },
  { districtId: "d7", districtName: "Koraput", hungerSeverity: 80, interventionUrgency: 82, educationalImpact: 75, compositeRank: 3 },
  { districtId: "d2", districtName: "Kalahandi", hungerSeverity: 78, interventionUrgency: 80, educationalImpact: 72, compositeRank: 4 },
  { districtId: "d6", districtName: "Dakshin Dinajpur", hungerSeverity: 74, interventionUrgency: 76, educationalImpact: 68, compositeRank: 5 },
  { districtId: "d4", districtName: "Nandurbar", hungerSeverity: 65, interventionUrgency: 60, educationalImpact: 55, compositeRank: 6 },
  { districtId: "d5", districtName: "Jaisalmer", hungerSeverity: 58, interventionUrgency: 52, educationalImpact: 48, compositeRank: 7 },
  { districtId: "d8", districtName: "Ernakulam", hungerSeverity: 18, interventionUrgency: 12, educationalImpact: 10, compositeRank: 8 },
];

// V2 — Activity Feed for National Dashboard
export const activityFeed = [
  { id: "act1", time: "2 min ago", type: "alert" as const, message: "Critical risk threshold exceeded in Shravasti — risk score now 85", icon: "🔴" },
  { id: "act2", time: "15 min ago", type: "intervention" as const, message: "Emergency nutrition kits dispatched to Ikauna cluster — 3,200 children", icon: "📦" },
  { id: "act3", time: "1 hr ago", type: "prediction" as const, message: "AI predicts 15% food price surge in eastern UP within 2 weeks", icon: "📈" },
  { id: "act4", time: "2 hrs ago", type: "success" as const, message: "Nandurbar meal participation improved 34% — intervention effective", icon: "✅" },
  { id: "act5", time: "3 hrs ago", type: "anomaly" as const, message: "Unusual attendance pattern detected in Rayadurg PS — investigating", icon: "🔍" },
  { id: "act6", time: "5 hrs ago", type: "report" as const, message: "Q1 2026 National Trend Analysis report generated — 88% confidence", icon: "📊" },
  { id: "act7", time: "8 hrs ago", type: "intervention" as const, message: "Community kitchen activated in Bhinga block — serving 1,200 daily", icon: "🍲" },
  { id: "act8", time: "12 hrs ago", type: "success" as const, message: "Ernakulam district achieves lowest-ever risk score: 22/100", icon: "🌟" },
];
