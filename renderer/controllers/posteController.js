const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllPostesController = async (id) => {
  return await fetch(`${apiUrl}/user/${id}/poste/get-all`).then((res) =>
    res.json()
  );
};

export const createPosteController = async ({
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
  return await fetch(`${apiUrl}/user/${id}/create-poste`, {
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
  return await fetch(`${apiUrl}/user/${id}/poste/${posteId}/edit-poste`, {
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
  }).then((res) => res.json());
};

export const removePosteController = async ({ id, posteId }) => {
  return await fetch(`${apiUrl}/user/${id}/poste/${posteId}/remove-poste`).then(
    (res) => res.json()
  );
};
