import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart.js/Cart";
import Shipping from "./components/cart.js/Shipping";
import ConfirmOrder from "./components/cart.js/ConfirmOrder";

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<div className="App">
				<Header />
				<div className="container container-fluid">
					<Route path="/" exact component={Home} />
					<Route path="/search/:keyword" component={Home} />
					<Route path="/product/:id" exact component={ProductDetails} />
					<Route path="/login" component={Login} exact />
					<Route path="/register" component={Register} exact />
					<Route path="/password/forgot" component={ForgotPassword} exact />
					<Route path="/password/reset/:token" component={NewPassword} exact />
					<Route path="/cart" exact component={Cart} />
					<ProtectedRoute path="/shipping" component={Shipping} />
					<ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
					<ProtectedRoute path="/me" component={Profile} />
					<ProtectedRoute path="/me/update" component={UpdateProfile} />
					<ProtectedRoute path="/password/update" component={UpdatePassword} />
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
