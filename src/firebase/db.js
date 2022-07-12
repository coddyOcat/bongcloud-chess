// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {collection, doc, getDocs, getFirestore, query, setDoc, where} from "firebase/firestore"
import {getDatabase, ref, set} from "firebase/database"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCLnziLV_QNMfoNFQ5iHu4evs6Bp9cn4mU",
	authDomain: "bongcloudg.firebaseapp.com",
	databaseURL: "https://bongcloudg-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "bongcloudg",
	storageBucket: "bongcloudg.appspot.com",
	messagingSenderId: "471668131386",
	appId: "1:471668131386:web:da9bd3ed5b50ee6a0d5703",
	measurementId: "G-J18HB347P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const realtime = getDatabase(app)
// const analytics = getAnalytics(app);

export const createTable = async (numTable, whitePlayer) => {
	const q = query(collection(firestore, "table"), where("numTable", "==", numTable));
	const querySnapshot = await getDocs(q);
	var listz = [];
	querySnapshot.forEach((doc) => {
		listz.push(doc.data());
	});
	if (listz.length > 0) {
		console.log(listz)
		return false;
	} else {
		await setDoc(doc(firestore, "table", `${numTable}`), {
			numTable: numTable,
			position:
				"RNBQKBNRPPPPPPPP11111111111111111111111111111111pppppppprnbqkbnr",
			whitePlayer: whitePlayer,
			blackPlayer: "",
			sideMove: "",
			sideWin: "",
		});
		await set(ref(realtime, `${numTable}`), {
			position:
				"RNBQKBNRPPPPPPPP11111111111111111111111111111111pppppppprnbqkbnr",
			whitePlayer: whitePlayer,
			blackPlayer: "",
			sideMove: "",
			sideWin: "",
		});
		return true;
	}
};

