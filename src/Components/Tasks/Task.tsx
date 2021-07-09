import { CalendarIcon, CheckIcon } from "@heroicons/react/outline";
import moment from "moment";
import React from "react";

export interface TaskProps {
	title: string;
	description: string;
	finishedAt?: Date;
	dateCreated?: Date;
	children?: React.ReactNode;
}

const Task: React.FC<TaskProps> = (props) => {

	return (
		<div className="flex flex-row shadow p-4 rounded-lg mb-2 bg-white">
			<div className="flex-grow mr-2">
				<span>{props.title}</span>
				<p
					className="pl-4 text-xs"
					dangerouslySetInnerHTML={{
						__html: props.description.replaceAll("\n", "<br>"),
					}}
				/>
				<div className="flex flex-row">
					<span className="text-sm text-gray-400 mr-2">
						<CalendarIcon className="h-4 w-4 inline mr-2"></CalendarIcon>
						{moment(props.dateCreated).format("DD/MM/YYYY")}
					</span>
					{props.finishedAt && (
						<span className="text-sm text-green-400">
							<CheckIcon className="h-4 w-4 inline mr-2"></CheckIcon>
							{moment(props.finishedAt).format("DD/MM/YYYY")}
						</span>
					)}
				</div>
			</div>
			<div className="flex flex-none flex-row items-center">
				{props.children}
			</div>
		</div>
	);
};

export default Task;
