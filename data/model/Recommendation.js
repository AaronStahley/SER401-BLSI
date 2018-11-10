import AbstractModel from "./AbstractModel";
import {observable} from "mobx";

export default class Recommendation extends AbstractModel {
    @observable Id          = null;
    @observable Title       = null;
    @observable Description = null;
}