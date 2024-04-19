import express, { Request, Response } from "express";
import psqlQueries from "./queries";
import {
  ICreateProductInfo,
  ICreateShopInfo,
  ILoginInfo,
  IProductInfo,
  IShopInfoView,
  ISignUpInfo,
  IUserInfoView,
} from "./types";

// Initialize router
const router = express.Router();

/**
 * Endpoint to get all shops
 */
router.get("/getAllShops", async (req: Request, res: Response) => {
  const shops = await psqlQueries.getAllShopsInfo();
  res.status(200).json(shops);
});

/**
 * Endpoint to get all products of a shop by shopid
 */
router.get("/productsOfShop/:id", async (req: Request, res: Response) => {
  const shopProducts: IProductInfo[] = await psqlQueries.getAllProductsOfAShop(
    req.params.id
  );
  res.status(200).json(shopProducts);
});

/**
 *  Endpoint to get a shop's data by shopid
 */
router.get("/shopInfo/:id", async (req: Request, res: Response) => {
  const shop = await psqlQueries.getShopInfo(req.params.id);
  res.status(200).json(shop);
});

/**
 * Endpoint to get a user's data by email
 */
router.get("/user/:email", async (req: Request, res: Response) => {
  const users = await psqlQueries.getUserInfoByEmail(req.params.email);
  res.status(200).json(users);
});

/**
 * Endpoint to signup/register a new user
 */
router.post("/signup/", async (req: Request, res: Response) => {
  // Get sign up info from request body.
  const signUpInfo: ISignUpInfo = req.body;
  // Check if user with that email already exists
  const userExists = await psqlQueries.checkIfUserExists(signUpInfo.email);

  // If a user with that email already exists return a status 400
  if (userExists) {
    res.status(400).json(userExists);
  } else {
    // Insert new user info into database
    const createUserResponse = await psqlQueries.createUser(signUpInfo);
    // Get new user's info
    const newUserInfo: IUserInfoView[] = await psqlQueries.getUserInfoByEmail(
      signUpInfo.email
    );
    // Return a status 201 (Created) and new user's info from database
    res.status(201).json(newUserInfo[0]);
  }
});

/**
 * Endpoint to login to the page
 */
router.post("/login/", async (req: Request, res: Response) => {
  // Get login info from request body.
  const loginInfo: ILoginInfo = req.body;
  // Try to get user's info from database
  const userInfo: IUserInfoView[] = await psqlQueries.getUserByEmailAndPassword(
    loginInfo.email,
    loginInfo.password
  );

  // If user exists
  if (userInfo.length > 0) {
    // Return a status 200  successful and new user's info from database
    res.status(201).json(userInfo[0]);
  } else {
    // Return a 400 error code
    res.status(400).json(false);
  }
});

/**
 * Endpoint to get shops owned by a user
 */
router.get("/shopsownedby/:id", async (req: Request, res: Response) => {
  // Get user id from request body
  const userid: string = req.params.id;
  // Try to get shops from database
  try {
    const shopList: IShopInfoView[] = await psqlQueries.getShopsOwnedByUser(
      userid
    );
    // Return a status 200 and shops owned by user
    res.status(201).json(shopList);
  } catch (error) {
    // Return a status 400 and error message
    res.status(400).json(error);
    console.log(error);
  }
});

/**
 * Endpoint to create shop for a user
 */
router.post("/createshop/", async (req: Request, res: Response) => {
  console.log("Create Shop");
  // Get new shop data from request body
  const newShopInfo: ICreateShopInfo = req.body;
  // Try to create shop
  try {
    const createResponse = await psqlQueries.createShop(newShopInfo);
    // Return a status 200 and response
    res.status(201).json(createResponse);
  } catch (error) {
    // Return a status 400 and error
    res.status(400).json(error);
    console.log(error);
  }
});

/**
 * Endpoint to create product in a shop
 */
router.post("/createproduct/", async (req: Request, res: Response) => {
  console.log("Create Product");
  // Get new product data from request body
  const newProductInfo: ICreateProductInfo = req.body;
  // Try to create product
  try {
    const createResponse = await psqlQueries.createProduct(newProductInfo);
    // Return a status 200 and response
    res.status(201).json(createResponse);
  } catch (error) {
    // Return a status 400 and error
    res.status(400).json(error);
    console.log(error);
  }
});

/**
 * Endpoint to make user a seller
 */
router.post("/makeSeller/", async (req: Request, res: Response) => {
  console.log("Add to seller");
  // Get user id from params
  const userid: string = req.body.userid;
  console.log(userid);

  try {
    // Try to add user to seller table
    const createResponse = await psqlQueries.makeSeller(userid);

    // Try to get user's new info
    const newUserInfo: IUserInfoView[] = await psqlQueries.getUserInfoByID(
      userid
    );
    // Return a status 200 and user's info
    res.status(201).json(newUserInfo[0]);
  } catch (error) {
    // Return a status 400 and error
    res.status(400).json(error);
    console.log(error);
  }
});

// Export router to be used in index.ts file.
export { router };
