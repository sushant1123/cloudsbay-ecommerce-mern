import React from "react";
// import { useSelector } from "react-redux";

import Jumbotron from "../components/Jumbotron";
import CategoryList from "../components/lists/CategoryList";
import SubCategoriesList from "../components/lists/SubCategoriesList";
import BestSellers from "./home/BestSellers";
import NewArrivals from "./home/NewArrivals";

const Home = ({ history }) => {
	// const { user } = useSelector((state) => state);

	// useEffect(() => {
	// 	if (!user || !user.token) history.push("/login");
	// }, [user, history]);

	return (
		<>
			<Jumbotron text={["New Arrivals", "Latest Products", "Best Sellers"]} />

			<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">New Arrivals</h4>
			<NewArrivals />

			<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Best Sellers</h4>
			<BestSellers />

			<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Categories</h4>
			<CategoryList />

			<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Sub Categories</h4>
			<SubCategoriesList />

			<br />
			<br />
			<br />
		</>
	);
};

export default Home;
