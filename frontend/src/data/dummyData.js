// Dummy data only — no backend, no network calls.

export const dummyUser = {
  id: 'usr_10231',
  name: 'Ananya Rao',
  email: 'ananya.rao@example.com',
  phone: '+91 98765 43210',
  dob: '1994-03-12',
  bloodGroup: 'O+',
  avatarInitials: 'AR',
  memberSince: 'Jan 2025',
  plan: 'Personal',
}

export const dummyStats = [
  { label: 'Reports analyzed', value: '18', delta: '+3 this month' },
  { label: 'Flagged markers', value: '4', delta: '2 resolved' },
  { label: 'Avg. turnaround', value: '46s', delta: '−8s vs last month' },
  { label: 'Health score', value: '82/100', delta: '+5 pts' },
]

export const dummyReports = [
  {
    id: 'rpt_1042',
    name: 'Complete Blood Count.pdf',
    type: 'Blood Test',
    date: '2026-06-28',
    status: 'Reviewed',
    riskLevel: 'Low',
    summary:
      'All markers within normal reference range. Hemoglobin and white cell count are stable compared to your last panel.',
  },
  {
    id: 'rpt_1041',
    name: 'Lipid Profile Panel.pdf',
    type: 'Lipid Panel',
    date: '2026-06-14',
    status: 'Reviewed',
    riskLevel: 'Moderate',
    summary:
      'LDL cholesterol is slightly above the recommended range. HDL and triglycerides remain within normal limits.',
  },
  {
    id: 'rpt_1039',
    name: 'Thyroid Function Test.pdf',
    type: 'Thyroid',
    date: '2026-05-30',
    status: 'Reviewed',
    riskLevel: 'Low',
    summary: 'TSH, T3 and T4 levels are within the expected healthy range for your age group.',
  },
  {
    id: 'rpt_1035',
    name: 'Liver Function Test.pdf',
    type: 'Liver Panel',
    date: '2026-05-09',
    status: 'Reviewed',
    riskLevel: 'High',
    summary:
      'ALT and AST levels are elevated above the reference range. Follow-up with a physician is recommended.',
  },
  {
    id: 'rpt_1028',
    name: 'Vitamin D & B12.pdf',
    type: 'Vitamins',
    date: '2026-04-22',
    status: 'Reviewed',
    riskLevel: 'Moderate',
    summary: 'Vitamin D is below optimal levels. B12 is within the normal healthy range.',
  },
]

export const dummyAnalysisMarkers = [
  { name: 'Hemoglobin', value: '13.8 g/dL', range: '13.0 – 17.0 g/dL', status: 'normal' },
  { name: 'LDL Cholesterol', value: '148 mg/dL', range: '< 130 mg/dL', status: 'attention' },
  { name: 'HDL Cholesterol', value: '52 mg/dL', range: '> 40 mg/dL', status: 'normal' },
  { name: 'Triglycerides', value: '132 mg/dL', range: '< 150 mg/dL', status: 'normal' },
  { name: 'Fasting Glucose', value: '98 mg/dL', range: '70 – 99 mg/dL', status: 'normal' },
  { name: 'TSH', value: '2.4 mIU/L', range: '0.4 – 4.0 mIU/L', status: 'normal' },
  { name: 'Vitamin D', value: '22 ng/mL', range: '30 – 100 ng/mL', status: 'low' },
]

export const dummyRecommendations = [
  'Consider reducing saturated fat intake to help bring LDL cholesterol back into range.',
  'Add a vitamin D supplement or increase sun exposure; recheck levels in 8–10 weeks.',
  'Maintain current activity levels — cardiovascular markers are trending well.',
  'Schedule a follow-up panel in 3 months to track LDL and Vitamin D progress.',
]
