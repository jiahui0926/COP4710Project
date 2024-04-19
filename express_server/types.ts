// Interface for login data sent by client
export interface ILoginInfo {
  email: string;
  password: string;
}

// Interface for sign up data sent by client
export interface ISignUpInfo {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dob: string;
}

// Interface for shop data sent by client to create a new shop
export interface ICreateShop {
  shopownerid: string;
  shopname: string;
  shopdescription: string;
}

// Interface for user exists result
export interface IUserExistsResult {
  user_exists: boolean;
}

// Interface for data in the UserInfoView
export interface IUserInfoView {
  userid: string;
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  password: string;
  isaseller: boolean;
}

// Interface for data in the ShopInfoView
export interface IShopInfoView {
  shopid: number;
  shopname: string;
  description: string | null;
  establishdate: Date;
  ownerid: number;
  ownername: string;
  owneremail: string;
  ownerdob: Date;
  productcount: number;
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

// Interface for product data
export interface IProductInfo {
  shopid: number;
  productid: string;
  name: string;
  price: number;
  shopname: string;
  quantity: number;
  description: string;
}

// Interface for order data
export interface IOrderInfoView {
  orderid: string;
  shopid: string;
  shopname: string;
  productid: string;
  productname: string;
  quantity: number;
  orderdate: string;
  buyerid: string;
}
