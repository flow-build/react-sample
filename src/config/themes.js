import { createTheme } from '@mui/material/styles'

export const themeDefault = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2D77EF',
            light: '#79B2FF',
            dark: '#0046A6'
        },
        secondary: {
            main: '#000000',
            light: '#3D3D3D'
        },
        error: {
            main: '#EB5757'
        },
        warning: {
            main: '#E2B93B'
        },
        success: {
            main: '#27AE60'
        },
        grey: {
            100: '#151521',
            200: '#1E1E2D',
            300: '#4B4B57',
            400: '#83838C',
            500: '#BABAC1',
            600: '#F3F3F4',
            700: '#FFFFFF'
        },
        background: {
            default: '#151521',
            paper: '#151521'
        }
    },
})