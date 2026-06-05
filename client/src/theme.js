import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    50: '#f9f7ff',
    100: '#efe9ff',
    200: '#dfd0ff',
    300: '#c0a8ff',
    400: '#a57cff',
    500: '#7a47f0',
    600: '#6233d9',
    700: '#4b26a8',
    800: '#371a76',
    900: '#241044'
  },
  muted: {
    500: '#6B6B6B'
  }
}

const fonts = {
  heading: 'Inter, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif'
}

const components = {
  Button: {
    baseStyle: { borderRadius: 'md' },
    defaultProps: { colorScheme: 'brand' }
  },
}

const theme = extendTheme({ colors, fonts, components })

export default theme
