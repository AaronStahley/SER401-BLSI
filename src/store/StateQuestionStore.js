import AbstractStore from "./AbstractStore";
import StateQuestion from "../model/StateQuestion";

export default class StateQuestionStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(StateQuestion, 'state_question', rootStore, transporter);
    }
}