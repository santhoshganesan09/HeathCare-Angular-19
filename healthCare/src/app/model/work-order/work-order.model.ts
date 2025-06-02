export interface WorkOrder {
  id?: number;
  maintenanceType: string;
  priority: string;
  status: string;
  scheduledDate: string;
  createdAt?: string;
  updatedAt?: string;
  cylinder: {
    cylinderId: number;
    pressure?: number;
    temperature?: number;
    status?: string;
    createdBy?: string;
    location?: string;
    lastInspectedAt?: string;
  };
  assignedTechnician: {
    id: number;
    username?: string;
    role?: string;
  };
}


