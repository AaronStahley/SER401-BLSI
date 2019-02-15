/**
 * Fecth call to update all algorithms listed on the home screen. 
 * @author Aaron S
 */
export const retriveAlgorithms = async () => {
    const URL = "http://localhost:3001/release?key=key";
    fetch(URL)
        .then(response => {
            if (!response.ok) { throw resoponse }
            return response.json()
        })
        .then(json => {
            console.log('parsed json', json) // access json.body here
        });
}   