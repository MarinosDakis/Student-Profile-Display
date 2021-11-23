import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    text: {
        '&.MuiTypography-body1': {
            fontFamily: "Raleway",
            fontSize: "20px",
            marginLeft: "30px",
        },
        '&.MuiTextField-root': {
            fontFamily: "Raleway",
            fontSize: "20px",
        },
    },
    button: {
        color: "#c9c8c8",
        background: "none",
        border: "none",
        fontSize: "100px",
        fontFamily: "Raleway",
        cursor: "pointer",
        '&:hover': {
            color: "black",
        }
    },
}));