"use client";
import styles from "../../styles/signup.module.css";

import { signUpController } from "../../controllers/authController";
import { Form, Input, Button, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { emailRegex } from "../../lib/regex";
import { UidContext } from "../../context/UidContext";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function SignUpPage() {
  const { addMessage } = useContext(UidContext);
  const { push } = useRouter();
  const [nom, setNom] = useState({ value: "", valid: false });
  const [prenom, setPrenom] = useState({ value: "", valid: false });
  const [email, setEmail] = useState({ value: "", valid: false });
  const [password, setPassword] = useState({ value: "", valid: false });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    valid: false,
  });
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    // nom
    if (nom.value?.trim()?.length > 2) {
      setNom((prev) => ({ ...prev, valid: true }));
    } else {
      setNom((prev) => ({ ...prev, valid: false }));
    }

    // prenom
    if (prenom.value?.trim()?.length > 2) {
      setPrenom((prev) => ({ ...prev, valid: true }));
    } else {
      setPrenom((prev) => ({ ...prev, valid: false }));
    }

    // email
    if (emailRegex.test(email.value?.trim())) {
      setEmail((prev) => ({ ...prev, valid: true }));
    } else {
      setEmail((prev) => ({ ...prev, valid: false }));
    }

    // password
    if (password.value?.length > 5) {
      setPassword((prev) => ({ ...prev, valid: true }));
    } else {
      setPassword((prev) => ({ ...prev, valid: false }));
    }

    // confirm password
    if (
      password.value?.length > 5 &&
      confirmPassword.value === password.value
    ) {
      setConfirmPassword((prev) => ({ ...prev, valid: true }));
    } else {
      setConfirmPassword((prev) => ({ ...prev, valid: false }));
    }
  }, [
    nom.value,
    prenom.value,
    email.value,
    password.value,
    confirmPassword.value,
  ]);

  const handleSubmit = async () => {
    setIsSubmit(true);
    if (
      nom.valid &&
      prenom.valid &&
      email.valid &&
      password.valid &&
      confirmPassword.valid
    ) {
      const res = await signUpController({
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        password: password.value,
      });
      if (res?.userAlreadyExist) {
        addMessage({
          value: `L'adresse email ${email.value} est déjà enregistré.`,
          type: "error",
        });
      } else if (res?.user) {
        addMessage({
          value: `Le compte a été créé avec succés. Veuillez vous connecter.`,
          type: "success",
        });
        push("/home?path=login");
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Title level={1}>Formulaire d'inscription</Title>
        <Form className={styles.form} onSubmitCapture={handleSubmit}>
          <Form.Item label="Prénom :" name="firstName">
            <Input
              type="text"
              onChange={(e) =>
                setNom((prev) => ({ ...prev, value: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Nom :" name="lastName">
            <Input
              type="text"
              onChange={(e) =>
                setPrenom((prev) => ({ ...prev, value: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Adresse email :" name="email">
            <Input
              type="email"
              onChange={(e) =>
                setEmail((prev) => ({ ...prev, value: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Mot de passe :" name="password">
            <Input.Password
              onChange={(e) =>
                setPassword((prev) => ({ ...prev, value: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item
            label="Confirmation du mot de passe :"
            name="confirmPassword"
          >
            <Input.Password
              onChange={(e) =>
                setConfirmPassword((prev) => ({
                  ...prev,
                  value: e.target.value,
                }))
              }
            />
          </Form.Item>
          <div className={styles.buttons}>
            <Button className={styles.cancelButton}>Annuler</Button>
            <Button
              htmlType="submit"
              className={styles.createButton}
              type="primary"
            >
              Créer
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
