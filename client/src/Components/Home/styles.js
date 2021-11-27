import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
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
    img: {
        border: "solid 0.1px #c9c6c6",
        borderRadius: "90px",
    },
    text: {
        '&.MuiTypography-body1': {
            fontFamily: "Raleway",
            fontSize: "20px",
            marginLeft: "30px",
            fontWeight: 500,
        },
        '&.MuiTypography-h1': {
            fontFamily: "Raleway",
            fontSize: "50px",
            marginTop: "-10px",
            marginBottom: "10px",
        },
        '&.MuiTextField-root': {
            fontFamily: "Raleway",
            fontSize: "20px",
        },
    },
    accordian: {
        marginTop: 15,
    },
    tags: {
        padding: "5px 10px",
        borderRadius: 5,
        backgroundColor: "#d6d9db",
        '&.MuiTypography-body1': {
            fontFamily: "Raleway",
            fontSize: "20px",
        },
        '&.MuiGrid-spacing-xs-1': {
            marginLeft: 30
        },
    },
    paper: {
        '&.MuiPaper-root': {
            margin: "8% 15%",
            borderRadius: 10,
        },
    },
    form: {
        '&.MuiFormControl-root': {
            marginLeft: 30
        },
    },
    searchbar: {
        '& .MuiFormLabel-root': {
            fontSize: 20,
            fontFamily: "Raleway",
            color: "#6e6c6c",
        },
        '& .MuiInput-underline:after': {
            border: "black",
        },
    },
}));