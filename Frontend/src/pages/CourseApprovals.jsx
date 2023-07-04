import React from "react";
import { Header } from "../components";
import ApprovedCourse from "../components/ApprovedCourses.jsx";
import ApprovedFailedCourse from "../components/ApprovedFailedCourse.jsx";



const CourseApproval = () => {

		return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
			
			<div>
			<Header title="Approved Courses" />
			<ApprovedCourse />
			</div>
			<br />
			<br />
			<div>
				<Header title="Approved Failed Course(s)" />
				<ApprovedFailedCourse />
			</div>
		
			<div className="control-section">
				
			</div>
		</div>
	);
};

export default CourseApproval;