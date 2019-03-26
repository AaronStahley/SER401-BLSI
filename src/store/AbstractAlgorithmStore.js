import AbstractStore from "./AbstractStore";

export default class AbstractAlgorithmStore extends AbstractStore {
    algorithm;

    constructor(Question, TABLE_NAME, algorithm, rootStore, transporter) {
        super(Question, TABLE_NAME, rootStore, transporter);
        this.algorithm = algorithm;
    }


    init() {
        return this.transporter.select(`select * from ${this.table} where algorithm_id = ?;`, [this.algorithm.id])
            .then(this.processResults)
    }


    deleteAll() {
        this.collection.clear();
        return this.transporter.execute(`delete from ${this.table} where algorithm_id = ?;`, [this.algorithm.id]);
    }


}