import React, { useEffect } from "react";
import {
	GridComponent,
	Inject,
	ColumnsDirective,
	ColumnDirective,
	Search,
	Page,
} from "@syncfusion/ej2-react-grids";
import { Toolbar, Edit } from "@syncfusion/ej2-react-grids";
import {
	DataManager,
	WebApiAdaptor,
	WebMethodAdaptor,
} from "@syncfusion/ej2-data";

import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";
import SelectTableComponent from "./Coursetable.component";
import SelectFailedCourse from "./Failedcourse.component";



const CourseReg = () => {
	// usestate to set Status of the course
	const [status, setStatus] = React.useState("Not Registered");

	// change the status of the course when the user clicks on the Register button
	const handleRegister = () => {
		console.log(status);
		if (status === "Not Registered") {
			setStatus("Registered");
		} else {
			setStatus("Not Registered");
		}
	};

	const Register = {
		text: "Register",
		tooltipText: "Register",
		prefixIcon: "ej-icon-Add",
		//type: "Button",
		click: (args) => {
			handleRegister();
			alert(status);
		},
	};
	const toolbarOptions = ["Search", "Edit", "Delete", "Update", Register];

	let grid;


	// run the function to get the data from th
	const rowSelected = () => {
		if (grid) {
            /** Get the selected row indexes */
            const selectedrowindex = grid.getSelectedRowIndexes();
            /** Get the selected records. */
            const selectedrecords = grid.getSelectedRecords();
            console.log(selectedrecords);
        }
	}


	//console.log(data);
	const editing = {
		allowDeleting: true,
		allowEditing: true,
		allowEditOnDblClick: true,
		showConfirmDialog: true,
		showDeleteConfirmDialog: true,
	};
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
