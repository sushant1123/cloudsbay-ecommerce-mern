import React from "react";

const FileUpload = () => {
	const handleFileUpload = (e) => {
		console.log(e.target.files);
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
