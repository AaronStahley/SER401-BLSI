import AbstractStore from "./AbstractStore";
import Question from "./../model/Question";

export default class QuestionStore extends AbstractStore {
    constructor(transporter) {
        super(Question, 'question', transporter);
    }
}