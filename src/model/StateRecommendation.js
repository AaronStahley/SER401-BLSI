/**
 * Create by Taylor Greeff
 */

import {observable} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class StateRecommendation extends AbstractModel {
    Id = null;
    @observable RecommendationId = null;
}