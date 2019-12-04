import Exporter from './exporter';


export default class CollaboratorExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/Collaborator.csv';
        this.header = 'repo_id,id,login,node_id,type,site_admin\n';

    }

    process(repo_id, data) {
        
        console.log('Collaborators Info:');
        console.log(data);

        this.data = [];
        data.forEach(data => {
            this.data.push({
                'repo_id': repo_id,
                'id': data.id ? data.id : '',
                'login': data.login ? data.login : '',
                'node_id': data.node_id ? data.node_id : '',
                'type': data.type ? data.type : '',
                'site_admin': data.site_admin ? data.site_admin : '',
            });

        });
    }

    write() {
        const output = [];
        this.data.forEach(data => {
            const str = `${data.repo_id},${data.id},${data.login},${data.node_id},${data.type},${data.site_admin}\n`;
            output.push(str);
        });
        return this.write_csv_multiple(output);

    }
}
