import { TaskModel, TasksService } from ".";

type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key;
		  }
		: {
				type: Key;
				payload: M[Key];
		  };
};

export enum TaskTypes {
	Add = "ADD_TASK",
	Modify = "MODIFY_TASK",
	Remove = "REMOVE_TASK",
}

type TaskPayload = {
	[TaskTypes.Add]: {
		task: TaskModel;
	};
	[TaskTypes.Modify]: {
		task: TaskModel;
	};
	[TaskTypes.Remove]: {
		task: TaskModel;
	};
};

export type TaskActions = ActionMap<TaskPayload>[keyof ActionMap<TaskPayload>];

export const TasksReducer = (state: TaskModel[], action: TaskActions) => {
	switch (action.type) {
		case TaskTypes.Add: {
			const newList = [...state, action.payload.task];
			TasksService.updateAll(newList);
			return newList;
		}
		case TaskTypes.Modify: {
			const index = state.findIndex((state) => state.id === action.payload.task.id);
			state[index] = { ...action.payload.task };

			TasksService.updateAll(state);
			return state;
		}
		case TaskTypes.Remove: {
			const newList = state.filter(
				(state) => state !== action.payload.task
			);
			TasksService.updateAll(newList);
			return newList;
		}
		default:
			return state;
	}
};
