import react, { useEffect, useState } from "react";
import styles from "../../styles/user.module.css";
import { db, auth } from "../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { updateCurrentUser, updateEmail, updatePassword } from "firebase/auth";
import { Button } from "@material-ui/core";
import Router from "next/router";
import Link from "next/link";
const UserInfo = () => {
  const userCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [DOB, setDOB] = useState("");
  const [updateProfileErr, setUpdateProfileErr] = useState("");
  const [updateEmailPassErr, setUpdateEmailPassErr] = useState("");
  const clearInputs = () => {
    setEmail("");
    setPass("");
    setUserName("");
    setDOB("");
  };

  const clearProfileErrors = () => {
    setUpdateProfileErr("");
  };

  const clearEmailPassErrors = () => {
    setUpdateEmailPassErrErr("");
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(users);
    };
    getUsers();
  }, []);

  const handleUpdateUser = async (id, _userName, _email, _pass, _DOB) => {
    clearProfileErrors();
    try {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, {
        name: _userName,
        email: _email,
        password: _pass,
        DOB: _DOB,
        // updateAt: new Date(),
      });
      alert("Update user success");
    } catch (err) {
      setUpdateProfileErr(err.message);
      console.log(err.message);
    }
  };

  const handleUpdateEmailPassword = async () => {
    clearEmailPassErrors();
    try {
      await updateDoc(userCollectionRef, {
        email: email,
        password: pass,
        updateAt: new Date(),
      });
      const changeEmail = await updateEmail(auth.currentUser, email);
      const changePass = await updatePassword(auth.currentUser, pass);
      alert("Update success");
    } catch (err) {
      console.log(err.message);
      setUpdateEmailPassErr(err.message);
    }
  };
  return (
    <>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label>Password</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        ></input>
        <label>Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
        <label>DOB</label>
        <input
          type="date"
          value={DOB}
          onChange={(e) => {
            setDOB(e.target.value);
          }}
        ></input>
        <Button
          type="button"
          onClick={(user) => {
            handleUpdateUser(user.id, user._userName, user._email, user._DOB);
          }}
        >
          Update
        </Button>
      </div>
    </>
  );
};

export default UserInfo;
