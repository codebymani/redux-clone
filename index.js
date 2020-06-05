'use-strict'

module.exports = (function () {
    function currentReducer(store,reducer,action){
        if(typeof reducer !== 'object'){
            return reducer;
        }
        const storeKeys = Object.keys(reducer);
        let newStoreItem = {};
    
        storeKeys.forEach((storeItem)=>{
            const prevState = store && store.hasOwnProperty(storeItem) ? store[storeItem] : undefined;
            if(typeof reducer[storeItem] === 'function'){
                const nextRedux = reducer[storeItem](prevState,action);
                newStoreItem[storeItem] =  currentReducer(prevState, nextRedux,action)
            } else {
                newStoreItem[storeItem] = prevState;
            }
        });
        return newStoreItem;
    }   

    function initStore(reducer) {
        let store = currentReducer(undefined,reducer,{});
        let subscribers = [];

        return Object.freeze({
            getState: () => {
                return store
            },
            subscribe: (func)=> {
                if(typeof func !== 'function'){
                    throw new Error('Subscriber should be a function!');
                }
                subscribers[subscribers.length] = func;
            },
            dispatch: (action) => {
                if(typeof action !== 'object'){
                    throw new Error('Invalid action');
                }

                subscribers.forEach((subscriber)=>{
                    subscriber.call();
                })
                store = currentReducer(store,reducer,action);
            }  
        })
    }
    
    return Object.freeze({
        createStore: (reducer) => initStore(reducer)
    });
    
}())
