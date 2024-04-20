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

// Interface for order data
export interface IOrderInfoView {
  orderid: string;
  shopid: string;
  shopname: string;
  productid: string;
  productname: string;
  quantity: number;
  ordertime: string;
  buyerid: string;
}

// Interface for data to create an order
export interface ICreateOrderInfo {
  userid: string;
  shopid: string;
  productid: string;
  quantity: number;
}

export interface IProductInfo {
  shopid: string;
  productid: string;
  name: string;
  price: number;
  shopname: string;
  quantity: number;
  description: string;
}
