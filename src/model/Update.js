import {observable} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class Update extends AbstractModel {
    @observable Refresh = null;

    constructor(store, value){
        super(store);
        this.Refresh = value;
    }
}