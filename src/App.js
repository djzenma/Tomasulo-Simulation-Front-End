import React, {Component} from 'react';

import NavBar from "./Components/NavBar";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Content from "./Components/Content";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0b0b0c"
        },
        secondary: {
            main: "#004D40"
        }
    },
    typography: {
        button: {
            fontWeight: 400,
            textAlign: 'capitalize'
        },
        useNextVariants: true,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {uploaded: false, code: ""};
    }

    componentDidMount() {

    }

    syntaxHighlight = (code) => {
        this.setState({code: code});
    };

    /*F1F6F9*/
    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <CssBaseline/>
                    <NavBar/>
                    <Content code={this.state.code} syntaxHighlight={this.syntaxHighlight}/>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

/*<textarea style={{marginLeft: 20 + 'px', width: 400 + 'px'}} rows="20"*/
/*onChange={(e)=>{this.syntaxHighlight(e.target.value)}} value={this.state.code}>*/
export default App;
