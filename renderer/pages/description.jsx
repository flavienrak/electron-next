import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button, Modal } from "antd";
import styles from "../styles/description.module.css";

export default function DescriptionPage() {
  const [description, setDescription] = useState("");
  const [contactVisible, setContactVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);

  useEffect(() => {
    const autoWriteDescription = () => {
      const text =
        "Bienvenue sur notre plateforme Decouvrez des fonctionnalites incroyables..Bienvenue sur notre plateforme ! Découvrez des fonctionnalités incroyables....Bienvenue sur notre plateforme ! Découvrez des fonctionnalités incroyables...Bienvenue sur notre plateforme ! Découvrez des fonctionnalités incroyables...Bienvenue sur notre plateforme ! Découvrez des fonctionnalités incroyables...";
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
    <React.Fragment>
      <Head>
        <title>Description</title>
      </Head>
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
            <Link href="/signin">
              <Button className={styles.button}>Sign In</Button>
            </Link>
            <Link href="/signup">
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
        visible={contactVisible}
        onCancel={() => setContactVisible(false)}
        footer={null}
      >
        <p>Email 1: example1@example.com</p>
        <p>Email 2: example2@example.com</p>
        <p>Email 3: example3@example.com</p>
      </Modal>
      <Modal
        title="Privacy Policy"
        visible={privacyVisible}
        onCancel={() => setPrivacyVisible(false)}
        footer={null}
      >
        <p>
          Long texte ici...Long texte ici...Long texte ici...Long texte ici...
          Long texte ici... Long texte ici... Long texte ici... Long texte
          ici... Long texte ici... Long texte ici... Long texte ici... Long
          texte ici... Long texte ici... Long texte ici... Long texte ici...
          Long texte ici... Long texte ici... Long texte ici... Long texte
          ici... Long texte ici... Long texte ici... Long texte ici... Long
          texte ici... Long texte ici... Long texte ici... Long texte ici...
          Long texte ici...Long texte ici...Long texte ici...Long texte ici...
          Long texte ici... Long texte ici... Long texte ici... Long texte
          ici... Long texte ici... Long texte ici... Long texte ici... Long
          texte ici... Long texte ici... Long texte ici... Long texte ici...
          Long texte ici... Long texte ici... Long texte ici... Long texte
          ici... Long texte ici... Long texte ici... Long texte ici... Long
          texte ici... Long texte ici... Long texte ici... Long texte ici...
          Long texte ici...Long texte ici...Long texte ici...Long texte ici...
          Long texte ici... Long texte ici... Long texte ici... Long texte
          ici... Long texte ici... Long texte ici... Long texte ici... Long
          texte ici... Long texte ici... Long texte ici... Long texte ici...
          Long texte ici... Long texte ici... Long texte ici... Long texte
          ici... Long texte ici... Long texte ici... Long texte ici... Long
          texte ici... Long texte ici... Long texte ici... Long texte ici...
        </p>
      </Modal>
    </React.Fragment>
  );
}
