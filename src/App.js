import logo from './logo.svg';
import './App.css';
import {Player} from './player'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'


const theme= createMuiTheme({
  palette:{
    primary:{
      light:'#bdbdbd',
      main:'#757575',
      dark:'#424242'
    },
    secondary:{
      main:'#424242'
    }
  }
})


function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Player/> 
    </div>
    </ThemeProvider>
  );
}

export default App;
