import React, { useEffect } from "react";
import { useRouter } from 'next/router'

// Set spotify client id here, for now
const SpotifyClientID = ""

export default function Landing() {
const router = useRouter();
  useEffect(() => {
  router.push(`https://accounts.spotify.com/authorize/?client_id=${SpotifyClientID}&response_type=token&redirect_uri=http://localhost:3000/spotify/login&scope=user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played+user-library-read`);
  }, [0]);
  
  return (
    <>
    </>
  );
}
