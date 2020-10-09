# HiveMind
## Technology Used:
* [**Node.js**](https://nodejs.org/en/) - Backend
* [**Next.js**](https://github.com/vercel/next.js) - Backend Framework (uses [**Babel**](https://babeljs.io/) and [**Webpack**](https://webpack.js.org/))
* [**React**](https://github.com/facebook/react) - Frontend Framework
* [**Axios**](https://github.com/axios/axios) - HTTP Client
* [**bcrypt**](https://github.com/kelektiv/node.bcrypt.js) - Hashed Password Encryption
* [**js-cookie**](https://github.com/js-cookie/js-cookie) - Sets client-side cookies
* [**jsonwebtoken**](https://github.com/auth0/node-jsonwebtoken) - Secure encoded token which are placed in cookies for authentication
* [**jwt-decode**](https://github.com/auth0/jwt-decode) - Decoded JSON Web Tokens and reveals data
* [**dotenv**](https://github.com/motdotla/dotenv) - Used to access .env varibales on server side
## About:
Allows a user to create an account (their user info and password is stored in a *MySql Database* using bcrypt hashed passwords). Once the user is logged in, their authentication status is stored in the *HTTPS Headers* using *JSON Web Tokens*. The user can now link their account with their Spotify account using *OAuth 2.0* authentication. With the users *OAuth 2.0* token we can now communicate with the *Spotify API* gives the response of the users top 50 Spotify Artists. This data can be shown on the users profile, and certain artists can be removed from their 'Favorites' list, then added back if needed.

![](examples/example.gif
)
![alt text](https://github.com/luke-ols0/HiveMind/blob/master/notes/FetchingSpotifyDataDiagram.png?raw=true "Logo Title Text 1")
