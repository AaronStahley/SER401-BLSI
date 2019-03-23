import {Platform} from "react-native";
import {errorAlert} from "../components/ui/AlertBox";
import {toJS} from "mobx";

export default class ReleaseImporter {
    path;
    rootStore;

    constructor(rootStore) {
        this.rootStore = rootStore;
        Platform.select({
            ios    : () => this.path = "localhost:3001",
            android: () => this.path = "10.0.2.2:3001",
        })()
    }

    updateAll = () => {
        return this.retrieveReleases()
            .then((res) => {
                if (!res) {
                    throw "Not available"
                }
                return res.collection;
            })
            .then((releases) => {
                return Promise.all(releases.map(({id}) => this.update(id)))
            });
    };

    update = (release_id) => {
        return this.retrieveRelease(release_id)
            .then(release => ({
                release  : release,
                algorithm: this.rootStore.algorithmStore.get(release.algorithm_id)
            }))
            .then(({release, algorithm}) => this.rootStore.createAlgorithmRootStore(algorithm)
                .then((store) => store.deleteData()
                    .then(() => Promise.all([
                        this.insertLocalStates(store, release),
                        this.insertLocalRecommendations(store, release),
                        this.insertLocalQuestions(store, release)
                    ]))
                    .then(([states, recommendations, questions]) => Promise.all([
                        this.linkLocalStates(states),
                        this.linkLocalRecommendations(store, states, recommendations),
                        this.linkLocalQuestions(store, states, questions),
                        this.updateLocalAlgorithm(algorithm, states, release)
                    ]))
                ))
            .catch(err => {
                console.log(err);
            })
    };

    insertLocalStates(store, algorithm) {
        return Promise.all(
            algorithm.attribute_json.states.map(state => {
                let clonedState                = Object.assign({}, state);
                clonedState.state_id_next_good = null;
                clonedState.state_id_next_bad  = null;
                delete clonedState.id;
                delete clonedState.question_ids;
                delete clonedState.recommendation_ids;

                return store.stateStore.insert(clonedState)
                    .then(state_id => store.stateStore.findPK(state_id))
                    .then(newObj => {
                        return {
                            new: newObj,
                            old: state
                        };
                    })
            })
        );
    }

    insertLocalQuestions(store, algorithm) {
        return Promise.all(
            algorithm.attribute_json.questions.map(question => {
                let clonedQuestion = Object.assign({}, question);
                delete clonedQuestion.id;
                return store.questionStore.insertWithOptions(clonedQuestion)
                    .then(question_id => store.questionStore.findPK(question_id))
                    .then(newObj => {
                        return {
                            new: newObj,
                            old: question
                        };
                    })
            })
        );
    }

    insertLocalRecommendations(store, algorithm) {
        return Promise.all(
            algorithm.attribute_json.recommendations.map(recommendation => {
                let clonedRecommendation = Object.assign({}, recommendation);
                delete clonedRecommendation.id;
                return store.recommendationStore.insert(clonedRecommendation)
                    .then(recommendation_id => store.recommendationStore.findPK(recommendation_id))
                    .then(newObj => {
                        return {
                            new: newObj,
                            old: recommendation
                        };
                    })
            })
        );
    }

    linkLocalStates(states) {
        return Promise.all(
            states.map(stateMap => {

                if (stateMap.old.state_id_next_bad) {
                    stateMap.new.state_id_next_bad = states.find(state => state.old.id === stateMap.old.state_id_next_bad).new.id;
                }

                if (stateMap.old.state_id_next_good) {
                    stateMap.new.state_id_next_good = states.find(state => state.old.id === stateMap.old.state_id_next_good).new.id;
                }

                return stateMap.new.save()
                    .then(() => stateMap.new)
            })
        );
    }

    linkLocalQuestions(store, states, questions) {
        return Promise.all(
            states.map(stateMap => Promise.all(stateMap.old.question_ids.map(question_id => {
                let questionMap = questions.find(question => question.old.id === question_id);

                return store.stateQuestionStore.insert({
                    state_id   : stateMap.new.id,
                    question_id: questionMap.new.id
                }).then(() => questionMap.new)

            })))
        );
    }

    linkLocalRecommendations(store, states, recommendations) {
        return Promise.all(
            states.map(stateMap => Promise.all(stateMap.old.recommendation_ids.map(recommendation_id => {
                let recommendationMap = recommendations.find(recommendation => recommendation.old.id === recommendation_id);

                return store.stateRecommendationStore.insert({
                    state_id         : stateMap.new.id,
                    recommendation_id: recommendationMap.new.id
                }).then(() => recommendationMap.new)

            })))
        );
    }


    updateLocalAlgorithm(algorithm, states, release) {
        let newData = release.algorithm_json;
        delete newData.id;
        algorithm.fromObj(newData);
        return algorithm.save();
    }

    retrieveRelease(id) {
        if (!id) throw "id undefined";
        const URL = `http://${this.path}/release/${id}`; //`http://localhost:3001/release/${id}?key=key`;
        return fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            }).catch(err => {
                console.log("No Connection", err);
                throw err;
            });
    };


    retrieveReleases() {
        const URL = `http://${this.path}/release`;
        return fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                console.log(response);
                return response.json();
            }).catch(err => {
                console.log("No Connection", err);
                throw err;
            });
    };

}