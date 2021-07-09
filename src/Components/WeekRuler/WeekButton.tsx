import React from "react";
import moment from "moment";

interface WeekButtonProps {
	date: Date;
	isSelected: boolean;
	onDayClick?: any;
}

const WeekButton: React.FC<WeekButtonProps> = (props) => {
	const dayClass = () => {
		if (props.isSelected) return "bg-primary-500 bg-opacity-25";

		if (moment().isSame(props.date, "week")) return "bg-secondary-300 bg-opacity-25";

		return "bg-white hover:bg-secondary-200";
	};

	return (
		<li
			className={
				"flex flex-auto p-4 border-r border-gray-500 border-opacity-25 hover:bg-opacity-50 ease-linear transition-all duration-150 " +
				dayClass()
			}
		>
			<button
				className="flex flex-col flex-auto items-center"
				onClick={() => props.onDayClick(props.date)}
			>
				<span className="text-sm">{moment(props.date).startOf("week").format("DD")}-{moment(props.date).endOf("week").format("DD")}</span>
				<span className="text-sm text-gray-500">
					{moment(props.date).format("MMM")}
				</span>
			</button>
		</li>
	);
};

export default WeekButton;
