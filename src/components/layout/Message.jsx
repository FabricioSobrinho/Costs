import styles from "./Message.module.css";
import { useState, useEffect } from "react";

function Message({ type, msg, time }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    }

    setVisible(true);
    if (time) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, time);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [msg, time]);

  return (
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}
    </>
  );
}

export default Message;
