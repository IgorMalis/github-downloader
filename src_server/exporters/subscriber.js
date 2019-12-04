
import UserMultipleExporter from './user_multiple';


export default class SubscriberExporter extends UserMultipleExporter {
    constructor() {
        super();
        this.output = 'output/subscribers.csv';
    }
}
