const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const editProfilController = async ({
  id,
  nom,
  prenom,
  age,
  sexe,
  etatCivil,
  adresse,
  telephone,
  poste,
  biographie,
}) => {
  return await fetch(`${apiUrl}/user/${id}/edit-profil`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom,
      prenom,
      age,
      sexe,
      etatCivil,
      adresse,
      telephone,
      poste,
      biographie,
    }),
  }).then((res) => res.json());
};
