import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import DropFile from './Components/DropFile'

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {uploaded: false, code: ""};
    }
    componentDidMount() {

    }
    syntaxHighlight(code) {
        if(code.includes('lw'))
            code = code.replace(/lw/g, '<span className="text-primary">lw</span>');
        else if(code.includes('sw') )
            code = code.replace(/sw/g, <span className="text-primary">sw</span>);
        else if(code.includes('jmp') )
            code =code.replace(/jmp/g,<span className="text-primary">jmp</span>);
        else if(code.includes('beq'))
            code =code.replace(/beq/g,<span className="text-primary">beq</span>);
        else if(code.includes('jalr'))
            code =code.replace(/jalr/g,<span className="text-primary">jalr</span>);
        else if(code.includes('ret'))
            code =code.replace(/ret/g,<span className="text-primary">ret</span>);
        else if(code.includes('add'))
            code =code.replace(/add/g,<span className="text-primary">add</span>);
        else if(code.includes('sub'))
            code = code.replace(/sub/g,<span className="text-primary">sub</span>);
        else if(code.includes('addi'))
            code = code.replace(/addi/g,<span className="text-primary">addi</span>);
        else if( code.includes('nand'))
            code =code.replace(/nand/g,<span className="text-primary">nand</span>);
        else if(code.includes('mul'))
            code = code.replace(/mul/g,<span className="text-primary">mul</span>);

        this.setState({code: code});
    }
    /*F1F6F9*/
    render() {
        let codeAreaDisplay;
        if(this.state.uploaded)
            codeAreaDisplay = 'none';
        else
            codeAreaDisplay = 'block';
      return (
        <div>
            <header>
                <Jumbotron style={{backgroundColor: '#3F88C5', marginBottom: 0}}>
                    <h1 className="text-light h1">Tomasolo Simulation</h1>
                    <h2 className="text-light h3 pt-2">Engineers: Mazen, Ads, Khaled, Bassant</h2>
                </Jumbotron>
            </header>
            <main style={{backgroundColor: '#E7BB41'}}>
                <DropFile onChange={(flag) => {
                    this.setState({uploaded: flag});
                    console.log('flag ' + flag);
                }}/>
                <textarea style={{marginLeft: 20 + 'px', width: 400 + 'px', backgroundColor: '#F4F4F9'}} rows="20">
                </textarea>
            </main>
        </div>
      );
    }
}
        /*<textarea style={{marginLeft: 20 + 'px', width: 400 + 'px'}} rows="20"*/
        /*onChange={(e)=>{this.syntaxHighlight(e.target.value)}} value={this.state.code}>*/
export default App;
