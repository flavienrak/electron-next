import Link from "next/link";
import styles from "../styles/Landing.module.css";

import { useState, useEffect, useContext } from "react";
import { Button, Modal } from "antd";
import { UidContext } from "../context/UidContext";

export default function Landing() {
  const { path } = useContext(UidContext);
  const [description, setDescription] = useState("");
  const [contactVisible, setContactVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);

  useEffect(() => {
    const autoWriteDescription = () => {
      const text =
        "Bienvenue sur notre plateforme Decouvrez des fonctionnalites incroyables...";
      let index = 0;
      const intervalId = setInterval(() => {
        setDescription((prevDescription) => prevDescription + text[index]);
        index++;
        if (index === text.length) clearInterval(intervalId);
      }, 50);
    };
    autoWriteDescription();
  }, []);

  const handleContactClick = () => {
    setContactVisible(true);
  };

  const handlePrivacyClick = () => {
    setPrivacyVisible(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tabsContainer}>
          <div className={styles.leftTabs}>
            <span className={styles.link} onClick={handleContactClick}>
              Contact
            </span>
            <span className={styles.link} onClick={handlePrivacyClick}>
              Privacy
            </span>
          </div>
          <div className={styles.rightTabs}>
            <Link
              href={{
                pathname: path,
                query: {
                  path: "signIn",
                },
              }}
            >
              <Button className={styles.button}>Sign In</Button>
            </Link>
            <Link
              href={{
                pathname: path,
                query: {
                  path: "signUp",
                },
              }}
            >
              <Button className={styles.button}>Sign Up</Button>
            </Link>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <Modal
        title="Contact"
        open={contactVisible}
        onCancel={() => setContactVisible(false)}
        footer={null}
      >
        <p>Email 1: example1@example.com</p>
        <p>Email 2: example2@example.com</p>
        <p>Email 3: example3@example.com</p>
      </Modal>
      <Modal
        title="Privacy Policy"
        open={privacyVisible}
        onCancel={() => setPrivacyVisible(false)}
        footer={null}
      >
        <p>Long texte ici...</p>
      </Modal>
    </>
  );
}
