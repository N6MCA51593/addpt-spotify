<h1 align="center">
<img src="https://github.com/N6MCA51593/addpt-spotify/blob/1da18feabe3991ebfcc5a59c26749ebd64bcdbf3/logo_final.png" width="150" alt="logo"></p>
Artist discography discovery progress tracker for Spotify
</h1>
<h4 align="center">A customizable app that tracks your listening progress of newly discovered artists</h4>

<p align="center">
  <a href="#demo">Demo</a> •
  <a href="#core-features">Core Features</a> •
  <a href="#getting-started">Getting Started </a> •
  <a href="#usage">Usage</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

## Demo
https://addpt-spotify.herokuapp.com/

## Core features


## Getting started

### Prerequisites

* A [Spotify](https://www.spotify.com/) account
* An app registered via the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
* A MongoDB database hosted on a cloud service (e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
* Node.js installed on your machine

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

In the root folder, create a .env file that contains the following (values provided for local machine deployment):

```javascript
// Link to connect to the MongoDB database
MONGO_URI=...

// Client id from the app registered through the Spotify dev dashboard
CLIENT_ID=...

// Client secret from the app registered through the Spotify dev dashboard
CLIENT_SECRET=...

// Redirect link from the app registered through the Spotify dev dashboard
REDIRECT_URI=http://localhost:5000/api/auth/redirect

// Permission scopes for the oAuth 2.0 token
SCOPES=user-read-recently-played

// JSON Web Token secret 
JWT_SECRET=...

// URL that points to the client 
FRONT_END_URI=http://localhost:3000
```
In the client folder, create a .env file that contains the following (values provided for local machine deployment):

```javascript
// URL that points to the SSE stream API endpoint
REACT_APP_SSE_URI=http://localhost:5000/api/sync/stream
```
