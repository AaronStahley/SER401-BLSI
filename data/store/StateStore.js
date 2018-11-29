import AbstractStore from "./AbstractStore";
import State from "./../model/State";

export default class StateStore extends AbstractStore {
    constructor(transporter) {
        super(State, 'state', transporter);
    }
}