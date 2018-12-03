import AbstractModel from "./AbstractModel";
import {observable} from "mobx";

export default class Question extends AbstractModel {
    Id       = null;
    Question = null;
    Type     = null;
    Prompt   = "";
    Options  = [];
    Answer   = null;
    State    = null;

    get Selected() {
        return this.Options.filter(option => option.Selected)[0];
    }

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
    Id                   = null;
    Value                = null;
    Result               = null;//good|bad
    @observable Selected = false;

    constructor(obj) {
        this.Id       = obj.Id;
        this.Value    = obj.Value;
        this.Result   = obj.Result;
        this.Selected = obj.Selected;
    }

}
