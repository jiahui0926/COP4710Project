export const API_BASE_URL = "http://localhost:3000/api";

export const API_ROUTE_PATHS = {
  ToGetAllShops: "getAllShops",
  ToGetAllProductsInAShop: "productsOfShop",
  ToGetShopInfo: "shopInfo",
  SignUp: "signup",
  ToGetUserInfo: "user",
  Login: "login",
  ToGetShopsOfUser: "shopsownedby",
  ToCreateShop: "createshop",
  ToCreateProduct: "createproduct",
  ToMakeUserASeller: "makeseller",
} as const;
