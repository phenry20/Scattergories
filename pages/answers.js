import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import { useRouter } from "next/router";

export default function Answers() {
    const [users, usersLoading] = useCollection(firebase.firestore().collection("/users"));
    const [topics, topicsLoading] = useCollection(firebase.firestore().collection("/topics"));
    const router = useRouter();

    function onStartRoundClick() {
        router.push("/setup");
    }

    return (
        <div className="d-flex justify-content-center flex-column h-100">
            <span className="d-flex justify-content-center py-5 display-2">Answers</span>
            <hr className="text-primary" />
            <div className="flex-fill">
                <table className="table table-hover table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Player</th>
                            {!topicsLoading &&
                                topics.docs.map((topic) => (
                                    <th key={topic.data().text} scope="col">
                                        {topic.data().text}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {!usersLoading &&
                            users.docs.map((user) => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    {user.data().answers.map((answer) => (
                                        <td>{answer}</td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <button className="btn btn-success btn-lg w-50 align-self-center mb-30" onClick={() => onStartRoundClick()}>
                Start New Round
            </button>
        </div>
    );
}
