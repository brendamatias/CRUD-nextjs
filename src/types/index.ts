export type Employee = {
  _id: string;
  avatar: string;
  date: string;
  email: string;
  name: string;
  salary: number;
  status: 'Active' | 'Inactive';
};

export type EmployeeRequestCreate = {
  avatar: string;
  date: string;
  email: string;
  name: string;
  salary: number;
  status: 'Active' | 'Inactive';
};
