import React, { useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar1 from '../data/avatar1.jpg';
import AuthContext from "../contexts/AuthContext";


const UserProfile = () => {
  const { currentColor } = useStateContext();
  const { user, logoutUser } = useContext(AuthContext);

  //console.log(user);

  let name = user.first_name + " " + user.last_name;

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar1}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {name} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {
            user.is_staff? "Admin" : "Student"
          }   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.email} </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.current_level} Level </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> Reg_no: {user.reg_no} </p>
        </div>
      </div>
      <div>
      </div>
      <div className="mt-5">
        {/* <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          onClick={logoutUser}
        /> */}
        {/* Create a button */}
        {/* Pass the button a color */}
        <button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={logoutUser}
							>Log Out</button>
      </div>
    </div>

  );
};

export default UserProfile;
