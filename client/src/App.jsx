import Advertisement from "./components/Advertisement";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import UserDashboard from "./pages/User/UserDashboard";
import DashBoard from "./pages/Admin/DashBoard";
import CreatePost from "./pages/Admin/CreatePost";
import Register from "./pages/Register";
import Details from "./pages/Admin/Details";
import PrivateRoute from "./components/Routes/Admin";
import UserRoutes from "./components/Routes/Private";
import CreateCategory from "./pages/Admin/CreateCategory";
import AllPost from "./pages/Admin/AllPost";
import AllTrip from "./pages/Admin/AllTrip";
import UpdatePost from "./pages/Admin/UpdatePost";
import CartPage from "./pages/CartPage";
import Payment from "./pages/Payment";
import YourOrder from "./pages/YourOrder";
import ThankYou from "./components/ThankYou";
import SelectedCategory from "./pages/SelectedCategory";
import ContributePost from "./pages/User/ContributePost";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/category/:slug" element={<SelectedCategory />} />

        <Route path="/user" element={<UserRoutes />}>
          <Route path="" element={<UserDashboard />} />
          <Route path="your-order" element={<YourOrder />} />
          {/* <Route path="create-post" element={<ContributePost />} /> */}
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="" element={<DashBoard />} />
          <Route path="/admin/create-post" element={<CreatePost />} />
          <Route path="/admin/create-category" element={<CreateCategory />} />
          <Route path="/admin/all-post" element={<AllPost />} />
          <Route path="/admin/details" element={<Details />} />
          <Route path="/admin/all-booking" element={<AllTrip />} />
          <Route path="/admin/post/:slug" element={<UpdatePost />} />
        </Route>
      </Routes>
      <Advertisement />
      <Footer />
    </>
  );
}

export default App;
