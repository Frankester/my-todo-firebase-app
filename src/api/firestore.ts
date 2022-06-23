import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { Item, ItemData } from '../types'
import db from '../utils/firebaseConfig'


export default {
	getItems: (keyword: string) => getDocs(collection(db, keyword)),

	updateItem: (keyword:string, itemToUpdate:Item) =>
		updateDoc(doc(db, keyword, itemToUpdate.id), {
			itsDone: !itemToUpdate.itsDone,
			title: itemToUpdate.title
		}),

	deleteItem: (keyword:string, itemId: string) => deleteDoc(doc(db, keyword, itemId)),

	addItem:(keyword:string, newItem:ItemData) => addDoc(collection(db, keyword), newItem),
}