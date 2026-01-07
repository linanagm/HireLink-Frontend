export const TABS = [
  { key: "ALL", label: "All Users" },
  { key: "TALENT", label: "Talent Users" },
  { key: "EMPLOYER", label: "Employer Users" },
  { key: "BLOCKED", label: "Blocked Users" },
];

export const MOCK_USERS = [
  { id: 101, name: "Sarah Johnson", email: "sarah@johnson.com", role: "TALENT", status: "ACTIVE", joinedAt: "2025-11-10" },
  { id: 208, name: "Mark Wilson", email: "mark@wilson.com", role: "EMPLOYER", status: "ACTIVE", joinedAt: "2025-10-02" },
  { id: 315, name: "Emily Davis", email: "emily@davis.com", role: "TALENT", status: "SUSPENDED", joinedAt: "2025-09-18" },
  { id: 422, name: "James Brown", email: "james@brown.com", role: "EMPLOYER", status: "ACTIVE", joinedAt: "2025-08-21" },
  { id: 537, name: "Anna Lee", email: "anna@lee.com", role: "TALENT", status: "BLOCKED", joinedAt: "2025-07-03" },
];
export const activitySummary = [
  {
    name: "Now",
    active: MOCK_USERS.filter(u => u.status === "ACTIVE").length,
    suspended: MOCK_USERS.filter(u => u.status === "SUSPENDED").length,
    blocked: MOCK_USERS.filter(u => u.status === "BLOCKED").length,
  },
];
