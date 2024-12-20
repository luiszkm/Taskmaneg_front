

export interface UserTaskResponse {
  id: string;
  title: string;
  description: string;
  category: number; 
  userId: string;
  isCompleted: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}


export interface UserTaskResponse {

  data: UserTask[];
}