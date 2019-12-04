import Exporter from './exporter';



export default class ReleaseExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/release.csv';
        this.header = 'id,node_id,name,full_name,private,owner,html_url,description,fork,url,forks_url,keys_url,collaborators_url,teams_url,hooks_url,issue_events_url,events_url,assignees_url,branches_url,tags_url,blobs_url,git_tags_url,git_refs_url,trees_url,statuses_url,languages_url,stargazers_url,contributors_url,subscribers_url,subscription_url,commits_url,git_commits_url,comments_url,issue_comment_url,contents_url,compare_url,merges_url,archive_url,downloads_url,issues_url,pulls_url,milestones_url,notifications_url,labels_url,releases_url,deployments_url,created_at,updated_at,pushed_at,git_url,ssh_url,clone_url,svn_url,homepage,size,stargazers_count,watchers_count,language,has_issues,has_projects,has_downloads,has_wiki,has_pages,forks_count,mirror_url,archived,disabled,open_issues_count,license,forks,open_issues,watchers,default_branch,network_count,subscribers_count\n';

    }

    process(data) {
        this.data = {
            'id': data.id,
            'node_id': data.node_id,
            'name': data.name,
            'full_name': data.full_name,
            'private': data.private,
            'owner': data.owner.id,
            'html_url': data.html_url,
            'description': data.description,
            'fork': data.fork,
            'url': data.url,
            'forks_url': data.forks_url,
            'keys_url': data.keys_url,
            'collaborators_url': data.collaborators_url,
            'teams_url': data.teams_url,
            'hooks_url': data.hooks_url,
            'issue_events_url': data.issue_events_url,
            'events_url': data.events_url,
            'assignees_url': data.assignees_url,
            'branches_url': data.branches_url,
            'tags_url': data.tags_url,
            'blobs_url': data.blobs_url,
            'git_tags_url': data.git_tags_url,
            'git_refs_url': data.git_refs_url,
            'trees_url': data.trees_url,
            'statuses_url': data.statuses_url,
            'languages_url': data.languages_url,
            'stargazers_url': data.stargazers_url,
            'contributors_url': data.contributors_url,
            'subscribers_url': data.subscribers_url,
            'subscription_url': data.subscription_url,
            'commits_url': data.commits_url,
            'git_commits_url': data.git_commits_url,
            'comments_url': data.comments_url,
            'issue_comment_url': data.issue_comment_url,
            'contents_url': data.contents_url,
            'compare_url': data.compare_url,
            'merges_url': data.merges_url,
            'archive_url': data.archive_url,
            'downloads_url': data.downloads_url,
            'issues_url': data.issues_url,
            'pulls_url': data.pulls_url,
            'milestones_url': data.milestones_url,
            'notifications_url': data.notifications_url.replace(/,/g, '<COMMA>'),
            'labels_url': data.labels_url,
            'releases_url': data.releases_url,
            'deployments_url': data.deployments_url,
            'created_at': data.created_at,
            'updated_at': data.updated_at,
            'pushed_at': data.pushed_at,
            'git_url': data.git_url,
            'ssh_url': data.ssh_url,
            'clone_url': data.clone_url,
            'svn_url': data.svn_url,
            'homepage': data.homepage,
            'size': data.size,
            'stargazers_count': data.stargazers_count,
            'watchers_count': data.watchers_count,
            'language': data.language,
            'has_issues': data.has_issues,
            'has_projects': data.has_projects,
            'has_downloads': data.has_downloads,
            'has_wiki': data.has_wiki,
            'has_pages': data.has_pages,
            'forks_count': data.forks_count,
            'mirror_url': data.mirror_url,
            'archived': data.archived,
            'disabled': data.disabled,
            'open_issues_count': data.open_issues_count,
            'license': data.license,
            'forks': data.forks,
            'open_issues': data.open_issues,
            'watchers': data.watchers,
            'default_branch': data.default_branch,
            'network_count': data.network_count,
            'subscribers_count': data.subscribers_count,
        };

    }

    write() {
        const data = this.data;
        const str = `${data.id},${data.node_id},${data.name},${data.full_name},${data.private},${data.owner},${data.html_url},${data.description},${data.fork},${data.url},${data.forks_url},${data.keys_url},${data.collaborators_url},${data.teams_url},${data.hooks_url},${data.issue_events_url},${data.events_url},${data.assignees_url},${data.branches_url},${data.tags_url},${data.blobs_url},${data.git_tags_url},${data.git_refs_url},${data.trees_url},${data.statuses_url},${data.languages_url},${data.stargazers_url},${data.contributors_url},${data.subscribers_url},${data.subscription_url},${data.commits_url},${data.git_commits_url},${data.comments_url},${data.issue_comment_url},${data.contents_url},${data.compare_url},${data.merges_url},${data.archive_url},${data.downloads_url},${data.issues_url},${data.pulls_url},${data.milestones_url},${data.notifications_url},${data.labels_url},${data.releases_url},${data.deployments_url},${data.created_at},${data.updated_at},${data.pushed_at},${data.git_url},${data.ssh_url},${data.clone_url},${data.svn_url},${data.homepage},${data.size},${data.stargazers_count},${data.watchers_count},${data.language},${data.has_issues},${data.has_projects},${data.has_downloads},${data.has_wiki},${data.has_pages},${data.forks_count},${data.mirror_url},${data.archived},${data.disabled},${data.open_issues_count},${data.license},${data.forks},${data.open_issues},${data.watchers},${data.default_branch},${data.network_count},${data.subscribers_count}\n`;
        this.write_csv(str);

    }
}
