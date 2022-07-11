import React from "react";
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';


const StudentsDashboard = () => {
	const { currentColor, currentMode, state } = useStateContext();
	return (
		<div className="mt-24">
		  {/* Welcome to your student dashboard */}
		  <div className="flex justify-between items-center">
			<div className="flex items-center">
				<p>Welcome</p>
			</div>
			</div>
		</div>
	  );
};

export default StudentsDashboard;
