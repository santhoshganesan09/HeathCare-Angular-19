import { Inventory } from "../inventory/inventory.model";


export interface InventoryAlert {
  id?: number;
  alertType: string;
  message: string;
  createdAt?: Date;
  resolved: boolean,
  inventory: {
    id:number;
  }
 };
