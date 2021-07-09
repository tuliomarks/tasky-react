import React, { useContext } from "react";
import { TaskList, TaskRulerList } from "../Tasks";
import { AppContext, TaskModel } from "../../Data";
import moment from "moment";

const TaskDashboard = () => {
	const { state } = useContext(AppContext);

	const getTodo = (): TaskModel[] => {
		return state.tasks.filter((task) => !task.startedAt);
	};
	const getDoing = (): TaskModel[] => {
		return state.tasks.filter((task) => task.startedAt && !task.finishedAt);
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="flex self-stretch flex-row justify-center items-center m-4">
				<h3 className="text-center m-4">
					{moment().format("dddd, DD MMMM YYYY")}
				</h3>
			</div>
			<div className="flex self-stretch flex-row">
				<TaskList
					className="flex-1"
					title="To Do"
					tasks={getTodo()}
					type="todo"
				></TaskList>
				<TaskList
					className="flex-1"
					title="Doing"
					tasks={getDoing()}
					type="doing"
				></TaskList>
				<TaskRulerList
					className="flex-1"
					title="Done"
					tasks={state.tasks}
				></TaskRulerList>
			</div>
		</div>
	);
};

export default TaskDashboard;
