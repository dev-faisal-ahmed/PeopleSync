export type CreateJobRequestType = {
  title: string;
  description: string;
  salary: number;
  vacancy: number;
  experienceRequired?: number;
  skillsSet: string[];
};
