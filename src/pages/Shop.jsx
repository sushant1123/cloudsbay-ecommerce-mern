import React, { useState, useEffect } from "react";
import { getProducts, fetchProductsByFilter } from "../api's/product";
import { getCategories } from "../api's/category";
import { getSubCategories } from "../api's/sub-category";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Checkbox, Menu, Slider } from "antd";
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";

import ProductCard from "../components/cards/ProductCard";
import { searchQuery } from "../redux/index.actions";
import Ratings from "../components/forms/Ratings";

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

let colors = ["Black", "Brown", "Silver", "Blue", "White"];
let brands = ["Apple", "Dell", "Samsung", "Microsoft", "Lenovo", "Asus"];
let shipping = ["Yes", "No"];

const Shop = () => {
	let { search } = useSelector((state) => state);
	const dispatch = useDispatch();
	let { text, categories, subCategory } = search;
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [price, setPrice] = useState([0, 0]);
	const [star, setStar] = useState(0);
	const [selectedCategories, setSelectedCategories] = useState(categories);
	const [allCategories, setAllCategories] = useState([]);
	const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory);
	const [allSubCategories, setAllSubCategories] = useState([]);
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedBrand, setSelectedBrand] = useState("");
	const [selectedShipping, setSelectedShipping] = useState("");

	const [openKeys, setOpenKeys] = useState([
		"prange",
		// "category",
		"ratings",
		// "subCategory",
		"shipping",
		"color",
		"brand",
	]);
	const onOpenChange = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	const onChange = (e) => {
		let cats = [...selectedCategories];
		if (e.target.checked) {
			cats.push(e.target.value);
			// console.log("checked =>>", e, e.target.value);
		} else {
			let catposn = selectedCategories.indexOf(e.target.value);
			// console.log("before", cats);
			if (catposn !== -1) {
				cats.splice(catposn, 1);
				// console.log("after", cats);
			}
		}
		setSelectedCategories(cats);
		dispatch(
			searchQuery({
				categories: selectedCategories,
				text: "",
				rating: 0,
				price: { start: price[0], end: price[1] },
			})
		);
	};

	const handleStarClick = (number) => {
		console.log(number);
		setStar(number);
		setPrice([0, 0]);
		setSelectedCategories([]);
		searchQuery({
			rating: number,
		});
	};

	const getRatingsArr = () => {
		let elem = [];
		for (let i = 5; i > 0; i--) {
			elem.push(
				getItem(
					<>
						<Ratings starClick={handleStarClick} stars={i} />
					</>
				)
			);
		}
		return elem;
	};

	const items = [
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
		getItem(
			<span className="h6 d-flex align-items-center">
				<DownSquareOutlined /> &nbsp;&nbsp;&nbsp; Categories
			</span>,
			"category",
			null,
			allCategories.map((cat) =>
				getItem(
					<>
						<Checkbox
							key={cat._id}
							onChange={onChange}
							name={cat.name}
							checked={selectedCategories.includes(cat._id)}
							value={cat._id}
							style={{ marginTop: "-20px" }}
						>
							{cat.name}
						</Checkbox>
					</>,
					cat._id
				)
			)
		),
		getItem(
			<span className="h6 d-flex align-items-center">
				<StarOutlined /> &nbsp;&nbsp;&nbsp; Ratings
			</span>,
			"ratings",
			null,
			getRatingsArr()
		),
		getItem(
			<span className="h6 d-flex align-items-center">
				<DownSquareOutlined /> &nbsp;&nbsp;&nbsp; SubCategories
			</span>,
			"subCategory",
			null,
			allSubCategories.map((subCat) =>
				getItem(
					<span className="" key={subCat._id} onClick={(e) => setSelectedSubCategory(subCat._id)}>
						{subCat.name}
					</span>,
					subCat._id
				)
			)
		),
		getItem(
			<span className="h6 d-flex align-items-center">
				<DownSquareOutlined /> &nbsp;&nbsp;&nbsp; Shipping
			</span>,
			"shipping",
			null,
			shipping.map((shipping, id) =>
				getItem(
					<span
						className=""
						key={shipping + "-" + id}
						onClick={(e) => setSelectedShipping(shipping)}
					>
						{shipping}
					</span>,
					id
				)
			)
		),
		getItem(
			<span className="h6 d-flex align-items-center">
				<DownSquareOutlined /> &nbsp;&nbsp;&nbsp; Color
			</span>,
			"color",
			null,
			colors.map((color, id) =>
				getItem(
					<span className="" key={color + "-" + id} onClick={(e) => setSelectedColor(color)}>
						{color}
					</span>,
					id
				)
			)
		),
		getItem(
			<span className="h6 d-flex align-items-center">
				<DownSquareOutlined /> &nbsp;&nbsp;&nbsp; Brand
			</span>,
			"brand",
			null,
			brands.map((brand, id) =>
				getItem(
					<span className="" key={brand + "-" + id} onClick={(e) => setSelectedBrand(brand)}>
						{brand}
					</span>,
					id
				)
			)
		),
	];

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

	const loadAllCategories = async () => {
		try {
			setLoading(true);
			const response = await getCategories();
			setAllCategories(response.data.categories);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	const loadAllSubCategories = async () => {
		try {
			setLoading(true);
			const response = await getSubCategories();
			setAllSubCategories(response.data.subCategories);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		loadAllProducts();
		loadAllCategories();
		loadAllSubCategories();
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
	const getAllProductsByPrice = async (price) => {
		try {
			setLoading(true);
			const response = await fetchProductsByFilter({ price: { start: price[0], end: price[1] } });
			setSelectedCategories([]);
			setSelectedSubCategory("");
			setStar(0);
			setSelectedBrand("");
			setSelectedColor("");
			setSelectedShipping("");
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	const handleSlider = (val) => {
		dispatch(
			searchQuery({ categories: [], text: "", price: { start: price[0], end: price[1] }, rating: 0 })
		);
		setPrice(val);
	};

	useEffect(() => {
		if (price[0] === 0 && price[1] === 0) {
			return;
		}
		let debounce = setTimeout(() => {
			console.log("price changing");
			getAllProductsByPrice(price);
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [price]);

	//4. show products by category
	const getAllProductsByCategory = async (categories) => {
		try {
			setLoading(true);
			const response = await fetchProductsByFilter(categories);
			setPrice([0, 0]);
			setStar(0);
			setSelectedSubCategory("");
			setSelectedBrand("");
			setSelectedColor("");
			setSelectedShipping("");
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		if (!selectedCategories.length) {
			return;
		}
		let debounce = setTimeout(() => {
			console.log("category changing");
			getAllProductsByCategory({ categories: selectedCategories });
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [selectedCategories]);

	//5. show products based on rating
	const getAllProductsByRating = async (rating) => {
		try {
			setLoading(true);
			const response = await fetchProductsByFilter(rating);
			setPrice([0, 0]);
			setSelectedCategories([]);
			setSelectedSubCategory("");
			setSelectedBrand("");
			setSelectedColor("");
			setSelectedShipping("");
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		if (!star) {
			return;
		}
		let debounce = setTimeout(() => {
			console.log("rating changing");
			getAllProductsByRating({ star });
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [star]);

	//6. show products based on subcategory
	const getAllProductsBySubCategory = async (selectedSubCategory) => {
		try {
			setLoading(true);
			const response = await fetchProductsByFilter({ subCategory: selectedSubCategory });
			setPrice([0, 0]);
			setSelectedCategories([]);
			setSelectedBrand("");
			setSelectedColor("");
			setSelectedShipping("");
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		if (!selectedSubCategory) {
			return;
		}
		let debounce = setTimeout(() => {
			console.log("sub category changing");
			getAllProductsBySubCategory(selectedSubCategory);
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [selectedSubCategory]);

	//7. show products based on brand
	const getAllProductsByBrand = async (selectedBrand) => {
		try {
			setLoading(true);
			const response = await fetchProductsByFilter({ brand: selectedBrand });
			setPrice([0, 0]);
			setSelectedCategories([]);
			setSelectedBrand(selectedBrand);
			setSelectedColor("");
			setSelectedShipping("");
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		if (!selectedBrand) {
			return;
		}
		let debounce = setTimeout(() => {
			console.log("brand changing");
			getAllProductsByBrand(selectedBrand);
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [selectedBrand]);

	//8. show products based on color
	const getAllProductsByColor = async (selectedColor) => {
		try {
			setLoading(true);
			const response = await fetchProductsByFilter({ color: selectedColor });
			setPrice([0, 0]);
			setSelectedCategories([]);
			setSelectedBrand("");
			setSelectedColor(selectedColor);
			setSelectedShipping("");
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		if (!selectedColor) {
			return;
		}
		let debounce = setTimeout(() => {
			console.log("color changing");
			getAllProductsByColor(selectedColor);
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [selectedColor]);

	//9. show products based on shipping
	const getAllProductsByShipping = async (selectedShipping) => {
		try {
			setLoading(true);
			const response = await fetchProductsByFilter({ shipping: selectedShipping });
			setPrice([0, 0]);
			setSelectedCategories([]);
			setSelectedBrand("");
			setSelectedColor("");
			setSelectedShipping(selectedShipping);
			setProducts(response.data.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		if (!selectedShipping) {
			return;
		}
		let debounce = setTimeout(() => {
			console.log("shipping changing");
			getAllProductsByShipping(selectedShipping);
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [selectedShipping]);

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
