import React from "react";

export interface ButtonProps {
	className?: string;
	type?: "button" | "submit";
	color?: "default" | "primary" | "secondary";
	children?: React.ReactNode;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
	const color = props.color || "default";
	const type = props.type || "button";

	const getColorClass = () => {
		if (color === "default") {
			return "bg-white hover:bg-gray-100";
		}
		if (color === "primary") {
			return "bg-primary-500 hover:bg-primary-600 text-white";
		}
		if (color === "secondary") {
			return "bg-secondary hover:bg-secondary-600 text-white";
		}
	};

	return (
		<button
			type={type}
			className={
				"shadow hover:shadow-lg p-4 rounded-lg ease-linear transition-all duration-150 font-bold " +
				getColorClass() +
				" " +
				props.className
			}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
