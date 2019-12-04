export default {
    token: '',
    quotaExceededTimeout: '',
    fields: {
        organization: {
            repositories: true,
        },
        repository: {
            assignees: true,
            branches: true,
            collaborators: false,
            comments: true,
            commits: true,
            forks: true,
            issues: true,
            issues_events: true,
            milestones: true,
            pull_requests: true,
            source_code: true,
            subscribers: true,
            stargazers: true,
            tags: true, 
        },
        user: {
            repositories: true,
        },
    },
  };
