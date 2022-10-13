import React, { Component } from 'react';
import { Button, Container, Row, Col, Card, DropdownButton, Dropdown, Form, FormControl } from 'react-bootstrap';
import '../css/CurrentProjects.css';
import CentredModal from './Modal';

/**
 * This class controls the functionality of the CurrentProjects component.
 * Projects that have been stored in the data.json are retrieved and then displayed.
 * Projects can be added, remove, searched and sorted (by project name or date).
 */
class CurrentProjects extends Component {
    constructor() {
        super();
        this.state = { 
            projects: [], 
            searchInput: "",
            showForm: false,
            sort: ""
        };
        this.filterResults = this.filterResults.bind(this);
        this.removeProject = this.removeProject.bind(this);
        this.getProjects = this.getProjects.bind(this);
    }

    /**
     * This function will be called once the component has been mounted.
     * It will make a fetch request for the data stored in the data.json file.
     * It will set the state of the projects to the result.
     */
    componentDidMount() {
        this.getProjects();
    }

    /**
     * This function will filter the the projects array. It will be called
     * when there is a change in the search input. It it will filter the array
     * depending on the search input.
     * Source: https://stackoverflow.com/questions/63794671/react-javascript-filter-search-not-working-on-backspace
     * @returns An array of projects which match the search input.
     */
    filterResults() {
        if(!this.state.searchInput) return this.state.projects;
        return this.state.projects.filter(item => {
            return item.name.toLowerCase().includes(this.state.searchInput.toLowerCase());
        });
    }

    /**
     * This function will sort the array of projects by name.
     * Depending on the values passed in, projects could be 
     * ascending or descending.
     * The sorted array is set as the project array.
     * @param {number} numOne -1 if ascending, 1 if descending
     * @param {number} numTwo 1 if ascending, -1 if descending
     */
    sortByName = (numOne, numTwo) => {
        this.setState({projects: this.state.projects.sort(function (a, b){
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) return numOne;
            if (nameA > nameB) return numTwo;
            return 0;
        })});
    }

    /**
     * This function will sort the array of projects by start date.
     * Depending on the values passed in, projects could be in ascending
     * or descending order.
     * The sorted array is set as the project array.
     * @param {number} numOne -1 if ascending, 1 if descending
     * @param {number} numTwo 1 if ascending, -1 if descending
     */
    sortByDate = (numOne, numTwo) => {
        this.setState({projects: this.state.projects.sort(function (a, b) {
            //get the date part of the datetime stored
            const arrayA = a.startDate.split(" ");
            const arrayB = b.startDate.split(" ");
            const dateA = new Date(arrayA[0]);
            const dateB = new Date(arrayB[0]);

            if(dateA.getTime() < dateB.getTime()) return numOne;            
            if(dateA.getTime() > dateB.getTime()) return numTwo;
            return 0;
        })});
    }

    /**
     * This function will remove the project specified by the index.
     * It will set the state of the project to the new project.
     * Source: https://towardsdatascience.com/build-a-simple-todo-app-using-react-a492adc9c8a4 
     * @param {number} index The index of the project to be removed
     */
    removeProject = (id) => {
        fetch('http://localhost:3001/api/project/id/' + id, {
            method: "DELETE",
        })
        .then(this.getProjects())
        .then(this.getProjects());
    }

    getProjects() {
        console.log("getProjects");
        fetch('http://localhost:3001/api/projects/')
        .then(response => response.json())
        .then(result => {
            this.setState({ projects: result });
        });
    }

    /**
     * This function will add a new project to the projects array.
     * It will set the state of the projects to the new projects.
     * Source: https://towardsdatascience.com/build-a-simple-todo-app-using-react-a492adc9c8a4 
     * @param {JSON object} newProject JSON object of a project
     */
    addProject = (newProject) => {
        fetch('http://localhost:3001/api/project/', {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                'name': newProject.name,
                'description': newProject.description,
                'startDate': newProject.startDate,
                'endDate': newProject.endDate
            })
        })
        .then(this.setState({showForm: false}))
        .then(this.getProjects());
    }

    /**
     * This method is called once the sort dropdown has been selected.
     * Depending on the value passed it, it will call the sort method specified.
     * @param {string} event String indicating what sort method will be used and how.
     */
    handleSelect = (event) => {
        //sort by name, either ascending (a) or descending (b)
        if(event === 'NameA') this.sortByName(-1, 1);
        else if(event === 'NameD') this.sortByName(1, -1);
        //sort by start date, either ascending (a) or descending (b)
        else if(event === 'DateA') this.sortByDate(-1, 1);
        else if(event === 'DateD') this.sortByDate(1, -1);

    }

    /**
     * This methond will rend the App component.
     * The title: Projects.
     * There is a form which has an input element with the type search to allow the user to search the projects.
     * A sort by dropdown to allow the user to sort the projects. A button to allow the user to add a new project.
     * When scrolling these controls stick to the top past the point when they would not be seen on the screen. This 
     * allows the user to search, sort or create a new project and not having to scroll all the way to the top of the 
     * page.
     * 
     * The projects are listed as Cards and a delete button is provided to allow the user to delete the project.
     * The CentredModal component is shown only when the 'Create New Project' is selected. The method addProject and
     * the state of the projects are passed in as props.
     * @returns The layout of the elements that make up the component.
     */
    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <h1 className='display-1 text-center' id='title'>Projects</h1>
                        <div id='controls' className='sticky-top'>
                            <Form className="d-flex">
                                <FormControl 
                                    id='searchBar'
                                    type="search" 
                                    placeholder="Search" 
                                    aria-label="Search"
                                    onChange={(event) => this.setState({searchInput: event.target.value})}/>
                                <DropdownButton variant='secondary' title="Sort by" onSelect={(event) => this.handleSelect(event)}>
                                <Dropdown.Item eventKey='NameA'>Project Name (ascending)</Dropdown.Item>
                                <Dropdown.Item eventKey='NameD'>Project Name (descending)</Dropdown.Item>
                                <Dropdown.Item eventKey='DateA'>Start Date (ascending)</Dropdown.Item>
                                <Dropdown.Item eventKey='DateD'>Start Date (descending)</Dropdown.Item>
                                </DropdownButton>
                            </Form>
                            <div className='mb-4 text-center'>
                                <Button id='createNewProject' onClick={() => this.setState({showForm: true})} variant='secondary'>Create New Project</Button>
                            </div>
                        </div>
                            {this.filterResults().map((item, index) => (
                                <div className='project-info' key={index}>
                                    <Row>
                                        <Col>
                                            <Card className='mb-4 border-0'>
                                                <Card.Body>
                                                    
                                                    <Card.Title>{item.name}</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">Project ID: {item.id}</Card.Subtitle>
                                                    <Card.Text>{item.description}</Card.Text>
                                                    <Card.Text>
                                                        Start: {item.startDate}
                                                        <br></br>
                                                        End: {item.endDate}
                                                    </Card.Text>
                                                    <div className='my-auto d-flex justify-content-end'>
                                                        <Button variant='outline-danger' onClick={() => this.removeProject(item.id)}>Delete</Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            ))}                        
                    </Col>
                </Row>       
                <CentredModal show={this.state.showForm} onHide={() => this.setState({showForm: false})} addProject={this.addProject} projects={this.state.projects}/>                
            </Container>
        )
    }
}

export default CurrentProjects;