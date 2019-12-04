import { EventEmitter } from 'events';

import io from 'socket.io-client';

import {
    COMMAND_START_REPO,
    COMMAND_START_ORG,
    COMMAND_START_USER,
    COMMAND_START_SEARCH_QUERY,
    LOG_START,
    LOG_STOP,
    LOG_RATE_EXCEEDED,
    LOG_UNAUTHORIZED,
    LOG_NOT_FOUND,
    RATE_REMAINING,
} from '../constants/websocket';

import {
    WS_URL,
} from '../env';

import {
  start,
  stop,
  rateLimitExceeded,
  unauthorized,
  notFound,
  rateLimit,
} from '../actions/log';



export default class WebsocketManager extends EventEmitter {
  constructor(dispatch, getState) {
    super();
    this.dispatch = dispatch;
    this.getState = getState;
    this.socket = null;
  }

  joinWebsocket() {
    const socket = io(WS_URL);

    function bindSocketListener(event, fun) {
      socket.on(event, fun);
    }

    const onConnected = () => {
      console.log('WEBSOCKET CONNECTED!');
      this.emit('connected');
    };

    const onDisonnected = () => {
      console.log('WEBSOCKET DISCONNECTED!');
      this.emit('disconnected');
    };

    bindSocketListener('connect_error', (err) => {
      console.log('*** connect_error');
    });

    bindSocketListener('reconnect_attempt', () => {
      console.log('*** reconnect_attempt');
    });

    bindSocketListener('connect', onConnected);
    bindSocketListener('disconnect', onDisonnected);



  /******************************
   * WEBSOCKET COMMANDS RECEIVED FROM SERVER
   ******************************/

    socket.on(LOG_START, this.logStart.bind(this));
    socket.on(LOG_STOP, this.logStop.bind(this));

    socket.on(LOG_RATE_EXCEEDED, this.logRateLimitExceeded.bind(this));
    socket.on(LOG_UNAUTHORIZED, this.logUnauthorized.bind(this));
    socket.on(LOG_NOT_FOUND, this.logNotFound.bind(this));

    socket.on(RATE_REMAINING, this.logRateLimit.bind(this))

    this.socket = socket;
  }
  
  performQuerySearch(language, query) {
    this.sendMessage(COMMAND_START_SEARCH_QUERY, language, query);
  }

  performQueryRepo(username, repo) {
    this.sendMessage(COMMAND_START_REPO, username, repo);
  }

  performQueryOrg(org) {
    this.sendMessage(COMMAND_START_ORG, org);
  }

  performQueryUser(user) {
    this.sendMessage(COMMAND_START_USER, user);
  }

  sendMessage(command, ...args) {
    this.socket.emit(command, ...args);
  }

  logStart() {
    this.dispatch(start());
  }

  logStop(ratelimit) {
    this.dispatch(stop(ratelimit));
  }

  logRateLimitExceeded(t) {
    this.dispatch(rateLimitExceeded( parseFloat(t) ));
  }

  logUnauthorized() {
    this.dispatch(unauthorized());
  }

  logNotFound() {
    this.dispatch(notFound());
  }

  logRateLimit(rl) {
    const remaining = rl[0];
    const total = rl[1];
    this.dispatch(rateLimit(remaining, total));
  }

}
