
import UserMultipleExporter from './user_multiple';


export default class StargazerExporter extends UserMultipleExporter {
    constructor() {
        super();
        this.output = 'output/stargazer.csv';
    }
}
