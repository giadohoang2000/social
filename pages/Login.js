import react from "react";
import styles from "../styles/login.module.css";

const Login = (props) => {
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
    hasAccount,
    setHasAccount,
    emailError,
    passError,
  } = props;

  return (
    <section className={styles.login}>
      <div className={styles.loginContainer}>
        <div className={styles.btnContainer}>
          {hasAccount ? (
            <>
              <label>Email</label>
              <input
                type="email"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <p className={styles.errorMsg}>{emailError}</p>
              <label>Password</label>
              <input
                type="password"
                autoFocus
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              ></input>
              <p className={styles.errorMsg}>{passError}</p>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                {" "}
                Don't have account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <label>Email</label>
              <input
                type="email"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <p className={styles.errorMsg}>{emailError}</p>
              <label>Password</label>
              <input
                type="password"
                autoFocus
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              ></input>
              <p className={styles.errorMsg}>{passError}</p>
              <label>Name</label>
              <input
                type="text"
                autoFocus
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
              <label>D.O.B</label>
              <input
                type="date"
                autoFocus
                required
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
              ></input>
              <button onClick={handleSignUp}>Sign up</button>
              <p>
                Have account?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
