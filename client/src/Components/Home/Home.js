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
    const [searchbarData, setSearchbarData] = useState({ studentName: "", studentTag: "" }); // stores information from search bars

    // This useEffect calls the fetchStudentData function to retrieve data from the API during initial render and stores it to be used.
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

            // store filtered results
            const filter = studentData.filter((data) => {

                // search query for full name
                let filteredStudents = (data.firstName + " " + data.lastName).toLowerCase().includes(searchbarData.studentName.toLowerCase());

                // only search through students who have a tag added to them
                if (data.tags !== undefined) {
                    // search query for tags
                    let filteredTags = (data.tags).toString().toLowerCase().includes(searchbarData.studentTag.toLowerCase());
                    return filteredTags && filteredStudents;
                }

                // case where only student is searched
                if (searchbarData.studentTag === "") {
                    return filteredStudents;
                }

                // if no entry then display all students
                if (searchbarData.studentName === "" && searchbarData.studentTag === "") {
                    return data;
                }

                return null;
            });

            // update the current filtered list of students
            setFilteredStudentData(filter);
        }

    }, [searchbarData, studentData]);
    // end display 

    // this function updates the searchbarData that stores the input values from the search bars
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
                {/* Search by student name and student tags */}
                <SearchBar type="name" handleChange={handleChange} />
                <SearchBar type="tag" handleChange={handleChange} />
            </Grid>

            {/* Displays each student's information */}
            {filteredStudentData.map((item, index, {length}) => (
                <div key={item.firstName}>
                    <StudentInfo studentData={item} addTag={addTag} />
                    {index + 1 === length ? null : <Divider />}
                </div>
            ))}
        </Paper>
    )
}