/**
 * Create by Taylor Greeff
 */

import AbstractModel from "./AbstractModel";

export default class StateQuestion extends AbstractModel {
    StateId    = null;
    QuestionId = null;

    get State() {
        return this.rootStore.stateStore.get(this.StateId);
    }

    get Question() {
        return this.rootStore.questionStore.get(this.QuestionId);
    }
}