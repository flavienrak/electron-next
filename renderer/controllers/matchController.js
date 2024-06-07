export const matchPosteController = async ({ ip, userId, posteId }) => {
  return await fetch(
    `http://${ip}:8000/user/${userId}/poste/${posteId}/match-result`
  ).then((res) => res.json());
};
