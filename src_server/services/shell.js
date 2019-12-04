const { exec } = require('child_process');

export function cloneRepository(url, path) {

    exec(`git clone ${url} output/source/${path}`, (err, stdout, stderr) => {
      if (err) {
        console.log(`** GIT ERROR **: ${stderr}`);
        return;
      }
    });

}
