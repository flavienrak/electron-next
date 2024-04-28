import React from "react";
import { useRouter } from "next/router";
import { Typography, Form, Input, Button, message } from "antd";
import styles from "../styles/forgetpassword.module.css"; // Importez vos styles CSS pour la page

const { Title } = Typography;

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleResetPassword = () => {
    form.validateFields().then(values => {
      // Ici, vous pouvez ajouter la logique de réinitialisation de mot de passe
      // Une fois la réinitialisation effectuée, vous pouvez rediriger vers la page de confirmation
      router.push("/confirmation");
    }).catch(errorInfo => {
      message.error('Veuillez remplir tous les champs');
    });
  };

  const handleTryAnotherWay = () => {
    // Retourner à la page précédente ou une autre action appropriée
    router.back();
  };

  return (
    <div className={styles.container}>
      <Title level={2}>Mot de passe oublié</Title>
      <Form
        form={form}
        onFinish={handleResetPassword}
        className={styles.form}
        layout="vertical"
      >
        <Form.Item
          label="Adresse email :"
          name="email"
          rules={[
            { required: true, message: 'Veuillez entrer votre adresse email' },
            { type: 'email', message: 'Veuillez entrer une adresse email valide' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div className={styles.buttons}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.resetButton}
            >
              Réinitialiser le mot de passe
            </Button>
            <Button
              type="default"
              onClick={handleTryAnotherWay}
              className={styles.tryAnotherWayButton}
            >
              Essayer autrement
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

