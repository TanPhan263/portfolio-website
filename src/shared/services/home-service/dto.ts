// types/home.ts

export interface IMenu {
  text: string;
  url: string;
  isComingSoon?: boolean;
}

export interface IGreeting {
  greetingText: string;
  name: string;
  bioTitle: string;
  bioDescription: string;
  imageDark: string;
  image: string;
  roles: string[];
}

export interface ISocial {
  name: string;
  createdAt: string;
  text: string;
  tags: string[];
  images: string[];
  likes: number;
  comments: number;
}

export interface IHomeContent {
  _id?: string;
  menu: IMenu[];
  greeting: IGreeting;
  socials: ISocial[];
  createdAt?: string;
  updatedAt?: string;
}
