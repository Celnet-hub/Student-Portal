import React from "react";
import { Header } from "../components";
import StudentResultTable from "../components/Result";



const StudentResult = () => {
	// usestate to set Status of the course

	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
			
			<div>
			<Header title="Student Result" />
			<StudentResultTable />
			</div>
			<br />
			<br />
		</div>
	);
};

export default StudentResult;
