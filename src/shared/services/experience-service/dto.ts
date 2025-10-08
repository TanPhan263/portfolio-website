export interface IProject {
  title: string;
  summary: string;
  stacks?: string[];
  achievements?: string[];
  imageUrl: string;
  imageUrlMobile: string;
}

export interface IExperience {
  _id?: string;
  year: string;
  projects: IProject[];
  createdAt?: string;
  updatedAt?: string;
}
