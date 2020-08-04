import React, { Component } from "react";
import Router from "next/router";
import Landing from "../components/Landing";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookie from 'js-cookie'

export default function index() {
  if(Cookie.get('loggedIn' )=== undefined){
    Cookie.set('loggedIn', 'false')
  }
  return (
    <>
      <Header/>
      <Landing />
      <Footer />
    </>
  );
}
