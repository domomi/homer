import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.status.danger,
      '&$checked': {
        color: theme.status.danger,
      },
    },
    checked: {},
  }));


const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  

return <Button color='secondary' variant='contained' style={props.styles} onClick={() => loginWithRedirect()}>{props.text}</Button>;
};

export default LoginButton;