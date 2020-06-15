export default async function GetUsersTopArtists(email) {
  useEffect(() => {});

  try {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    setEmail(decoded.email);
  } catch (error) {
    console.log(error);
  }
}
