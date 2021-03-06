//import "../styles/globals.css";
import Head from "next/head";
import firebase from "firebase";
import "../_styles/css/plugins.bundle.css";
import "../_styles/css/wizard-6.css";
import "../_styles/css/themes/layout/header/base/light.min.css";
import "../_styles/css/themes/layout/header/menu/light.min.css";
import "../_styles/css/login-1.min.css";
import "../_styles/css/login-3.min.css";
import "../_styles/vendor/font-awesome/css/all.min.css";
import "../_styles/fonts/boxicons/css/boxicons.min.css";
import "../styles/globals.scss";
//import "../styles/animations.scss";

const firebaseConfig = {
    apiKey: "AIzaSyApiramAxrtYlJCUV3dg-VaoJ6qJca007w",
    authDomain: "scattergories-e8ece.firebaseapp.com",
    projectId: "scattergories-e8ece",
    storageBucket: "scattergories-e8ece.appspot.com",
    messagingSenderId: "978777798914",
    appId: "1:978777798914:web:738581fba9bf2e5646ea1b",
};
// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" key="Poppins-Font" />
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
                    rel="stylesheet"
                    key="OpenSans-Font"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
                    rel="stylesheet"
                    key="Roboto-Font"
                />
                <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans" rel="stylesheet" key="IBM-Font" />
                <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet" key="Rubik-Font" />

                <link href="/js/plugins.bundle.js" type="text/javascript" key="plugins"></link>
                <link href="/js/scripts.bundle.min.js" type="text/javascript" key="scripts"></link>
                <script type="text/javascript" src="https://miro.com/app/static/boardsPicker.1.0.js"></script>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
