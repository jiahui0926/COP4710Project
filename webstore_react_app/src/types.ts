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
  establishdate: string;
  ownerid: string;
  ownername: string;
  owneremail: string;
  ownerdob: string;
  productcount: number;
}

export interface ProductInfo {
  productid: string;
  name: string;
  price: number;
  shopid: number;
  shopname: string;
  quantity: number;
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

export interface ILoginInfo {
  email: string;
  password: string;
}

// Interface for data to create a new shop
export interface ICreateShopInfo {
  ownerid: string;
  shopname: string;
  description: string;
}

// Interface for data to create a new product
export interface ICreateProductInfo {
  shopid: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
}
