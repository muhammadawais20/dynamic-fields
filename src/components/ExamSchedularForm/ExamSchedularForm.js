import * as React from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import './ExamSchedularForm.css';

export default function ExamSchedularForm() {

    const [formValues, setFormValues] = useState([{ examType: "", className: "", subject: "", examDateTime: "" }])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { examType: "", className: "", subject: "", examDateTime: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let submitFormDataHandler = (e) => {
        e.preventDefault();

        const getExamTypes = formValues.map(e => e.examType);
        const checkExamType = [...new Set(getExamTypes)].length === 1;

        const getClassTypes = formValues.map(e => e.className);
        const checkClassType = [...new Set(getClassTypes)].length === 1;

        const getSubjectTypes = formValues.map(e => e.subject);
        const getSubjectType = getSubjectTypes.filter((e, i, a) => a.indexOf(e) !== i);

        if (checkExamType === false) {
            toast.warning("Exam category should be same!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        else if (checkClassType === false) {
            toast.warning("Class should be same!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        else if (getSubjectType.length >= 1) {
            toast.warning("Subject should not be same!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        else {
            console.log("formValues", formValues);
            setFormValues([{ examType: "", className: "", subject: "", examDateTime: "" }]);

            toast.success("Exam schedule added successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    return (
        <form className="examSchedularFormContainer" onSubmit={submitFormDataHandler}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }} className="examSchedularFormTop">
                <Box sx={{ fontWeight: "bold", fontSize: "26px" }} >
                    <Box className="examSchedularFormTitle">
                        Exam Schedular
                    </Box>
                </Box>
            </Box>
            {formValues.map((element, index) => (
                <Grid className="examSchedularForm" container spacing={2} style={{ display: 'flex', marginBottom: '25px' }} key={index}>
                    <Grid xs={12} sm={2} item id="examType">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Exam Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="examType"
                                label="Exam Type"
                                required
                                fullWidth
                                variant="outlined"
                                name="examType"
                                value={element.examType}
                                onChange={e => handleChange(index, e)}
                            >
                                <MenuItem value="Mid Terms">Mid Terms</MenuItem>
                                <MenuItem value="Finals">Finals</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={2} item id="className">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Class Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="className"
                                label="Class Name"
                                required
                                fullWidth
                                variant="outlined"
                                name="className"
                                value={element.className}
                                onChange={e => handleChange(index, e)}
                            >
                                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((classes, index) => (
                                    <MenuItem key={index} value={classes}>{classes}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={2} item id="subject">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="subject"
                                label="Subject"
                                required
                                fullWidth
                                variant="outlined"
                                name="subject"
                                value={element.subject}
                                onChange={e => handleChange(index, e)}
                            >
                                {["Urdu", "Islamiat"].map((subject, index) => (
                                    <MenuItem key={index} value={subject}>{subject}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={2} item id="schedularDateTime">
                        <input type="datetime-local" id="examDateTime" name="examDateTime"
                            value={element.examDateTime}
                            onChange={e => handleChange(index, e)}
                            placeholder="Exame Date & Time"
                            required
                        />
                    </Grid>
                    {
                        index ?
                            <Grid className="examSchedularFormRemoveAction" xs={6} sm={2} style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '20px' }}>
                                <Button
                                    onClick={() => removeFormFields(index)}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{ backgroundColor: "rgb(25, 118, 210)" }}
                                    tabIndex={Math.random()}
                                >
                                    Remove
                                </Button>
                            </Grid>
                            :
                            null
                    }
                </Grid >
            ))}
            <Grid className="examSchedularActions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <Grid xs={6} sm={2} className="addFields">
                    <Button
                        onClick={() => addFormFields()}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ backgroundColor: "rgb(25, 118, 210)" }}
                        tabIndex={Math.random()}
                    >
                        Add New Fields
                    </Button>
                </Grid>
                <Grid xs={6} sm={2} item>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ backgroundColor: "rgb(25, 118, 210)" }}
                        tabIndex={Math.random()}
                    >
                        Submit Schedule
                    </Button>
                </Grid>
            </Grid>
            <ToastContainer />
        </form>
    );
}