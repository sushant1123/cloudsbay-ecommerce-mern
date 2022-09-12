import React from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";

import { uploadFile } from "../../api's/file-upload";

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
				setLoading(false);
			}
		}
	};

	return (
		<div className="row">
			<label htmlFor="file-upload">Choose File</label>
			<input
				type="file"
				className="form-control"
				multiple
				id="file-upload"
				accept="images/*"
				onChange={handleFileUpload}
			/>
		</div>
	);
};

export default FileUpload;
