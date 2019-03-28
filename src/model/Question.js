import AbstractModel from "./AbstractModel";

export default class Question extends AbstractModel {
    id           = null;
    text         = null;
    prompt       = "";
    type_key     = null;
    algorithm_id = null;

    get Options() {
        return this.rootStore.questionOptionStore.collection.filter(option => option.question_id === this.id)
    }

    convertNumberToOption(number) {
        let selected = this.Options.filter(option => {
            let valid = true;
            if (valid && option.min_value !== null) {
                valid = option.min_value <= number;
            }
            if (valid && option.max_value !== null) {
                valid = option.max_value >= number;
            }
            return valid;
        });

        if (selected.length > 0) {
            return selected[0];
        }

        return null;
    }
}
