# next-redux-observable (still in alpha)

Library based on [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) to facilitate integrating [redux-observable](https://redux-observable.js.org/) on applications based in [NextJS](https://nextjs.org/)

## how to install

`npm install next-redux-observable`

**Note:** Do not forget to install and integrate [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) before.

## motivation 

As you might know `getInitialProps` method is called on the server side by NextJS to make sure you're providing all data needed to the server side render.
next-redux-wrapper does a brilliant job connecting your NextJS app with redux providing the store on `getInitialProps` which then allows us to dispatch actions from it. The issue here is that we are handling all our side-effects using redux-observable which usually handles async tasks (i.e fetching data) and `getInitialProps` is expecting a promise to be resolved when the data is ready to be rendered.
Using this library you just need to provide which actions should be processed before the rendering happen.

## how it works

Assuming you have followed all the instructions to integrate [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) on your project and your are able to dispatch action from `getInitialProps` method. Using this library will be an easy task!

### example 
This simple example you just need to provide the "load use action". Behind the scene it will "dispatch" (execute the root epic) the action and wait to resolve the promise when the epic is finished.

```js
// pages/_app.js

// Again here we just have the required changes needed after you followed next-redux-wrapper
// documentation to integrate it on your project
import { compose } from 'redux'
import { withObservable } from 'next-redux-observable'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics( /* your epics */ )

.
.
.

export default withRedux(makeStore)(withObservable(rootEpic)(MyApp))

// OR

export default compose(
    withRedux(makeStore),
    withObservable(rootEpic),
)(MyApp)
```

```js
// pages/index.js

import { useEffect } from 'react'
import { connect } from 'redux-react' 
import { resolveEpics } from 'next-redux-observable'
import { load } from 'YOUR_PROJECT_DIR/state/user'

const Page = ({ load, user }) => {

    useEffect(() => {
        load()
    }, [])

    return <span>User: {user}</span>
}

Page.getInitialProps = resolveActions(
    [load()],
)

const mapStateToProps = state => ({
    user: state.user.name,
})

const mapDispatchToState = dispatch = ({
    load: () => dispatch(load()),
})

export default connect(mapStateToProps, mapDispatchToState)(Page)

```






