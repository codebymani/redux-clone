const {createStore} = require('.');

/*  Reducer 1*/
function counter1(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
}

/*  Reducer 2*/
function counter2(state = 0, action) {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    default:
      return state
  }
}

/* Store Creation */
let store = createStore({
  counter1,
  counter2
});
console.log(store.getState());

store.subscribe(()=>console.log("Hey, got an update for me!"));
store.subscribe(()=>console.log("Yeah!, me too"));

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INC' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })

console.log(store.getState());

store.dispatch({ type: 'DECREMENT' })

console.log(store.getState());