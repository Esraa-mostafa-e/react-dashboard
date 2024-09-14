interface Colors {
  primary?: string
  secondary?: string
  whiteColor?: string
  darkColor?: string
  grayColor?: string
}

interface Theme {
  colors: Colors
}

export type { Colors, Theme }