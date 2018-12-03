import AbstractStore from "./AbstractStore";
import State from "../model/State";
import BluebirdPromise from "../../common/BluebirdPromise";

export default class StateStore extends AbstractStore {
    constructor(rootStore, transporter) {
        super(State, 'state', rootStore, transporter);
    }


    postProcessResults = (states) => {
        return BluebirdPromise.all(
            states.map(state => {
                return this.rootStore.questionStore.findStateQuestions(state).then(res => {
                    state.Questions = res;
                });
            })
        ).then(() => {
            return states;
        })
    };
}