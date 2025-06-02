import { CylinderType } from "../cylinder-type/cylinder-type.model";

export interface Cylinder {
  cylinderId?: number;
  serialNumber: string;
  pressure: number;
  temperature: number;
  createdBy?: string;
  status: string;
  location: string;
  lastInspectedAt?: string;
  lastMaintenanceDate?: string;
  maintenanceDue: boolean;
  nextInspectionDate?: string;
  capacity?: string;
  manufacturer?: string;
  cylinderType:CylinderType;
  cylinderTypeName?: string;
}
