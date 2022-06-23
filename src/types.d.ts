
interface ItemData {
    title: string,
    itsDone: boolean,
    created: number
}

interface Item extends ItemData {
    id: string,
}


export {
	Item,
	ItemData
}