import React from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Typography } from "antd";
import styles from "../styles/signup.module.css";

const { Title } = Typography;

export default function SignUpPage() {
  const router = useRouter();

  const handleCreateAccount = () => {
    // Ici, vous pouvez ajouter la logique de création de compte
    // Une fois le compte créé, vous pouvez rediriger vers la page de confirmation
    router.push("/hello");
  };

  const handleCancel = () => {
    // Retourner à la page précédente
    router.back();
  };

  return (
    <div className={styles.container}>
      <Title level={1}>Formulaire d'inscription</Title>
      <Form className={styles.form}>
        <Form.Item label="Prénom :" name="firstName">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Nom :" name="lastName">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Adresse email :" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Mot de passe :" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirmation du mot de passe :" name="confirmPassword">
          <Input.Password />
        </Form.Item>
        <div className={styles.buttons}>
          <Button
            className={styles.createButton}
            type="primary"
            onClick={handleCreateAccount}
          >
            Créer
          </Button>
          <Button
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Annuler
          </Button>
        </div>
      </Form>
    </div>
  );
}

