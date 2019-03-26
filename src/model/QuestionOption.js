import AbstractModel from "./AbstractModel";

export default class QuestionOption extends AbstractModel {
    id          = null;
    question_id = null;
    label       = null;
    _min_value  = null;
    _max_value  = null;
    is_good     = null;//true|false

    set min_value(val) {
        this._min_value = val !== null ? val * 1 : null
    }

    get min_value() {
        return this._min_value;
    }

    set max_value(val) {
        this._max_value = val !== null ? val * 1 : null
    }

    get max_value() {
        return this._max_value;
    }

}