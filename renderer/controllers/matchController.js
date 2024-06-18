export const matchPosteController = async ({ ip, userId, posteId }) => {
  return await fetch(
    `http://${ip}:8000/api/user/${userId}/poste/${posteId}/match-result`
  ).then((res) => res.json());
};
