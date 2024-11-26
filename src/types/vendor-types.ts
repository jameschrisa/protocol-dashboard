export interface Vendor {
  id: string;
  name: string;
  type: string;
  services: string[];
  connections: number;
  employeeAccessLevel: 'Admin' | 'Read-only' | 'Limited';
  dataAccessLevel: 'Sensitive' | 'Non-sensitive' | 'Restricted';
  certifications: string[];
  riskScore: number;
  lastAssessment: string;
  status: 'Active' | 'Under Review' | 'Suspended';
}
