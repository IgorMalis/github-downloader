
import Exporter from './exporter';


export default class MilestoneExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/milestone.csv';
        this.header = 'repo_id,id,node_id,number,title,description,open_issues,closed_issues,state,created_at,updated_at,due_on,closed_at,creator_login,creator_id,creator_node_id,creator_type\n';

    }

    process(repo_id, data) {
        
        this.data = [];
        data.forEach(data => {

            // console.log('Branch Info:');
            // console.log(data);

            this.data.push({
                'repo_id': repo_id,
                'id': data.id ? data.id : '',
                'node_id': data.node_id ? data.node_id : '',
                'number': data.number ? data.number : '',
                'title': data.title ? data.title : '',
                'description': data.description ? data.description : '',
                'open_issues': data.open_issues ? data.open_issues : '',
                'closed_issues': data.closed_issues ? data.closed_issues : '',
                'state': data.state ? data.state : '',
                'created_at': data.created_at ? data.created_at : '',
                'updated_at': data.updated_at ? data.updated_at : '',
                'due_on': data.due_on ? data.due_on : '',
                'closed_at': data.closed_at ? data.closed_at : '',
                'creator_login': (data.creator&&data.creator.login) ? data.creator.login : '',
                'creator_id': (data.creator&&data.creator.id) ? data.creator.id : '',
                'creator_node_id': (data.creator&&data.creator.node_id) ? data.creator.node_id : '',
                'creator_type': (data.creator&&data.creator.type) ? data.creator.type : '',
            });

        });
    }

    write() {
        const output = [];
        this.data.forEach(data => {
            const str = `${data.repo_id},${data.id},${data.node_id},${data.number},${data.title},${data.description},${data.open_issues},${data.closed_issues},${data.state},${data.created_at},${data.updated_at},${data.due_on},${data.closed_at},${data.node_id},${data.creator?data.creator.login:''},${data.creator?data.creator.id:''},${data.creator?data.creator.node_id:''},${data.creator?data.creator.type:''}\n`;
            output.push(str);
        });
        return this.write_csv_multiple(output);

    }
}
