import AbstractModel from "./AbstractModel";
import {observable} from "mobx";

export default class Question extends AbstractModel {
    @observable Id       = null;
    @observable Question = null;
    @observable Options  = [];

    fromObj(json){

        //todo:: convert question options to objects

        return super.fromObj(json);
    }
}


export class QuestionOption extends AbstractModel {
    @observable Value    = null;
    @observable Result   = null;//good|bad
    @observable Selected = false;

}