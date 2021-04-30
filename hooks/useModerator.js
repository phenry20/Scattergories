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

        const name = localStorage.getItem("name");
        const user = users.docs.find((x) => x.id === name);

        setIsModerator(user?.data()?.moderator);
    }, [users]);

    return { isModerator };
}
