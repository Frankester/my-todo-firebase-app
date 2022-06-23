import { Button, FormControl, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

interface ItemFormProps {
	handleAddItem: (newItem: string) => void
}

export default function ItemForm({ handleAddItem }: ItemFormProps) {
	const [newItem, setNewItem] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewItem(e.target.value)
	}

	const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		handleAddItem(newItem)
		setNewItem('')
	}

	return (
		<form onSubmit={handleSubmit}>

			<FormControl display='flex' justifyContent={'space-between'}>
				<Input
					maxW={'100%'}
					type='text'
					placeholder='eg. buy vegetables etc'
					value={newItem}
					onChange={handleChange}
				/>
				<Button colorScheme='blue' textTransform='capitalize'>add</Button>
			</FormControl>

		</form>
	)
}
