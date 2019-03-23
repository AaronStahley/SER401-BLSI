import AbstractStore from "./AbstractStore";
import Algorithm from "../model/Algorithm";

export default class AlgorithmStore extends AbstractStore {

    static TABLE_NAME = 'algorithm';

    constructor(rootStore, transporter) {
        super(Algorithm, AlgorithmStore.TABLE_NAME, rootStore, transporter, true);
    }
}