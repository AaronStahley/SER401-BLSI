import {observable} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class Algorithm extends AbstractModel {
    Id                     = null;
    VersionId              = null;
    Name                   = null;
    StartSateId            = null;
    @observable StartState = null;
    Description            = null;


    fromObj(obj) {

        if ('StartSateId' in obj) {
            this.store.rootStore.stateStore.findPK(obj.StartSateId)
                .then(startState => {
                    this.StartState = startState;
                });
        }

        return super.fromObj(obj);
    }
}