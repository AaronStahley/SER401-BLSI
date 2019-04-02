/**
 * @author Taylor Greeff
 */

import {errorAlert} from "../components/ui/AlertBox"
import Update from "../model/Update";

export default class UpdateStore {
    constructor(rootStore, transporter) {
        this.rootStore   = rootStore;
        this.transporter = transporter;
        this.model       = Update;
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


    /**
     * Allows for unique function calling of functions when updating
     * @param {String} funcName function name to call dynamically 
     * @param {Object} json 
     */
    dynamicInsertion(funcName, json) {
        let attributes = JSON.parse(json.attribute_json);
        let algorithm = JSON.parse(json.algorithm_json);

        return this.rootStore.algorithmStore[funcName](algorithm)
            .then(() => this.rootStore.stateStore.dynamicInsertionAll(funcName, attributes.states))
            .then(() => this.rootStore.recommendationStore.dynamicInsertionAll(funcName, attributes.recommendations))
            .then(() => this.rootStore.questionStore.dynamicInsertionAll(funcName, attributes.questions))
            .catch(err => {
                console.log(err);
                errorAlert("Update failed", err.toString());
            });
    }

    dynamicExecute(sql) {
        return this.rootStore.algorithmStore.execute(sql, [])
            .then(() => this.rootStore.stateStore.execute(sql, []))
            .then(() => this.rootStore.stateQuestionStore.execute(sql, []))
            .then(() => this.rootStore.stateRecommendationStore.execute(sql, []))
            .then(() => this.rootStore.recommendationStore.execute(sql, []))
            .then(() => this.rootStore.questionStore.execute(sql, []))
            .then(() => this.rootStore.questionOptionStore.execute(sql, []))
            .catch(err => {
                console.log(err);
                errorAlert("Update failed", err.toString());
            });
    }
}