export interface IContact {
  fullName: string;
  officeNumber?: string;
  email?: string;
  customerId: number;
  id: number;
  isDeleted: boolean;
  created: Date;
}
