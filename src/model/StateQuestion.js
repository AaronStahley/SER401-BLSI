/**
 * Create by Taylor Greeff
 */

import AbstractModel from "./AbstractModel";

export default class StateQuestion extends AbstractModel {
    state_id    = null;
    question_id = null;

    get State() {
        return this.rootStore.stateStore.get(this.state_id);
    }

    get Question() {
        return this.rootStore.questionStore.get(this.question_id);
    }
}