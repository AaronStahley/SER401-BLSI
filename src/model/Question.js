import AbstractModel from "./AbstractModel";
import {observable, action, computed} from "mobx";
import * as mobx from "mobx";
import BluebirdPromise from "../common/BluebirdPromise";

export default class Question extends AbstractModel {
    Id          = null;
    Question    = null;
    Prompt      = "";
    TypeKey     = null;
    AlgorithmId = null;

    get Options() {
        return this.rootStore.questionOptionStore.collection.filter(option => option.QuestionId === this.Id)
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
