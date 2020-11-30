import { firestore } from "firebase-admin";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../config/firebase";

const firebase = app.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const fieldValues = firestore.FieldValue;

if (window.location.hostname === "localhost" || "127.0.0.0") {
  db.settings({
    host: "localhost:8000",
    ssl: false,
  });

  console.log(
    "You're running Firestore locally, data will not persist unless emulators are initiated with --export-on-exit:./path-to-export flags. If you didn't, don't forget to run an import script before exiting if you wish to persist data."
  );
}

db.enablePersistence({
  synchronizeTabs: true,
});

export default firebase;
