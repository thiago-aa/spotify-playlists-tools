import { useEffect } from 'react';
import querystring from 'querystring';

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirect_uri = 'http://localhost:3000/';

const generateRandomString = (length: number) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
};

const base64encode = (input: any) => {
  const array = Array.from(new Uint8Array(input));
  const encoded = btoa(String.fromCharCode(...array));
  return encoded
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};


const Login = () => {
  useEffect(() => {    
    const spotifyAuthorizationFlow = async () => {
      const codeVerifier = generateRandomString(64);
      window.localStorage.setItem('code_verifier', codeVerifier);
      const hashed = await sha256(codeVerifier)
      const codeChallenge = base64encode(hashed)
      const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
      const url = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
        client_id,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri,
      });
      window.location.href = url;
    }
    spotifyAuthorizationFlow();
  }, []);

  return null;
};

export default Login;