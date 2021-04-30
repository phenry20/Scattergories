import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Game() {
    const { handleSubmit, register, formState, getValues } = useForm();
    const [topics, topicsLoading] = useCollection(firebase.firestore().collection("/topics"));
    const [state, stateLoading] = useDocument(firebase.firestore().doc("/app/state"));
    const router = useRouter();

    useEffect(() => {
        if (stateLoading) {
            return;
        }

        if (state.data().state === "answers") {
            const values = getValues();

            firebase
                .firestore()
                .doc(`/users/${localStorage.getItem("name")}`)
                .set({ answers: Object.values(values) }, { merge: true });

            router.push("/answers");
        }
    }, [state]);

    function onSubmit(data) {
        firebase.firestore().doc("app/state").set({ state: "answers" }, { merge: true });
    }

    return (
        <div className="d-flex justify-content-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="d-flex flex-column align-items-center justify-content-center h-100 w-50"
            >
                {!topicsLoading &&
                    topics.docs.map((topic) => (
                        <div key={topic.data().text}>
                            <label className="font-size-h6 font-weight-bolder">{topic.data().text}</label>
                            <input
                                ref={register({
                                    required: true,
                                    pattern: {
                                        value: ".+",
                                        message: "Must add a value",
                                    },
                                })}
                                name={topic.data().text}
                                type="name"
                                className="form-control form-control-solid h-auto rounded-lg font-size-h6 mx-5 mb-5"
                                placeholder={topic.data().text}
                            />
                        </div>
                    ))}

                <button
                    type="submit"
                    className="btn btn-lg btn-success btn-block mt-10"
                    disabled={stateLoading || state.data().state === "answers"}
                >
                    DONE
                </button>
            </form>
        </div>
    );
}
