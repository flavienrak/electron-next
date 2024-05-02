import React, { useContext } from "react";
import { Form, Input, Button, Typography } from "antd";
import styles from "../../styles/signin.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UidContext } from "../../context/UidContext";

const { Title } = Typography;

export default function SignInPage() {
  const { push } = useRouter();
  const { path } = useContext(UidContext);

  const handleSignIn = () => {
    // Ici, vous pouvez ajouter la logique de connexion
    // Après la connexion réussie, vous pouvez rediriger vers la page de bienvenue
    push("/hello");
  };

  const handleForgetPassword = () => {
    // Rediriger vers la page de réinitialisation de mot de passe
    push("/forgetpassword");
  };

  return (
    <>
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
            <Link
              href={{
                pathname: path,
                query: {
                  path: "reset",
                },
              }}
            >
              <Button className={styles.forgetPasswordButton} type="link">
                Forget Password
              </Button>
            </Link>
            <Button
              className={styles.signInButton}
              type="primary"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
