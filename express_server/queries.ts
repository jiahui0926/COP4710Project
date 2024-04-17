// import sequlize object from database.ts file
import { sequelize } from "./database";
import { QueryTypes } from "sequelize";
import {
  IShopInfoView,
  ISignUpInfo,
  IUserExistsResult,
  IUserInfoView,
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
  SELECT
  Products.productid, Products.Name, Products.price, Products.description,
  Shops.shopid, Shops.shopname
  FROM Products
  INNER JOIN Shops ON Products.ShopID = Shops.ShopID
  WHERE Shops.shopid = ?;
  `;
  // Get query results using query string and sequelize
  const results = await sequelize.query(query, {
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
};
// Export object
export default queries;
