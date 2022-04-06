import Head from "next/head";
import react, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "../styles/Home.module.css";
import { fire } from "./firebase";
import Login from "../components/form/Login";
import { async } from "@firebase/util";
import useForm from "../components/form/useForm";
import Dashboard from "../components/dashboard/Dashboard";
export default function Home() {
  const {
    email,
    setEmail,
    pass,
    setPass,
    userName,
    setUserName,
    DOB,
    setDOB,
    handleLogin,
    handleSignUp,
    handleLogout,
    hasAccount,
    setHasAccount,
    emailError,
    passError,
  } = useForm();
  return (
    <div>
      <Login
        email={email}
        setEmail={setEmail}
        pass={pass}
        setPass={setPass}
        userName = {userName}
        setUserName = {setUserName}
        DOB = {DOB}
        setDOB = {setDOB}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passError={passError}
      />
        <Dashboard
          handleLogout={handleLogout}/>
    </div>
  );
}