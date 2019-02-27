import {observable} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class Algorithm extends AbstractModel {
    Id               = null;
    VersionId        = null;
    Name             = null;
    StateIdStart     = null;
    Description      = null;
    ShortDescription = null;
    IsFavorited        = null; 
}