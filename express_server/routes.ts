import express, { Request, Response } from "express";
import psqlQueries from "./queries";
import { ILoginInfo, ISignUpInfo, IUserInfoView } from "./types";

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
  const shopProducts = await psqlQueries.getAllProductsOfAShop(req.params.id);
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

// Export router to be used in index.ts file.
export { router };
