import {getDocs, collection} from "firebase/firestore";
import {firestore} from "./firebase";
import {QuestionType} from "../sampleData";


const collectionName = "questions";

export type FirebaseQuestion = {
	id: number
	question: string
}

export const findAll = async () => {
	const docRef = await getDocs(collection(firestore, collectionName));

	const res : QuestionType[] = [];

	docRef.forEach(questionSnap => {
		res.push(
			{
				id: questionSnap.data().id,
				question: questionSnap.data().question
			}
		)
	})

	return res;
}
