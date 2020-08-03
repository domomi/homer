import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Dropdown from 'react-bootstrap/Dropdown';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <Dropdown.Item eventKey="9" onClick={ () => logout() }>LOG OUT</Dropdown.Item>
{/* <button onClick={() => logout()}>Log Out</button>; */}
};





export default LogoutButton