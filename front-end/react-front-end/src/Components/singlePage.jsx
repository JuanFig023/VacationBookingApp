import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import '../style/singlePage.css';

function SinglePage({ setPageNum, vacationId }){
    const [singleView, setSingleView] = useState(null);
    
    useEffect(() => {
        async function fetchSinglePage(){
            try{
                const response = await fetch(`http://localhost:8000/api/vacationpackages/${vacationId}`);
                const data = await response.json();
                setSingleView(data);
            } catch(error){
                console.error('Error Fetching Single Vacation Package:', error);
            }
        }

        fetchSinglePage();
    }, [vacationId]);

    if(!singleView){
        return <p>Loading...</p>;
    }
    
    return (
        <Container className="single-page-container my-5">
            <Row>
                <Col md={4} className="text-center">
                    <Card.Img variant="top" src={singleView.image_url} alt={singleView.package_name} className="single-page-image" />
                </Col>
                <Col md={8} className="d-flex flex-column justify-content-between">
                    <div className="text-content">
                        <Card.Body>
                            <Card.Title className="text-start">{singleView.package_name}</Card.Title>
                            <Card.Text className="text-start">
                                <strong>Price:</strong> ${singleView.price}
                                <br />
                                <strong>Description:</strong> {singleView.description}
                            </Card.Text>
                        </Card.Body>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Button variant="primary" className="mx-2" onClick={() => setPageNum(1)}>Back to Vacation Packages</Button>
                        <Button variant="warning" className="mx-2" onClick={() => setPageNum(3)}>Edit Vacation Package</Button>
                        <Button variant="danger" className="mx-2" onClick={() => setPageNum(5)}>Delete Vacation Package</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
  
export default SinglePage; 