import AbstractModel from "./AbstractModel";
import {computed, observable} from "mobx";

export default class QuestionAnswer extends AbstractModel {
    id                             = null;
    question_id                    = null;
    @observable state_path         = null;
    @observable question_option_id = null;
    @observable number_answer      = null;

    @computed
    get completed() {
        return (this.question_option_id !== null || this.number_answer !== null);
    }

    @computed
    get question() {
        return this.store.rootStore.questionStore.get(this.question_id);
    }

    @computed
    get QuestionOption() {
        return this.store.rootStore.questionOptionStore.get(this.question_option_id);
    }

    get IsGood() {
        if (this.QuestionOption) {
            return this.QuestionOption.is_good;
        }

        return null;
    }
}
