type ApplicationType = {
  job: string;
};

export type JobType = {
  _id: string;
  title: string;
  description: string;
  skillsSet: string[];
  salary: number;
  vacancy: number;
  experienceRequired?: number;
  applications: ApplicationType[];
};
