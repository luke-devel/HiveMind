import axios from "axios";

export const register = newUser => {
  return axios
    .post("/api/register", {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log("Registered");
    })
    .catch(err => {
      console.log("Err sign up", err);
      alert("This email already used");
    });
};

export const login = user => {
  return axios
    .post("/api/login", {
      userInput: user.userInput,
      password: user.password
    })
    .then(response => {
      if (response.data === "invalid username or email") {
        alert(`invalid username or email address`);
        return response.data;
      }
      if (response.data === "invalid password") {
        alert(`invalid password`);
        return response.data;
      } else {
        localStorage.setItem("usertoken", response.data.token);
        return response.data;
      }
    })
    .catch(err => {
      console.log(err);
    });
};
