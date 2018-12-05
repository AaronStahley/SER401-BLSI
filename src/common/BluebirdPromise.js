import BluebirdPromise from "bluebird";

BluebirdPromise.config({cancellation: true});
BluebirdPromise.prototype.setCancelFlag = function (flag) {
    let self = this;
    return flag.register(
        new BluebirdPromise((resolve, reject) => {
            self
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        }));
};

export default BluebirdPromise;