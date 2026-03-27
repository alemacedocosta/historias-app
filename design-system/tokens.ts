export const tokens = {
  colors: {
    background: "0 0% 100%",          // #FFFFFF
    foreground: "0 0% 6.7%",          // #111111
    primary: "0 0% 6.7%",             // #111111
    primaryForeground: "0 0% 100%",   // #FFFFFF
    secondary: "30 30% 93%",          // #F2EDE6 - warm beige
    secondaryForeground: "0 0% 6.7%", // #111111
    muted: "30 30% 93%",              // #F2EDE6
    mutedForeground: "0 0% 40%",      // #666666
    accent: "30 30% 93%",             // #F2EDE6
    accentForeground: "0 0% 6.7%",    // #111111
    destructive: "3 69% 47%",         // #C0392B
    destructiveForeground: "0 0% 100%",
    success: "168 54% 28%",           // #27635A
    successForeground: "0 0% 100%",
    border: "30 15% 87%",             // #E0D9D0
    input: "30 15% 87%",
    ring: "0 0% 6.7%",
    card: "0 0% 100%",
    cardForeground: "0 0% 6.7%",
  },
  radius: "0rem",  // sem border-radius (design principle do produto)
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  typography: {
    fontSizeBase: "1rem",        // 16px - mínimo para sêniors
    fontSizeInput: "1.125rem",   // 18px para campos de input
    fontSizeLg: "1.25rem",
    fontSizeXl: "1.5rem",
    fontSizeDisplay: "2.5rem",
    lineHeightBase: "1.6",
    lineHeightRelaxed: "1.8",
    fontWeightNormal: "400",
    fontWeightMedium: "500",
    fontWeightBold: "700",
  },
  sidebar: {
    background: "0 0% 100%",
    foreground: "0 0% 6.7%",
    primary: "0 0% 6.7%",
    primaryForeground: "0 0% 100%",
    accent: "30 30% 93%",
    accentForeground: "0 0% 6.7%",
    border: "30 15% 87%",
    ring: "0 0% 6.7%",
  },
} as const;

export type DesignTokens = typeof tokens;
