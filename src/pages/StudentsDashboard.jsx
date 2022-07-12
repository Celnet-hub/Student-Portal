import React, { useEffect, useState } from "react";
import { useStateContext } from '../contexts/ContextProvider';
import ElizadeUniversity from '../data/Elizade-University logo.png';
import jwt_decode from "jwt-decode";


const StudentsDashboard = () => {

	//retrives the token from local storage and decodes it to get the user's name
	const [items, setItems] = useState([]);
	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('authTokens'));
		if (items) {
			var decoded = jwt_decode(items.access);
			setItems(decoded);
			// console.log(decoded);
		}
	}, []); 
	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500 to-blue-300">
					<div className="max-w-md w-full space-y-8">
						<div>
							<img
								className="mx-auto h-24 w-auto"
								// src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
								src= {ElizadeUniversity}
								alt="Workflow"
							/>
							<h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
								Welcome <span>
								{items.first_name}
							</span>, to your Dashboard
							</h2>
						</div>
					</div>
				</div>
	  );
};

export default StudentsDashboard;
