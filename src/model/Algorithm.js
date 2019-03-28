import {observable} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class Algorithm extends AbstractModel {
    id                            = null;
    @observable version_number    = null;
    @observable name              = null;
    @observable description       = null;
    @observable short_description = null;
    @observable is_favorite       = null;
    date_modified                 = null;
    date_created                  = null;
}