import React, { createContext, useReducer } from "react";
import { TaskActions, TasksReducer } from "./TasksReducer";
import { TaskModel } from ".";
import TasksService from "./TasksService";

interface AppInitialState {
	tasks: TaskModel[];
}

const initialState = { tasks: TasksService.getAll() };

export const AppContext = createContext<{
	state: AppInitialState;
	dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const mainReducer = ({ tasks }: AppInitialState, action: TaskActions) => ({
    tasks: TasksReducer(tasks, action),
});

const AppDataProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(mainReducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppDataProvider;
