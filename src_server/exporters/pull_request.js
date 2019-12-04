
import Exporter from './exporter';


export default class PullRequestExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/pullrequest.csv';
        this.header = 'repo_id,url,id,node_id,html_url,diff_url,patch_url,issue_url,number,state,locked,title,user,body,created_at,updated_at,closed_at,merged_at,merge_commit_sha,assignee,assignees,requested_reviewers,requested_teams,labels,milestone,commits_url,statuses_url,author_association\n';

    }

    process(repo_id, data) {
        this.data = [];
        data.forEach(data => {
            this.data.push({
            'repo_id': repo_id,
            'url': data.url,
            'node_id': data.node_id,
            'html_url': data.html_url,
            'diff_url': data.diff_url,
            'patch_url': data.patch_url,
            'issue_url': data.issue_url,
            'number': data.number,
            'state': data.state,
            'locked': data.locked,
            'title': data.title,
            'user': data.user,
            'body': data.body ? data.body.replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/,/g, '<COMMA>') : '',
            'created_at': data.created_at,
            'updated_at': data.updated_at,
            'closed_at': data.closed_at,
            'merged_at': data.merged_at,
            'merge_commit_sha': data.merge_commit_sha,
            'assignee': data.assignee,
            'assignees': data.assignees,
            'requested_reviewers': data.requested_reviewers,
            'requested_teams': data.requested_teams,
            'labels': data.labels,
            'milestone': data.milestone,
            'commits_url': data.commits_url,
            'statuses_url': data.statuses_url,
            'author_association': data.author_association,
            });

        });

    }

    write() {

        const output = [];
        this.data.forEach(data => {
            const str = `${data.repo_id},${data.url},${data.node_id},${data.html_url},${data.diff_url},${data.patch_url},${data.issue_url},${data.number},${data.state},${data.locked},${data.title},${data.user},${data.body},${data.created_at},${data.updated_at},${data.closed_at},${data.merged_at},${data.merge_commit_sha},${data.assignee},${data.assignees},${data.requested_reviewers},${data.requested_teams},${data.labels},${data.milestone},${data.commits_url},${data.statuses_url},${data.author_association}\n`;
            output.push(str);
        });
        return this.write_csv_multiple(output);

    }
}
