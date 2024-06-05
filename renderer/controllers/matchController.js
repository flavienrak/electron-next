const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const matchPosteController = async ({ userId, posteId }) => {
  return await fetch(
    `${apiUrl}/user/${userId}/poste/${posteId}/match-result`
  ).then((res) => res.json());
};
