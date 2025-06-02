
export interface DefectReport {
  id?: number;
  defectType:string;  
  description: string;
  createdAt: string;
  cylinder:{
    cylinderId: number;
  } 
}
