import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import Dropzone from "react-dropzone";

class DropzoneAreaComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }

    handleChange(files) {
        this.setState({
            files: files
        });
        this.readFile(files)
    }

    readFile(acceptedFiles) {
        let fileAsBinaryString = "";
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                fileAsBinaryString = ev.target.result;
                console.log(ev.target.result);
                this.props.syntaxHighlight(ev.target.result);
                this.setState({content: fileAsBinaryString, uploaded: true});
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.readAsBinaryString(file);

        });
    }

    render() {
        return (
            <div>
                <DropzoneArea
                    onChange={this.handleChange.bind(this)}
                    filesLimit={1}
                    acceptedFiles={['text/plain']}
                    placeholder="s"
                    on
                />
            </div>
        )
    }
}

export default DropzoneAreaComponent;