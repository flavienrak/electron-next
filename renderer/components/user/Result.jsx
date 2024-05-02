import { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import styles from "../styles/resultat.module.css";

const { Title, Paragraph } = Typography;
export default function Result() {
  // const CompatibilityPage = () => {
  //   const history = useHistory();
  const [showButtons, setShowButtons] = useState(false); // État pour contrôler l'affichage des boutons

  useEffect(() => {
    // Simuler l'effet d'auto-écriture du texte avec un délai
    const delay = 50; // Délai entre chaque caractère (en millisecondes)
    const text =
      "Votre compatibilité pour ce projet est de 70%.\n Pour justifier le calcul, vous avez toutes les compétences requises \n sauf que votre âge est un peu au-dessus du recommandé, mais postulez quand même, vous avez l'expérience requise.";
    let index = 0;

    const intervalId = setInterval(() => {
      if (index <= text.length) {
        // Mettre à jour le texte affiché avec les caractères jusqu'à l'index actuel
        const partialText = text.substring(0, index);
        setWrittenText(partialText);
        index++;
      } else {
        // Une fois que tout le texte est écrit, afficher les boutons
        setShowButtons(true);
        clearInterval(intervalId);
      }
    }, delay);

    // Nettoyer l'intervalle lorsque le composant est démonté ou que le texte est entièrement écrit
    return () => clearInterval(intervalId);
  }, []);

  const [writtenText, setWrittenText] = useState(""); // État pour stocker le texte écrit

  // Fonction pour gérer le clic sur le bouton "OK"
  const handleOkButtonClick = () => {
    // Rediriger vers une autre page ou effectuer une autre action si nécessaire
  };

  // Fonction pour gérer le clic sur le bouton "Prendre contact"
  const handleContactButtonClick = () => {
    // Rediriger vers une autre page ou effectuer une autre action si nécessaire
  };

  return (
    <>
      <div className={styles.container}>
        <Title level={2}>{writtenText}</Title>
        {showButtons && ( // Afficher les boutons uniquement lorsque showButtons est vrai
          <div className={styles.buttonsContainer}>
            <Button type="primary" onClick={handleOkButtonClick}>
              OK
            </Button>
            <Button type="primary" onClick={handleContactButtonClick}>
              Prendre contact
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
