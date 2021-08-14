import { SafeHtml } from "@angular/platform-browser";

export interface ICategoryData {
  id: number;
  name: string;
  type: number;
  icon: string;
  iconSafe: SafeHtml;
  description: string;
}

export interface IAddNewCategory {
  name: string;
  type: number;
  icon: string;
  description: string;
}

export interface IUpdateCategory {
  id: number;
  name: string;
  type: number;
  icon: string;
  description: string;
}
