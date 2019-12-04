import moment from 'moment';

export function appendTimestamp(text) {
  return '[' + moment().format('MMM DD HH:mm:ss') + ']   ' + text;
}
