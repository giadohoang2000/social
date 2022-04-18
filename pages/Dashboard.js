import react from "react";
import useForm from "./form/useForm";
import styles from "../styles/dashboard.module.css";
import { fire } from "./firebase";
import { auth } from "./firebase";
import Post from "./posts/post";
import UserInfo from "./user/user";
const Dashboard = () => {
  const { handleLogout, users, userName } = useForm();
  return (
    <section className={styles.dashboard}>
      <nav>
        <h2>Welcome {users.email}</h2>
        <button onClick={handleLogout}>Log out</button>
      </nav>
      <div>
        <Post />
      </div>
    </section>
  );
};

export default Dashboard;
