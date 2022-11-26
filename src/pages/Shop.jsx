import React, { useState, useEffect } from "react";
import { getProducts, fetchProductsByFilter } from "../api's/product";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Menu, Slider } from "antd";
import { DollarOutlined } from "@ant-design/icons";

import ProductCard from "../components/cards/ProductCard";
import { searchQuery } from "../redux/index.actions";

const rootSubmenuKeys = ["prange", "sub2", "sub4"];

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}

const Shop = () => {
	let { search } = useSelector((state) => state);
	const dispatch = useDispatch();
	let { text } = search;
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [price, setPrice] = useState([10, 50000]);

	const [openKeys, setOpenKeys] = useState(["prange"]);
	const onOpenChange = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	//1. show products on page load
	const loadAllProducts = async () => {
		try {
			setLoading(true);
			const response = await getProducts(12);
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};
	useEffect(() => {
		loadAllProducts();
	}, []);

	//2. show products on user search input
	const getAllProductsBySearch = async (text) => {
		try {
			setLoading(true);
			const response = await fetchProductsByFilter({ query: text });
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		if (!text) {
			loadAllProducts();
			return;
		}

		let debounce = setTimeout(() => {
			getAllProductsBySearch(text);
		}, 500);

		return () => {
			clearTimeout(debounce);
		};
	}, [text]);

	//3. show products by price range
	const items = [
		// {
		// 	label: "Price",
		// 	key: "1",
		// 	children: [
		// 		{
		// 			label: (
		// 				<>
		// 					<Slider
		// 						className="ml-4 mr-4"
		// 						tipFormatter={(val) => `₹${val}`}
		// 						range
		// 						value={price}
		// 						defaultValue={price}
		// 						onChange={(val) => setPrice(val)}
		// 					/>
		// 				</>
		// 			),
		// 			key: "prange",
		// 		},
		// 	],
		// },
		getItem(
			<span className="h6 d-flex align-items-center">
				<DollarOutlined /> &nbsp;&nbsp;&nbsp; Price
			</span>,
			"prange",
			null,
			[
				getItem(
					<>
						<Slider
							className="ml-4 mr-4"
							tipFormatter={(val) => `₹${val}`}
							range
							value={price}
							defaultValue={price}
							onChange={(val) => handleSlider(val)}
							max="300000"
							step={500}
						/>
					</>,
					"slider"
				),
			]
		),
		getItem("Navigation Two", "sub2", null, [
			getItem("Option 5", "5"),
			getItem("Submenu", "sub3", null, [getItem("Option 7", "7"), getItem("Option 8", "8")]),
		]),
	];

	const getAllProductsByPrice = async (price) => {
		try {
			setLoading(true);
			const response = await fetchProductsByFilter({ price: { start: price[0], end: price[1] } });
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	const handleSlider = (val) => {
		dispatch(searchQuery({ text: "", price: { start: price[0], end: price[1] } }));
		setPrice(val);
	};

	useEffect(() => {
		let debounce = setTimeout(() => {
			console.log("price changing");
			getAllProductsByPrice(price);
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [price]);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-3">
					<h4 className="pt-2">Search Filter Menu</h4>
					<hr />
					<Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} items={items} />
				</div>

				<div className="col-md-9 pt-2">
					{loading && <h4 className="text-danger">Loading...</h4>}
					{!loading && products.length > 0 && <h4 className="text-info">Products</h4>}

					{!loading && products.length < 1 && (
						<h1 className="text-info text-center py-auto">No Products Found</h1>
					)}

					<div className="row">
						{products.length > 0 &&
							products.map((p) => (
								<div className="col-md-4" key={p._id}>
									<ProductCard product={p} />
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
