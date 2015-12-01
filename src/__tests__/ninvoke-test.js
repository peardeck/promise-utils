jest.dontMock('../index');

const nodeLib = {
    success(callback) {
        callback(null, 'nailed it');
    },
    
    err(callback) {
        callback('500 OK');
    },
};

describe('ninvoke', () => {
    const ninvoke = require('../index').ninvoke;
    
    pit('resolves its promise when the func being adapted returns success', () => {
        return ninvoke(nodeLib, 'success')
        .then((val) => expect(val).toBe('nailed it'));
    });
    
    pit('rejects its promise when the func being adapted returns failure', () => {
        return ninvoke(nodeLib, 'err')
        .catch((err) => expect(err).toBe('500 OK'));
    });
});
