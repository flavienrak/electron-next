import { Avatar, Input, Button } from "antd";
import {
  UserOutlined,
  EditOutlined,
  CameraOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";

const handleGoBack = () => {
  // router.back(); // Rediriger vers la page précédente
};
export default function Profile() {
  return (
    <>
      <div className="profile-container">
        <div className="go-back" onClick={handleGoBack}>
          <LeftOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </div>
        <div className="profile-header">
          <div className="avatar-container">
            <Avatar size={150} icon={<UserOutlined />} />
            <div className="edit-avatar">
              <Button icon={<EditOutlined />} />
              <Button icon={<PlusOutlined />} />
            </div>
          </div>
          <div className="profile-info">
            <div className="input-with-icon">
              <h3>Nom</h3>
              <Input placeholder="Nom" />
              <Button icon={<EditOutlined />} />
            </div>
            <div className="input-with-icon">
              <h3>Prenom</h3>
              <Input placeholder="Prénom" />
              <Button icon={<EditOutlined />} />
            </div>
            <div className="input-with-icon">
              <h3>Age</h3>
              <Input placeholder="Âge" />
              <Button icon={<EditOutlined />} />
            </div>
            <div className="input-with-icon">
              <h2>Situation matrimoniale</h2>
              <Input placeholder="Situation matrimoniale" />
              <Button icon={<EditOutlined />} />
            </div>
            <div className="input-with-icon">
              <h3>Sexe</h3>
              <Input placeholder="Sexe" />
              <Button icon={<EditOutlined />} />
            </div>
            <div className="input-with-button">
              <h3>Adresse</h3>
              <Input placeholder="Adresse" />
              <Button icon={<EditOutlined />} />
              <Button icon={<PlusOutlined />} />
            </div>
            <div className="input-with-button">
              <h3>Contact</h3>
              <Input placeholder="Contact" />
              <Button icon={<EditOutlined />} />
              <Button icon={<PlusOutlined />} />
            </div>
            <div className="input-with-button">
              <h3>Adresse e-mail</h3>
              <Input placeholder="Adresse e-mail" />
              <Button icon={<EditOutlined />} />
              <Button icon={<PlusOutlined />} />
            </div>
          </div>
        </div>
        <div className="profile-content">
          <div className="profile-section">
            <h2>Formations</h2>
            <div className="input-with-button">
              <Input placeholder="Formations" />
              <Button icon={<PlusOutlined />} />
            </div>
            <Button icon={<EditOutlined />} />
          </div>
          <div className="profile-section">
            <h2>Compétences</h2>
            <div className="input-with-button">
              <Input placeholder="Compétences" />
              <Button icon={<PlusOutlined />} />
            </div>
            <Button icon={<EditOutlined />} />
          </div>
          <div className="profile-section">
            <h2>Expériences Professionnelles</h2>
            <div className="input-with-button">
              <Input placeholder="Expériences Professionnelles" />
              <Button icon={<PlusOutlined />} />
            </div>
            <Button icon={<EditOutlined />} />
          </div>
          <div className="profile-section">
            <h2>PLUS </h2>
            <div className="input-with-button">
              <Input placeholder="Vos atouts" />
              <Button icon={<PlusOutlined />} />
            </div>
            <Button icon={<EditOutlined />} />
          </div>
          <div className="profile-section">
            <h2>Centres d'Intérêt</h2>
            <div className="input-with-button">
              <Input placeholder="Centres d'Intérêt" />
              <Button icon={<PlusOutlined />} />
            </div>
            <Button icon={<EditOutlined />} />
          </div>
        </div>
      </div>
    </>
  );
}
