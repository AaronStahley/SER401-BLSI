import AbstractModel from "./AbstractModel";

export default class QuestionOption extends AbstractModel {
    Id        = null;
    Label     = null;
    _MinValue = null;
    _MaxValue = null;
    IsGood    = null;//true|false

    set MinValue(val) {
        this._MinValue = val !== null ? val * 1 : null
    }

    get MinValue() {
        return this._MinValue;
    }

    set MaxValue(val) {
        this._MaxValue = val !== null ? val * 1 : null
    }

    get MaxValue() {
        return this._MaxValue;
    }

}