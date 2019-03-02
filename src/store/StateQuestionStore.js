import AbstractStore from "./AbstractStore";
import BluebirdPromise from "../common/BluebirdPromise";
import StateQuestion from "../model/StateQuestion";

export default class StateQuestionStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(StateQuestion, 'state_question', rootStore, transporter);
    }
}