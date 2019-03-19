/**
 * Fetch call update a specific algorithm specified by an ID.
 * @param {*} id id for the algorithm you want to update
 * @author Aaron S
 */


import {Platform} from "react-native";

let path = "";

/**
 * Determines the path to pull data from server.
 * Local host on android is different that iOS.
 * @author Aaron S
 */
const determinePath = Platform.select({
    ios    : () => this.path = "localhost:3001",
    android: () => this.path = "10.0.2.2:3001",
})();

const getAllURL = `http://${this.path}/release?key=key`; //"http://localhost:3001/release?key=key";

export const retrieveAlgorithm = async (id) => {
    if (!id) throw "Id undefined";
    const URL = `http://${this.path}/release/${id}?key=key`; //`http://localhost:3001/release/${id}?key=key`;
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

/**
 * Fecth call to update all algorithms listed on the home screen.
 * @author Aaron S
 */
export const retrieveAlgorithms = async () => {
    const URL = getAllURL;
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

export const checkAvailability = async () => {
    const URL = `http://${this.path}/release?key=key`;
    return fetch(URL, {
        method: "CONNECT",
    }).then(response => {
        if (!response.ok) {
            throw response;
        }
        console.log(response.json())
        return response.json();
    }).catch(err => {
        console.log("No Connection", err);
    });
}