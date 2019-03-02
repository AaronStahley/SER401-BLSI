/**
 * Create by Taylor Greeff
 */

import {observable} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class StateQuestion extends AbstractModel {
    Id = null;
    @observable QuestionId = null;
}