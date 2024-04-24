export const API_BASE_URL = "http://localhost:3000/api";

export const API_ROUTE_PATHS = {
  ToGetAllShops: "getAllShops",
  ToGetAllProductsInAShop: "productsOfShop",
  ToGetShopInfo: "shopInfo",
  SignUp: "signup",
  ToGetUserInfo: "user",
  ToGetUserInfoByID: "userByID",
  Login: "login",
  ToGetShopsOfUser: "shopsownedby",
  ToCreateShop: "createshop",
  ToCreateProduct: "createproduct",
  ToMakeUserASeller: "makeseller",
  ToGetOrdersByAUser: "get_orders_made_by_user",
  ToBuyProduct: "create_order",
  ToSetProductQuantity: "set_product_quantity",
  ToSearchForProductsInAShop: "productsOfShopLike",
  ToSearchForShop: "shopsLike",
  ToUpdateUserInfo: "updateUserInfo",
} as const;
