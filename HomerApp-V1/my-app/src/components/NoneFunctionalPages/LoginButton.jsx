import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// These are the StyleSheets
// Placed in an 'styles' object
// By accessing the keys, we get the css and send them to the tags in "style='' " where they get rendered
const styles = {
  LoginPage:{
    textAlign: 'center', // <-- the magic
    // fontWeight: 'bold',
    // display : 'inline',
    backgroundColor : 'rgb(239,239,242)'

  },
  loginBtn : {
    background:"rgb(102, 70, 206)",color:"white",borderRadius:"5px",borderWidth:'0',width:'50vw',height:'10vh',
    textalign : 'center',
  }
  

}

// functional component
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  console.log(styles.LoginPage)

  
  return (
    <div id="LoginPage"  style={styles.LoginPage}>

      {/* Now I am using a screenshot as the upper part of the page
          Once I have got the picture materials, I can organize it in a better way(put it as css 'backgroundImage').  */}
      <img src='LoginWelcom.png'></img>
      
      <button onClick={() => loginWithRedirect()} style={styles.loginBtn}>Log In</button>

      {/* The design in the invisionapp preview is not using auth0.com
          Thought about Redirecting once this component is loaded, but it turns out that this is not good 
          (The user will get confused)
          So I borrow the look in the DashBoard app, which has a styled button(above this comment)
          The redirecting component is deprecated(below)*/}

      {/* <button onClick={loginWithRedirect()}>Redirecting...</button> */}

    </div>
  )
};

export default LoginButton;