import {observable, action} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class State extends AbstractModel {
    Id                          = null;
    Next                        = {
        GoodStateId: null,
        BadStateId : null
    };
    @observable Questions       = [];
    @observable Recommendations = [];
    @observable NextState       = null;

    @action calculateNextState() {
        // add logic to determine next state based on question answers
    }


    fromObj(obj) {

        if ('Questions' in obj) {
            this.store.rootStore.questionStore.findPKs(obj.Questions)
                .then(questions => {
                    this.Questions = questions;
                });

            delete obj.Questions;
        }

        if ('Recommendations' in obj) {
            this.store.rootStore.recommendationStore.findPKs(obj.Recommendations)
                .then(recommendations => {
                    this.Recommendations = recommendations;
                });

            delete obj.Questions;
        }

        return super.fromObj(obj);
    }
}