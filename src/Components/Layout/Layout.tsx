import React from "react";
import { Header } from ".";
import TaskDashboard from "./TaskDashboard";

const Layout = () => {
	return (
		<>
			<Header></Header>
			<div className="h-screen bg-gray-100">
				<div className="container mx-auto">
					<TaskDashboard></TaskDashboard>
				</div>
			</div>
		</>
	);
};

export default Layout;
