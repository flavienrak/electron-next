import Link from "next/link";
import styles from "../../styles/signin.module.css";

import { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import { UidContext } from "../../context/UidContext";
import { signInController } from "../../controllers/authController";
import { emailRegex } from "../../lib/regex";
import { useDispatch } from "react-redux";
import { fetchUserInfos } from "../../redux/slices/userSlice";
import { updatePersistInfos } from "../../redux/slices/persistSlice";

const { Title } = Typography;

export default function SignInPage() {
  const { push } = useRouter();
  const { path, addMessage } = useContext(UidContext);
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ valid: false, value: "" });
  const [password, setPassword] = useState({ valid: false, value: "" });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSignIn = () => {
    // Ici, vous pouvez ajouter la logique de connexion
    // Après la connexion réussie, vous pouvez rediriger vers la page de bienvenue
    push("/hello");
  };

  useEffect(() => {
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
  }, [email.value, password.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (email.valid && password.valid) {
      const res = await signInController({
        email: email.value,
        password: password.value,
      });

      if (res?.userNotFound) {
        addMessage({
          value: `L'adresse email ${email.value} n'est pas encore enregistré.`,
          type: "error",
        });
      } else if (res?.incorrectPassword) {
        addMessage({
          value: `Le mot de passe que vous avez entré est invalide.`,
          type: "error",
        });
      } else if (res?.user) {
        dispatch(updatePersistInfos({ authToken: res.token }));
        dispatch(fetchUserInfos({ user: res.user }));
        push("/home?path=home");
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Title level={1}>Sign In</Title>
        <Form className={styles.form} onSubmitCapture={handleSubmit}>
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
                Mot de passe oublié?
              </Button>
            </Link>
            <Button
              className={styles.signInButton}
              type="primary"
              htmlType="submit"
            >
              Se connecter
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
