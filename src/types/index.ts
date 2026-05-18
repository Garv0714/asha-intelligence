export type RiskLevel = "low" | "moderate" | "high" | "critical";

export interface District {
  id: string;
  name: string;
  state: string;
  population: number;
  totalSchools: number;
  totalStudents: number;
  riskScore: number;
  riskLevel: RiskLevel;
  riskTrend: "improving" | "stable" | "worsening";
  avgAttendance: number;
  mealParticipation: number;
  activeInterventions: number;
  lat: number;
  lng: number;
  // V2 additions
  dropoutRisk: number;
  migrationImpact: number;
  seasonalInstability: number;
  interventionUrgency: "low" | "moderate" | "urgent" | "immediate";
  projectedRisk7d: number;
  projectedRisk30d: number;
  projectedRisk90d: number;
  educationalImpactScore: number;
}

export interface School {
  id: string;
  name: string;
  districtId: string;
  districtName: string;
  type: "primary" | "middle" | "secondary" | "integrated";
  totalStudents: number;
  riskScore: number;
  riskLevel: RiskLevel;
  riskTrend: "improving" | "stable" | "worsening";
  avgAttendance: number;
  mealParticipation: number;
  lat: number;
  lng: number;
  lastAssessment: string;
}

export interface AttendanceRecord {
  month: string;
  present: number;
  absent: number;
  total: number;
  rate: number;
}

export interface MealRecord {
  month: string;
  served: number;
  eligible: number;
  rate: number;
}

export interface FoodPriceRecord {
  month: string;
  rice: number;
  wheat: number;
  dal: number;
  vegetables: number;
  milk: number;
  index: number;
}

export interface RiskFactor {
  name: string;
  weight: number;
  value: number;
  contribution: number;
  trend: "improving" | "stable" | "worsening";
}

export interface AIInsight {
  id: string;
  type: "alert" | "prediction" | "recommendation" | "anomaly";
  severity: RiskLevel;
  title: string;
  description: string;
  districtId?: string;
  schoolId?: string;
  timestamp: string;
  confidence: number;
}

export interface Intervention {
  id: string;
  districtId: string;
  districtName: string;
  type: "meal_program" | "food_bank" | "nutrition_education" | "family_support" | "emergency_aid";
  status: "planned" | "active" | "completed" | "suspended";
  priority: number;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  impactScore?: number;
  beneficiaries: number;
}

export interface AIReport {
  id: string;
  title: string;
  type: "district_summary" | "school_assessment" | "trend_analysis" | "intervention_impact" | "monthly_digest";
  districtId?: string;
  districtName?: string;
  summary: string;
  content: string;
  confidence: number;
  generatedAt: string;
  keyFindings: string[];
  recommendations: string[];
}

export interface DashboardStats {
  totalSchools: number;
  totalStudents: number;
  childrenAtRisk: number;
  activeInterventions: number;
  aiPredictions: number;
  districtsMonitored: number;
  avgRiskScore: number;
  mealsServedToday: number;
}

export interface TrendDataPoint {
  month: string;
  attendance: number;
  mealParticipation: number;
  riskScore: number;
  foodPriceIndex: number;
}

// V2 — AI Intervention Recommendation
export interface AIRecommendation {
  id: string;
  districtId: string;
  districtName: string;
  urgency: "low" | "moderate" | "urgent" | "immediate";
  title: string;
  description: string;
  triggerFactors: string[];
  actionPlan: string[];
  impactPrediction: {
    childrenHelped: number;
    riskReduction: number;
    timeframe: string;
  };
  estimatedBudget: number;
  confidence: number;
}

// V2 — Predictive Risk Timeline
export interface PredictivePoint {
  day: string;
  actual?: number;
  predicted: number;
  lower: number;
  upper: number;
}

// V2 — NGO Resource Allocation
export interface ResourceAllocation {
  districtId: string;
  districtName: string;
  allocatedBudget: number;
  foodKg: number;
  volunteers: number;
  coveragePercent: number;
  impactEstimate: number;
  priority: number;
}

// V2 — District Severity Ranking
export interface DistrictRanking {
  districtId: string;
  districtName: string;
  hungerSeverity: number;
  interventionUrgency: number;
  educationalImpact: number;
  compositeRank: number;
}
