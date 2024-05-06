const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const signUpController = async ({ nom, prenom, email, password }) => {
  return await fetch(`${apiUrl}/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, prenom, email, password }),
  }).then((res) => res.json());
};

export const signInController = async ({ email, password }) => {
  return await fetch(`${apiUrl}/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
};

export const verifyTokenController = async (token) => {
  return await fetch(`${apiUrl}/verify-token/${token}`).then((res) =>
    res.json()
  );
};
