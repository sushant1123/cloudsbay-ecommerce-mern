import React from "react";
import TypeWriter from "typewriter-effect";

const Jumbotron = ({ text }) => {
	return (
		<div
			className="mt-4 p-5 rounded text-danger h1 fw-bold d-flex justify-content-center"
			style={{ backgroundColor: "#CFCCCB" }}
			id="jumbotron"
		>
			<TypeWriter
				options={{
					strings: text,
					autoStart: true,
					loop: true,
				}}
			/>
		</div>
	);
};

export default Jumbotron;
