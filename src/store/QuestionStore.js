import Question from "../model/Question";
import AbstractAlgorithmStore from "./AbstractAlgorithmStore";

export default class QuestionStore extends AbstractAlgorithmStore {
    algorithm;
    static TABLE_NAME = 'question';

    constructor(rootStore, algorithm, transporter) {
        super(Question, QuestionStore.TABLE_NAME, algorithm, rootStore, transporter);
    }


    insertWithOptions = (json) => {
        let options = json.question_options;
        delete json.question_options;

        return this.insert(json)
            .then((question_id) => Promise.all(options.map((item) => {
                delete item.id;
                item.question_id = question_id;
                return this.rootStore.questionOptionStore.insert(item);
            }))
                .then(() => question_id))
    };
}