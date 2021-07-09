import React, { ChangeEvent, FormEvent, useState } from "react";
import { TaskModel } from "../../Data";
import { Button, Input, TextArea } from "../Shared";
import { generateId } from "../../Utils/Utils";

export interface TaskFormProps {
	onSubmit?(task: TaskModel): void;
	onClose?(): void;
}

const TaskForm: React.FC<TaskFormProps> = (props) => {
	const [form, setForm] = useState({ title: "", description: "" });

	const handleChange = (field: string, event: ChangeEvent<any>) => {
		event.preventDefault();
		setForm({ ...form, [field]: event?.target?.value });
	};

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		const task = { ...form, dateCreated: new Date(), id: generateId(18) } as TaskModel;

		if (props.onSubmit) {
			props.onSubmit(task);
		}
		if (props.onClose){
			props.onClose();
		}
	};

	return (
		<form
			className="flex flex-col"
			onSubmit={handleFormSubmit}
		>
			<Input
				placeholder="Title"
				className="mb-5"
				value={form.title}
				onChange={(e) => handleChange("title", e)}
			></Input>
			<TextArea
				className="h-10"
				value={form.description}
				onChange={(e) => handleChange("description", e)}
			></TextArea>
			<div className="flex flex-row justify-end">
				<Button className="mr-2" onClick={props.onClose}>Cancel</Button>
				<Button className="min-w-1/6" color="primary" type="submit">
					Add
				</Button>
			</div>
		</form>
	);
};

export default TaskForm;
