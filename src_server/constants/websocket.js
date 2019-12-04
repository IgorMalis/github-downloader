// Command messages
// Send from client -> server
export const COMMAND_START_REPO = 'command:start:repo';
export const COMMAND_START_ORG = 'command:start:org';
export const COMMAND_START_USER = 'command:start:user';
export const COMMAND_START_SEARCH_QUERY = 'command:start:search';

// Status/log messages
// Send from server -> client
export const LOG_START = 'log:start';
export const LOG_STOP = 'log:stop';
export const LOG_ERROR = 'log:error';

export const LOG_RATE_EXCEEDED = 'log:rate_exceeded';
export const LOG_UNAUTHORIZED = 'log:unauthorized';
export const LOG_NOT_FOUND = 'log:not_found';

export const RATE_REMAINING = 'rate:remaining';
