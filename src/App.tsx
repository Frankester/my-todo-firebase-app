import { Heading, List, Spinner, Stack } from '@chakra-ui/react'
import { useCallback } from 'react'
import ItemForm from './components/pure/ItemForm'
import TodoItem from './components/pure/TodoItem'
import { useFirebase } from './hooks/useFirebase'

import { Item } from './types'

const ITEMS_KEYWORD = 'todos'

function App() {
	const { listItems, addItem, deleteItem, updateItem, isLoading } = useFirebase(ITEMS_KEYWORD)

	const handleAddItem = useCallback((newTitle: string) => {
		addItem({ itsDone: false, title: newTitle, created: +new Date() })
	}, [])

	const handleDone = useCallback((itemDone: Item) => {
		updateItem(itemDone)
	}, [])

	const handleDelete = useCallback((itemToDelete: Item) => {
		deleteItem(itemToDelete)
	}, [])

	return (
		<Stack
			textAlign='center'
			spacing='3'
			minWidth='xs'
			maxW='6xl'
			marginX='auto'
			paddingX='10'
			marginTop='15%'
		>
			<Heading as='h1' textTransform='capitalize' marginBottom='10'>todo App</Heading>

			<ItemForm
				handleAddItem={handleAddItem}
			/>

			<List spacing='5'>
				{
					!isLoading &&
					listItems
						.sort((a, b) => b.created - a.created)
						.map((item) =>
							<TodoItem
								key={item.id}
								isDone={ item.itsDone }
								onDone={() => handleDone(item)}
								onDelete={() => handleDelete(item)}
							>
								{item.title}
							</TodoItem>
						)
				}
				{
					isLoading
						&& <Spinner
							size='xl'
							color='brand.700'
							emptyColor='brand.500'
							thickness='4px'
						/>
				}
			</List>
		</Stack>
	)
}

export default App
