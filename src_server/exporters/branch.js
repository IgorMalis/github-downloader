import Exporter from './exporter';


export default class BranchExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/branch.csv';
        this.header = 'repo_id,name,protected\n';
    }

    process(repo_id, data) {
        
        this.data = [];
        data.forEach(data => {

            // console.log('Branch Info:');
            // console.log(data);

            this.data.push({
                'repo_id': repo_id,
                'name': data.name ? data.name : '',
                'protected': data.protected ? data.protected : '',
            });

        });
    }

    write() {
        const output = [];
        this.data.forEach(data => {
            const str = `${data.repo_id},${data.name},${data.protected}\n`;
            output.push(str);
        });
        return this.write_csv_multiple(output);

    }
}
