import { Modal, Button} from 'react-bootstrap';
import NewProject from './NewProject';

/**
 * This function returns the Centred Modal component which is made up of Modal 
 * elements. It is vertically centred on the screen and will display the NewProject
 * component. The NewProject component is passed the method addProject and the array
 * of projects as props. This will display the form allowing the user to create a new
 * project. When the Close button is clicked or tthe X on the Modal, the Modal will 
 * be closed.
 * Source: https://react-bootstrap.github.io/components/modal/ 
 * @param {properties} props The properties of the CentredModal
 * @returns The CentredModal componenet
 */
function CentredModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide} size="m" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Create New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NewProject addProject={props.addProject} projects={props.projects}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CentredModal;