import { of, Subject } from 'rxjs'
import { timeout } from 'rxjs/operators'
import { StateObservable } from 'redux-observable'
import { TIMEOUT } from './contants'


const makeArray = item => Array.isArray(item) ? item : [item]

/**
 * Method responsible for getting all actions needed to be processed 
 * and resolve a promise in the inner funciton when all of the epics finish. 
 * 
 * @param {Array | Object} - array of actions to dispatch
 * @param {Integer} - (optional) timeout applied to all stream provided (default: 30 sec)
 *
 * @return {Function} - funcitons expected by getInitialProps when using next-redux-wrapper.
 */
export default (actions, tout = TIMEOUT) => ({ store, rootEpic }) => {
    const state$ = new StateObservable(new Subject(), store.getState())

    return Promise.all(
        makeArray(actions).map(action => rootEpic(of(action), state$).pipe(timeout(tout)).toPromise())
    )
    .then(resultActions => {
        resultActions.forEach(store.dispatch)
        return store.getState()
    })
}
