import React from 'react';
import {FiCreditCard } from 'react-icons/fi';
import { BsCurrencyDollar, BsShield } from 'react-icons/bs';
import { BiBookAdd } from 'react-icons/bi';
import { FcInspection,FcGraduationCap } from 'react-icons/fc';
import jwt_decode from "jwt-decode";

//get autheticated user
const getUser = () => {
  const authTokens = localStorage.getItem("authTokens");
  if (authTokens) {
    const user = jwt_decode(authTokens.access);
    return user;
  }
  return null;
}

const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={props.EmployeeImage}
      alt="employee"
    />
    <p>{props.Name}</p>
  </div>
);

export const colorMappingData = [
  [
    { x: 'Jan', y: 6.96 },
    { x: 'Feb', y: 8.9 },
    { x: 'Mar', y: 12 },
    { x: 'Apr', y: 17.5 },
    { x: 'May', y: 22.1 },
    { x: 'June', y: 25 },
    { x: 'July', y: 29.4 },
    { x: 'Aug', y: 29.6 },
    { x: 'Sep', y: 25.8 },
    { x: 'Oct', y: 21.1 },
    { x: 'Nov', y: 15.5 },
    { x: 'Dec', y: 9.9 },
  ],
  ['#FFFF99'],
  ['#FFA500'],
  ['#FF4040'],
];


//create the student's data
export const stdlinks = [];
		if (!getUser.is_staff) {
      stdlinks.push(
        {
          title: 'Pages',
          links: [
            {
              name: 'Course Registration',
              path: 'course-registration',
              icon: <BiBookAdd />,
            },
            {
              name: 'Results',
              path: 'results',
              icon: <FcInspection />,
            },
            {
              name: 'Course Approvals',
              path: 'course-approvals',
              icon: <FcGraduationCap />,
            },
          ],
        }, 
        // {
        //   title: 'Apps',
        //   links: [
        //     {
        //       name: 'calendar',
        //       icon: <AiOutlineCalendar />,
        //     },
        //     {
        //       name: 'kanban',
        //       icon: <BsKanban />,
        //     },
        //     {
        //       name: 'editor',
        //       icon: <FiEdit />,
        //     },
        //     {
        //       name: 'color-picker',
        //       icon: <BiColorFill />,
        //     },
        //   ],
        // },
        // {
        //   title: 'Charts',
        //   links: [
        //     {
        //       name: 'line',
        //       icon: <AiOutlineStock />,
        //     },
        //     {
        //       name: 'area',
        //       icon: <AiOutlineAreaChart />,
        //     },
      
        //     {
        //       name: 'bar',
        //       icon: <AiOutlineBarChart />,
        //     },
        //     {
        //       name: 'pie',
        //       icon: <FiPieChart />,
        //     },
        //     {
        //       name: 'financial',
        //       icon: <RiStockLine />,
        //     },
        //     {
        //       name: 'color-mapping',
        //       icon: <BsBarChart />,
        //     },
        //     {
        //       name: 'pyramid',
        //       icon: <GiLouvrePyramid />,
        //     },
        //     {
        //       name: 'stacked',
        //       icon: <AiOutlineBarChart />,
        //     },
        //   ],
        // }
        )
			// // var decoded = jwt_decode(items.access);
			// // if (decoded.is_staff === false) {
      // //   // append the links to the array
       
      
          
      // }
      
		}


export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];


