import React, { Component } from "react";

export default class LandingPage extends Component {
	render() {
		return (
			<>
				<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500 to-blue-300">
					<div className="max-w-md w-full space-y-8">
						<div>
							<img
								className="mx-auto h-12 w-auto"
								src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
								alt="Workflow"
							/>
							<h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
								Welcome to the Student Portal
							</h2>
							<p className="mt-2 text-center text-md text-gray-600">
							
								<a
									href="/login"
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
