import { useEffect, useState, useRef } from "react";
import {Categories} from "../enum/categories"
import styles from "../styles/Home.module.css";

export default function Setup() {
    const [letter, setLetter] = useState("");
    const [topics, setTopics] = useState();

    function pickLetter() {
        setLetter(String.fromCharCode(65+Math.floor(Math.random() * 26)));
    }

    function assignTopics() {
        const topics = [];
        const ranNums = shuffle(Categories);
        for (let i =0; i < 10; i++) {
            topics.push(ranNums[i]);
        }
        setTopics(topics);
    }

    function shuffle(array) {
        let i = array.length,
            j = 0,
            temp;
    
        while (i--) {
    
            j = Math.floor(Math.random() * (i+1));
    
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

    return (
<main className="p-10" id="__layout">
                <h1 className={styles.title}>
                   Setup Game
                </h1>

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
                        {topics &&
    <div>
     <p>Topics</p>
{topics.map((topic, index) => 
<p key={index}>{topic}</p>
)
 
}</div>}


                        <button type="input" className="btn btn-success btn-lg" onClick={()=>setupGame()} >
                            Setup Game!
                        </button>
                </div>
            </main>
    );
}