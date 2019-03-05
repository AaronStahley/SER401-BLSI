import BluebirdPromise from "../common/BluebirdPromise";

export default class AbstractStore {
    collection = {};
    storeLocally;
    allFound = false;
    transporter;
    model;
    table;

    constructor(model, tableName, rootStore, transporter, storeLocally = false) {
        this.model = model;
        this.transporter = transporter;
        this.rootStore = rootStore;
        this.table = tableName;
        this.storeLocally = storeLocally;
    }

    getPK = id => {
        if (this.storeLocally && id in this.collection) {
            return this.collection[id];
        }
        return null;
    };

    findPK = id => {
        return this.transporter.select(`select * from ${this.table} where id = ?;`, [id])
            .then(this.processResults)
            .then(res => res.length > 0 ? res[0] : null);
    };

    findPKs = ids => {
        return this.transporter.select(`select * from ${this.table} where id IN ?;`, [ids])
            .then(this.processResults);
    };

    getOrFindAll = () => {
        if (this.allFound && this.storeLocally) {
            return new BluebirdPromise((resolve, reject) => {
                resolve(Object.values(this.collection));
            })
        }

        return this.transporter.select(`select * from ${this.table};`, [])
            .then(this.processResults)
            .then(objects => {
                this.allFound = true;
                return objects;
            });
    };

    update = (json) => {
        let str = this.jsonToSqlUpdateString(json);
        return this.transporter.select(`update ${this.table} set ${str} where id = ${json.id}`)
            //.then(this.processResults)
            .then(res => res.length > 0 ? res[0] : null);
    };

    insert = (json, updateCallback) => {
        //delete json.id;
        return this.jsonToSqlInsertString(json)
            .then((values) => {
                let keys = this.jsonToSqlInsertKeys(json);
                this.transporter.select(`insert into ${this.table} (${keys}) values (${values})`)
            }).then(() => updateCallback);
    }

    delete = (id) => {
        return this.transporter.select(`delete from ${this.table} where id = ${id}`)
            .then(this.processResults)
            .then(res => res.length > 0 ? res[0] : null);
    }

    //Incomplete, but not operable
    updateOrInsert = (json) => {
        return this.update(json)
            .then((res) => {
                console.log(res);
                if(res) {

                }
                //this.insert(json);
            });
    }

    jsonToSqlUpdateString = (json) => {
        let str = "";
        Object.keys(json).forEach((key) => {
            if (key !== "id") {
                str += key + " = ";

                if ((typeof json[key]) === 'string') {
                    str += "'" + json[key] + "'";
                } else if (json[key] === true) {
                    str += 1;
                } else if (json[key] === false) {
                    str += 0;
                } else if (json[key] === "null") {
                    str += json[key].toUpperCase();
                } else {
                    str += json[key];
                }

                str += ", ";
            }
        });
        //Finish string
        let len = str.length;
        str = str.substring(0, len - 2);
        return str;
    }

    jsonToSqlInsertString = (json) => {
        let str = "";
        return Promise.all(Object.keys(json).map((key) => {
            //if (key !== "id"){ //remove id
                if ((typeof json[key]) === 'string') {
                    str += "'" + json[key] + "'";
                } else if (json[key] === true) {
                    str += 1;
                } else if (json[key] === false) {
                    str += 0;
                } else if (json[key] === "null") {
                    str += json[key].toUpperCase();
                } else {
                    str += json[key];
                }
                str += ", ";
            //}
            
        }))
        .then(() => {
            let len = str.length;
            str = str.substring(0, len - 2);
            return str;
        });
    }

    jsonToSqlInsertKeys = (json) => {
        let str = "";
        Object.keys(json).forEach((key) => {
            //if (key !== "id") {
                str += key + ", ";
            //}
        });
         let len = str.length;
         str = str.substring(0, len - 2);
         return str;
    }

    convertFieldNames = (row) => {
        let mappedObj = {};
        for (let dbField in row) {
            let modelField = dbField.toLowerCase()
                .split('_')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join('');

            mappedObj[modelField] = row[dbField];
        }
        return mappedObj;
    };

    processResults = (_array) => {
        if (_array.length == 0) {
            return [];
        }

        return _array.map(row => {

            let obj = new this.model(this);
            obj.fromObj(this.convertFieldNames(row));

            if (this.storeLocally) {
                this.collection[obj.Id] = obj;
            }

            return obj;
        });
    };

}