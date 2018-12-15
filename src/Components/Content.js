import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import ROB from "./ROB";
import ReservationStations from "./ReservationStations";
import RegisterTable from "./RegisterTable";
import DropzoneAreaComponent from "./DropZone";
import Highlight from "react-highlight";
import Cycles from "./Cycles";
import axios from 'axios';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        maxWidth: "95%",
        margin: 'auto',
        overflow: 'hidden',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    card: {
        float: 'left',
        margin: '10%',
    },
    actionBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    block: {
        display: 'block',
    },
});

const handleStartSimulation = (code) => {
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
            const operands = match[1].split(',');
            console.log(match[0]);
            console.log(operands);
            formattedInstructions.push({
                name: match[0],
                operands: operands
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
            })
    }
};

function Content(props) {
    const {classes, syntaxHighlight, code} = props;

    return (
        <Paper className={classes.paper}>
            <AppBar className={classes.actionBar} position="static" elevation={0}>
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Button color="secondary" variant="contained" onClick={() => {
                                handleStartSimulation(code);
                            }}>
                                Start Simulation
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Simulation Input" subheader="Enter text or drag files">
                        </CardHeader>
                        <CardContent>
                            <Grid container spacing={16}>

                                <Grid item xs={12}>
                                    <Card>
                                        <CardHeader title="Code">
                                        </CardHeader>
                                        <CardContent>
                                            <Highlight
                                                className="mips">{code !== "" ? code : 'No input provided. Please use one of the methods to provide input. :)'}</Highlight>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card>
                                        <CardHeader title="Manual Input"
                                                    subheader="Input simulation instructions manually and formatted">
                                        </CardHeader>
                                        <CardContent>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Simulation Program"
                                                multiline
                                                rows="20"
                                                fullWidth
                                                placeholder="Enter simulation program..."
                                                className={classes.textField}
                                                margin="normal"
                                                variant="filled"
                                                onChange={(e) => syntaxHighlight(e.target.value)}
                                                helperText="This is where you can enter the program"
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card>
                                        <CardHeader title="Drag & Drop Files"
                                                    subheader="drag files here to load simulation automatically">
                                        </CardHeader>
                                        <CardContent>
                                            <DropzoneAreaComponent syntaxHighlight={syntaxHighlight}/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Simulation Output" subheader="These tables show the output">
                        </CardHeader>
                        <CardContent>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <Cycles/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardHeader title="ROB">
                                        </CardHeader>
                                        <CardContent>
                                            <ROB/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardHeader title="Reservation Stations">
                                        </CardHeader>
                                        <CardContent>
                                            <ReservationStations/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardHeader title="Register Status">
                                        </CardHeader>
                                        <CardContent>
                                            <RegisterTable/>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default withStyles(styles)(Content);