import AbstractModel from "./AbstractModel";

export default class QuestionOption extends AbstractModel {
    Id       = null;
    Value    = null;
    MinValue = null;
    MaxValue = null;
    IsGood   = null;//true|false
}