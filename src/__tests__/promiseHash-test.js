jest.dontMock('../index');

describe('promiseHash', () => {
    const promiseHash = require('../index').promiseHash;
    const delay = require('../index').delay;
    
    pit('resolves each key of a promise into a hash', () => {
        const hash = {
            value: 5,
            swear: Promise.resolve('this was resolved'),
            delayed: delay(500).then(() => 'even through delay'),
        };
        
        const resolvedHashPromise = promiseHash(hash);
        
        jest.runAllTimers();
         
        return resolvedHashPromise
        .then((resolvedHash) => {
            expect(resolvedHash.value).toBe(5);  //zoomed straight through
            expect(resolvedHash.swear).toBe('this was resolved'); // was resolved out
            expect(resolvedHash.delayed).toBe('even through delay');
        });
    });
});
