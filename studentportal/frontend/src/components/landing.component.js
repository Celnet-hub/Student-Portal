import React, { Component } from "react";
export default class Landing extends Component {
	render() {
		return (
			//create a landing page with two buttons to sign in and sign up
			<div class = 'container-fluid'>
				<h1>Welcome to the Student Portal</h1>

                {/* //create dropdown menu to select the user to login as. */}
               
				<div class="dropdown">
					<a
						class="btn btn-secondary dropdown-toggle"
						href="#"
						role="button"
						id="dropdownMenuLink"
						data-toggle="dropdown"
						aria-expanded="false"
					>
						Admin or Student
					</a>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
						<a class="dropdown-item" href="/acad_ad/sign-in">
							ADMIN
						</a>
						<a class="dropdown-item" href="/student/sign-in">
							STUDENT
						</a>
						{/* <a class="dropdown-item" href="#">
							Something else here
						</a> */}
					</div>
				</div>
			</div>
		);
	}
}
