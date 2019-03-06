import AbstractStore from "./AbstractStore";
import Question from "../model/Question";

export default class QuestionStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(Question, 'question', rootStore, transporter, true);
    }

    findStateQuestions = state => {
        return this.transporter.select(`
SELECT question.* FROM question 
JOIN state_question ON question.id = state_question.question_id
WHERE state_question.state_id = ?`, [state.Id])
            .then(this.processResults);
    };

    updateAll = (questions) => {
        return Promise.all(questions.map((item) => {
            this.rootStore.questionStore.updateWithParts(item);
        }));
    }

    updateWithParts = (json) => {
        let options = json.question_options;
        delete json.question_options;

        return this.update(json)
            .then((res) => {
                Promise.all(options.map((item) => {
                    return this.rootStore.questionOptionStore.update(item);
                }))
                return res;
            })
    };

    insertAll = (questions, updateCallback) => {
        return Promise.all(questions.map((item) => {
            this.rootStore.questionStore.insertWithParts(item, updateCallback);
        }));
    }

    insertWithParts = (json, updateCallback) => {
        let options = json.question_options;
        delete json.question_options;

        return this.insert(json, updateCallback)
            .then((res) => {
                Promise.all(options.map((item) => {
                    return this.rootStore.questionOptionStore.insert(item, updateCallback);
                }))
                return res;
            })
    };

    updateOrInsertAll = (questions) => {
        return Promise.all(questions.map((item) => {
            this.rootStore.questionStore.updateOrInsertWithParts(item);
        }));
    }

    updateOrInsertWithParts = (json) => {
        let options = json.question_options;
        delete json.question_options;

        return this.updateOrInsert(json)
            .then((res) => {
                Promise.all(options.map((item) => {
                    return this.rootStore.questionOptionStore.updateOrInsert(item);
                }))
                return res;
            })
    };
}