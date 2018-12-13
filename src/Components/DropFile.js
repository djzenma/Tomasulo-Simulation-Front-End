import { Component } from 'react';
import Dropzone from 'react-dropzone'
import React from "react";

class DropFile extends Component {
    constructor(props) {
        super(props);
        this.state = {accepted: [], rejected: [], content: "", uploaded: false};
        this.onUploadChange = this.onUploadChange.bind(this);
    }

    onUploadChange(flag) {
        this.props.onChange(flag);
    }

    readFile(acceptedFiles) {
        let uplFlag = false;
        let fileAsBinaryString = "";
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                fileAsBinaryString = reader.result;
                // do whatever you want with the file content
                this.setState({content: fileAsBinaryString, uploaded: true});
                uplFlag = true;
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.readAsBinaryString(file);
        });
        this.onUploadChange(uplFlag);
    }

    render() {
        let presentation = "";
        if(this.state.content !== "")
            presentation = 'Your Program is : \n';

        return (
            <div>
                <Dropzone
                    accept="text/*"
                    onDrop={(accepted, rejected) => { this.readFile(accepted) }} >
                    <p>Drag and drop assembly file here, or click to select file to upload.</p>
                    <p>Only *.txt files will be accepted</p>
                </Dropzone>
                <p> <span style={{whiteSpace: 'pre-line'}}>{ presentation + this.state.content}</span></p>
            </div>
        );
    }
}

export default DropFile