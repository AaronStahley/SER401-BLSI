import AbstractStore from "./AbstractStore";
import Question from "../model/Question";

export default class QuestionStore extends AbstractStore {
    algorithm;

    constructor(rootStore, algorithm, transporter) {
        super(Question, 'question', rootStore, transporter);
        this.algorithm = algorithm;
    }

    init() {
        return this.transporter.select(`select * from ${this.table} where algorithm_id = ?;`, [this.algorithm.Id])
            .then(this.processResults)
    }


    dynamicInsertionAll = (funcName, questions) => {
        return Promise.all(questions.map((item) => {
            this.dynamicInsertionWithParts(funcName, item);
        }));
    };

    dynamicInsertionWithParts = (funcName, json) => {
        let options = json.question_options;
        delete json.question_options;

        return this[funcName](json)
            .then((res) => Promise.all(options.map((item) => this.rootStore.questionOptionStore[funcName](item)))
                .then(() => res))
    };
}