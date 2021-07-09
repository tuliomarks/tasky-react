import { HomeIcon, TrashIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { useContext, useState } from "react";
import { AppContext, TaskTypes } from "../../Data";
import { Button } from "../Shared";
import { WeekRuler } from "../WeekRuler";
import Task, { TaskProps } from "./Task";

export interface TaskRulerListProps {
	title: string;
	tasks: TaskProps[];
	className?: string;
}

const TaskRulerList: React.FC<TaskRulerListProps> = (props) => {
	const { dispatch } = useContext(AppContext);

	const [referenceDay, setReferenceDay] = useState<Date>(new Date());
	const [selectedDay, setSelectedDay] = useState<Date>(new Date());

	const handleDayChanged = (day: Date) => {
		setSelectedDay(day);
	};

	const handleResetSelectedDay = () => {
		setSelectedDay(new Date());
		setReferenceDay(new Date());
	};

	const getDoneByDate = (date: Date): TaskProps[] => {
		return props.tasks.filter(
			(task) =>
				task.finishedAt && moment(date).startOf("week").isSameOrBefore(task.finishedAt, "day")
								&& moment(date).endOf("week").isSameOrAfter(task.finishedAt, "day")
		).sort((a,b) => moment(a.finishedAt).isBefore(b.finishedAt) ? 1 : -1);
	};

	const tasksToShow = getDoneByDate(selectedDay);

	const handleTaskDelete = (elem: TaskProps): void => {
		dispatch({ type: TaskTypes.Remove, payload: { task: elem } });
	};

	return (
		<div className={"flex flex-col p-2 " + props.className}>
			<div className="flex flex-row my-2 items-center">
				<h3 className="font-bold flex-grow">{props.title}</h3>
				<Button className="flex-none" onClick={handleResetSelectedDay}>
					<HomeIcon className="h-5 w-5 text-gray-400"></HomeIcon>
				</Button>
			</div>
			<WeekRuler
				onDayChanged={handleDayChanged}
				weeksToShow={5}
				selectedDay={selectedDay}
				referenceDay={referenceDay}
			></WeekRuler>
			{tasksToShow.length !== 0 ? (
				tasksToShow.map((elem: TaskProps, index: number) => (
					<Task
						key={index}
						title={elem.title}
						description={elem.description}
						finishedAt={elem.finishedAt}
					>
						<Button onClick={() => handleTaskDelete(elem)}>
							<TrashIcon className="h-5 w-5 text-red-400" />
						</Button>
					</Task>
				))
			) : (
				<div>No tasks found!</div>
			)}
		</div>
	);
};

export default TaskRulerList;
