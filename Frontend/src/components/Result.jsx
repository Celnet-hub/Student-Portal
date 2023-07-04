import React from "react";
import jwt_decode from "jwt-decode";

const axios = require(`axios`);

//create function to get the data from the server

// create function to get stored token from local storage

class StudentResultTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			List: [],
			MasterChecked: false,
			SelectedList: [],
			isRegistered: false,
			total_credit_units: 0,
			total_points: 0,
			GPA: 0,
			CGPA: 0,
			current_level: 0,
		};
	}

	componentDidMount() {
		const url1 = `/api/v1/result/`;
		const token1 = JSON.parse(localStorage.getItem("authTokens"))["access"];
		let data = [];
		let decoded = jwt_decode(token1);
		console.log(decoded);
		axios({
			method: "get",
			url: url1,
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
					current_level: decoded.current_level,
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
			isRegistered: false,
		});

		//claculate the total credit units and total points and results
		let total_credit_units = 0;
		let total_points = 0;
		let GPA = 0;
		let CGPA = 0;
		this.state.List.map((e) => {
			total_credit_units += e.credit_unit;
			total_points += e.points;
			if (e.grade === "A") {
				GPA += 5 * e.credit_unit;
			} else if (e.grade === "B") {
				GPA += 4 * e.credit_unit;
			} else if (e.grade === "C") {
				GPA += 3 * e.credit_unit;
			} else if (e.grade === "D") {
				GPA += 2 * e.credit_unit;
			} else if (e.grade === "F") {
				GPA += 0 * e.credit_unit;
			}

		});
		let final_GPA = GPA / total_credit_units;

		// calculate the CGPA will be done in the next version and from the backend.
		if (this.state.current_level === 100) {
			CGPA = final_GPA/1
		}
		else if (this.state.current_level === 200) {
			CGPA = final_GPA/2
		}
		else if (this.state.current_level === 300) {
			CGPA = final_GPA/3
		}
		else if (this.state.current_level === 400) {
			CGPA = final_GPA/4
		}
		else if (this.state.current_level === 500) {
			CGPA = final_GPA/5
		}

		this.setState({
			total_credit_units: total_credit_units,
			total_points: total_points,
			GPA: final_GPA,
			CGPA: CGPA,
		});
	}

	render() {
		return (
			<div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									{/* <th
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
									</th> */}
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
										Score
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Grade
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Points
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{this.state.List.map((user) => (
									<tr key={user.id} className={user.selected ? "selected" : ""}>
										{/* <th>
											<input
												type="checkbox"
												checked={user.selected}
												className="form-check-input"
												id="rowcheck{user.id}"
												onChange={(e) => this.onItemCheck(e, user)}
											/>
										</th> */}
										<td className="px-6 py-4 whitespace-nowrap">
											{user.course}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{user.course_code}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{user.credit_unit}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{user.score}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{user.grade}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{user.points}
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
							Calculate Total
						</button>
						<br />
						{/* <div className="row">
							<b>All Row Items:</b>
							<code>{JSON.stringify(this.state.List)}</code>
						</div>
						<div className="row">
							<b>Selected Row Items(Click Button To Get):</b>
							<code>{JSON.stringify(this.state.SelectedList)}</code>
						</div> */}
					</div>
					{/* calcualte the sum of a credit_unit in table */}
					<div className="flex justify-center">
						<div className="w-full max-w-xs">
							<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full px-3">
										<label
											className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											htmlFor="grid-first-name"
										>
											Total Credit Unit
										</label>
										<input
											className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="grid-first-name"
											type="number"
											value={this.state.total_credit_units}
											disabled
										/>

										<label
											className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											htmlFor="grid-first-name"
										>
											Total Points
										</label>
										<input
											className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="grid-first-name"
											type="text"
											value={this.state.total_points}
											disabled
										/>

										<label
											className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											htmlFor="grid-first-name"
										>
											GPA
										</label>
										<input
											className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="grid-first-name"
											type="text"
											value={this.state.GPA}
											disabled
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default StudentResultTable;
