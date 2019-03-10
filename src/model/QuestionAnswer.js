import AbstractModel from "./AbstractModel";
import {computed, observable} from "mobx";

export default class QuestionAnswer extends AbstractModel {
    Id                           = null;
    QuestionId                   = null;
    StatePath                    = null;
    @observable QuestionOptionId = null;
    @observable NumberAnswer     = null;

    @computed
    get completed() {
        return (this.QuestionOptionId !== null || this.NumberAnswer !== null);
    }

    get question() {
        return this.store.rootStore.questionStore.get(this.QuestionId);
    }

    get QuestionOption() {
        return this.store.rootStore.questionOptionStore.get(this.QuestionOptionId);
    }

    get IsGood() {
        if (this.QuestionOption) {
            return this.QuestionOption.IsGood;
        }

        return null;
    }

    save() {
        if (!this.Id) {
            return this.store.insert(this.toJson())
                .then(insertId => {
                    this.Id = insertId;
                    this.store.register(this);
                    this.reload();
                });
        } else {
            return this.store.update(this.toJson())
                .then(good => {
                    if (good === true) {
                        this.reload();
                    }
                });
        }
    }
}
