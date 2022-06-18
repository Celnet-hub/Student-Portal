import React, { Component } from "react";

export default class LandingPage extends Component {
	render() {
		return (
			<>
				<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-md w-full space-y-8">
						<div>
							<img
								className="mx-auto h-12 w-auto"
								src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
								alt="Workflow"
							/>
							<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								Welcome to the Student Portal
							</h2>
							<p className="mt-2 text-center text-sm text-gray-600">
							
								<a
									href="#"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Please login to continue
								</a>
							</p>
						</div>
					</div>
				</div>
			</>
		);
	}
}
