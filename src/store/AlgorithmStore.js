import AbstractStore from "./AbstractStore";
import Algorithm from "../model/Algorithm";

export default class AlgorithmStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(Algorithm, 'algorithm', rootStore, transporter, true);
    }

    contains(name, algorithmId, versionNumber) {
        let exists = false;
        this.collection.forEach((item) => {
            if(item.Name === name &&
                item.Id == algorithmId &&
                item.VersionId === versionNumber) {
                    exists = true;
            }
        })
        return exists;
    }
}