import {observable} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class Algorithm extends AbstractModel {
    @observable Id           = null;
    @observable Name         = null;
    @observable StartSate    = null;
    @observable Description  = null;
    @observable CurrentStack = [];
}