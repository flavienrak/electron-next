import React from "react";
import { Tabs, Card, Button, Input } from "antd";
import { useRouter } from "next/router";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "../styles/jobspace.module.css";

const { TabPane } = Tabs;

const JobSpace = () => {
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

  return (
    <div className="container">
      <Tabs defaultActiveKey="1" className="job-tabs">
        <TabPane tab="Suggestions" key="1">
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
        <TabPane tab="Projectlab" key="2">
          <div style={{ padding: "16px" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ float: "right" }}
            >
              Nouveau Projet
            </Button>
            <a href="/propositions">Mes Propositions</a>
          </div>
        </TabPane>
        <TabPane tab="Search" key="3">
          <div style={{ padding: "16px" }}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Rechercher"
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <p>Vous pouvez rechercher des projets et des personnes ici.</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default JobSpace;

