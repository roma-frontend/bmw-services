import React from "react";
import styles from "./style.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Loader;
