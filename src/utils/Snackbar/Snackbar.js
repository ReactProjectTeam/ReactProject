import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import "./Snackbar.scss"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const SnackbarCustom = ({title}) => {

    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
            <>
                {/*<Button variant="outlined" onClick={handleClick}>*/}
                {/*    Open success snackbar*/}
                {/*</Button>*/}
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {title}
                    </Alert>
                </Snackbar>
            </>
    );
};

export default SnackbarCustom;
