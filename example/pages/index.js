import { connect } from 'react-redux'
import { useEffect } from 'react'
import { resolveActions } from 'next-redux-observable'
import { loadUsers } from '../state/users'


const Page = ({ list, load }) => {
    useEffect(() => {
        load()
    }, [])


    return <div>
       {list.map(user => <div key={user.id}>{user.login}</div>)}
    </div>
}


Page.getInitialProps = resolveActions([
    loadUsers()
])

const mapStateToProps = state => ({
    list: state.users.list
})

const mapDispatchToProps = dispatch => ({
    load: () => dispatch(loadUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Page);