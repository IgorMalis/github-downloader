import Exporter from './exporter';


export default class CommentExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/comment.csv';
        this.header = 'repo_id,url,html_url,id,node_id,position,line,path,commit_id,created_at,updated_id,author_association,body,User_Id,User_Login,User_Type\n';
    }

    process(repo_id, data) {
        
        this.data = [];
        data.forEach(data => {

            // console.log('Comment Info:');
            // console.log(data);

            this.data.push({
                'repo_id': repo_id,
                'url': data.url ? data.url : '',
                'html_url': data.html_url ? data.html_url : '',
                'id': data.id ? data.id : '',
                'node_id': data.node_id ? data.node_id : '',
                'position': data.position ? data.position : '',
                'line': data.line ? data.line : '',
                'path': data.path ? data.path : '',
                'commit_id': data.commit_id ? data.commit_id : '',
                'created_at': data.created_at ? data.created_at : '',
                'updated_at': data.updated_at ? data.updated_at : '',
                'author_association': data.author_association ? data.author_association : '',
                'body': data.body ? data.body.replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/,/g, '<COMMA>') : '',
                'User_id': data.user.id ? data.user.id : '',
                'User_login': data.user.login ? data.user.login : '',
                'User_type': data.user.type ? data.user.type : '',
            });

        });
    }

    write() {
        const output = [];
        this.data.forEach(data => {
            const str = `${data.repo_id},${data.url},${data.html_url},${data.id},${data.node_id},${data.position},${data.line},${data.path},${data.commit_id},${data.created_at},${data.updated_at},${data.author_association},${data.body},${data.User_id},${data.User_login},${data.User_type}\n`;
            output.push(str);
        });
        return this.write_csv_multiple(output);

    }
}
