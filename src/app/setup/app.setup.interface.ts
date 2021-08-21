import { SafeHtml } from "@angular/platform-browser";

export interface ICategoryData {
  id: number;
  name: string;
  type: number;
  icon: string;
  iconSafe: SafeHtml;
  description: string;
  subcategorycount: number;
}

export interface ISubcategoryData {
  id: number;
  categoryid: number;
  name: string;
  icon: string;
  iconSafe: SafeHtml;
}

export interface IAddNewCategory {
  name: string;
  type: number;
  icon: string;
  description: string;
}

export interface IAddNewSubcategory {
  name: string;
  categoryid: number;
  icon: string;
}

export interface IUpdateCategory {
  id: number;
  name: string;
  type: number;
  icon: string;
  description: string;
}

export interface IUpdateSubcategory {
  id: number;
  name: string;
  icon: string;
}
