import Footer from "../components/Footer";
import Header from "../components/Header";
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
import jwt from "jsonwebtoken";


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

export default function Index() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const usernameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("in submit");
    console.log(name, username, email, password);
    Axios("http://localhost:3000/api/register", {
      method: "post",
      data: {
        name: name,
        username: username,
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log('res', res.data.id);
        // login success if res.status=201
        if (res.status === 201) {
          // login success
          const token = jwt.sign(
            { id: res.data.id, username: username, email: email },
            process.env.secretKey
          );

          console.log(token);

          Cookies.set("loggedIn", "true");
          Cookies.set('usertoken', token);
          Router.push("/profile/landing");
        } else {
          // login failed
          alert("Login failed. Please re-enter your login and password again.");
        }
      })
      .catch((err) =>
        console.log(`err in Login.js onSubmit login post request`, err)
      );
  };

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "96vh",
          backgroundColor: "#EF7B73",
          padding: 40,
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          style={{
            border: "2px solid black",
            borderRadius: "2%",
            width: "80%",
          }}
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
                fontSize: "6vw",
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
                id="name"
                label="name"
                name="name"
                autoFocus
                onChange={nameChange}
              />
              <CssTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Email"
                label="email"
                id="email"
                onChange={emailChange}
              />
              <CssTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="username"
                label="username"
                id="username"
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  marginTop: 20,
                  marginBottom: 20,
                }}
                className={classes.submit}
                onClick={onSubmit}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
