import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { Grid, Paper } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import StudentInfo from "../StudentInfo/StudentInfo";
import SearchBar from '../SearchBar/SearchBar';
import { fetchStudentData } from "../Data/Data";

export default function Home() {

    // required variables
    const classes = useStyles(); // for styling
    const [studentData, setStudentData] = useState(null); // stores data from API call
    const [filteredStudentData, setFilteredStudentData] = useState(null); // stores filtered data from API call
    const [searchbarData, setSearchbarData] = useState({ studentName: "", studentTag: "" });

    // The useEffect calls the fetchStudentData function during initial render and then stores it to be used later
    useEffect(() => {
        fetchStudentData().then((apiData) => {
            setStudentData(apiData);
            setFilteredStudentData(apiData);
        });
    }, []);
    // end useEffect

    // function displays the filtered search bar results
    useEffect(() => {

        // ignore when studentData has not yet received data from API
        if (studentData !== null) {

            // filter the results to display
            const filter = studentData.filter((data) => {

                // query for full name
                let filteredStudents = (data.firstName + " " + data.lastName).toLowerCase().includes(searchbarData.studentName.toLowerCase());

                if (data.tags !== undefined) {
                    // query for tags
                    let filteredTags = (data.tags).toString().toLowerCase().includes(searchbarData.studentTag.toLowerCase());
                    return filteredTags && filteredStudents;
                }

                // case where only student is searched
                if (searchbarData.studentTag === "") {
                    return filteredStudents;
                }

                // if no entry then display default
                if (searchbarData.studentName === "" && searchbarData.studentTag === "") {
                    return data;
                }

                return null;
            });

            setFilteredStudentData(filter);
        }

    }, [searchbarData, studentData]);
    // end display 

    // this function updates the values of search queries
    const handleChange = (e) => {
        // store the values of the search bars
        setSearchbarData({ ...searchbarData, [e.target.name]: e.target.value });
    }
    // end handleChange

    // this function adds a tag to a selected student
    const addTag = (e, currentStudent) => {

        // store value from input
        const newTag = e.target.value;

        //add the current tag to the given student
        if (currentStudent.tags === undefined) {
            currentStudent.tags = [newTag];
        } else {
            currentStudent.tags.push(newTag);
        }

        // set the filter with current values so that the component can re-render
        const filter = studentData.filter((data) => data);
        setFilteredStudentData(filter);

        // clear the input after user enters tag keyword
        e.target.value = "";
    }
    // end of addTag function

    // initially the filteredStudentData useState variable is set to null, so we put this here. After the useEffect the value is filled
    if (!filteredStudentData) return null;

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container className={classes.root}>
                {/* Search by student name */}
                <SearchBar type="name" handleChange={handleChange} />
                <SearchBar type="tag" handleChange={handleChange} />
            </Grid>

            {filteredStudentData.map((item, index, {length}) => (
                <div key={item.firstName}>
                    <Grid container className={classes.root} spacing={3}>
                        <StudentInfo studentData={item} addTag={addTag} />
                    </Grid>
                    <Divider />
                </div>
            ))}
        </Paper>
    )
}