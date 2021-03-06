import firebase from 'firebase'
import { USER_STATE_CHANGE } from '../constants'

export function fetchUser() {
    return (dispatch: any) => {
        firebase.firestore()
            .collection("user")
            .doc(firebase.auth().currentUser?.uid)
            .get()
            .then(
                (snapshot) => {
                    if (snapshot.exists) {
                        dispatch({
                            type: USER_STATE_CHANGE,
                            currentUser: snapshot.data()
                        })
                        console.log(snapshot)
                    } else {
                        console.log("does not exist")
                    }
                }
            )
    }
}
