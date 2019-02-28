import AbstractStore from "./AbstractStore";
import Question from "../model/Question";
import {QuestionOption} from "../model/Question";
import BluebirdPromise from "../common/BluebirdPromise";

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
                    return this.rootStore.QuestionOptionStore.update(item);
                }))
                return res;
            })
    };

    insertAll = (questions) => {
        return Promise.all(questions.map((item) => {
            this.rootStore.questionStore.insertWithParts(item);
        }));
    }

    insertWithParts = (json) => {
        let options = json.question_options;
        delete json.question_options;

        return this.insert(json)
            .then((res) => {
                Promise.all(options.map((item) => {
                    return this.rootStore.QuestionOptionStore.insert(item);
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
                    return this.rootStore.QuestionOptionStore.updateOrInsert(item);
                }))
                return res;
            })
    };
}