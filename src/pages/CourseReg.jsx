import React, { useEffect } from "react";
import { Header } from "../components";
import SelectTableComponent from "./Coursetable.component";
import SelectFailedCourse from "./Failedcourse.component";



const CourseReg = () => {
	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
			
			<div>
			<Header title="Courses To Register" />
			<SelectTableComponent />
			</div>
			<br />
			<br />
			<div>
				<Header title="Failed Course(s) To Register" />
				<SelectFailedCourse />
			</div>
		
			<div className="control-section">
				
			</div>
		</div>
	);
};

export default CourseReg;
