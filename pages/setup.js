import { useState, useEffect } from "react";
import { Categories } from "../enum/categories";
import styles from "../styles/Home.module.css";
import firebase from "firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

export default function Setup() {
    const [letter, setLetter] = useState("");
    const [topics, setTopics] = useState([]);
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

    useEffect(() => {
        const batch = firebase.firestore().batch();

        async function setTopicsAsync() {
            await firebase
                .firestore()
                .collection("topics")
                .get()
                .then((res) => {
                    res.forEach((element) => {
                        element.ref.delete();
                    });
                });

            topics.forEach((topic) => {
                batch.set(firebase.firestore().collection("topics").doc(), {
                    text: topic,
                });
            });

            await batch.commit();
        }

        setTopicsAsync();
    }, [topics]);

    function pickLetter() {
        setLetter(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    }

    function assignTopics() {
        const topics = [];
        const ranNums = shuffle(Categories);
        for (let i = 0; i < 10; i++) {
            topics.push(ranNums[i]);
        }
        setTopics(topics);
    }

    function shuffle(array) {
        let i = array.length,
            j = 0,
            temp;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));

            // swap randomly chosen element with current element
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    function setupGame() {
        pickLetter();
        assignTopics();
    }

    function startGame() {
        firebase.firestore().doc("app/state").set({ state: "game" }, { merge: true });
    }

    return (
        <main className="p-10" id="__layout">
            <h1 className={styles.title}>Setup Game</h1>

            <div className="h-100">
                <div>
                    <p>A random letter and random topics will be assigned</p>
                </div>
                {letter && (
                    <div>
                        <p>Letter</p>
                        <p>{letter}</p>
                    </div>
                )}

                <div>
                    <p>Topics</p>
                    TOPICS SET!
                </div>

                <button type="input" className="btn btn-success btn-lg" onClick={() => setupGame()}>
                    Setup Game!
                </button>

                <button type="input" className="btn btn-success btn-lg" onClick={() => startGame()}>
                    Start Game
                </button>
            </div>
        </main>
    );
}
