import Exporter from './exporter';


export default class IssueEventsExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/IssueEvents.csv';        
        this.header = 'repo_id,url,id,node_id,event,commit_id,state,created_at,actor_login,actor_id,actor_node_id,issue_url,issue_id,issue_node_id,issue_number,issue_title,issue_user_id,issue_user_login,issue_user_node_id,issue_state,issue_comments,issue_created_at,issue_updated_at,issue_closed_at,issue_author_association,issue_body\n';
    }

    process(repo_id, data) {
        
        this.data = [];
        data.forEach(data => {

            let d = {
                'repo_id': repo_id,
                'url': data.url ? data.url : '',
                'id': data.id ? data.id : '',
                'node_id': data.node_id ? data.node_id : '',
                'event': data.event ? data.event : '',
                'commit_id': data.commit_id ? data.commit_id : '',
                'state': data.state ? data.state : '',
                'created_at': data.created_at ? data.created_at : '',
                'issue_url': data.issue.url ? data.issue.url : '',
                'issue_id': data.issue.id ? data.issue.id : '',
                'issue_node_id': data.issue.node_id ? data.issue.node_id : '',
                'issue_number': data.issue.number ? data.issue.number : '',
                'issue_title': data.issue.title ? data.issue.title : '',
                'issue_user_id': data.issue.user.id ? data.issue.user.id : '',
                'issue_user_login': data.issue.user.login ? data.issue.user.login : '',
                'issue_user_node_id': data.issue.user.node_id ? data.issue.user.node_id : '',
                'issue_state': data.issue.state ? data.issue.state : '',
                'issue_comments': data.issue.comments ? data.issue.comments : '',
                'issue_created_at': data.issue.created_at ? data.issue.created_at : '',
                'issue_updated_at': data.issue.updated_at ? data.issue.updated_at : '',
                'issue_closed_at': data.issue.closed_at ? data.issue.closed_at : '',
                'issue_author_association': data.issue.author_association ? data.issue.author_association : '',
                'issue_body': data.issue.body ? data.issue.body : '',
            };

            if (data.actor) {
                d = {...d,
                    actor: {
                        login: data.actor.login ? data.actor.login : '',
                        id: data.actor.id ? data.actor.id : '',
                        node_id: data.actor.node_id ? data.actor.node_id : '',
                    },
                };
            } else {
                d = {...d,
                    actor: {
                        login: '',
                        id: '',
                        node_id: '',
                    },
                };
            }

            this.data.push(d);
        });
    }

    write() {
        const output = [];
        this.data.forEach(data => {
            const str = `${data.repo_id},${data.url},${data.id},${data.node_id},${data.event},${data.commit_id},${data.state},${data.created_at},${data.actor.login},${data.actor.id},${data.actor.node_id},${data.issue?data.issue.url:''},${data.issue?data.issue.id:''},${data.issue?data.issue.node_id:''},${data.issue?data.issue.number:''},${data.issue?data.issue.title:''},${data.issue?data.issue.user.id:''},${data.issue && data.issue.user?data.issue.user.login : ''},${data.issue && data.issue.user?data.issue.user.node_id:''},${data.issue && data.issue.user?data.issue.state:''},${data.issue?data.issue.comments:''},${data.issue?data.issue.created_at:''},${data.issue?data.issue.updated_at:''},${data.issue?data.issue.closed_at:''},${data.issue?data.issue.author_association:''},${data.issue?data.issue.body:''}\n`;
            output.push(str);
        });
        return this.write_csv_multiple(output);

    }
}
