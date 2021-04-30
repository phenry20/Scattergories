import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";

export default function useModerator() {
    const [isModerator, setIsModerator] = useState(false);
    const [users, usersLoading] = useCollection(firebase.firestore().collection("/users"));

    useEffect(() => {
        if (usersLoading) {
            return;
        }

        if (users.docs.some((user) => user.data().moderator)) {
            setIsModerator(true);
        }
    }, [users]);

    return { isModerator };
}
