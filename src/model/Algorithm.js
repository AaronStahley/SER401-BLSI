import {observable} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class Algorithm extends AbstractModel {
    Id               = null;
    VersionId        = null;
    @observable Name = null;
    StateIdStart     = null;
    @observable Description = null;
    ShortDescription = null;
    @observable IsFavorited = null;
    DateModified     = null;
    DateCreated      = null;
}