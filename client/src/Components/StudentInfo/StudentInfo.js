import React, { useState } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import useStyles from '../Home/styles';

export default function StudentInfo({ studentData, addTag }) {

    // required variables
    const [switchState, setSwitchState] = useState(false); // stores boolean value of button
    const classes = useStyles(); // for styling

    // changes the boolean value of html button
    const handleSwitchState = () => setSwitchState((switchState) => !switchState);

    // average function calculates the average of a given array. [All elements of array are added and then it is divided by the number of elements]
     const average = (array) => (array.reduce((a, b) => parseInt(a) + parseInt(b)) / array.length).toFixed(3);
    // end average function

    return (
        <div>
            <Grid container className={classes.root} spacing={3}>
                <Grid item>
                    {/* image of Student */}
                    <CardMedia className={classes.img} component="img" image={studentData.pic} height="150" width="150" alt={"profile of" + studentData.firstName + " " + studentData.lastName}></CardMedia>
                </Grid>
                <Grid item>
                    {/* Student Full Name */}
                    <Typography variant="h1" className={classes.text}><strong>{(studentData.firstName + " " + studentData.lastName).toUpperCase()}</strong></Typography>
                    {/* Student Email */}
                    <Typography className={classes.text}>{"Email: " + studentData.email}</Typography>
                    {/* Student Company */}
                    <Typography className={classes.text}>{"Company: " + studentData.company}</Typography>
                    {/* Student Skill */}
                    <Typography className={classes.text}>{"Skill: " + studentData.skill}</Typography>
                    {/* Student Grade Average */}
                    <Typography className={classes.text}>{"Average: " + average(studentData.grades) + "%"}</Typography>

                    <div className="accordion-content">
                        {switchState && studentData.grades.map((grade, index) => (
                            <Typography key={index} className={classes.text}>Test {(index + 1)}: {grade}%</Typography>
                        ))}
                    </div>

                    {/* Student tags */}
                    <Grid container spacing={1}>
                        {studentData.tags && studentData.tags.map((tag, index) => (
                            <Grid item key={index}>
                                <Typography className={classes.tags}>{tag}</Typography>
                            </Grid>
                        ))}
                    </Grid>

                    <TextField className={classes.form} inputProps={{ style: { fontSize: 20, fontFamily: "Raleway" } }} label="Add a tag" variant="standard" onKeyPress={e => e.key === "Enter" ? addTag(e, studentData) : null} />

                </Grid>
                <Grid item>
                    <div className="accordion-title" onClick={handleSwitchState}>
                        <button className={classes.button}>{switchState ? '-' : '+'}</button>
                    </div>
                </Grid>
            </Grid>
            <Divider />
        </div>
    )
}
