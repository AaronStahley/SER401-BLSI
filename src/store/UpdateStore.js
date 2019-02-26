/**
 * @author Taylor Greeff
 */

import BluebirdPromise from "../common/BluebirdPromise";
import {Alert} from "react-native";

export default class UpdateStore {
    constructor(rootStore, transporter) {
        this.rootStore = rootStore;
        this.transporter = transporter;
    }

    update(obj) {
        console.log(obj);
        let attributes = JSON.parse(obj.attribute_json);
        let algorithm = JSON.parse(obj.algorithm_json);
        return this.rootStore.algorithmStore.update(algorithm)
            .then(() => {
                let states = attributes.states;
                return Promise.all(states.map((item) => {
                    this.rootStore.stateStore.update(item);
                }));
            }).then(() => {
                let recommendations = attributes.recommendations;
                return Promise.all(recommendations.map((item) => {
                    this.rootStore.recommendationStore.update(item);
                }));
            }).then(() => {
                let questions = attributes.questions;
                return Promise.all(questions.map((item) => {
                    this.rootStore.questionStore.update(item);
                }));
            }).catch(err => {
                console.log(err);
                Alert.alert(
                    "Update failed",
                    err.toString(),
                    [{
                        text: "Close",
                        style: "cancel"
                    }]
                )
            });
    }
}