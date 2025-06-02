import { Cylinder } from "../cylinder/cylinder.model";


export interface Inventory { 
  id?: number;
  quantity: number;
  location: string;
  status: string;
  lastChecked?: Date |string;
  cylinder: {cylinderId:number};
}
