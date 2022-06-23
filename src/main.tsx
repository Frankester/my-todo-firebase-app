import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
		500: 'hsl(230deg, 50%, 70%)'
	},
}


const theme = extendTheme({ colors })

const rootElement = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
)
