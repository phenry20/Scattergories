import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Lobby() {
    const [users, usersLoading] = useCollection(firebase.firestore().collection("/users"));
    const [state, stateLoading] = useDocument(firebase.firestore().doc("/app/state"));
    const router = useRouter();

    useEffect(() => {
        if (stateLoading) {
            return;
        }

        if (state.data().state === "game") {
            router.push("/game");
        }
    }, [state]);

    function onStartGameClick() {
        router.push("/setup");
    }

    return (
        <div className="d-flex justify-content-center flex-column h-100">
            <span className="d-flex justify-content-center py-5 display-2">Lobby</span>
            <div className="flex-fill">
                {(usersLoading && <span className="spinner spinner-lg" />) ||
                    users.docs.map((user) => (
                        <h2 key={user.id} className="d-flex justify-content-center py-5 text-light-">
                            {user.id}
                        </h2>
                    ))}
            </div>

            <button className="btn btn-success btn-lg w-50 align-self-center mb-30" onClick={() => onStartGameClick()}>
                Start Game
            </button>
        </div>
    );
}
