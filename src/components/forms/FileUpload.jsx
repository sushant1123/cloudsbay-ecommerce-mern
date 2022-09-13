import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

import { uploadFile, deleteFile } from "../../api's/file-upload";

const FileUpload = ({ productValues, setProductValues, setLoading }) => {
	const { user } = useSelector((state) => state);

	const handleFileUpload = (e) => {
		console.log(e.target.files);

		let files = e.target.files;
		let allUploadedImages = productValues.images;

		if (files) {
			setLoading(true);
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					async (uri) => {
						try {
							let response = await uploadFile(uri, user.token || "");
							setLoading(false);
							let { public_id, url } = response.data;
							allUploadedImages.push({ public_id, url });
							setProductValues((prev) => ({ ...prev, images: allUploadedImages }));
						} catch (error) {
							setLoading(false);
							console.log({ message: "cloudinary upload error", error });
						}
					},
					"base64"
				);
			}
		}
	};

	const handleRemoveUploadedImage = async (public_id) => {
		setLoading(true);
		try {
			let response = await deleteFile(public_id, user.token || "");
			if (response.data.status === "success") {
				let remainingImages = productValues.images.filter((img) => img.public_id !== public_id);
				console.log(remainingImages);
				setProductValues((prev) => ({ ...prev, images: remainingImages }));
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log({ message: "cloudinary remove error", error });
		}
	};

	return (
		<div className="m-3">
			<div className="row mb-3">
				<input
					type="file"
					className="form-control"
					multiple
					id="file-upload"
					accept="images/*"
					onChange={handleFileUpload}
				/>
			</div>
			<div className="row">
				{productValues.images?.map((image, index) => (
					<div
						key={image.public_id}
						className={`col-md-2 ${index / 6 >= 1 && "mt-3"}`}
						onClick={() => handleRemoveUploadedImage(image.public_id)}
					>
						<Badge count={"X"} style={{ cursor: "pointer" }}>
							<Avatar
								src={image.url}
								size={100}
								shape="square"
								// className="ml-3"
							/>
						</Badge>
					</div>
				))}
			</div>
		</div>
	);
};

export default FileUpload;
