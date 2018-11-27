import AbstractStore from "./AbstractStore";
import Algorithm from "data/model/Algorithm";

export default class AlgorithmStore extends AbstractStore {
    constructor(transporter) {
        super(Algorithm, 'algorithm', transporter);
    }
}