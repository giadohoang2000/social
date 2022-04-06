import react from "react";
import useForm from "../form/useForm";
import styles from "../../styles/dashboard.module.css";
const Dashboard = ({ handleLogout }) => {
  return (
    <section className={styles.dashboard}>
      <nav>
        <h2>Welcome</h2>
        <button onClick={handleLogout}>Log out</button>
      </nav>
    </section>
  );
};

export default Dashboard;
