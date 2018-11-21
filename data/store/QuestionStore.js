import AbstractStore from "./AbstractStore";
import Question from "data/model/Question";

export default class QuestionStore extends AbstractStore {
    constructor(transporter) {
        super(Question, 'question', transporter);
    }
}