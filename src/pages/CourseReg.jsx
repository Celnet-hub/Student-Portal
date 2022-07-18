import React from "react";
import {
	GridComponent,
	Inject,
	ColumnsDirective,
	ColumnDirective,
	Search,
	Page,
} from "@syncfusion/ej2-react-grids";
import { Toolbar, Edit } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";

const token = JSON.parse(localStorage.getItem("authTokens"))["access"];
const url = "/api/courses/";
const failCourseUrl = "/api/failed-course/";
const axios = require(`axios`);
console.log(token["access"]);
//create function to get the data from the server
var getdata;
var getFailCourseData;
axios({
	method: "get",
	url: url,
	headers: {
		Authorization: `Bearer ${token}`,
	},
}).then(function (res) {
	getdata = res.data;
});

axios({
	method: "get",
	url: failCourseUrl,
	headers: {
		Authorization: `Bearer ${token}`,
	},
}).then(function (res) {
	getFailCourseData = res.data;
});

console.log(getFailCourseData);
console.log(getdata);

const CourseReg = () => {
	const Register = {
		text: "Register",
		tooltipText: "Register",
		prefixIcon: "ej-icon-Add",
		//type: "Button",
		click: (args) => {
			console.log(args.data);
			alert("Register");
			
		}
	}
	const toolbarOptions = ["Search", "Edit", 'Delete', 'Update', Register];
	var employeesDatas = "";
	//get the token from local storage



	//const data = Response.then((res) => res.json());

	//console.log(data);
	const editing = { allowDeleting: true, allowEditing: true, allowEditOnDblClick: true, showConfirmDialog: true, showDeleteConfirmDialog: true };
	return (
		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
			<div className="control-section">
				<Header category="Page" title="Course Registration" />
				<GridComponent
					dataSource={getdata}
					width="auto"
					allowPaging
					allowSorting
					pageSettings={{ pageCount: 5 }}
					editSettings={editing}
					toolbar={toolbarOptions}
					//toolbarClick={Register.click}
				>
					<ColumnsDirective>
						<ColumnDirective
							type="checkbox"
							allowSorting={false}
							allowFiltering={false}
							width="60"
						/>
						<ColumnDirective field="name" headerText="Name" width="150" />

						<ColumnDirective
							field="code"
							headerText="Courese Code"
							width="150"
						/>
						<ColumnDirective
							field="lecturer"
							headerText="Lecturer"
							width="150"
						/>
						<ColumnDirective
							field="credit_unit"
							headerText="Credit Unit"
							width="150"
						/>
						<ColumnDirective
							field="courseType"
							headerText="Course Type"
							width="150"
						/>
						<ColumnDirective field="status" headerText="Status" width="150" />
					</ColumnsDirective>
					<Inject services={[ Page, Edit, Toolbar]} />
				</GridComponent>
			</div>
		<br /><br />
			<div className="control-section">
				<Header title="Failed Course(s) To Register" />
				<GridComponent
					dataSource={getFailCourseData}
					width="auto"
					allowPaging
					allowSorting
					pageSettings={{ pageCount: 5 }}
					editSettings={editing}
					toolbar={toolbarOptions}
					//toolbarClick={Register.click}
				>
					<ColumnsDirective>
						<ColumnDirective
							type="checkbox"
							allowSorting={false}
							allowFiltering={false}
							width="60"
						/>
						<ColumnDirective field="course" headerText="Course" width="150" />

						<ColumnDirective
							field="credit_unit"
							headerText="Credit Unit"
							width="150"
						/>
						<ColumnDirective
							field="lecturer"
							headerText="Lecturer"
							width="150"
						/>
						<ColumnDirective
							field="courseType"
							headerText="Course Type"
							width="150"
						/>
						<ColumnDirective field="status" headerText="Status" width="150" />
					</ColumnsDirective>
					<Inject services={[ Page, Edit, Toolbar]} />
				</GridComponent>
			</div>
		</div>
	);
};

export default CourseReg;
