// import sequlize object from database.ts file
import { sequelize } from "./database";
import { QueryTypes } from "sequelize";
import {
  ICreateProductInfo,
  ICreateShopInfo,
  IShopInfoView,
  ISignUpInfo,
  IUserExistsResult,
  IUserInfoView,
  IProductInfo,
  IOrderInfoView,
} from "./types";

/**
 * Gets all data for all shops in sequelize database
 * @returns A list of IShopInfoView entries
 */
const getAllShopsInfo = async () => {
  // Set query string
  const query = `SELECT * FROM ShopInfoView`;
  // Get query results using query string and sequelize
  const results: IShopInfoView[] = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  // Print out query results for debugging purposes
  console.log(results);
  // Return query results
  return results;
};

/**
 * Gets data for all products of a shop from sequelize database
 * @param ShopID id of shop to get products of
 * @returns A list of IProduct entries for the shop with the given ShopID
 */
const getAllProductsOfAShop = async (ShopID: string) => {
  // Set query string
  const query = `
  SELECT * FROM Products
  INNER JOIN Shops ON Products.ShopID = Shops.ShopID
  WHERE Shops.shopid = ?;
  `;
  // Get query results using query string and sequelize
  const results: IProductInfo[] = await sequelize.query(query, {
    replacements: [ShopID],
    type: QueryTypes.SELECT,
  });
  // Print out query results for debugging purposes
  console.log(results);
  // Return query results
  return results;
};

/**
 * Gets data for a specific shop from sequelize database
 * @param ShopID id of shop to get data of
 * @returns A list of IShopInfoView entries for the shop with the given ShopID
 */
const getShopInfo = async (ShopID: string) => {
  // Set query string
  const query = `SELECT * FROM ShopInfoView WHERE shopid = ?;`;
  // Get query results using query string and sequelize
  const results: IShopInfoView[] = await sequelize.query(query, {
    replacements: [ShopID],
    type: QueryTypes.SELECT,
  });
  // Print out query results for debugging purposes
  console.log(results);
  // Return query results
  return results;
};

/**
 * Checks if there is a user with the given email in the database
 * @param email email of user to check if exists in database
 * @returns true if there is a user with the given email, false otherwise.
 */
const checkIfUserExists = async (email: string) => {
  // Set query string
  const query =
    'SELECT EXISTS (SELECT * FROM users WHERE email = ?) AS "user_exists";';
  // Execute the query and specify the type of the result
  const results: IUserExistsResult[] = await sequelize.query(query, {
    replacements: [email],
    type: QueryTypes.SELECT,
  });
  // Print out results for debugging purposes
  console.log(results[0].user_exists);
  // Return the result to the caller of the function
  return results[0].user_exists;
};

/**
 * Adds a new user to the database with the given information
 * @param userInfo ISignUpInfo object containing new user info
 * @returns Insert query metadata
 */
const createUser = async (userInfo: ISignUpInfo) => {
  // Set query string
  const query = `
  INSERT INTO Users
  (Email, FirstName, LastName, DOB, Password)
  VALUES
  (?, ?, ?, ?, ?)`;

  // Get ouput from running query string
  const [results, metadata] = await sequelize.query(query, {
    replacements: [
      userInfo.email,
      userInfo.firstname,
      userInfo.lastname,
      userInfo.dob,
      userInfo.password,
    ],
    type: QueryTypes.INSERT,
  });
  // Log query output
  console.log(results, metadata);
  // Return related metadata
  return metadata;
};

/**
 * Get user data from database by email
 * @param email Email of user to get data of
 * @returns An IUserInfo object of user data
 */
const getUserInfoByEmail = async (email: string) => {
  // Set query string
  const query = `SELECT * FROM UserInfoView WHERE email = ?;`;
  // Get query results from using query string and sequelize
  const results: IUserInfoView[] = await sequelize.query(query, {
    replacements: [email],
    type: QueryTypes.SELECT,
  });
  // Print out for debugging purposes
  console.log(results);
  // Return results to caller
  return results;
};

/**
 * Get user data from database by userID
 * @param userid ID of user to get data of
 * @returns An IUserInfo object of user data
 */
const getUserInfoByID = async (userid: string) => {
  // Set query string
  const query = `SELECT * FROM UserInfoView WHERE userid = ?;`;
  // Get query results from using query string and sequelize
  const results: IUserInfoView[] = await sequelize.query(query, {
    replacements: [userid],
    type: QueryTypes.SELECT,
  });
  // Print out for debugging purposes
  console.log(results);
  // Return results to caller
  return results;
};

/**
 * Get user data from database by email and password
 * @param email Email of user to get data of
 * @param password Password of user to get data of
 * @returns An IUserInfo object of user data
 */
const getUserByEmailAndPassword = async (email: string, password: string) => {
  // Set query string
  const query = `SELECT * FROM UserInfoView WHERE email = ? AND password = ?;`;
  // Get query results from using query string and sequelize
  const results: IUserInfoView[] = await sequelize.query(query, {
    replacements: [email, password],
    type: QueryTypes.SELECT,
  });
  // Print out for debugging purposes
  console.log(results);
  // Return results to caller
  return results;
};

/**
 * Get all shops owned by a user
 * @param userid of user to get data of
 * @returns An list of IShopInfo object owned by user
 */
const getShopsOwnedByUser = async (userid: string) => {
  // Set query string
  const query = `SELECT * FROM ShopInfoView WHERE ownerid = ?;`;
  // Get query results from using query string and sequelize
  const results: IShopInfoView[] = await sequelize.query(query, {
    replacements: [userid],
    type: QueryTypes.SELECT,
  });
  // Print out for debugging purposes
  console.log(results);
  // Return results to caller
  return results;
};

/**
 * Create shop owned by a user
 * @param shopInfo ICreateShopInfo object containing shop info
 * @returns An list of IShopInfo object owned by user
 */
const createShop = async (shopInfo: ICreateShopInfo) => {
  // Set query string
  const query = `
  INSERT INTO Shops (ShopName, EstablishDate, Description, Owner)
  VALUES (?, CURRENT_DATE, ?, ?);
  `;
  // Get query results from using query string and sequelize
  const [results, metadata] = await sequelize.query(query, {
    replacements: [shopInfo.shopname, shopInfo.description, shopInfo.ownerid],
    type: QueryTypes.INSERT,
  });
  // Print out for debugging purposes
  console.log(results);
  // Return results to caller
  return results;
};

/**
 * Create product for a shop
 * @param productInfo ICreateProductInfo object containing shop info
 */
const makeSeller = async (userID: string) => {
  // Set query string
  const query = `
  INSERT INTO Sellers (sellerid)
  VALUES (?);
  `;
  // Get query results from using query string and sequelize
  const [results, metadata] = await sequelize.query(query, {
    replacements: [userID],
    type: QueryTypes.INSERT,
  });
  // Print out for debugging purposes
  console.log(results);
  // Return results to caller
  return results;
};

/**
 * Add user to seller table
 * @param userID ID of user
 */
const createProduct = async (productInfo: ICreateProductInfo) => {
  // Set query string
  const query = `
  INSERT INTO Products (shopid, price, name, quantity, description)
  VALUES (?, ?, ?, ?, ?);
  `;
  // Get query results from using query string and sequelize
  const [results, metadata] = await sequelize.query(query, {
    replacements: [
      productInfo.shopid,
      productInfo.price,
      productInfo.name,
      productInfo.quantity,
      productInfo.description,
    ],
    type: QueryTypes.INSERT,
  });
  // Print out for debugging purposes
  console.log(results);
  // Return results to caller
  return results;
};

/**
 * Get all orders made by a user
 * @param userID ID of user
 */
const getUsersOrders = async (userid: string) => {
  // Set query string
  const query = `SELECT * FROM OrdersInfoView WHERE buyer = ?`;
  // Get query results from using query string and sequelize
  const results: IOrderInfoView[] = await sequelize.query(query, {
    replacements: [userid],
    type: QueryTypes.SELECT,
  });
  // Print out for debugging purposes
  console.log(results);
  // Return results to caller
  return results;
};

// Define default export
const queries = {
  getUserInfoByEmail,
  getUserInfoByID,
  getAllShopsInfo,
  getAllProductsOfAShop,
  getShopInfo,
  checkIfUserExists,
  createUser,
  getUserByEmailAndPassword,
  getShopsOwnedByUser,
  createShop,
  createProduct,
  makeSeller,
  getUsersOrders,
};
// Export object
export default queries;
