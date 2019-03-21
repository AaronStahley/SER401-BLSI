import {Platform} from "react-native";
import {retrieveAlgorithm, retrieveAlgorithms} from "./fetchAlgorithms";
import {errorAlert} from "../components/ui/AlertBox";

export default class Updater {
    path;
    rootStore

    constructor(rootStore) {
        this.rootStore = rootStore;
        Platform.select({
            ios    : () => this.path = "localhost:3001",
            android: () => this.path = "10.0.2.2:3001",
        })()
    }


    updateAll = () => {
        return retrieveAlgorithms()
            .then((res) => {
                if (!res) {
                    throw "Not available"
                }
            })
            .then((algorithms) => {
                return Promise.all(algorithms.map(({id}) => this.update(id)))
            }).catch(err => {
                console.log(err);
                errorAlert("Data not available", "Currently not able to connect to service.");
            });
    };

    update = (id) => {
        this.retrieveAlgorithm(id)
            .then(algorithm => this.deleteAlgorithm(id).then(() => algorithm))
            .then(algorithm => Promise.all([
                this.insertRecommendations(algorithm),
                this.insertQuestions(algorithm)
            ]).then(() => algorithm))
            .then(algorithm => this.insertStates(algorithm))
    };

    insertStates(algorithm) {
    }

    insertState() {
    }

    insertQuestions(algorithm) {
        return Promise.all(
            algorithm.attribute_json.questions.map(question => {
                return this.rootStore.questionStore.insertWithParts(question)
                    .then(newQ => {
                        question.newId = newQ.id;
                        return question;
                    })
            })
        );
    }

    insertRecommendations(algorithm) {
    }

    retrieveAlgorithm(id) {
        if (!id) throw "Id undefined";
        const URL = `http://${this.path}/release/${id}`; //`http://localhost:3001/release/${id}?key=key`;
        return fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            }).catch(err => {
                console.log("No Connection", err);
            });
    };


    retrieveAlgorithms() {
        const URL = `http://${this.path}/release`;
        return fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            }).catch(err => {
                console.log("No Connection", err);
            });
    };


    async deleteAlgorithm(id) {
        return Promise.all(
            this.rootStore.algorithmStore.deleteStates(item.Id),
            this.rootStore.algorithmStore.deleteQuestions(item.Id),
            this.rootStore.algorithmStore.deleteRecommendation(item.Id),
        )

    }
}