import React from 'react'


function withObservable(Component, rootEpic) {
  class WrappedComponent extends React.Component {
    static displayName = `withObservable(${Component.displayName || Component.name || 'Component'})`

    static getInitialProps(props) {
      return Component.getInitialProps
        ? Component.getInitialProps({...props, ctx: { ...props.ctx, rootEpic}})
        : {}
    }

    render() {
      return <Component {...this.props} />
    }
  }

  return WrappedComponent
}

export default withObservable