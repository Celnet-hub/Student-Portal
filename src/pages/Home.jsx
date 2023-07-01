import React, { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';

import StudentsDashboard from '../pages/StudentsDashboard.jsx';
import CourseReg from '../pages/CourseReg.jsx';
import StudentResult from './StudentResult';
import CourseApproval from '../pages/CourseApprovals.jsx';

import { useStateContext } from '../contexts/ContextProvider';
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "../utils/PrivateRoute";


const Home = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}
              
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<StudentsDashboard />)} exact/>
                
                {/* pages  */}
                <Route element= {<PrivateRoute/>}>
                <Route path="/course-registration" element={<CourseReg />} />

                <Route path="/results" element={<StudentResult />} />

                <Route path="/course-approvals" element={<CourseApproval />} />

                </Route>
                
               
                {/* <Route path="/course-approvals" element={<CourseApproval />} /> */}
              </Routes>
         
            </div>
            <Footer />
          </div>
        </div>
    </div>
  );
};

export default Home; 