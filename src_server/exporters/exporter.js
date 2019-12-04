import writeFile from './csv';

export default class Exporter {
  constructor() {
    this.data = null;
    this.output = null;
  }

  write_csv(str) {
    writeFile(this.output, this.header);
    writeFile(this.output, str);
  }

  write_csv_multiple(str) {
    writeFile(this.output, this.header);
    str.forEach(s => {
        writeFile(this.output, s);
    });
  }
  
}
