export const signUpController = async ({
  ip,
  nom,
  prenom,
  email,
  password,
}) => {
  return await fetch(`http://${ip}:8000/api/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, prenom, email, password }),
  }).then((res) => res.json());
};

export const signInController = async ({ ip, email, password }) => {
  return await fetch(`http://${ip}:8000/api/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
};

export const verifyTokenController = async ({ ip, token }) => {
  return await fetch(`http://${ip}:8000/api/verify-token/${token}`).then(
    (res) => res.json()
  );
};
