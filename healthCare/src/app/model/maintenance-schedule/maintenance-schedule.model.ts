import { Cylinder } from "../cylinder/cylinder.model";
import { User } from "../user/user.model";

export interface MaintenanceSchedule {
  id?: number;
  scheduledDate: string;
  frequency: string;
  status: string;
  maintenanceType: string;
  cylinder: {
     cylinderId?: number;
  pressure?: number;
  temperature?: number;
  status?: string;
  createdBy?: string | null;
  location?: string;
  lastInspectedAt?: string;
  };
  technicianAssigned: {
    id?: number;
  username?: string;
  role?: string;
  };

}


