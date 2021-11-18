import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    container: {

    },
    img: {
        border: "solid 0.1px black",
        borderRadius: "90px",
    },
    text: {
        '&.MuiTypography-root': {
            fontFamily: "Raleway",
        }
    }
}));