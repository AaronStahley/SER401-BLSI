import AbstractStore from "./AbstractStore";
import Question from "../model/Question";
import {QuestionOption} from "../model/Question";
import BluebirdPromise from "../../common/BluebirdPromise";

export default class QuestionStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(Question, 'question', rootStore, transporter);
    }


    findStateQuestions = state => {
        return this.transporter.select(`
SELECT question.* FROM question 
JOIN state_question ON question.id = state_question.question_id
WHERE state_question.state_id = ?`, [state.Id])
            .then(this.preProcessResults)
            .then(this.processResults)
            .then(questions => {

                questions.forEach(question => {
                    questions.State = state;
                });

                return questions;
            })
            .then(this.postProcessResults);
    };


    postProcessResults = (questions) => {
        return BluebirdPromise.all(
            questions.map(question => {
                // return BluebirdPromise.all(
                    return this.transporter.select(`SELECT * FROM question_option WHERE question_option.question_id = ?`, [question.Id])
                        .then((options) => {
                            question.Options = options.map(option => {
                                return new QuestionOption(this.convertFieldNames(option));
                            });

                            switch (question.Options.length) {
                                case 0:
                                case 1:
                                    question.Type = 'text';
                                    break;
                                case 2:
                                    question.Type = 'binary';
                                    break;
                                default:
                                    question.Type = 'select';
                            }

                        })
                    // this.rootStore.questionAnswerStore.findQuestionAnswer(question)
                    //     .then(answer => {
                    //         question.Answer = answer;
                    //     })
                // )
            })
        ).then(() => {
            return questions;
        })
    };
}