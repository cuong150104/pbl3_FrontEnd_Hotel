import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from './AppClient';
import Clinet from './AppClient';
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
          console.error(">> check 11123232321: ");
        }
        const userGroup = response.DT.groupId; // Assuming username field contains user group
        console.error(">> check group: ", response.DT.groupId);
        setGroup(userGroup); // Update group state with fetched user group
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData function to fetch data when component mounts
  }, []); // Empty array to run useEffect only once when component mounts

  let componentToRender;
  switch (group) {
    case '4':
      componentToRender = <Client />;
      break;
    case '3':
      componentToRender = <Clinet />;
      break;
    default:
       //componentToRender = <App />;
      componentToRender = <Client />;
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

ReactDOM.render(<Root />, document.getElementById('root'));

reportWebVitals();
