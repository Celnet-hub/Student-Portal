import React from "react";
const axios = require(`axios`);

class SelectFailedCourse extends React.Component {
	// Event to get selected rows(Optional)
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			List: [],
			MasterChecked: false,
			SelectedList: [],
		};
	}

	componentDidMount() {
		const url = `/api/v1/failed-courses/`;
		const token1 = JSON.parse(localStorage.getItem("authTokens"))["access"];
		let data = [];
		axios({
			method: "get",
			url: url,
			headers: {
				Authorization: `Bearer ${token1}`,
			},
		})
			.then((res) => {
				//return res.data to state variable
				data = res.data;
				console.log(data);
				this.setState({
					isLoaded: true,
					List: data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// Select/ UnSelect Table rows
	onMasterCheck(e) {
		let tempList = this.state.List;
		// Check/ UnCheck All Items
		tempList.map((user) => (user.selected = e.target.checked));

		//Update State
		this.setState({
			MasterChecked: e.target.checked,
			List: tempList,
			SelectedList: this.state.List.filter((e) => e.selected),
		});
	}

	// Update List Item's state and Master Checkbox State
	onItemCheck(e, item) {
		let tempList = this.state.List;
		tempList.map((user) => {
			if (user.id === item.id) {
				user.selected = e.target.checked;
			}
			return user;
		});

		//To Control Master Checkbox State
		const totalItems = this.state.List.length;
		const totalCheckedItems = tempList.filter((e) => e.selected).length;

		// Update State
		this.setState({
			MasterChecked: totalItems === totalCheckedItems,
			List: tempList,
			SelectedList: this.state.List.filter((e) => e.selected),
		});
	}

	// Event to get selected rows(Optional)
	getSelectedRows() {
		this.setState({
			SelectedList: this.state.List.filter((e) => e.selected),
		});

		//make ajax call to server to update the database
        // get the selected rows
		const selectedList = this.state.SelectedList;
        
        
        // get the selected semester
        const selectedSemester = selectedList.map((e) => e.semester).toString();
        // get the selected reg_no
        const selectedRegNo = selectedList.map((e) => e.reg_no).toString();
        // get the selected course name
        const selectedCourse= selectedList.map((e) => e.course).toString();
        // get the selected student name
        //const selectedStudent = selectedList.map((e) => e.student).toString();
        // get the selected lecturer name
        const selectedLecturer = selectedList.map((e) => e.lecturer).toString();
        console.log(selectedLecturer);

        // get the selected course_type
        const selectedCourseType = selectedList.map((e) => e.courseType).toString();

        // get the selected credit_unit
        const credit_unit = selectedList[0].credit_unit;
        // get the selected course_code
        const level = selectedList[0].level;
        // get the selected lecture
        const lecturer = selectedList[0].lecturer;

		//get the selected status
		const status = selectedList[0].status;
		const selectedListId = selectedList.map((e) => e.id);
		const selectedListIdString = selectedListId.join(",");
		const url = `/api/v1/failed-courses/`;
		const token1 = JSON.parse(localStorage.getItem("authTokens"))["access"];
		if (status !== "Reg") {
			axios({
				method: "post",
				url: url,
				headers: {
					Authorization: `Bearer ${token1}`,
				},
					data: { 
						"reg_no": selectedRegNo,
						"courseType": selectedCourseType,
						"semester": selectedSemester,
						"credit_unit": credit_unit,
						"year": level,
						"status": 'Reg',
						"course_student": selectedCourse,
						"student" : selectedRegNo,
						"course": selectedCourse,
						"lecturer" : lecturer,
					} ,
			})
				.then((res) => {
					console.log(res);
					//if status is 201 then change the state to true and unchecked the checkbox
					if (res.status === 201) {
						
						alert("Course Successfully Registered");
						//uncheck the checkbox
						this.setState({
							MasterChecked: false,
							SelectedList: [],
	
						});
	
						let tempList = this.state.List;
						console.log(tempList);
						tempList.map((user) => {
							if (selectedListIdString.includes(user.id)) {
								user.selected = false;
								user.status = true;
							}
							return user;
						});
						this.setState({
							List: tempList,
							isRegistered: true,
						});
	
					}
				})
				.catch(function (err) {
					console.log(err);
					alert("Course Registration Failed");
				});
		}

		else {
			alert("Course Already Registered");
		}
	
	}

	render() {
		return (
			<div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										classname="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										<input
											type="checkbox"
											className="form-check-input"
											checked={this.state.MasterChecked}
											id="mastercheck"
											onChange={(e) => this.onMasterCheck(e)}
										/>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Course Code
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Credit Unit
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Course Type
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Level
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{this.state.List.map((user) => (
									<tr key={user.id} className={user.selected ? "selected" : ""}>
										<th>
											<input
												type="checkbox"
												checked={user.selected}
												className="form-check-input"
												id="rowcheck{user.id}"
												onChange={(e) => this.onItemCheck(e, user)}
											/>
										</th>
										<td className="px-6 py-4 whitespace-nowrap">
											{user.course}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{user.code}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{user.credit_unit}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{user.courseType}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{user.year}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{/* change status if student is register */}
											{user.status !== 'P' ? (
												<span className="text-green-500">Registered</span>
											) :
											(
												<span className="text-red-500">Not Registered</span>
											)
										}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<br />
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={() => this.getSelectedRows()}
						>
							{/* console.log selected list
                            {this.state.SelectedList.length > 0 ? console.log(this.state.SelectedList) : "No Selected List"} */}
							Register
						</button>
						{/* <div className="row">
							<b>All Row Items:</b>
							<code>{JSON.stringify(this.state.List)}</code>
						</div>
						<div className="row">
							<b>Selected Row Items(Click Button To Get):</b>
							<code>{JSON.stringify(this.state.SelectedList)}</code>
						</div> */}
					</div>
				</div>
			</div>
		);
	}
}

export default SelectFailedCourse;
