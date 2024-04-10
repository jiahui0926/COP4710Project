export interface User {
  userid: string;
  firstname: string;
  lastname: string;
  email: string;
  dob: Date;
  password: string;
}

export interface ShopInfo {
  shopid: string;
  shopname: string;
  description: string;
  establishdate: Date;
  ownername: string;
  owneremail: string;
  productcount: number;
}

export interface Product {
  productid: string;
  name: string;
  price: number;
  shopid: number;
  shopname: string;
  description: string;
}

export interface ISignUpInfo {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dob: string;
}

export interface IUserInfoView {
  userid: string;
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  password: string;
  isaseller: boolean;
}
