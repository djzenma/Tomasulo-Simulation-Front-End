import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});


function RegisterTable(props) {
    const {classes} = props;
    const row = props.data;
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell numeric>R0</CustomTableCell>
                        <CustomTableCell numeric>R1</CustomTableCell>
                        <CustomTableCell numeric>R2</CustomTableCell>
                        <CustomTableCell numeric>R3</CustomTableCell>
                        <CustomTableCell numeric>R4</CustomTableCell>
                        <CustomTableCell numeric>R5</CustomTableCell>
                        <CustomTableCell numeric>R6</CustomTableCell>
                        <CustomTableCell numeric>R7</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <CustomTableCell numeric component="th" scope="row">
                            {row[0]}
                        </CustomTableCell>
                        <CustomTableCell numeric>{row[1]}</CustomTableCell>
                        <CustomTableCell numeric>{row[2]}</CustomTableCell>
                        <CustomTableCell numeric>{row[3]}</CustomTableCell>
                        <CustomTableCell numeric>{row[4]}</CustomTableCell>
                        <CustomTableCell numeric>{row[5]}</CustomTableCell>
                        <CustomTableCell numeric>{row[6]}</CustomTableCell>
                        <CustomTableCell numeric>{row[7]}</CustomTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(RegisterTable);
