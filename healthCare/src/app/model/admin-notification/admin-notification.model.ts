
export interface AdminNotification { 
  id: number;
  message: string;
  role: string;
  createdAt: string | Date;
  read: boolean;
}
