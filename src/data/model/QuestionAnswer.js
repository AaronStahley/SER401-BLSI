import AbstractModel from "./AbstractModel";
import {observable} from "mobx";

export default class QuestionAnswer extends AbstractModel {
    Id               = null;
    StateId          = null;
    QuestionId       = null;
    QuestionOptionId = null;
}
