import React from "react";
import { useRouter } from "next/router";
import { Form, Input, Button, Typography } from "antd";
import styles from "../styles/signin.module.css";

const { Title } = Typography;

export default function SignInPage() {
  const router = useRouter();

  const handleSignIn = () => {
    // Ici, vous pouvez ajouter la logique de connexion
    // Après la connexion réussie, vous pouvez rediriger vers la page de bienvenue
    router.push("/hello");
  };

  const handleForgetPassword = () => {
    // Rediriger vers la page de réinitialisation de mot de passe
    router.push("/forgetpassword");
  };

  return (
    <div className={styles.container}>
      <Title level={1}>Sign In</Title>
      <Form className={styles.form}>
        <Form.Item label="Adresse email :" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Mot de passe :" name="password">
          <Input.Password />
        </Form.Item>
        <div className={styles.buttons}>
          <Button
            className={styles.signInButton}
            type="primary"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button
            className={styles.forgetPasswordButton}
            type="link"
            onClick={handleForgetPassword}
          >
            Forget Password
          </Button>
        </div>
      </Form>
    </div>
  );
}

