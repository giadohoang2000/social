import react from "react";
import useForm from "../form/useForm";
import styles from "../../styles/dashboard.module.css";
import { fire } from "../../pages/firebase";
const Dashboard = (props) => {
  const { handleLogout, users } = props;
  return (
    <section className={styles.dashboard}>
      <nav>
        <h2>Welcome {users.email}</h2>
        <button onClick={handleLogout}>Log out</button>
      </nav>
    </section>
  );
};

export default Dashboard;
