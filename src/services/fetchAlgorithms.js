  /**
   * Fetch call update a specific algorithm specified by an ID.
   * @param {*} id id for the algorithm you want to update
   * @author Aaron S
   */
  export const retrieveAlgorithm = async (id) => {
    if(!id) throw "Id undefined";
    const URL = `http://192.168.1.2:3001/release/${id}?key=key`; //`http://localhost:3001/release/${id}?key=key`;
    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(json => {
        console.log("parsed json", json);
        return json;
      }).catch(err => {
          console.log("No Connection", err);
      });
  };

  /**
   * Fecth call to update all algorithms listed on the home screen.
   * @author Aaron S
   */
  export const retrieveAlgorithms = async () => {
    const URL = "http://192.168.1.2:3001/release?key=key"; //"http://localhost:3001/release?key=key"; 
    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(json => {
        console.log("parsed json", json); // access json.body here
        return json;
      }).catch(err => {
        console.log("No Connection", err);
    });
  };
