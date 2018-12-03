import {observable, action, computed} from 'mobx'
import AbstractModel from "./AbstractModel";

export default class State extends AbstractModel {
    Id                          = null;
    Next                        = {
        GoodStateId: null,
        BadStateId : null
    };
    @observable Questions       = [];
    @observable Recommendations = [];

    @computed
    get completed() {
        return this.Questions.filter(question => {
            return question.Answer == null
        }).length === 0;
    }

    @computed
    get started() {
        return this.Questions.filter(question => {
            return question.Answer == null
        }).length !== this.Questions.length
    }

    @computed
    get NextStateId() {
        if (this.completed) {
            return this.Questions.filter(question => {
                return question.Answer.Result === 'bad'
            }).length > 0 ? this.Next.BadStateId : this.Next.GoodStateId;
        }
        return null;
    }

}