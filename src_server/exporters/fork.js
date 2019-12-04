import Exporter from './exporter';


export default class ForkExporter extends Exporter {
    constructor() {
        super();
        this.output = 'output/fork.csv';
        this.header = `repo_id,id,node_id,name,full_name,private,owner_login,owner_id,owner_node_id,owner_type,owner_site_admin,html_url,description,fork,created_at,updated_at,pushed_at,git_url,ssh_url,clone_url,svn_url,stargazers_count,watchers_count,language,has_issues,has_projects,has_downloads,has_wiki,has_pages,forks_count,mirror_url,archived,disabled,open_issues_count,license,forks,open_issues,watchers,default_branch}\n`;
    }

    process(repo_id, data) {

        this.data = [];
        data.forEach(data => {

            this.data.push({
                'repo_id': repo_id,
                'id': data.id ? data.id : '',
                'node_id': data.node_id ? data.node_id : '',
                'name': data.name ? data.name : '',
                'full_name': data.full_name ? data.full_name : '',
                'private': data.private ? data.private : '',
                'owner_login': data.owner.login ? data.owner.login : '',
                'owner_id': data.owner.id ? data.owner.id : '',
                'owner_node_id': data.owner.node_id ? data.owner.node_id : '',
                'owner_type': data.owner.type ? data.owner.type : '',
                'owner_site_admin': data.owner.site_admin ? data.owner.site_admin : '',
                'html_url': data.html_url ? data.html_url : '',
                'description': data.description ? data.description : '',
                'fork': data.fork ? data.fork : '',
                'created_at': data.created_at ? data.created_at : '',
                'updated_at': data.updated_at ? data.updated_at : '',
                'pushed_at': data.pushed_at ? data.pushed_at : '',
                'git_url': data.git_url ? data.git_url : '',
                'ssh_url': data.ssh_url ? data.ssh_url : '',
                'clone_url': data.clone_url ? data.clone_url : '',
                'svn_url': data.svn_url ? data.svn_url : '',
                'stargazers_count': data.stargazers_count ? data.stargazers_count : '',
                'watchers_count': data.watchers_count ? data.watchers_count : '',
                'language': data.language ? data.language : '',
                'has_issues': data.has_issues ? data.has_issues : '',
                'has_projects': data.has_projects ? data.has_projectsv : '',
                'has_downloads': data.has_downloads ? data.has_downloads : '',
                'has_wiki': data.has_wiki ? data.has_wiki : '',
                'has_pages': data.has_pages ? data.has_pages : '',
                'forks_count': data.forks_count ? data.forks_count : '',
                'mirror_url': data.mirror_url ? data.mirror_url : '',
                'archived': data.archived ? data.archived : '',
                'disabled': data.disabled ? data.disabled : '',
                'open_issues_count': data.open_issues_count ? data.open_issues_count : '',
                'license': data.license ? data.license : '',
                'forks': data.forks ? data.forks : '',
                'open_issues': data.open_issues ? data.open_issues : '',
                'watchers': data.watchers ? data.watchers : '',
                'default_branch': data.default_branch ? data.default_branch : '',
                
            });

        });

    }

    write() {
        const output = [];
        this.data.forEach(data => {
            const str = `${data.repo_id},${data.id},${data.node_id},${data.name},${data.full_name},${data.private},${data.owner_login},${data.owner_id},${data.owner_node_id},${data.owner_type},${data.owner_site_admin},${data.html_url},${data.description},${data.fork},${data.created_at},${data.updated_at},${data.pushed_at},${data.git_url},${data.ssh_url},${data.clone_url},${data.svn_url},${data.stargazers_count},${data.watchers_count},${data.language},${data.has_issues},${data.has_projects},${data.has_downloads},${data.has_wiki},${data.has_pages},${data.forks_count},${data.mirror_url},${data.archived},${data.disabled},${data.open_issues_count},${data.license},${data.forks},${data.open_issues},${data.watchers},${data.default_branch}\n`;            
            output.push(str);
        });
        return this.write_csv_multiple(output);

    }
}
