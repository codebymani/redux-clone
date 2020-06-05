# Basic Implementation of Redux

### 1. createStore().
Creates the redux store containing instance of the application state.

### 2. getState().
Returns the current application state.

### 3. subscribe().
Can subscribe to the application state changes, generally used to update the UI.

### 4. dispatch().
Instead of mutating the state directly, we can dispatch a plain object as action
and will pass to reducer to update the state.
