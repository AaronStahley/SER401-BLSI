/**
 * Fetch call update a specific algorithm specified by an ID. 
 * @param {*} id id for the algorithm you want to update
 * @author Aaron S
 */

export const retriveAlgorithm = async id => {
    const URL = `http://localhost:3001/release/${id}?key=key`;
    fetch(URL)
        .then(response => {
            if (!response.ok) {throw resoponse}
            return response.json()
        })
        .then(json => {
            console.log("parsed json", json);
        });
};   