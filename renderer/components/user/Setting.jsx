import { Switch, Button, Card } from "antd";
import {
  BellOutlined,
  BulbOutlined,
  HistoryOutlined,
  SoundOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styles from "../../styles/setting.module.css"; // Import du fichier CSS pour les styles personnalisés

export default function Setting() {
  const handleNotificationChange = (checked) => {
    // Logique pour activer/désactiver les notifications
  };

  const handleNightModeChange = (checked) => {
    // Logique pour activer/désactiver le mode nuit
  };

  const handleHistoryClick = () => {
    // Action lorsque l'utilisateur clique sur "Historique"
  };

  const handleSoundClick = () => {
    // Action lorsque l'utilisateur clique sur "Son"
  };

  const handleInfoClick = () => {
    // Action lorsque l'utilisateur clique sur "Infos"
  };

  return (
    <div className="settings-container">
      <Card
        title="Notifications"
        extra={<BellOutlined />}
        className="setting-item"
      >
        <div className="ant-card-meta-description">
          Activer/désactiver les notifications
        </div>
        <div className="ant-card-meta-detail">
          <Switch onChange={handleNotificationChange} />
        </div>
      </Card>
      <Card title="Mode Nuit" extra={<BulbOutlined />} className="setting-item">
        <div className="ant-card-meta-description">
          Activer/désactiver le mode nuit
        </div>
        <div className="ant-card-meta-detail">
          <Switch onChange={handleNightModeChange} />
        </div>
      </Card>
      <Card
        title="Historique"
        extra={<HistoryOutlined />}
        className="setting-item"
        onClick={handleHistoryClick}
      >
        <div className="ant-card-meta-description">Voir l'historique</div>
        <div className="ant-card-meta-detail">
          <Button type="primary">Voir l'historique</Button>
        </div>
      </Card>
      <Card
        title="Son"
        extra={<SoundOutlined />}
        className="setting-item"
        onClick={handleSoundClick}
      >
        <div className="ant-card-meta-description">Configurer le son</div>
        <div className="ant-card-meta-detail">
          <Button type="primary">Configurer le son</Button>
        </div>
      </Card>
      <Card
        title="Infos"
        extra={<InfoCircleOutlined />}
        className="setting-item"
        onClick={handleInfoClick}
      >
        <div className="ant-card-meta-description">Voir les informations</div>
        <div className="ant-card-meta-detail">
          <Button type="primary">Voir les informations</Button>
        </div>
      </Card>
    </div>
  );
}
