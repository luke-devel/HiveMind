import React, { useState, useEffect } from "react";
import Router from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
      fontWeight: "bold",
      fontSize: 15,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("false");

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const changeRememberMe = (e) => {
    setRememberMe(`"${e.target.checked}"`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("in submit");
    console.log(username, password);
    Axios("http://localhost:3000/api/login", {
      method: "post",
      url: "/api/login",
      data: {
        userinput: username,
        password: password,
      },
    })
      .then((res) => {
        // login success if res.status=201
        if (res.status === 201) {
          // login success
          Cookies.set("loggedIn", "true");
          Cookies.set("usertoken", res.data.token);
          Router.push("/profile/landing");
        } else {
          // login failed
          alert("Login failed. Please re-enter your login and password again.");
        }
      })
      .catch((err) =>
        console.log(`err in Login.js onSubmit login post request`)
      );
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ border: "2px solid black", borderRadius: "2%", width: "80%" }}
    >
      <CssBaseline />
      <div className={classes.paper} style={{ marginTop: 10 }}>
        <Typography
          style={{
            flexGrow: 1,
            fontFamily: "Roboto",
            fontStyle: "italic",
            fontWeight: "900",
            color: "black",
            fontSize: "80px",
            marginBottom: 10,
          }}
        >
          Hivemind
        </Typography>
        <form>
          <CssTextField
            className={classes.margin}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address or Username"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={usernameChange}
          />
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passwordChange}
          />

          <div>
            <FormControlLabel
              control={
                <Checkbox
                  value="true"
                  color="primary"
                  onClick={changeRememberMe}
                />
              }
              label="Remember me"
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "black", color: "white", marginTop: 5 }}
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign In
          </Button>
          <Grid container style={{ marginBottom: 10 }}>
            <Grid item xs={12} md={6}>
              <Link
                href="/forgotpassword"
                variant="body2"
                style={{ color: "black" }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
              <Link href="/register" variant="body2" style={{ color: "black" }}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
