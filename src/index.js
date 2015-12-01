// API stolen from kriskowal/q
// transforms nodey function that accepts callback and returns null
// into a promisey function that accepts normal parameters and returns a promise
export function ninvoke(object, methodName, ...args) {
    const targetFn = object[methodName].bind(object);

    return new Promise((resolve, reject) => {
        targetFn(...args, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

export function nodeify(promise, nodeyCallback) {
    promise.then(
        (result) => nodeyCallback(null, result), 
        (error) => nodeyCallback(error, null)
    );
}

export function promiseHash(hash) {
    const keys = Object.keys(hash);
    const values = keys.map((key) => hash[key]);
    
    return Promise.all(values)
    .then((resolvedValues) => {
        const resolvedHash = {};
        for (let i = 0; i < keys.length; i++) {
            resolvedHash[keys[i]] = resolvedValues[i];
        }
        
        return resolvedHash;
    });
}
