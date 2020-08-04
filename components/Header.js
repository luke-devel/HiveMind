import React from 'react';
import Router from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Cookie from "js-cookie";

export default function MenuAppBar() {
    console.log()
  // const getCookie = (cname) => {
  //   var name = cname + "=";
  //   var decodedCookie = decodeURIComponent(req.headers.cookie);
  //   var ca = decodedCookie.split(";");
  //   for (var i = 0; i < ca.length; i++) {
  //     var c = ca[i];
  //     while (c.charAt(0) == " ") {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // };
  // const usertoken = getCookie("usertoken");
  // console.log('%cHeader.js line:44 ' + Object.keys({usertoken})[0]+ '', 'color: blue', usertoken);
  const [auth, setAuth] = React.useState(()=>{
    if(Cookie.get('loggedIn')==='true'){
      return true
    }
    else{
      return false
    }
    // Cookie.get('loggedIn')
  });
  // console.log("MenuAppBar -> Cookie.get()", Cookie.get())
  console.log("MenuAppBar -> auth", auth)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    // set loggedIn cookie to false, and logging user out, sending them back to index
    Cookie.set('loggedIn', 'false')
    Router.push("/");
  };

  const logIn = () => {
    Router.push("/login");
  };

  return (
    <div >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Hivemind
          </Typography>
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current logged in user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose, ()=>{
                  console.log('hellog')
                }}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose, logOut}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
            <IconButton
              aria-label="user not logged in"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose, logIn}>Log in</MenuItem>
            </Menu>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
