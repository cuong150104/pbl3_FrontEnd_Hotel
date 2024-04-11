import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppClient from './AppClient';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { UserProvider } from './context/UserContext';
import { getUserAccount } from './services/userService';

const Root = () => {
  const [group, setGroup] = useState(null); // Default group is null

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getUserAccount();
        if (response && response.EC === 0) {
          // console.error(">> check 11123232321: ");
        }
        let userGroup = response.DT.groupWithRoles.id; // Assuming username field contains user group
       
        setGroup(userGroup); // Update group state with fetched user group
        // console.error(">> check group: ", group);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData function to fetch data when component mounts
  }, []); // Empty array to run useEffect only once when component mounts

  let componentToRender;
  switch (group) {
    case 1:
      componentToRender = <App />;
      break;
    case 4:
      componentToRender = <AppClient />;
      break;
    default:
     // componentToRender = <App />;
     componentToRender = <AppClient />;
     console.error(">> check hAPp: ", group);
      break;
  }

  return (
    <React.StrictMode>
      <UserProvider>
        {componentToRender}
      </UserProvider>
    </React.StrictMode>
  );
};

export default Root;
// ReactDOM.render(<Root />, document.getElementById('root'));

// reportWebVitals();
