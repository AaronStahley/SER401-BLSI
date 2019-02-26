import AbstractStore from "./AbstractStore";
import Algorithm from "../model/Algorithm";

export default class AlgorithmStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(Algorithm, 'algorithm', rootStore, transporter, true);
    }

    update = (json) => { 
        let str = this.jsonToSqlUpdateString(json);
        return this.transporter.select(`update ${this.table} set ${str} where id = ${json.id};`)
            .then(this.processResults)
            .then(res => res.length > 0 ? res[0] : null);
    };
}