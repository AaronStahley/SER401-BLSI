import State from "../model/State";
import AbstractAlgorithmStore from "./AbstractAlgorithmStore";

export default class StateStore extends AbstractAlgorithmStore {
    static TABLE_NAME = 'state';

    constructor(rootStore, algorithm, transporter) {
        super(State, StateStore.TABLE_NAME, algorithm, rootStore, transporter);
    }

    createInstance(stateId, path = "") {
        return (new State(this))
            .fromObj(this.get(stateId))
            .setPath(`${path}:${stateId}`)
    }
}