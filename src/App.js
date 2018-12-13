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
        /*if (code.includes('lw'))
            code = code.replace(/lw/g, '<span class="text-danger">lw</span>');
        else if (code.includes('sw'))
            code = code.replace(/sw/g, '<span class="text-danger ">sw</span>');
        else if (code.includes('jmp'))
            code = code.replace(/jmp/g, '<span class="text-danger">jmp</span>');
        else if (code.includes('beq'))
            code = code.replace(/beq/g, '<span class="text-danger">beq</span>');
        else if (code.includes('jalr'))
            code = code.replace(/jalr/g, '<span class="text-danger">jalr</span>');
        else if (code.includes('ret'))
            code = code.replace(/ret/g, '<span class="text-danger">ret</span>');
        else if (code.includes('add'))
            code = code.replace(/add/g, '<span class="text-danger">add</span>');
        else if (code.includes('sub'))
            code = code.replace(/sub/g, '<span class="text-danger">sub</span>');
        else if (code.includes('addi'))
            code = code.replace(/addi/g, '<span class="text-danger">addi</span>');
        else if (code.includes('nand'))
            code = code.replace(/nand/g, '<span class="text-danger">nand</span>');
        else if (code.includes('mul'))
            code = code.replace(/mul/g, '<span class="text-danger">mul</span>');*/
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
