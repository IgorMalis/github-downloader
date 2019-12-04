const fs = require('fs');

export default function writeFile(file, data) {
    return fs.appendFileSync(file, data, function(err) {
        if (err) {
            return console.log(err);
        }
    }); 
}
