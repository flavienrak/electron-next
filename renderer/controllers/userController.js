const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUserController = async (id) => {
  return await fetch(`${apiUrl}/user/${id}/get-user`).then((res) => res.json());
};

export const editProfilController = async ({
  id,
  nom,
  prenom,
  telephone,
  biographie,
  pays,
  region,
  ville,
  postes,
  diplomes,
  competences,
  experiences,
  formations,
  qualites,
  langues,
}) => {
  return await fetch(`${apiUrl}/user/${id}/edit-profil`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom,
      prenom,
      telephone,
      biographie,
      pays,
      region,
      ville,
      postes,
      diplomes,
      competences,
      experiences,
      formations,
      qualites,
      langues,
    }),
  }).then((res) => res.json());
};
