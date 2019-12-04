import AssigneeExporter from '../exporters/assignees';
import BranchExporter from '../exporters/branch';
import CollaboratorExporter from '../exporters/collaborator';
import CommentExporter from '../exporters/comment';
import CommitCommentExporter from '../exporters/commit_comment';
import CommitsExporter from '../exporters/commits';
import ForkExporter from '../exporters/fork';
import LanguagesExporter from '../exporters/languages';
import PullRequestExporter from '../exporters/pull_request';
import ReleaseExporter from '../exporters/release';
import RepositoryExporter from '../exporters/repository';
import StargazerExporter from '../exporters/stargazer';
import SubscriberExporter from '../exporters/subscriber';
import UserExporter from '../exporters/user';
import TagExporter from '../exporters/tags';
import IssuesExporter from '../exporters/issues';
import IssueEventsExporter from '../exporters/issue_events';
import MilestoneExporter from '../exporters/milestone';

import {
  getAssigneesList,
  getBranchList,
  getCollaboratorsList,
  getCommentList,
  getCommits,
  getCommitCommentList,
  getForkList,
  getLanguagesList,
  getOrganizationRepos,
  getPullRequestList,
  getReleasesList,
  getRepository,
  getStargazersList,
  getSubscribersList,
  getTagsList,
  getUserRepos,
  getIssuesList,
  getIssueEventsList,
  getMilestonesList,
  getSearchQueryRepos,
} from '../api/index';

import {
  getRepositoryFields,
  getOrganizationFields,
  getUserFields,
} from './preferences';

import {
  cloneRepository,
} from './shell';

import {
  separateFullName,
  emptyPromise,
  timerPromise,
} from './util';



export default class Downloader {
  constructor() {
    this.ws = null;
  }

  init = (ws) => {
    this.ws = ws;
  };

  // Receive command:start:repo
  startRepo = (username, repo) => {
    this.ws.logStart();

    const handlerRepository = this.handleRepositoryResponse(username, repo);
    getRepository(username, repo).then( handlerRepository );
  };

  // Receive command:start:org
  startOrg = (org) => {
    this.ws.logStart();

    const handlerOrg = this.handleOrganizationResponse(org);
    getOrganizationRepos(org).then( handlerOrg );
  };

  // Receive command:start:user
  startUser = (user) => {
    this.ws.logStart();

    const handlerUser = this.handleUserResponse(user);
    getUserRepos(user).then( handlerUser );
  };

  // Receive command:start:search
  startSearchQuery = (query, language) => {
    this.ws.logStart();

    const handlerSearchQuery = this.handleSearchQueryResponse(query, language);
    getSearchQueryRepos(query, language).then( handlerSearchQuery );
  };

  handleRepositoryResponse = (user, repo) => {
    return (response) => {
       // Repository
      const repositoryExporter = new RepositoryExporter();
      repositoryExporter.process_single(response);
      repositoryExporter.write();

      // Owner
      const owner = repositoryExporter.getOwner();
      const userExporter = new UserExporter();
      userExporter.process(owner);
      userExporter.write();

      // Clone repository
      const repoFields = getRepositoryFields();
      if (repoFields.source_code == true) {      
        const cloneUrl = repositoryExporter.getCloneUrl();
        const fullName = repositoryExporter.getFullName();
        cloneRepository(cloneUrl, fullName);
      }

      // Get additional information for repository
      const repo_id = repositoryExporter.getRepoId();

      // Retrieve details about repository
      const f = this.getRepoDetails(repo_id, user, repo);

      // Notify client when all promises fulfilled
      f().then(this.ws.logStop);

    };
  };

  getRepoDetails = (repo_id, username, repo) => () => {
    const repoFields = getRepositoryFields();
    let requests = []

    // Subscribers
    if (repoFields.subscribers == true) {
      requests.push(this.requestRepositorySubscribers);
    }
    
    // Stargazers
    if (repoFields.stargazers == true) {
      requests.push(this.requestRepositoryStargazers);
    }

    // Assignees
    if (repoFields.assignees == true) {
      requests.push(this.requestRepositoryAssignees);
    }

    // Commits
    if (repoFields.commits == true) {
      requests.push(this.requestRepositoryCommits);
    }

    // Branch
    if (repoFields.branches == true) {
      requests.push(this.requestRepositoryBranches);
    }
    
    // Collaborators (authentication required)
    if (repoFields.collaborators == true) {
      requests.push(this.requestRepositoryCollaborators);
    }

    // Languages
    // const handlerLanguagesList = this.handleLanguagesListResponse(repo_id);
    // getLanguagesList(username, repo).then( handlerLanguagesList );

    // Forks
    if (repoFields.forks == true) {
      requests.push(this.requestRepositoryForks);
    }

    // Tags
    if (repoFields.tags == true) {
      requests.push(this.requestRepositoryTags);
    }

    // Comments
    if (repoFields.comments == true) {
      requests.push(this.requestRepositoryComments);
    }

    // Pull Requests
    if (repoFields.pull_requests == true) {
      requests.push(this.requestRepositoryPullRequests);
    }

    // Issues
    if (repoFields.issues == true) {
      requests.push(this.requestRepositoryIssues);
    }

    // Issue Events
    if (repoFields.issues_events == true) {
      requests.push(this.requestRepositoryIssueEvents);
    }

    // Milestones
    if (repoFields.milestones == true) {
      requests.push(this.requestRepositoryMilestones);
    }

    // Perform all the requests sequentially (one after the other)
    // Use 100ms delay between each request
    const promise = requests.reduce((soFar, f) => {
      return soFar.then(() => f(repo_id, username, repo))
        .then(() => timerPromise(100));
    }, emptyPromise());

    return promise;
  };


  /* MAKE REQUESTS TO REPOSITORY APIs */
  requestRepositorySubscribers = (repo_id, username, repo) => {
    const handlerSubscribersList = this.handleSubscribersListResponse(repo_id);
    return getSubscribersList(username, repo).then( handlerSubscribersList );
  };

  requestRepositoryStargazers = (repo_id, username, repo) => {
    const handlerStargazersList = this.handleStargazersListResponse(repo_id);
    return getStargazersList(username, repo).then( handlerStargazersList );
  };

  requestRepositoryAssignees = (repo_id, username, repo) => {
    const handlerAssigneesList = this.handleAssigneesListResponse(repo_id);
    return getAssigneesList(username, repo).then( handlerAssigneesList );
  };

  requestRepositoryCommits = (repo_id, username, repo) => {
    const handlerCommitsList = this.handleCommitsListResponse(repo_id);
    return getCommits(username, repo).then( handlerCommitsList );
  };

  requestRepositoryBranches = (repo_id, username, repo) => {
    const handlerBranchList = this.handleBranchListResponse(repo_id);
    return getBranchList(username, repo).then( handlerBranchList );
  };

  requestRepositoryCollaborators = (repo_id, username, repo) => {
    const handlerCollaboratorList = this.handleCollaboratorsListResponse(repo_id);
    return getCollaboratorsList(username, repo).then( handlerCollaboratorList );
  };

  requestRepositoryForks = (repo_id, username, repo) => {
    const handlerForkList = this.handleForkListResponse(repo_id);
    return getForkList(username, repo).then( handlerForkList );
  };

  requestRepositoryTags = (repo_id, username, repo) => {
    const handlerTagsList = this.handleTagsListResponse(repo_id);
    return getTagsList(username, repo).then( handlerTagsList ); 
  };

  requestRepositoryComments = (repo_id, username, repo) => {
    const handlerCommentsList = this.handleCommentsListResponse(repo_id);
    return getCommentList(username, repo).then( handlerCommentsList );
  };

  requestRepositoryPullRequests = (repo_id, username, repo) => {
    const handlerPullRequestList = this.handlePullRequestListResponse(repo_id);
    return getPullRequestList(username, repo).then( handlerPullRequestList );
  };

  requestRepositoryIssues = (repo_id, username, repo) => {
    const handlerIssuesList = this.handleIssuesListResponse(repo_id);
    return getIssuesList(username, repo).then( handlerIssuesList );
  };

  requestRepositoryIssueEvents = (repo_id, username, repo) => {
    const handlerIssueEventsList = this.handleIssueEventsListResponse(repo_id);
    return getIssueEventsList(username, repo).then( handlerIssueEventsList );
  };

  requestRepositoryMilestones = (repo_id, username, repo) => {
    const handlerMilestonesList = this.handleMilestoneListResponse(repo_id);
    return getMilestonesList(username, repo).then( handlerMilestonesList );
  };


  /* HANDLERS FOR MANAGING RESPONSE FROM SERVER */
  handleMilestoneListResponse = (repo_id) => {
    return (response) => {
      var milestoneExporter = new MilestoneExporter();
      milestoneExporter.process(repo_id, response);
      milestoneExporter.write();
    };
  };

  handleIssueEventsListResponse = (repo_id) => {
    return (response) => {
      var issueEventsExporter = new IssueEventsExporter();
      issueEventsExporter.process(repo_id, response);
      issueEventsExporter.write();
    };
  };

  handleIssuesListResponse = (repo_id) => {
    return (response) => {
      var issuesExporter = new IssuesExporter();
      issuesExporter.process(repo_id, response);
      issuesExporter.write();
    };
  };

  handleCommentsListResponse = (repo_id) => {
    return (response) => {
      var commentExporter = new CommentExporter();
      commentExporter.process(repo_id, response);
      commentExporter.write();
    };
  };

  handleTagsListResponse = (repo_id) => {
    return (response) => {
      var tagExporter = new TagExporter();
      tagExporter.process(repo_id, response);
      tagExporter.write();
    };
  };

  handleCollaboratorsListResponse = (repo_id) => {
    return (response) => {
      var collaboratorExporter = new CollaboratorExporter();
      collaboratorExporter.process(repo_id, response);
      collaboratorExporter.write();
    };
  };

  handlePullRequestListResponse = (repo_id) => {
    return (response) => {
      var pullRequestExporter = new PullRequestExporter();
      pullRequestExporter.process(repo_id, response);
      pullRequestExporter.write();
    };
  };

  handleLanguagesListResponse = (repo_id) => {
    return (response) => {
      var languagesExporter = new LanguagesExporter();
      languagesExporter.process(repo_id, response);
      languagesExporter.write();
    };
  };

  handleSearchQueryResponse = (query, language) => {
    return (response) => {
      const repositoryExporter = new RepositoryExporter();
      repositoryExporter.process_multiple(response);
      repositoryExporter.write();

      const fullNames = repositoryExporter.getFullNames();
      const ids = repositoryExporter.getRepoIds();
      console.log( 'Total count: '+  fullNames.length);

      let requests = [];

      for (var i = 0; i < fullNames.length; i++) {
        const fullName = fullNames[i];
        const repo = separateFullName(fullName);
        const id = ids[i];

        console.log(`Getting details of repo ${repo[0]}/${repo[1]} (id:${id})`);
        requests.push( this.getRepoDetails(id, repo[0], repo[1]) );
      }

      const promise = requests.reduce((soFar, f) => {
        return soFar.then(f)
          .then(() => timerPromise(100));
      }, emptyPromise());

      promise.then(this.ws.logStop);
    };
  };

  handleOrganizationResponse = (org) => {
      return (response) => {
        const repositoryExporter = new RepositoryExporter();
        repositoryExporter.process_multiple(response);
        repositoryExporter.write();

        // Check settings if need to download repositories
        const orgFields = getOrganizationFields();
        if (!orgFields.repositories) {
          return emptyPromise();
        }

        const fullNames = repositoryExporter.getFullNames();
        const ids = repositoryExporter.getRepoIds();

        let requests = [];

        for (var i = 0; i < fullNames.length; i++) {
          const fullName = fullNames[i];
          const repo = separateFullName(fullName);
          const id = ids[i];

          console.log(`Getting details of repo ${repo[0]}/${repo[1]} (id:${id})`);
          requests.push( this.getRepoDetails(id, repo[0], repo[1]) );
        }

        const promise = requests.reduce((soFar, f) => {
          return soFar.then(f)
            .then(() => timerPromise(100));
        }, emptyPromise());

        promise.then(this.ws.logStop);
      };
  };


  handleUserResponse = (user) => {
      return (response) => {
        const repositoryExporter = new RepositoryExporter();
        repositoryExporter.process_multiple(response);
        repositoryExporter.write();

        // Check settings if need to download repositories
        const userFields = getUserFields();
        if (!userFields.repositories) {
          return emptyPromise();
        }

        const fullNames = repositoryExporter.getFullNames();
        const ids = repositoryExporter.getRepoIds();

        let requests = [];
        
        for (var i = 0; i < fullNames.length; i++) {
          const fullName = fullNames[i];
          const repo = separateFullName(fullName);
          const id = ids[i];

          console.log(`Getting details of repo ${repo[0]}/${repo[1]} (id:${id})`);
          requests.push( this.getRepoDetails(id, repo[0], repo[1]) );
        }

        const promise = requests.reduce((soFar, f) => {
          return soFar.then(f)
            .then(() => timerPromise(100));
        }, emptyPromise());

        promise.then(this.ws.logStop);
      };
  };

  handleCommitCommentListResponse = (repo_id) => {
    return (response) => {
      var commitCommentExporter = new CommitCommentExporter();
      commitCommentExporter.process(repo_id, response);
      commitCommentExporter.write();
    };
  };

  handleCommitCommentListResponse = (repo_id) => {
    return (response) => {
      var commitCommentExporter = new CommitCommentExporter();
      commitCommentExporter.process(repo_id, response);
      commitCommentExporter.write();
    };
  };

  handleForkListResponse = (repo_id) => {
    return (response) => {
      var forkExporter = new ForkExporter();
      forkExporter.process(repo_id, response);
      forkExporter.write();
    };
  };

  handleReleasesListResponse = (repo_id) => {
    return (response) => {
      var releaseExporter = new ReleaseExporter();
      releaseExporter.process(repo_id, response);
      releaseExporter.write();
    };
  };

  handleSubscribersListResponse = (repo_id) => {
    return (response) => {
      var subscriberExporter = new SubscriberExporter();
      subscriberExporter.process(repo_id, response);
      subscriberExporter.write();
    };
  };

  handleStargazersListResponse = (repo_id) => {
    return (response) => {
      var stargazerExporter = new StargazerExporter();
      stargazerExporter.process(repo_id, response);
      stargazerExporter.write();
    };
  };

  handleAssigneesListResponse = (repo_id) => {
    return (response) => {
      var assigneeExporter = new AssigneeExporter();
      assigneeExporter.process(repo_id, response);
      assigneeExporter.write();
    };
  };

  handleCommitsListResponse = (repo_id) => {
    return (response) => {
      var commitsExporter = new CommitsExporter();
      commitsExporter.process(repo_id, response);
      commitsExporter.write();
    };
  };

  handleBranchListResponse = (repo_id) => {
    return (response) => {
      var branchExporter = new BranchExporter();
      branchExporter.process(repo_id, response);
      branchExporter.write();
    };
  };

}
