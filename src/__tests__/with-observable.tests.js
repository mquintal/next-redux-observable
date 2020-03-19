import React from 'react'
import { mount } from 'enzyme'
import { default as withObservable } from '../with-observable' 


const Component = () => <div></div>


describe('src/with-observable.js', () => {
    it('should be a function', () => {
        expect(typeof withObservable).toBe('function')
    })

    it('should return a function', () => {
        expect(typeof withObservable(console.log)).toBe('function')
    })

    describe('inner function', () => {
        const rootEpic = () => {}
        let HocComponent
    
        beforeEach(() => {
            HocComponent = withObservable(rootEpic)(Component)
        })

        it('should return a wrapper component with the original component as it\'s child', () => {
            const props = { some: 'value', ctx: { some: 'some context' } }
            const component = mount(<HocComponent {...props} />)
            const innerComponent = component.find(Component)

            expect(innerComponent.length).toBe(1)
            expect(innerComponent.props()).toEqual(props)
        })

        it('should return empty object from getInitialProps where the higher component does not have that method', () => {
            expect(HocComponent.getInitialProps()).toEqual({})
        })

        it('should call getInitialProps with the expected object when the higher component does have that method', () => {
            const props = { some: 'value' }

            Component.getInitialProps = jest.fn()
            HocComponent.getInitialProps(props)

            expect(Component.getInitialProps).toHaveBeenCalledWith({ ...props, ctx: { ...props.ctx, rootEpic } })
        })
    })
})