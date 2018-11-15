# Speckle Imaging Database

The [NASA Ames Research Center](https://www.nasa.gov/ames) Speckle Imaging Group produces the highest resolution imaging possible from a single telescope and currently operates instruments at the WIYN, Gemini-North, and Gemini-South telescopes. These instruments produce a significant volume of data.

This project is an open source, searchable database that holds terabytes of this data. 

<p align="center">
<img src="https://i.imgur.com/OjLYFA8.png" alt="Example fits file" class="center" height="400" width="400">
</p>

## Project Layout
- [speckle-server](https://github.com/exlunae/speckle-imaging/tree/master/speckle-server) - Independent directory containing source code for the project's server side.
- [speckle-client](https://github.com/exlunae/speckle-imaging/tree/master/speckle-client) - Indpendent directory containing source code for the project's client side.
- [scripts](https://github.com/exlunae/speckle-imaging/tree/master/scripts) - Contains all the data transformation scripts and all automative processes. Currently needs to be ran manually. 
## Installation
This project's server-side is built with Express.js while the client-side is built with React.js. It follows the client-server architecture, loosely coupling the UI from the Server. So, in order to start up the project, two terminals will be necessary: one for the React client, one for the Express server. 
### Express Server
Speckle Imaging Database (server-side) is running on [Node.js](https://nodejs.org/) v8.11.4 and [Express.js](https://expressjs.com/) v4.16.0.

Install the dependencies and start the server.

```sh
$ cd speckle-server
$ npm install
$ node app.js
```

### React Server

Speckle Imaging Database (client-side) is running on [React.js](https://reactjs.org/) v16.4.2. 

Install the dependencies and start the server.

```sh
$ cd speckle-client
$ cd react-client
$ npm install
$ npm start
```
### Scripts 

Scripts are written in [Python](https://www.python.org/downloads/release/python-365/) v3.6.5. Running scripts on other version of Python has not been tested. Currently unknown which versions are compatible.
