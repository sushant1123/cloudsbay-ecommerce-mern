import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count = 1 }) => {
	const cards = () => {
		let allCards = [];
		for (let i = 0; i < count; i++) {
			allCards.push(
				<Card className="col-md-3 m-3">
					<Skeleton active />
				</Card>
			);
		}

		return allCards;
	};
	return <div className="row pb-3">{cards()}</div>;
};

export default LoadingCard;
