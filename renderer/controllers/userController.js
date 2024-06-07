export const getUserController = async ({ ip, userId }) => {
  return await fetch(`http://${ip}:8000/api/user/${userId}/get-user`).then(
    (res) => res.json()
  );
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
  return await fetch(`http://${ip}:8000/api/user/${id}/edit-profil`, {
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
