import { Button, ListItem, Text } from '@chakra-ui/react'

interface ListItemProps {
    onDone: () => void,
    onDelete: () => void,
    isDone: boolean,
    children: React.ReactNode
}

export default function TodoItem({ onDone, onDelete, isDone, children }: ListItemProps) {

	const handleClick= (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()

		onDelete()
	}

	return (
		<ListItem onClick={onDone} display='flex' justifyContent='space-between'>
			<Text
				textDecoration={isDone ? 'line-through': ''}
				fontSize='xl'
			>
				{ children }
			</Text>

			<Button onClick={handleClick} colorScheme='red'>delete</Button>
		</ListItem>
	)
}
