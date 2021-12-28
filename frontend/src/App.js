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
					<ProtectedRoute path="/me" component={Profile} exact />
					<ProtectedRoute path="/me/update" component={UpdateProfile} exact />
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
