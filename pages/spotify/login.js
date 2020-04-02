import React, { useState, useEffect } from "react";
import Router from "next/router";
import { spotifyWebApiURL } from "../../constants/constants";
import Header from "../../components/Header";

export default function Login() {
  const [access_token, setAccess_token] = useState('');

  useEffect(() => {
    if (localStorage.getItem("spotifyAccessToken")) {
      // console.log('og', e.getItem("spotifyAccessToken"))
      const token = localStorage.getItem("spotifyAccessToken")
      // console.log('at', token)
      // console.log(`found it`);
      // console.log({access_token});
      // Router.push({
      //   pathname: "/spotify/user",
      //   query: token
      // });
      console.log('try now')
      setToken(token);
    }
    console.log(`done use effect`);
  }, []);


  const setToken = (token) => {
    console.log('heres the token', token)
    setAccess_token('123')
    console.log('heres the prop token', {access_token})

  }

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "100%",
          minHeight: "100vh",
          alignItems: "center",
          backgroundColor: "#EF7B73"
        }}
      ></div>
    </>
  );
}
