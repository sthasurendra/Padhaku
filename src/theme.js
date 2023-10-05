const LightTheme = {
  theme: 'light',
  pageBackground: 'white',
  titleColor: '#ff6602',
  primaryColor: '#222222',
  bg_secondaryColor: '#f0f0f0',
  secondaryColor: 'gray',
};

const DarkTheme = {
  theme: 'dark',
  pageBackground: '#282c36',
  titleColor: '#ff6602',
  primaryColor: '#fff',
  bg_secondaryColor: '#21242d',
  secondaryColor: 'gray',
};

const themes = (isDarkMode) => {
  if (isDarkMode) {
    return DarkTheme;
  } else {
    return LightTheme;
  }
};

export default themes;
