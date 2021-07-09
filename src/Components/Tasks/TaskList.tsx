import {
	ClipboardCheckIcon,
	ClipboardCopyIcon,
	DocumentAddIcon,
	TrashIcon,
} from "@heroicons/react/outline";
import React, { useContext, useState } from "react";
import { TaskForm } from ".";
import { AppContext, TaskModel, TaskTypes } from "../../Data";
import { Button, Dialog } from "../Shared";
import Task, { TaskProps } from "./Task";

export interface TaskListProps {
	title: string;
	tasks: TaskProps[];
	className?: string;
	type?: "todo" | "doing";
	onDelete?(value: TaskProps): void;
}

const TaskList: React.FC<TaskListProps> = (props) => {
	const { dispatch } = useContext(AppContext);

	const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

	const handleTaskDelete = (elem: TaskProps): void => {
		dispatch({ type: TaskTypes.Remove, payload: { task: elem } });
	};

	const handleTaskFinish = (elem: TaskProps): void => {
		dispatch({
			type: TaskTypes.Modify,
			payload: { task: { ...elem, finishedAt: new Date() } },
		});
	};

	const handleTaskStart = (elem: TaskProps): void => {
		dispatch({
			type: TaskTypes.Modify,
			payload: { task: { ...elem, startedAt: new Date() } },
		});
	};

	const handleSubmit = (newTask: TaskModel) => {
		dispatch({ type: TaskTypes.Add, payload: { task: newTask } });
	};

	return (
		<div className={"flex flex-col p-2 " + props.className}>
			<div className="flex flex-row my-2 items-center">
				<h3 className="font-bold flex-grow">{props.title}</h3>
				{props.type === "todo" && (
					<>
						<Button
							className="flex-none"
							onClick={() => setIsFormVisible(true)}
						>
							<DocumentAddIcon className="h-5 w-5 text-gray-400"></DocumentAddIcon>
						</Button>
						{isFormVisible && (
							<Dialog
								title="New Task"
								isVisible={isFormVisible}
								onClose={() => setIsFormVisible(false)}
							>
								<TaskForm
									onSubmit={handleSubmit}
									onClose={() => setIsFormVisible(false)}
								></TaskForm>
							</Dialog>
						)}
					</>
				)}
			</div>
			{props.tasks.length !== 0 ? (
				props.tasks.map((elem: TaskProps, index: number) => (
					<Task
						key={index}
						title={elem.title}
						description={elem.description}
						finishedAt={elem.finishedAt}
					>
						{props.type === "todo" && (
							<Button
								className="mr-2"
								onClick={() => handleTaskStart(elem)}
							>
								<ClipboardCopyIcon className="h-5 w-5 text-primary-500" />
							</Button>
						)}
						{!elem.finishedAt && props.type === "doing" && (
							<Button
								className="mr-2"
								onClick={() => handleTaskFinish(elem)}
							>
								<ClipboardCheckIcon className="h-5 w-5 text-green-400" />
							</Button>
						)}
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

export default TaskList;
