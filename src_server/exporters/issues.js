
import Exporter from './exporter';


export default class IssuesExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/issues.csv';
        this.header = 'repo_id,url,id,node_id,number,title,state,comments,created_at,updated_at,closed_at,author_association,body,user_login,user_id,user_node_id\n';

    }

    process(repo_id, data) {
        
        this.data = [];
        data.forEach(data => {

            // console.log('Issues Info:');
            // console.log(data);

            this.data.push({
                'repo_id': repo_id,
                'url': data.url ? data.url : '',
                'id': data.id ? data.id : '',
                'node_id': data.node_id ? data.node_id : '',
                'number': data.number ? data.number : '',
                'title': data.title ? data.title : '',
                'state': data.state ? data.state : '',
                'comments': data.comments ? data.comments : '',
                'created_at': data.created_at ? data.created_at : '',
                'updated_at': data.updated_at ? data.updated_at : '',
                'closed_at': data.closed_at ? data.closed_at : '',
                'author_association': data.author_association ? data.author_association : '',
                'body': data.body ? data.body : '',
                'user_login': data.user.login ? data.user.login : '',
                'user_id': data.user.id ? data.user.id : '',
                'user_node_id': data.user.node_id ? data.user.node_id : '',
            });

        });
    }

    write() {
        const output = [];
        this.data.forEach(data => {
            const str = `${data.repo_id},${data.url},${data.id},${data.node_id},${data.number},${data.title},${data.state},${data.comments},${data.created_at},${data.updated_at},${data.closed_at},${data.author_association},${data.body},${data.user_login},${data.user_id},${data.user_node_id}\n`;
            output.push(str);
        });
        return this.write_csv_multiple(output);

    }
}
