import { connect } from 'react-redux'
import { resolveActions } from 'next-redux-observable'
import { loadUser } from '../../state/users'

const User = ({user}) => (
    <div>
        <h1>{user.login}</h1>
        <pre>{JSON.stringify(user, null, 4)}</pre>
    </div>
)

User.getInitialProps = ctx => resolveActions([loadUser(ctx.query.id)])(ctx)

const mapStateToProps = state => ({
    user: state.users.user
})

export default connect(mapStateToProps)(User)