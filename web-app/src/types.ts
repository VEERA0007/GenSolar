export type UserRole = 'Admin' | 'Sales Head' | 'Regional Manager' | 'Sales Manager' | 'Sales Representative' | 'Channel Partner' | 'Customer';

export type AppScreen = 'welcome' | 'login' | 'roles' | 'calculator';

export interface SolarEstimateInput {
  segment: 'residential' | 'commercial' | 'industrial';
  state: 'Telangana' | 'Andhra Pradesh' | 'Odisha' | 'Chhattisgarh';
  monthlyBill: number;
  roofAreaSqFt: number;
  usageOffsetPercent: number;
}

export interface SolarEstimate {
  systemSizeKw: number;
  monthlySavings: number;
  estimatedProjectCost: number;
  paybackYears: number;
}
