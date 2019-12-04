import fetch from 'cross-fetch';
import parse from 'parse-link-header';

import {
    API_URL,
} from '../env';

import delay from '../services/delay';

import {
  getWebsocket,
} from '../services/webserver';

import {
  getToken,
} from '../services/preferences';



function parseLinkHeaders(link) {
  const parsed = parse(link);
  return parsed;
}




let rateLimitTotal = null;
let rateLimitRemaining = null;
let rateLimitReset = null;

function apiCall(path, method, body) {
  return apiCallFull(API_URL + path, method, body)
    .then(data => data.response);
}

function apiCallPagination(path, method, body, response) {
  return apiCallFullPagination(API_URL + path, method, body, response);
}

function apiCallFullPagination(path, method, body, response) {
  let next = null;
  return apiCallFull(path, method, body)
    .then(data => {
      next = data.next;
      return data.response;
    })
    .then(data => {
      // Append results to response
      response = response.concat(data.items);

      // Check if more pages remaining
      // Wait 100ms and make next request
      if (next) {
        return delay(100).then(() => apiCallFullPagination(next, method, body, response));
      }

      return response;
    });
}

function apiCallFull(path, method, body) {
  console.log('Making API call to : ' + path);

  method = method || 'GET';

  const token = getToken();

  let opts = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    json: true
  };

  if (token && token.length > 0) {
    opts.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body)
    opts.body = JSON.stringify(body);

  return fetch(path, opts)
    .then(response => {
      if (response.ok) {
        checkRateLimit(response.headers);
        const links = parseLinkHeaders(response.headers.get('link'));

        return {
          response: response.json(),
          next: (links && links.next) ? links.next.url : null,
          last: (links && links.last) ? links.last.url : null,
        };
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }

    })
    .catch(exception => {
      if (exception.response && exception.response.headers) checkRateLimit(exception.response.headers);

      console.log('** IN EXCEPTION');
      console.log(exception);
      
      // Ratelimit reached
      if (exception.response.status == 403 && rateLimitRemaining == 0) {
        console.log('*** Rate limit exceeded ' + (rateLimitReset/1000/60) + ' min');

        // Send message to client informing them of rate limit exception
        getWebsocket().logRateLimitExceeded(rateLimitReset/1000/60);

        // Wait until the rate limit is over (+ 1sec) and try API call again
        return delay(rateLimitReset+1000).then(() => {
          return apiCallFull(path, method, body);
        });
      }

      // Unauthorized
      else if (exception.response.status == 401) {
        console.log('*** Unauthorized');
        getWebsocket().logUnauthorized();

        return;
      }

      // Not found
      else if (exception.response.status == 404) {
        console.log('*** Not found');
        getWebsocket().logNotFound();

        return;
      }

      // Forbidden
      else if (exception.response.status == 403) {
        console.log('*** Forbidden');
        //getWebsocket().logNotFound();

        return;
      }
      
      throw new Error(exception);
    });
}

function checkRateLimit(headers) {
  const limit = parseInt(headers.get('x-ratelimit-limit'));
  const remaining = parseInt(headers.get('x-ratelimit-remaining'));
  const reset = parseInt(headers.get('x-ratelimit-reset'));
  const reset_time = new Date(reset*1000);
  const reset_ms = (reset_time-(new Date()));

  if (remaining == NaN || limit == NaN || reset_time == NaN) return;

  rateLimitRemaining = remaining;
  rateLimitReset = reset_ms;
  rateLimitTotal = limit;

  getWebsocket().logRateLimit(remaining, limit);
  console.log(`Ratelimit: ${remaining}/${limit} remaining: ${reset_ms/1000/60} min`);
}

export function getRateLimit() {
  return [rateLimitRemaining, rateLimitTotal];
}



/******************************
 *
 * REPOSITORIES
 * repository api
 *
 ******************************/

// GET /repos/:username/:repo
// https://developer.github.com/v3/repos/#get
export function getRepository(username, repo) {
  return apiCall(`/repos/${username}/${repo}`);
}


/******************************
 *
 * COMMITS
 * List Commits of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/commits
// https://developer.github.com/v3/repos/commits/
export function getCommits(username, repo) {
  return apiCall(`/repos/${username}/${repo}/commits`);
}


/******************************
 *
 * BRANCHES
 * List Branches of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/branches
// https://developer.github.com/v3/repos/branches/
export function getBranchList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/branches`);
}


/******************************
 *
 * COLLABORATOR
 * List Collaborator of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/collaborators
// https://developer.github.com/v3/repos/collaborators/
export function getCollaboratorsList(username, repo) {
  return apiCall(`/repos/${username}/${repo}//collaborators`);
}

/******************************
 *
 * CONTRIBUTORS
 * List Contributors of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/contributors
// https://developer.github.com/v3/repos/contributors/
export function getContributorsList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/contributors`);
}


/******************************
 *
 * COMMIT COMMENTS
 * List Commit Comments of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/comments
// https://developer.github.com/v3/repos/comments/
export function getCommentList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/comments`);
}

/******************************
 *
 * FORKS
 * List Forks of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/forks
// https://developer.github.com/v3/repos/forks/
export function getForkList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/forks`);
}

/******************************
 *
 * RELEASE
 * List Releases of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/releases
// https://developer.github.com/v3/repos/releases/
export function getReleaseList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/releases`);
}

/******************************
 *
 * PULL REQUEST
 * List Pull Request of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/pulls
// https://developer.github.com/v3/repos/pulls/
export function getPullRequestList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/pulls`);
}

/******************************
 *
 * ISSUES
 * List Issues of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/issues/
// https://developer.github.com/v3/repos/issues/
export function getIssuesList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/issues`);
}

/******************************
 *
 * TEAMS
 * List Teams of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/teams/
// https://developer.github.com/v3/repos/teams/
export function getTeamList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/teams`);
}

/******************************
 *
 * TAGS
 * List Tags of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/tags
// https://developer.github.com/v3/repos/tags
export function getTagsList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/tags`);
}

/******************************
 *
 * LANGUAGES
 * List Languages of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/languages
// https://developer.github.com/v3/repos/languages
export function getLanguagesList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/languages`);
}


/******************************
 *
 * ASSIGNEES
 * List Assignees of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/assignees
// https://developer.github.com/v3/repos/assignees
export function getAssigneesList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/assignees`);
}

/******************************
 *
 * EVENTS
 * List Issues Events of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/issues/events
// https://developer.github.com/v3/repos/issues/events
export function getIssueEventsList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/issues/events`);
}

/******************************
 *
 * MILESTONES
 * List Milestones of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/milestones
// https://developer.github.com/v3/repos/milestones
export function getMilestonesList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/milestones`);
}

/******************************
 *
 * WATCHERS
 * List Watchers/Subscribers of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/subscribers
// https://developer.github.com/v3/repos/subscribers
export function getSubscribersList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/subscribers`);
}

/******************************
 *
 * STARGAZERS
 * List Stargazers of a Repository api
 *
 ******************************/

// GET /repos/:username/:repo/stargazers
// https://developer.github.com/v3/repos/stargazers
export function getStargazersList(username, repo) {
  return apiCall(`/repos/${username}/${repo}/stargazers`);
}


/******************************
 *
 * ORGANIZATION
 * List Repos belonging to Organization
 *
 ******************************/

// GET /repos/:username/:repo/stargazers
// https://developer.github.com/v3/repos/stargazers
export function getOrganizationRepos(org) {
  return apiCall(`/orgs/${org}/repos`);
}



/******************************
 *
 * USER
 * List Repos belonging to User
 *
 ******************************/

// GET /repos/:username/:repo/stargazers
// https://developer.github.com/v3/repos/stargazers
export function getUserRepos(username) {
  return apiCall(`/users/${username}/repos`);
}

/******************************
 *
 * Search
 * List Repos belonging to search query and language
 *
 ******************************/

// GET api.github.com/search/repositories
// https://api.github.com/search/repositories?q=tetris+language:kotlin&sort=stars&order=desc
export function getSearchQueryRepos(search_query, language) {
  return apiCallPagination(`/search/repositories?q=${search_query}+language:${language}&sort=stars&order=desc&per_page=100`, 'GET', null, []);
}
