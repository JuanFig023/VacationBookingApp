import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import '../style/deletevacationpackage.css'

function DeleteVacationPackage({ vacationId, setPageNum, setContent }){

    const handleDelete = async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/vacationpackages/${vacationId}`, {
                method: 'DELETE',
            });
            if(response.ok){
                console.log('Vacation Package Deleted');
                setContent(prevContent => prevContent.filter(item => item.id !== vacationId));
                setPageNum(1);
            } else {
                console.error('Error deleting vacation package:', response.statusText);
            }
        } catch(error){
            console.error('Error Deleting Vacation Package:', error);
        }
    };

    return( 
        <Container className="delete-vacation-container my-5">
            <Card className="text-center">
                <Card.Header>
                    <Card.Title>Confirm Deletion</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>Are you sure you want to delete this vacation package?</Card.Text>
                    <div className="d-flex justify-content-center">
                        <Button variant="secondary" className="mx-2" onClick={() => setPageNum(1)}>Cancel</Button>
                        <Button variant="danger" className="mx-2" onClick={handleDelete}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DeleteVacationPackage;