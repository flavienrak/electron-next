export const getAllPostesController = async ({ ip, userId }) => {
  return await fetch(`http://${ip}:8000/api/user/${userId}/poste/get-all`).then(
    (res) => res.json()
  );
};

export const createPosteController = async ({
  ip,
  id,
  titre,
  telephone,
  pays,
  region,
  ville,
  description,
  missions,
  langues,
  competences,
  experiences,
  diplomes,
  formations,
  qualites,
}) => {
  return await fetch(`http://${ip}:8000/api/user/${id}/create-poste`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titre,
      telephone,
      pays,
      region,
      ville,
      description,
      missions,
      langues,
      competences,
      experiences,
      diplomes,
      formations,
      qualites,
    }),
  }).then((res) => res.json());
};

export const editPosteController = async ({
  ip,
  id,
  posteId,
  telephone,
  pays,
  region,
  ville,
  description,
  missions,
  langues,
  competences,
  experiences,
  diplomes,
  formations,
  qualites,
}) => {
  return await fetch(
    `http://${ip}:8000/api/user/${id}/poste/${posteId}/edit-poste`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telephone,
        pays,
        region,
        ville,
        description,
        missions,
        langues,
        competences,
        experiences,
        diplomes,
        formations,
        qualites,
      }),
    }
  ).then((res) => res.json());
};

export const removePosteController = async ({ ip, id, posteId }) => {
  return await fetch(
    `http://${ip}:8000/api/user/${id}/poste/${posteId}/remove-poste`
  ).then((res) => res.json());
};
