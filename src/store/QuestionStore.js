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

    updateAll = (questions) => {
        return Promise.all(questions.map((item) => {
            this.rootStore.questionStore.updateWithParts(item);
        }));
    };

    updateWithParts = (json) => {
        let options = json.question_options;
        delete json.question_options;

        return this.update(json)
            .then((res) => Promise.all(options.map((item) => this.rootStore.questionOptionStore.update(item)))
                .then(() => res)
            )
    };

    insertAll = (questions) => {
        return Promise.all(questions.map((item) => {
            this.rootStore.questionStore.insertWithParts(item);
        }));
    };

    insertWithParts = (json) => {
        let options = json.question_options;
        delete json.question_options;

        return this.insert(json)
            .then((res) => Promise.all(options.map((item) => this.rootStore.questionOptionStore.insert(item)))
                .then(() => res))
    };

    updateOrInsertAll = (questions) => {
        return Promise.all(questions.map((item) => {
            this.rootStore.questionStore.updateOrInsertWithParts(item);
        }));
    };

    updateOrInsertWithParts = (json) => {
        let options = json.question_options;
        delete json.question_options;

        return this.updateOrInsert(json)
            .then((res) => Promise.all(options.map((item) => this.rootStore.questionOptionStore.updateOrInsert(item)))
                .then(() => res))

    };

    dynamicInsertionAll = (funcName, questions) => {
        return Promise.all(questions.map((item) => {
            this.rootStore.questionStore.dynamicInsertionWithParts(funcName, item);
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