import UserMultipleExporter from './user_multiple';


export default class AssigneeExporter extends UserMultipleExporter {
    constructor() {
        super();
        this.output = 'output/assignees.csv';
    }
}
