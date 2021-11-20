import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    img: {
        border: "solid 0.1px #c9c6c6",
        borderRadius: "90px",
    },
    text: {
        '&.MuiTypography-body1': {
            fontFamily: "Raleway",
            fontSize: "20px",
            marginLeft: "30px",
        },
        '&.MuiTypography-h1': {
            fontFamily: "Raleway",
            fontSize: "50px",
            marginTop: "-10px",
            marginBottom: "10px",
        }
    }
}));