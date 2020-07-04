<h1 align="center">
<img src="https://github.com/N6MCA51593/addpt-spotify/blob/1da18feabe3991ebfcc5a59c26749ebd64bcdbf3/logo_final.png" width="150" alt="logo"></p>
Artist discography discovery progress tracker for Spotify
</h1>
<h4 align="center">A customizable app that tracks your listening progress of newly discovered artists</h4>

<p align="center">
  <a href="#intro">Intro</a> •
  <a href="#core-features">Core Features</a> •
  <a href="#getting-started">Getting Started </a> •
  <a href="#usage-and-limitations">Usage and limitations</a> •
  <a href="#built-with">Built with</a> •
  <a href="#license">License</a>
</p>

## Intro

Discovering new music, expanding your musical taste is an exciting process. Yet at the same, it can prove to be somewhat confusing and daunting, depending on your habits. If you prefer to dump new artists into a huge playlist and explore their discography one song at a time, it's easy to lose track of what you've listened to, and how many times. What's worse, you can have multiple new artists competing for your attention, which further exacerbates the problem. Artist discography discovery progress tracker for Spotify is designed to take care of that, and provide you with data and customization options that make exploring new music a more pleasant and comfortable journey.

## Core features

#### Add the artist that you want to track

<p align="center">
 <img src="https://github.com/N6MCA51593/addpt-spotify/blob/3bbf4bba9df2d35b7cb55c27501e6ee3cbe35efc/gif_add.gif" width="450" alt="gif">
  </p>
  
  #### Pick and choose the albums and individual songs that interest you, adjust their listen counters 
  <p align="middle">
 <img src="https://github.com/N6MCA51593/addpt-spotify/blob/3bbf4bba9df2d35b7cb55c27501e6ee3cbe35efc/gif_custom.gif" width="600" alt="gif">
  <img src="https://github.com/N6MCA51593/addpt-spotify/blob/3bbf4bba9df2d35b7cb55c27501e6ee3cbe35efc/gif_custom_2.gif" width="220" alt="gif">
  </p>
  
  #### Start listening! The app periodically updates your history, but you can trigger an update manually

<p align="center">
 <img src="https://github.com/N6MCA51593/addpt-spotify/blob/3bbf4bba9df2d35b7cb55c27501e6ee3cbe35efc/gif_sync.gif" alt="gif">
</p>

#### Tweak your settings at any time from the settings menu

<p align="center">
 <img src="https://github.com/N6MCA51593/addpt-spotify/blob/3bbf4bba9df2d35b7cb55c27501e6ee3cbe35efc/gif_settings.gif" width="650" alt="gif">
</p>

#### Same features available on mobile devices as well!

<p align="center">
 <img src="https://github.com/N6MCA51593/addpt-spotify/blob/3bbf4bba9df2d35b7cb55c27501e6ee3cbe35efc/gif_mobile.gif" alt="gif">
</p>

## Getting started

### Prerequisites

- A [Spotify](https://www.spotify.com/) account
- An app registered via the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
- A MongoDB database hosted on a cloud service (e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Node.js and Git installed on the machine

### Installation

#### Dependencies

```bash
# Clone the repository
$ git clone https://github.com/N6MCA51593/addpt-spotify.git

# Navigate to the repository root directory
$ cd addpt-spotify

# Install server dependencies
$ npm install

# Navigate to the client directory
$ cd client

# Install client dependencies
$ npm install
```

#### Environmental variables

In the root folder, create a .env file that contains the following:

```javascript
// Link to connect to the MongoDB database
MONGO_URI=...

// Client id of the app registered through the Spotify dev dashboard
CLIENT_ID=...

// Client secret of the app registered through the Spotify dev dashboard
CLIENT_SECRET=...

// Redirect link of the app registered through the Spotify dev dashboard
REDIRECT_URI=http://localhost:5000/api/auth/redirect

// Permission scopes for the oAuth 2.0 token
SCOPES=user-read-recently-played

// JSON Web Token secret
JWT_SECRET=...

// URL that points to the client
FRONT_END_URI=http://localhost:3000
```

In the client folder, create a .env file that contains the following:

```javascript
// URL that points to the SSE stream API endpoint
REACT_APP_SSE_URI=http://localhost:5000/api/sync/stream
```

### Running

From the repo root directory:

```bash
# Express & React :3000 & :5000
$ npm run dev

# Express API Only :5000
$ npm run server

# React Client Only :3000
$ npm run client
```

## Usage and limitations

- Spotify adds a track to the history when it's played for at least 30 seconds, and listened to completion. Using the next/previous player buttons prevents it from showing up in the history. Listening on repeat will create a history record for every repeat
- The Spotify history API endpoint [can sometimes return stale results](https://github.com/spotify/web-api/issues/1441),
  which is indistinguishable from when the user hasn't listened to anything at all. As a result, it can cause some listens to not show up in the app listening history and count towards the stats
- When adding an artist, the app automatically fetches up to 20 albums, singles, and compilations (up to 60 total). Whatever isn't fetched, as well as all the artist's future releases, can be added manually
- Since the app relies on Spotify IDs, changing the market country will make tracking unreliable, since the same albums and tracks may have different IDs in different markets. To work in a different market, artists have to be deleted and added again
- Users stop being automatically tracked after 12 weeks since last login
- Maximum number of tracks per album - 50 (sincere apologies to all the Frank Zappa fans out there)
- No support for local files
- No support for secondary artists in collaborations ("appears on" albums)
- No support for IE and Edge Legacy

## Built with

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://reactjs.org/)
- [Axios](https://github.com/axios/axios)
- [react-slider](https://github.com/zillow/react-slider)
- [react-router](https://github.com/ReactTraining/react-router)
- [react-transition-group](https://github.com/reactjs/react-transition-group)
- [Sass](https://sass-lang.com/)
- [Font Awesome](https://fontawesome.com/)

## License

MIT
