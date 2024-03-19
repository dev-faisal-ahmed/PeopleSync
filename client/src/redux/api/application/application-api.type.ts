export type CreateApplicationRequestType = {
  name: string;
  imageUrl: string;
  job: string;
  expectedSalary: number;
  experience: number;
  gender: 'male' | 'female';
};
