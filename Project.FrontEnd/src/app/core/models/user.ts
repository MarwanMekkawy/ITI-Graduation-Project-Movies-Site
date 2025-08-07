export interface User {
  userId: number;
  username: string;
  email: string;
  password:string;
  createdAt: string; // or Date
  userImage: string; // base64 string
}
