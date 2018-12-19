import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/es/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ROB from "./ROB";
import ReservationStations from "./ReservationStations";
import RegisterTable from "./RegisterTable";

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return ['Cycle 0', 'Cycle 1', 'Cycle 2'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Cycle 0';
        case 1:
            return 'Cycle 1';
        case 2:
            return 'Cycle 2';
        default:
            return 'Unknown step';
    }
}

class Cycles extends React.Component {
    state = {
        activeStep: 0,
        skipped: new Set(),
    };

    isStepOptional = step => {
        return step === 1;
    };

    handleNext = () => {
        const {activeStep} = this.state;
        let {skipped} = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    render() {
        const {classes, response} = this.props;
        const steps = response === null ? getSteps() : response;
        const {activeStep} = this.state;

        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const props = {};
                                const labelProps = {};
                                if (this.isStepOptional(index)) {
                                }
                                if (this.isStepSkipped(index)) {
                                    props.completed = false;
                                }
                                return (
                                    <Step key={index} {...props}>
                                        <StepLabel {...labelProps}>{index}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Registers">
                        </CardHeader>
                        <CardContent>
                            <RegisterTable data={response === null || activeStep >= steps.length ? [] : response[activeStep].rf}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="ROB">
                        </CardHeader>
                        <CardContent>
                            <ROB data={response === null  || activeStep >= steps.length ? [] : response[activeStep].robResponse}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Reservation Stations">
                        </CardHeader>
                        <CardContent>
                            <ReservationStations data={response === null || activeStep >= steps.length  ? [] : response[activeStep].rsResponses}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button onClick={this.handleReset} className={classes.button}>
                                    Reset
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Cycles);