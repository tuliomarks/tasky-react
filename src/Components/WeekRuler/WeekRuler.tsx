import React, { useState } from "react";
import moment from "moment";
import WeekButton from "./WeekButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

interface WeekRulerProps {
	weeksToShow?: number;
	referenceDay?: Date;
	selectedDay?: Date;
	onDayChanged(day: Date): void;
}

const WeekRuler: React.FC<WeekRulerProps> = (props) => {
	
	const [referenceDay, setReferenceDay] = useState<Date>(props.referenceDay || new Date());
	const selectedDay = props.selectedDay || referenceDay;

	const getRulerWeeks = (baseDate: Date): Date[] => {
		const maxWeeksToShow = props.weeksToShow || 5;
		const startDate = moment(baseDate).startOf('isoWeek').add(-(maxWeeksToShow / 2) , "w");
		const days: Date[] = [];

		for (let i = 0; i < maxWeeksToShow; i++) {
			days.push(startDate.add(1, "w").toDate());
		}

		return days;
	};

	const weeks = getRulerWeeks(referenceDay);

	const handleDayClick = (day: Date) => {
		props.onDayChanged(day);
	};
	const handlePrevRuler = () => {
		const newDate = moment(referenceDay).add(-3, "w").toDate();
		setReferenceDay(newDate);
	};
	const handleNextRuler = () => {
		const newDate = moment(referenceDay).add(3, "w").toDate();
		setReferenceDay(newDate);
	};

	return (
		<ul className="flex flex-row p-4 my-4 rounded-lg shadow bg-white self-stretch">
			<li className="p-4 border-r border-gray-500 border-opacity-25 self-center">
				<button onClick={handlePrevRuler}>
					<ChevronLeftIcon className="h-5 w-5 text-secondary-700"></ChevronLeftIcon>
				</button>
			</li>
			{weeks.length !== 0 ? (
				weeks.map((day) => (
					<WeekButton
						key={day.getUTCDate()}
						date={day}
						isSelected={moment(day).isSame(selectedDay, "w")}
						onDayClick={handleDayClick}
					></WeekButton>
				))
			) : (
				<p>It's the end predit by mayans</p>
			)}
			<li className="p-4 self-center">
				<button onClick={handleNextRuler}>
					<ChevronRightIcon className="h-5 w-5 text-secondary-700"></ChevronRightIcon>
				</button>
			</li>
		</ul>
	);
};

export default WeekRuler;
