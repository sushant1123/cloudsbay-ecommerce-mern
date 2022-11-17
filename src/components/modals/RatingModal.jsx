import React from "react";
import { Modal, Button } from "antd";

const RatingModal = ({ show, setShow, title, rating, comment, updateReview, children }) => {
	const handleOk = () => {
		setShow(false);
	};

	const handleCancel = () => {
		setShow(false);
	};

	const postAReview = () => {
		updateReview();
		// console.log({ rating, comment });
	};

	return (
		<Modal
			title={`Rating for ${title ? title : "the product"}`}
			open={show}
			visible={show}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<Button key="submit" type="primary" onClick={postAReview}>
					Post a Review
				</Button>,
				<Button key="cancel" onClick={handleCancel}>
					Cancel
				</Button>,
			]}
		>
			<div className="d-flex flex-column">{children}</div>
		</Modal>
	);
};

export default RatingModal;
