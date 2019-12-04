import Exporter from './exporter';


export default class CommitsExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/commits.csv';
        this.header = 'repo_id,sha,node_id,node_id,committer_email,commit_message,commit_comment_count,commit_verified,commit_author_name,commit_author_email,commit_author_date, commit_committer_name, commit_committer_email, commit_committer_date,url,html_url,comments_url,author_id,author_login,author_node_id,author_type,author_site_admin,committer_id,committer_login,committer_node_id,committer_type,committer_site_admin\n';

    }

    process(repo_id, data) {

           

        this.data = [];

        data.forEach(data => {

            console.log('** COMMIT DATA:');
            console.log(data);
            
            this.data.push({
                'repo_id': repo_id,
                'sha': data.sha,
                'node_id': data.node_id,
                'committer_name': data.commit.committer.name,
                'committer_email': data.commit.committer.email,
                'commit_message': data.commit.message.replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/,/g, '<COMMA>'),
                'commit_comment_count': data.commit.comment_count,
                'commit_verified': data.commit.verification.verified,

                'commit_author_name': data.commit.author.name ? data.commit.author.name : '',
                'commit_author_email': data.commit.author.email ? data.commit.author.email : '',
                'commit_author_date': data.commit.author.date ? data.commit.author.date : '',
                'commit_committer_name': data.commit.committer.name ? data.commit.committer.name : '',
                'commit_committer_email': data.commit.committer.email ? data.commit.committer.email : '',
                'commit_committer_date': data.commit.committer.date ? data.commit.committer.date : '',

                'url': data.url,
                'html_url': data.html_url,
                'comments_url': data.comments_url,
                'author_id': data.author ? data.author.id : '',
                'author_login': data.author ? data.author.login : '',
                'author_node_id': data.author ? data.author.node_id : '',
                'author_type': data.author ? data.author.type : '',
                'author_site_admin': data.author ? data.author.site_admin : '',
                'committer_id': data.committer ? data.committer.id : '',
                'committer_login': data.committer ? data.committer.login : '',
                'committer_node_id': data.committer ? data.committer.node_id : '',
                'committer_type': data.committer ? data.committer.type : '',
                'committer_site_admin': data.committer ? data.committer.site_admin : '',

            });

        });

    }

    write() {
        const output = [];
        this.data.forEach(data => {
            const str = `${data.repo_id},${data.sha},${data.node_id},${data.committer_name},${data.committer_email},${data.commit_message},${data.commit_comment_count},${data.commit_verified},${data.author_name},${data.author_email},${data.author_date},${data.committer_name},${data.committer_email},${data.committer_date},${data.url},${data.html_url},${data.comments_url},${data.author_id},${data.author_login},${data.author_node_id},${data.author_site_admin},${data.author_type},${data.committer_id},${data.committer_login},${data.committer_node_id},${data.committer_type},${data.committer_site_admin}\n`;
            output.push(str);
        });
        return this.write_csv_multiple(output);

    }
}
