import { of } from 'rxjs'
import { mapTo, map } from 'rxjs/operators'
import { combineEpics } from 'redux-observable'
import { default as resolveActions } from '../resolve-actions'


const store = {
    getState: jest.fn(),
    dispatch: jest.fn(),
}

describe('src/resolve-actions.js', () => {
    it('should be a function', () => {
        expect(typeof resolveActions).toBe('function')
    })

    it('should return a function', () => {
        expect(typeof resolveActions({ type: 'some action' })).toBe('function')
    })

    describe('action is resolved', () => {
        it('should dispatch the expected result action', done => {
            const resultActions = { some: 'result action' }
            const epic = actions$ => actions$.pipe(mapTo(resultActions))
            const rootEpic = combineEpics(epic)
            const actions = [{ type: 'some action' }]

            resolveActions(actions)({ store, rootEpic }).then(() => {
                expect(store.dispatch).toHaveBeenCalledWith(resultActions)
            })
            .then(done)
        })
    })

    describe('action is rejected', () => {
        it('should dispatch the expected failure action', done => {
            const error = new Error('some exception')
            const epic = actions$ => actions$.pipe(map(() => { throw error }))
            const rootEpic = combineEpics(epic)
            const actions = [{ type: 'some action' }]

            resolveActions(actions)({ store, rootEpic }).then(() => {
                expect(store.dispatch).toHaveBeenCalledWith({
                    type: '@@ndo/failure_action',
                    payload: { error }
                })
            })
            .then(done)
        })
    })
})