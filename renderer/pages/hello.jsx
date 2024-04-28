import React from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;

const HelloPage = () => {
  const router = useRouter();

  const handleTabClick = (key) => {
    if (key === "1") {
      router.push("/accueil");
    } else if (key === "2") {
      router.push("/jobspace");
    } else if (key === "3") {
      router.push("/setting");
    } else if (key === "4") {
      router.push("/more");
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          style={{ height: "100%" }}
          onTabClick={handleTabClick}
          className="centered-tabs" // Ajoutez une classe CSS pour centrer verticalement les onglets
        >
          <TabPane
            tab={<span><HomeOutlined /></span>}
            key="1"
            title="Accueil"
          />
          <TabPane
            tab={<span><UserOutlined /></span>}
            key="2"
            title="Espace Emploi"
          />
          <TabPane
            tab={<span><SettingOutlined /></span>}
            key="3"
            title="Paramètres"
          />
          <TabPane
            tab={<span><PlusOutlined /></span>}
            key="4"
            title="Plus"
          />
        </Tabs>
      </div>
    </div>
  );
};

export default HelloPage;

