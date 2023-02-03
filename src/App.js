import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StorePage from "./pages/StorePage";
import ApiProvider from "./contexts/ApiProvider";
import FlashProvider from "./contexts/FlashProvider";
import Navbar from "./components/Navbar";
import CartProvider from "./contexts/CartProvider";
import FlashMessage from "./components/FlashMessage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import UserProvider from "./contexts/UserProvider";

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <FlashProvider>
          <UserProvider>
            <CartProvider>
              <Navbar />
              <FlashMessage />
              <Routes>
                <Route path="/storefront" element={<StorePage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </CartProvider>
          </UserProvider>
        </FlashProvider>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
