import Head from "next/head";
import react, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../../pages/firebase";
import { fire } from "../../pages/firebase";
import Login from "../form/Login";
import { async } from "@firebase/util";
import { collection, getDoc, addDoc, getDocs, doc } from "firebase/firestore";
import md5 from "md5";
import Dashboard from "../dashboard/Dashboard";
const useForm = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [DOB, setDOB] = useState("");

  const userCollectionRef = collection(db, "users");
  const clearInputs = () => {
    setEmail("");
    setPass("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPassError("");
  };

  const handleLogin = async () => {
    clearErrors();
    try {
      const user = await signInWithEmailAndPassword(fire, email, pass);
      console.log(user);
    } catch (err) {
      console.log(err.message);
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPassError(err.message);
          break;
      }
    }
  };

  const handleSignUp = async () => {
    clearErrors();
    try {
      await addDoc(userCollectionRef, {
        name: userName,
        password: md5(pass),
        email: email,
        DOB: DOB,
        createAt: new Date(),
      });
      const user = await createUserWithEmailAndPassword(fire, email, pass);
      console.log(user);
    } catch (err) {
      console.log(err.message);
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPassError(err.message);
          break;
      }
    }
  };

  // useEffect(() => {
  //   const getUser = async () => {
  //     const data = await getDocs(userCollectionRef);
  //     console.log(data)
  //     setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  //     console.log(users)
  //   };
  //   getUser()
  // }, []);

  const handleLogout = async () => {
    // fire.signOut();

    await signOut(fire);
  };
  const authListener = () => {
    onAuthStateChanged(fire, (users) => {
      if (users) {
        clearInputs();
        setUsers(users);
      } else {
        setUsers("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return {
    users,
    setUsers,
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
    handleLogout,
  };
};

export default useForm;
