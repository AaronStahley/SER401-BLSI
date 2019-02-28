/**
 * @author Taylor Greeff
 */

import BluebirdPromise from "../common/BluebirdPromise";
import {errorAlert} from "../components/ui/AlertBox"

export default class UpdateStore {
    constructor(rootStore, transporter) {
        this.rootStore = rootStore;
        this.transporter = transporter;
    }

     /**
      *  Finds the algorithm in db, deletes the previous algorithm, then inserts the new algorithm.
      *  Need this instead of update inorder to prevent stray nodes being left on updates.
      * @param {*} json object passed containing the data recieved from the hosted service.
      */
     findDeleteInsert(json) {
         return this.rootStore.algorithmStore.findPK(json.algorithm_id)
             .then((res) => {
                 if (res === null) {
                     throw new Error("Algorithm doesn't exist: " + json.algorithm_id);
                 }
                 return this.rootStore.algorithmStore.delete(json.algorithm_id);
             }).then(() => this.insert(json))
             .catch(err => console.log(err));
     }

    update(obj) {
        let attributes = JSON.parse(json.attribute_json);
        let algorithm = JSON.parse(json.algorithm_json);
        return this.rootStore.algorithmStore.update(algorithm)
            .then(() => {
                let states = attributes.states;
                return this.rootStore.stateStore.updateAll(states);
            }).then(() => {
                let recommendations = attributes.recommendations;
                return this.rootStore.recommendationStore.updateAll(recommendations);
            }).then(() => {
                let questions = attributes.questions;
                //item has nested info
                return this.rootStore.questionStore.updateAll(questions);
            }).catch(err => {
                console.log(err);
                errorAlert("Update failed", err.toString());
            });
    }

    insert(json) {
        let attributes = JSON.parse(json.attribute_json);
        let algorithm = JSON.parse(json.algorithm_json);
        return this.rootStore.algorithmStore.insert(algorithm)
            .then(() => {
                let states = attributes.states;
                return this.rootStore.stateStore.insertAll(states);
            }).then(() => {
                let recommendations = attributes.recommendations;
                return this.rootStore.recommendationStore.insertAll(recommendations);
            }).then(() => {
                let questions = attributes.questions;
                //item has nested info
                return this.rootStore.questionStore.insertAll(questions);
            }).catch(err => {
                console.log(err);
                errorAlert("Update failed", err.toString());
            });
    }

    updateOrInsert(json) {
        let attributes = JSON.parse(json.attribute_json);
        let algorithm = JSON.parse(json.algorithm_json);
        return this.rootStore.algorithmStore.updateOrInsert(algorithm)
            .then(() => {
                let states = attributes.states;
                return this.rootStore.stateStore.updateOrInsertAll(states);
            }).then(() => {
                let recommendations = attributes.recommendations;
                return this.rootStore.recommendationStore.updateOrInsertAll(recommendations);
            }).then(() => {
                let questions = attributes.questions;
                //item has nested info
                return this.rootStore.questionStore.updateOrInsertAll(questions);
            }).catch(err => {
                console.log(err);
                errorAlert("Update failed", err.toString());
            });
    }
}