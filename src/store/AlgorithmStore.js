import AbstractStore from "./AbstractStore";
import Algorithm from "../model/Algorithm";

export default class AlgorithmStore extends AbstractStore {

    static TABLE_NAME = 'algorithm';

    constructor(rootStore, transporter) {
        super(Algorithm, AlgorithmStore.TABLE_NAME, rootStore, transporter, true);
    }

    contains(algorithm, algo_json) {
        let exists = false;
        this.collection.forEach((item) => {
            if(item.Id === algorithm.algorithm_id &&
                item.DateModified === algo_json.date_modified &&
                item.VersionId === algorithm.version_number) {
                    exists = true;
            }
        })
        return exists;
    }
}