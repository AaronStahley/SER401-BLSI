import AbstractModel from "./AbstractModel";
import {observable, action, computed} from "mobx";
import BluebirdPromise from "../common/BluebirdPromise";

export default class Question extends AbstractModel {
    Id                  = null;
    Question            = null;
    Prompt              = "";
    TypeKey             = null;
    @observable Options = [];
    @observable Answer  = null;
    State               = null;

    @computed
    get completed() {
        return this.Answer && this.Answer.completed
    }

    @action
    init(state) {
        this.State = state;
        return BluebirdPromise.all([
            this.store.rootStore.questionOptionStore.findQuestionOptions(this)
                .then((options) => {
                    this.Options = options;
                }),
            this.store.rootStore.questionAnswerStore.findQuestionAnswer(this)
                .then((answer) => {
                    if (!answer) {
                        answer = this.store.rootStore.questionAnswerStore.create(this)
                    }
                    this.Answer          = answer;
                    this.Answer.Question = this;
                })
        ]).then((res) => this);
    }


    convertNumberToOption(number) {
        let selected = this.Options.filter(option => {
            let valid = true;
            if (valid && option.MinValue !== null) {
                valid = option.MinValue <= number;
            }
            if (valid && option.MaxValue !== null) {
                valid = option.MaxValue >= number;
            }
            return valid;
        });

        if (selected.length > 0) {
            return selected[0];
        }

        return null;
    }
}
