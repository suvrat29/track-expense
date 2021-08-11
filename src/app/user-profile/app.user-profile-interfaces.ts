export interface IUserProfileData {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  region: number;
  currency: number;
  regionlist: Array<ILocaleRegionList>;
  currencylist: Array<ILocaleCurrencyList>;
}

export interface ILocaleRegionList {
  id: number;
  name: string;
  code: string;
}

export interface ILocaleCurrencyList {
  id: number;
  currency: string;
  currencycode: string;
}

export interface IUserProfileUpdateData {
  firstname: string;
  lastname: string;
  avatar: string;
  region: number;
  currency: number;
}
