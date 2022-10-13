import React, { useState } from 'react';
import { Form, Row, Col, Button} from 'react-bootstrap';
import '../css/NewProject.css';

/**
 * This function controls the functionality of the NewProject component and 
 * returns the component. There are input fields for project name, id, description, 
 * start date and time and end date and time. If all the values are valid it will call
 * the addProject method passed in and return. Error messages will display if fields
 * have not been entered or are invalid.
 * Source for findFormErrors(), handleSubmit() and setField: 
 * https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2 
 * @param {props} param0 A method to add projects and the projects array
 * @returns The NewProject component
 */
function NewProject({addProject, projects}) {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    /**
     * This function returns the time in 24 hour format.
     * Source: https://stackoverflow.com/questions/15083548/convert-12-hour-hhmm-am-pm-to-24-hour-hhmm
     * @param {string} time12h The string of time to be converted
     * @returns 24 hour time
     */
    const convert24hr = (time12h) => {
        const [time, modifier] = time12h.split(' ');      
        let [hours, minutes] = time.split(':');    

        if(hours === '12') hours = '00';     
        if(modifier === 'PM') hours = parseInt(hours, 10) + 12;

        return `${hours}:${minutes}`;
    }

    /**
     * This funtion checks if the inputs from the form are valid. If not, an 
     * error message is created and added to the newErrors.
     * @returns An object of errors found in the form.
     */
    const findFormErrors = () => {
        //set the state of the form
        const { name, id, description, startDate, startTime, endDate, endTime } = form;

        const newErrors = {};
        //check if name is valid, not empty
        if(!name || name === '' || name.trim().length === 0) newErrors.name = 'Please provide a valid project name.';
    
        // //check the id has been inputed and that the number is greater than 0.
        // if(!id || id <= 0) newErrors.id = "Please provide a valid project ID.";
        // else if(id <= 0) newErrors.id = "Project ID cannot be a negative number or zero";
        // //the id provided should not already exist
        // else if(projects.filter(item => item.projectIdentifier.includes(id)).length >= 1) newErrors.id = "Project ID is already in use. Please choose a different one.";
        

        //check description is valid, not empty
        if(!description || description === '' || description.trim().length === 0) newErrors.description = "Please provide a valid project description.";

        //check start date and time is not empty
        if(!startDate || startDate === '') newErrors.startDate = "Please provide a start date.";
        if(!startTime || startTime === '') newErrors.startTime = "Please provide a start time.";

        //check end date and time is not empty
        if(!endDate || endDate === '') newErrors.endDate = "Please provide a end date.";
        else if(startDate){
            //check if the end date is valid, should be after the start date
            var startD = new Date(startDate);
            var endD = new Date(endDate);
            if(endD.getTime() <= startD.getTime()) newErrors.endDate = "End date is before start date.";
        }
        if(!endTime || endTime === '') newErrors.endTime = "Please provide a end time.";
                
        return newErrors;
    }

    /**
     * This function is called when the form is submitted. It will prevent the 
     * default action and validate the form. If errors are found, the user is notified
     * else the new project is added. 
     * @param {event} event The event which triggered the function
     */
    const handleSubmit = (event) => {
        event.preventDefault();

        //check if inputs are valid
        const newErrors = findFormErrors();
        console.log(form.name);
        var name = form.name;
        if (Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors);
        } else {
            //words = words.replace(/\n/g, " ");
            var description = form.description.replace(/\n/g, ". ")
            //create a new project and add it to the projects
            var project = `
            {"name": "${name}",
            "description": "${description}",
            "startDate": "${form.startDate} ${convert24hr(form.startTime)}",
            "endDate": "${form.endDate} ${convert24hr(form.endTime)}"}
            `;
            var newProject = JSON.parse(project);
            console.log(newProject);
            addProject(newProject);            
        }        
    }

    /**
     * This method sets the form use with a JSON field and value.
     * @param {string} field Key
     * @param {variable} value Value, either string or number or object
     */
    const setField = (field, value) => {
        setForm({...form, [field]: value});

        //check if errors exist, and remove them from the error object       
        if (!!errors[field] ){
            setErrors({...errors, [field]: null});
        }
    }

    /*
    returns the component which consist of a form, buttons and input fields. Input fields
    have an onChange attribute which triggers the setField method to execute. If any
    fields are invalid it will trigger the feedback. 
    The submit button submits the form and the clear all button clears all the inputs
    in the input fields.
    */
    return (
        <div>
            <h1 className='text-center'>New Project</h1>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Row>
                <Form.Group className='mb-3'>
                    <Form.Control 
                        type='text' 
                        placeholder='Project Name'
                        onChange={(event) => setField('name', event.target.value) }
                        isInvalid={!!errors.name}  />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control 
                        type='number' 
                        placeholder='Project Description'
                        as="textarea" 
                        rows={2}
                        onChange={(event) => setField('description', event.target.value) }
                        isInvalid={!!errors.description}  />
                    <Form.Control.Feedback type='invalid'>
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className='mb-3'>
                        <Form.Label className='text-centre'>Start Date</Form.Label>
                        <Form.Control 
                            type='date' 
                            placeholder='Project Description'
                            onChange={(event) => setField('startDate', event.target.value) }
                            isInvalid={!!errors.startDate}  />
                        <Form.Control.Feedback type='invalid'>
                            {errors.startDate}
                        </Form.Control.Feedback>
                    </Form.Group>  
                    <Form.Group as={Col} className='mb-3'>
                        <Form.Label className='text-centre'>Start Time</Form.Label>
                        <Form.Control 
                            type='time' 
                            placeholder='Project Description'
                            onChange={(event) => setField('startTime', event.target.value) }
                            min={form.startDate}
                            isInvalid={!!errors.startTime}  />
                        <Form.Control.Feedback type='invalid'>
                            {errors.startTime}
                        </Form.Control.Feedback>
                    </Form.Group> 
                </Row>
                <Row>
                    <Form.Group as={Col} className='mb-3'>
                        <Form.Label className='text-centre'>End Date</Form.Label>
                        <Form.Control 
                            type='date' 
                            placeholder='Project Description'
                            onChange={(event) => setField('endDate', event.target.value) }
                            isInvalid={!!errors.endDate}  />
                        <Form.Control.Feedback type='invalid'>
                            {errors.endDate}
                        </Form.Control.Feedback>
                    </Form.Group>  
                    <Form.Group as={Col} className='mb-3'>
                        <Form.Label className='text-centre'>End Time</Form.Label>
                        <Form.Control 
                            type='time' 
                            placeholder='Project Description'
                            onChange={(event) => setField('endTime', event.target.value) }
                            isInvalid={!!errors.endTime}  />
                        <Form.Control.Feedback type='invalid'>
                            {errors.endTime}
                        </Form.Control.Feedback>
                    </Form.Group> 
                </Row>
                <div className='d-grid gap-2'>
                    <Button variant='success' size='lg' type='submit'>Submit</Button>
                </div>
                <div className='text-center'>
                    <Button id='resetButton' variant='secondary' type='reset'>Clear All</Button>
                </div>
            </Form>
        </div>
    );
}

export default NewProject;
