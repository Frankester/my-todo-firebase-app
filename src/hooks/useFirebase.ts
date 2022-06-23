import { useCallback, useEffect, useState } from 'react'

import { Item, ItemData } from '../types'
import api from '../api/firestore'

function useFirebase( keyword: string){
	const [listItems, setListItems] = useState<Item[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {

		return () => {
			setIsLoading(true)

			api.getItems(keyword)
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						setListItems(currentList => {
							const storedItem = doc.data() as ItemData

							if(currentList.some(item => item.id === doc.id)) return currentList

							return [...currentList, { id: doc.id, ...storedItem }]
						})
						setIsLoading(false)
					})
				})
		}
	}, [keyword])



	const addItem = useCallback( async (newItem: ItemData ) => {
		try {
			setIsLoading(true)
			const docRef = await api.addItem(keyword, newItem)

			setListItems(items =>
				[...items,
					{
						id: docRef.id,
						itsDone: newItem.itsDone,
						title: newItem.title,
						created: newItem.created
					}
				]
			)
			setIsLoading(false)

		} catch (error) {
			console.error(error)
		}
	}, [keyword])

	const updateItem = useCallback(async (itemToUpdate: Item ) => {
		try{
			setListItems(items => {
				const otherItems = items.filter(item => item.id !== itemToUpdate.id)

				return [...otherItems, { ...itemToUpdate, itsDone:!itemToUpdate.itsDone }]
			})

			await api.updateItem(keyword, itemToUpdate)

		}catch (error){
			console.error(error)
		}
	}, [keyword])

	const deleteItem = useCallback(async (itemToDelete: Item ) => {
		try{
			setListItems(items => items.filter(item => item.id !== itemToDelete.id) )

			await api.deleteItem(keyword, itemToDelete.id)

		}catch (error){
			console.error(error)
		}
	}, [keyword])

	return {
		listItems,
		addItem,
		updateItem,
		deleteItem,
		isLoading
	}
}

export {
	useFirebase
}