import { connect } from 'react-redux'
import { resolveActions } from 'next-redux-observable'
import Link from 'next/link'
import { loadUsers } from '../state/users'


const Page = ({ list }) => (<div>
       {list.map(user => <div key={user.id}><Link href="/user/[id]" as={`/user/${user.id}`}>{user.login}</Link></div>)}
    </div>
)


Page.getInitialProps = resolveActions([
    loadUsers()
])

const mapStateToProps = state => ({
    list: state.users.list
})

export default connect(mapStateToProps)(Page);