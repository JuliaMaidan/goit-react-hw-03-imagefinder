import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from './loader.module.scss'

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <RotatingLines
        strokeColor="#303f9f"
        width="124"
      />
    </div>
  );
};
