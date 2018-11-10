import {observable} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class State extends AbstractModel {
    @observable Id              = null;
    @observable Next            = {
        good: null,
        bad : null
    };
    @observable Questions       = [];
    @observable Recommendations = [];

    get NextState() {
        // add logic to determine next state based on question answers
        return null;
    }


    fromObj(json) {

        //todo:: convert questions to objects
        //todo:: convert recommendations to objects

        return super.fromObj(json);
    }
}