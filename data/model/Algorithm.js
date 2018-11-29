import {observable} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class Algorithm extends AbstractModel {
    Id                     = null;
    VersionId              = null;
    Name                   = null;
    StartStateId            = null;
    @observable StartState = null;
    Description            = null;


    fromObj(obj) {

        if ('StartStateId' in obj) {
            this.store.rootStore.stateStore.findPK(obj.StartStateId)
                .then(startState => {
                    this.StartState = startState;
                });
        }

        return super.fromObj(obj);
    }
}