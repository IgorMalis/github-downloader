
import Exporter from './exporter';


export default class TagExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/tag.csv';
        this.header = 'repo_id,name,zipball_url,tarball_url,node_id\n';

    }

    process(repo_id, data) {
        
        this.data = [];
        data.forEach(data => {
            this.data.push({
                'repo_id': repo_id,
                'name': data.name ? data.name : '',
                'zipball_url': data.zipball_url ? data.zipball_url : '',
                'tarball_url': data.tarball_url ? data.tarball_url : '',
                'node_id': data.node_id ? data.node_id : '',
            });

        });
    }

    write() {
        const output = [];
        this.data.forEach(data => {
            const str = `${data.repo_id},${data.name},${data.zipball_url},${data.tarball_url},${data.node_id}\n`;
            output.push(str);
        });
        return this.write_csv_multiple(output);

    }
}
