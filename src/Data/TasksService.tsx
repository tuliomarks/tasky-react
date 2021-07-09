interface TaskModel {
	id: string;
	title: string;
	description: string;
	dateCreated: Date;
	finishedAt?: Date;
	startedAt?: Date;
}

const localStorageKey = "Tasky.tasks";

class TasksService {
	static getAll = (): TaskModel[] => {
		const list = localStorage.getItem(localStorageKey);
		return list ? JSON.parse(list) : [];
	};

	static updateAll = (tasks: TaskModel[]): void => {
		localStorage.setItem(localStorageKey, JSON.stringify(tasks));
	};
}

export default TasksService;
export type { TaskModel };
