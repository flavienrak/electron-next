import React from "react";
import styles from "../../styles/jobDetails.module.css";

import { Button, Typography, Divider } from "antd";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function Details() {
  const { push } = useRouter();

  // const JobDetailsPage = () => {
  //   const history = useHistory();

  // Fonction pour gérer le clic sur le bouton "Calculer la compatibilité"
  const handleCalculateCompatibility = () => {
    // Logique pour calculer la compatibilité
    // const handleViewDetails = (calculate) => {
    // Rediriger vers la page des détails du poste avec le titre du poste en paramètre d'URL
    push(`/resultat`);
  };

  // Simulons les données pour le poste et l'utilisateur
  const jobDetails = {
    title: "Développeur Full Stack",
    description: "Description du poste de développeur Full Stack.",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      location: "Paris, France",
      skills: ["JavaScript", "React", "Node.js"],
    },
    project: {
      title: "Projet XYZ",
      description: "Description du projet XYZ.",
      requirements: "Exigences pour le projet XYZ.",
    },
    profile: {
      title: "Développeur Full Stack",
      skills: ["JavaScript", "React", "Node.js"],
      experience: "3 ans",
    },
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            {jobDetails.title}
          </Title>
        </div>
        <Divider />
        <div className={styles.content}>
          <Title level={3}>Informations sur l'utilisateur</Title>
          <Text>Nom: {jobDetails.user.name}</Text>
          <Text>E-mail: {jobDetails.user.email}</Text>
          <Text>Localisation: {jobDetails.user.location}</Text>
          <Text>Compétences: {jobDetails.user.skills.join(", ")}</Text>
          <Divider />
          <Title level={3}>Informations sur le projet</Title>
          <Text>Titre du projet: {jobDetails.project.title}</Text>
          <Text>Description du projet: {jobDetails.project.description}</Text>
          <Text>Exigences du projet: {jobDetails.project.requirements}</Text>
          <Divider />
          <Title level={3}>Profil recherché</Title>
          <Text>Titre du poste recherché: {jobDetails.profile.title}</Text>
          <Text>
            Compétences requises: {jobDetails.profile.skills.join(", ")}
          </Text>
          <Text>Expérience requise: {jobDetails.profile.experience}</Text>
        </div>
        <div className={styles.footer}>
          <Button type="primary" onClick={handleCalculateCompatibility}>
            Calculer la compatibilité
          </Button>
        </div>
      </div>
    </>
  );
}
