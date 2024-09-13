import { Colors, Theme } from '../types/app.types'

const theme: Theme = {
  colors: {
    primary: '#c0e3e5',
    secondary: '#fdc936',
    whiteColor: '#fff',
    darkColor: '#322625',
    grayColor: '#ebebeb'
  }
}

const createTheme = (colors: Colors): Theme => {
  if (!colors) {
    return { ...theme }
  }
  return {
    ...theme,
    colors: {
      ...theme.colors,
      ...colors
    }
  }
}

export { createTheme, theme }
