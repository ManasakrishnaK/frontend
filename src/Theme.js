import { createTheme } from '@material-ui/core/styles';

const blue = '#171433';
const yellow = '#ffa733';
const white = '#ffffff';

const theme = createTheme({
  palette: {
    common:{
      white:`${white}`
    },
    primary: {
      main:`${blue}`,
    },
    secondary: {
      main: `${yellow}`,
    },
  },
});

export default theme