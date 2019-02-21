  /**
   * Fetch call update a specific algorithm specified by an ID.
   * @param {*} id id for the algorithm you want to update
   * @author Aaron S
   */
  export const retrieveAlgorithm = async (id, rootStore) => {
    const URL = `http://localhost:3001/release/${id}?key=key`;
    fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw resoponse;
        }
        return response.json();
      })
      .then(json => {
        console.log("parsed json", json);
      }).catch(err => {
          console.log("No Connection", err);
      });
  };

  /**
   * Fecth call to update all algorithms listed on the home screen.
   * @author Aaron S
   */
  export const retrieveAlgorithms = async (rootStore) => {
    const URL = "http://localhost:3001/release?key=key";
    fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw resoponse;
        }
        return response.json();
      })
      .then(json => {
        console.log("parsed json", json); // access json.body here
      }).catch(err => {
        console.log("No Connection", err);
    });
  };
