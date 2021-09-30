import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../components/redux/actions'

const mapDispatchProps = (dispatch: any) => bindActionCreators({fetchUser}, dispatch)
const mapStateToProps = (store: any) => ({currentUser: store.userState.currentUser})
function Main(props: any) {
    useEffect(() => {
        props.fetchUser()
    }, [])

    const currentUser = props
    console.log(currentUser)

    if (currentUser == undefined) {
        return <View></View>
    }

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text>User is logged in</Text>
        </View>
    )
}

export default connect(null, mapDispatchProps)(Main)
