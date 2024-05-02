import { Typography, Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";

import styles from "../../styles/forgetpassword.module.css";

const { Title } = Typography;

export default function ResetPage() {
  const { push } = useRouter();
  const [form] = Form.useForm();

  const handleResetPassword = () => {
    form
      .validateFields()
      .then((values) => {
        push("/confirmation");
      })
      .catch((errorInfo) => {
        message.error("Veuillez remplir tous les champs");
      });
  };

  const handleTryAnotherWay = () => {};

  return (
    <>
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
              {
                required: true,
                message: "Veuillez entrer votre adresse email",
              },
              {
                type: "email",
                message: "Veuillez entrer une adresse email valide",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <div className={styles.buttons}>
              <Button
                type="default"
                onClick={handleTryAnotherWay}
                className={styles.tryAnotherWayButton}
              >
                Essayer autrement
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.resetButton}
              >
                Réinitialiser le mot de passe
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
