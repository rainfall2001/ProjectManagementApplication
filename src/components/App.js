/**
 * Resources used:
 * 
 * Pass functions and attributes from CurrentProjects to Modal to NewProject
 * https://www.geeksforgeeks.org/how-to-pass-data-from-one-component-to-other-component-in-reactjs/
 * 
 * form validation
 * https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2
 * 
 * convert to 24 hour time
 * https://stackoverflow.com/questions/15083548/convert-12-hour-hhmm-am-pm-to-24-hour-hhmm
 * 
 * search bar filtering
 * https://stackoverflow.com/questions/63794671/react-javascript-filter-search-not-working-on-backspace
 * 
 * The layout and bootstrap elements were from the React-Bootstrap documentation
 * https://react-bootstrap.github.io/components/alerts
 * 
 * Replace new line character with a full stop and space
 * https://stackoverflow.com/questions/9849754/how-can-i-replace-newlines-line-breaks-with-spaces-in-javascript#:~:text=replace()%20function%3A,than%20just%20the%20first%20one.
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css'
import CurrentProjects from './CurrentProjects';
import { Navbar, Container, Nav} from 'react-bootstrap';

/**
 * This function creates an App component which is made up of a navigation bar and the CurrentProjects component.
 * @returns App component
 */
function App() {
    return (        
        <div>
            <Navbar bg="light" expand="lg" className='navbar-fixed-top'>
            <Container fluid>
                <Navbar.Brand href="#">Project Management Application</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <div className='container-lg p-3g'>
                <CurrentProjects />
            </div>
        </div>
    );
}
export default App;