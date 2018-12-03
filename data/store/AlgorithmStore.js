import AbstractStore from "./AbstractStore";
import Algorithm from "./../model/Algorithm";

export default class AlgorithmStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(Algorithm, 'algorithm', rootStore, transporter);
    }

}