import {
  getRateLimit,
} from './index'; 

import {
  COMMAND_START_SEARCH_QUERY,
  COMMAND_START_REPO,
  COMMAND_START_ORG,
  COMMAND_START_USER,
  LOG_START,
  LOG_STOP,
  LOG_ERROR,
  LOG_RATE_EXCEEDED,
  LOG_UNAUTHORIZED,
  LOG_NOT_FOUND,
  RATE_REMAINING,
} from '../constants/websocket';



export default class Websocket {
  constructor(downloader) {
    this.io = null;
    this.socket = null;
    this.downloader = downloader;
  }

  init = (http) => {
    this.io = require('socket.io')(http);
    this.io.on('connection', this.handleConnection);
  };

  // Handle connection
  handleConnection = (socket) => {

      console.log('a user connected');
      socket.on('disconnect', function() {
        console.log('user disconnected');
      });

      // Handle start commands from client
      socket.on(COMMAND_START_REPO, this.commandStartRepo);
      socket.on(COMMAND_START_ORG,  this.commandStartOrg );
      socket.on(COMMAND_START_USER, this.commandStartUser);
      socket.on(COMMAND_START_SEARCH_QUERY, this.commandSearchQuery);

  };



  /******************************
   * COMMANDS RECEIVED FROM CLIENT
   ******************************/

  // Receive command:start:repo
  commandStartRepo = (username, repo) => {
    this.downloader.startRepo(username, repo);
  };

  // Receive command:start:repo
  commandStartOrg = (org) => {
    this.downloader.startOrg(org);
  };

  // Receive command:start:repo
  commandStartUser = (user) => {
    this.downloader.startUser(user);
  };

  // Receive command:start:repo
  commandSearchQuery = (query, language) => {
    this.downloader.startSearchQuery(query, language);
  };




  /******************************
   * COMMANDS SENT TO CLIENT
   ******************************/

  logStart = () => {
    this.io.emit(LOG_START);
  };

  logStop = () => {
    const ratelimit = getRateLimit();
    this.io.emit(LOG_STOP, ratelimit);
  };

  logRateLimitExceeded = (t) => {
    this.io.emit(LOG_RATE_EXCEEDED, t);
  };

  logUnauthorized = () => {
    this.io.emit(LOG_UNAUTHORIZED);
  };

  logNotFound = () => {
    this.io.emit(LOG_NOT_FOUND);
  };

  logRateLimit = (remaining, total) => {
    this.io.emit(RATE_REMAINING, [remaining, total]);
  };

}
