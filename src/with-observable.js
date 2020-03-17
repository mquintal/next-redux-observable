import React from 'react'


const withObservable = rootEpic => Component => {
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