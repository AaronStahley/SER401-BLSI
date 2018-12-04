import AbstractModel from "./AbstractModel";
import {computed, observable} from "mobx";

export default class QuestionAnswer extends AbstractModel {
    Id                           = null;
    StateId                      = null;
    QuestionId                   = null;
    @observable QuestionOptionId = null;
    @observable TextAnswer       = null;
    Question                     = null;

    @computed
    get completed() {
        return (this.QuestionOptionId !== null || this.TextAnswer !== null);
    }

    get State() {
        return this.store.rootStore.stateStore.getPK(this.StateId);
    }

    get QuestionOption() {
        return this.store.rootStore.questionOptionStore.getPK(this.QuestionOptionId);
    }

    get IsGood() {
        if (this.QuestionOption) {
            return this.QuestionOption.IsGood;
        }

        //TODO:: determin how to tell if text input is bad or good
        return true;
    }
}
