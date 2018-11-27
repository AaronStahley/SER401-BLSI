import AbstractModel from "./AbstractModel";
import {observable} from "mobx";

export default class Question extends AbstractModel {
    Id       = null;
    Question = null;
    Options  = [];

    fromObj(obj) {
        if ('Options' in obj) {
            this.Options = obj.Options.map(option => {
                return new QuestionOption(option);
            });

            delete obj.Options;
        }
        return super.fromObj(obj);
    }
}


export class QuestionOption {
    Value                = null;
    Result               = null;//good|bad
    @observable Selected = false;

    constructor(obj) {
        this.Value    = obj.value;
        this.Result   = obj.result;
        this.Selected = obj.selected;
    }

}