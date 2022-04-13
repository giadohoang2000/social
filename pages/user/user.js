import react, { useEffect, useState } from "react";
import styles from "../../styles/user.module.css";
import { db, fire } from "../firebase";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { updateCurrentUser, updateEmail, updatePassword } from "firebase/auth";

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
      console.log(user);
    };
    getUsers();
  }, []);

  const handleUpdateUser = async () => {
    clearProfileErrors();
    try {
      await updateDoc(userCollectionRef, {
        name: userName,
        DOB: DOB,
        updateAt: new Date(),
      });
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
      const changeEmail = await updateEmail(fire, email);
      const changePass = await updatePassword(fire, pass);
    } catch (err) {
      console.log(err.message);
      setUpdateEmailPassErr(err.message);
    }
  };
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
    updateProfileErr,
    setUpdateProfileErr,
    updateEmailPassErr,
    setUpdateEmailPassErr,
    handleUpdateUser,
    handleUpdateEmailPassword
  };
};

export default UserInfo;
