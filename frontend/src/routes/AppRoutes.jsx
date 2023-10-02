import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import SettingPasswordPage from "../pages/SettingPassworPage";
import ProtectedRoute from "./ProtectedRoutes";
import AddProductPage from "../pages/AddProductPage";
import ProductPage, { AllProducts, ProductByCategory , ProductDetailPage} from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import OrderItemPage from "../pages/OrderItemPage";
import OrderPage from "../pages/OrderPage";
import OrderSuccessfullPage from "../pages/OrderSuccessfullPage";
import CustomerOrdersPage from "../pages/CutomerOrdersPage"
import CustomerOrderItemPage from "../pages/CustomerOrderItemPage";
import UpdateSuccessfulPage from "../pages/UpdateSuccessfulPage";

function AppRoutes(props){
    return(
        <Routes>
            <Route path="/" element={<HomePage {...props}/>}/>
            <Route path="/login" element={<LoginPage {...props}/>}/>
            <Route path="/signup" element={<SignupPage {...props}/>}/>
            <Route path="/settingPassword" element={<ProtectedRoute><SettingPasswordPage {...props}/></ProtectedRoute>}/>
            <Route path="/adminProduct/add" element={<AddProductPage {...props} />}/>
            <Route path="/products" element={<ProductPage {...props} />}>
                <Route index element={<AllProducts />}/>
                <Route path="byCategory/:category" element={<ProductByCategory />}/>
                <Route path="byId/:id" element={<ProductDetailPage />}/>
            </Route>
            <Route path="/orderItems" element={<OrderItemPage />}/>
            <Route path="/carts" element={<ProtectedRoute><CartPage {...props} /></ProtectedRoute>} />
            <Route path="/billForm" element={<OrderPage {...props} />}/>
            <Route path="/orderdone" element={<OrderSuccessfullPage {...props}/>}/>
            <Route path="/orderupdatedone" element={<UpdateSuccessfulPage {...props} />}/>
            <Route path="/myorders/:userid" element={<ProtectedRoute><CustomerOrdersPage {...props} /></ProtectedRoute>}/>
            <Route path="/myOrderDtail/:orderid" element = {<ProtectedRoute><CustomerOrderItemPage {...props}/></ProtectedRoute>}/>
        </Routes>
    )
}

export default AppRoutes;