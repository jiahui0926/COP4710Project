import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import { AuthProvider } from "./contexts/AuthProvider";
import { ROUTE_PATHS } from "./constants/routes";
import { siteName } from "./constants/brandConstants";

import NavigationBar from "./components/NavigationBar";

import AllShopsPage from "./pages/AllShopsPage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import CreateStorePage from "./pages/CreateShopPage";
import YourShops from "./pages/YourShops";
import CreateProductPage from "./pages/CreateProductPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  useEffect(() => {
    document.title = siteName;
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <nav style={{ marginTop: 64 }}>
            <NavigationBar />
          </nav>
          <Routes>
            <Route path={ROUTE_PATHS.Home} element={<HomePage />} />
            <Route path={ROUTE_PATHS.SignUp} element={<SignUpPage />} />
            <Route path={ROUTE_PATHS.Login} element={<LoginPage />} />
            <Route path={ROUTE_PATHS.AllShops} element={<AllShopsPage />} />
            <Route path={`${ROUTE_PATHS.Shop}/:id`} element={<ShopPage />} />
            <Route
              path={ROUTE_PATHS.CreateShop}
              element={<CreateStorePage />}
            />
            <Route path={ROUTE_PATHS.YourShops} element={<YourShops />} />
            <Route path={ROUTE_PATHS.Orders} element={<OrdersPage />} />
            <Route
              path={`${ROUTE_PATHS.CreateProduct}/:shopID`}
              element={<CreateProductPage />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
