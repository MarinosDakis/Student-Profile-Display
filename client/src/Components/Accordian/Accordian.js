import React, { useState } from 'react';
import useStyles from './styles';
import { Typography } from '@material-ui/core';

const Accordion = ({ gradesArray }) => {

    // required variables
    const [switchState, setSwitchState] = useState(false); // stores boolean value of button
    const classes = useStyles(); // for styling

    // changes the boolean value of html button
    const handleSwitchState = () => setSwitchState((switchState) => !switchState);

    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={handleSwitchState}>
                <button className={classes.button}>{switchState ? '-' : '+'}</button>
            </div>
            <div className="accordion-content">{switchState && gradesArray.map((grade, index) => (
                <Typography key={index} className={classes.text}>Test {(index + 1)}: {grade}%</Typography>
            ))}
            </div>
        </div>
    );

}

export default Accordion;