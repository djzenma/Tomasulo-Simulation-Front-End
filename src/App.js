import React, {Component} from 'react';

import NavBar from "./Components/NavBar";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Content from "./Components/Content";
import axios from "axios";

//Test
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


    handleStartSimulation = (code) => {
        console.log(code);
        const instrsMatch = code.match(/Program:\n((?:.+\n+)+)Starting Address: /i);
        const startMatch = code.match(/Starting Address: (\d+)\n/i);
        const dataItemsMatch = code.match(/Data Items:\n((Address: \d+, value: \d+\n)+)/i);
        if (instrsMatch && startMatch && dataItemsMatch) {
            const instructionArray = instrsMatch[1].slice(0, -1).split('\n');
            const startingAddress = startMatch[1];
            const dataItems = dataItemsMatch[1].slice(0, -1).split('\n');

            console.log("instrs", instructionArray);
            console.log("start", startingAddress);
            console.log("data", dataItems);

            let formattedInstructions = [];
            instructionArray.forEach((instruction) => {
                const match = instruction.split(' ');
                const operandsBefore = match[1].split(',');
                let operandsAfter = [];
                operandsBefore.forEach((operand) => {
                    operand = operand.replace(/r/gi, '');
                    operandsAfter.push(operand);
                });
                console.log(match[0]);
                console.log(operandsAfter);
                formattedInstructions.push({
                    name: match[0],
                    operands: operandsAfter
                })
            });

            let formattedDataItems = [];
            dataItems.forEach((dataItem) => {
                const match = dataItem.match(/Address: (\d+), value: (\d+)/i);
                console.log('address', match[1]);
                console.log('value', match[2]);
                formattedDataItems.push({
                    address: parseInt(match[1]),
                    values: parseInt(match[2]),
                })
            });


            const request = {
                instructions: formattedInstructions,
                startingAddress: parseInt(startingAddress),
                dataItems: formattedDataItems
            };

            console.log(request);
            axios.post(`http://localhost:9000/`, request)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.setState({response: res.data});
                })
        }
    };

    /*F1F6F9*/
    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <CssBaseline/>
                    <NavBar/>
                    <Content code={this.state.code} response={this.state.response ? this.state.response:null} syntaxHighlight={this.syntaxHighlight} handleStartSimulation={this.handleStartSimulation}/>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

/*<textarea style={{marginLeft: 20 + 'px', width: 400 + 'px'}} rows="20"*/
/*onChange={(e)=>{this.syntaxHighlight(e.target.value)}} value={this.state.code}>*/
export default App;
