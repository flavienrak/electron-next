import React from "react";
import { Tabs, Card, Button, Input, Avatar } from "antd";
import { SearchOutlined, PlusOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { TabPane } = Tabs;

const MyTabs = () => {
  const router = useRouter();

  const handleViewDetails = (jobTitle) => {
    router.push(`/jobDetails`);
  };

  const jobs = [
    {
      title: "Développeur Full Stack",
      description: "Description du poste de développeur Full Stack.",
    },
    {
      title: "Ingénieur en logiciel",
      description: "Description du poste d'ingénieur en logiciel.",
    },
    {
      title: "Designer UX/UI",
      description: "Description du poste de designer UX/UI.",
    },
    // Ajoutez d'autres postes ici au besoin
  ];

  const recentItems = [
    {
      title: "Projet X",
      description: "Description du projet X.",
    },
    {
      title: "Projet Y",
      description: "Description du projet Y.",
    },
    // Ajoutez d'autres éléments récents ici au besoin
  ];

  return (
    <Tabs defaultActiveKey="1" className="job-tabs">
      <TabPane tab="Tout" key="1">
        <div className="jobs-list">
          {jobs.map((job, index) => (
            <Card key={index} className="job-card" title={job.title}>
              <p>{job.description}</p>
              <Button
                type="primary"
                onClick={() => handleViewDetails(job.title)}
              >
                Voir
              </Button>
            </Card>
          ))}
        </div>
      </TabPane>
      <TabPane tab="Récents" key="2">
        <div className="recent-items-list">
          {recentItems.map((item, index) => (
            <Card key={index} className="recent-item-card" title={item.title}>
              <p>{item.description}</p>
              <Button
                type="primary"
                onClick={() => handleViewDetails(item.title)}
              >
                Voir
              </Button>
            </Card>
          ))}
        </div>
      </TabPane>
      <TabPane tab="Nouvelles" key="3">
        <div className="news-container">
          <h2>Des nouvelles de l'application</h2>
          <p>
            Voici les dernières mises à jour et annonces concernant notre application.
          </p>
          <Button type="primary">Mettre à jour</Button>
        </div>
      </TabPane>
    </Tabs>
  );
};

const AppLayout = () => {
  const router = useRouter();

  const handleNotificationClick = () => {
    router.push("/notification"); // Rediriger vers la page de notification
  };

  const handleProfileClick = () => {
    router.push("/profil"); // Rediriger vers la page de profil
  };

  const handleLogout = () => {
    // Logique de déconnexion
  };

  return (
    <div className="app-layout">
      <div className="top-right">
        <Avatar size={40} icon={<UserOutlined />} onClick={handleProfileClick} style={{ cursor: "pointer" }} />
        <BellOutlined
          style={{ fontSize: "20px", marginLeft: "10px", marginRight: "10px", cursor: "pointer" }}
          onClick={handleNotificationClick}
        />
        <Button type="link" onClick={handleLogout}>Déconnexion</Button>
      </div>
      <MyTabs />
    </div>
  );
};

export default AppLayout;

