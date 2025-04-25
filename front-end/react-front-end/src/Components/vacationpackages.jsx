
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../style/vacationpackages.css'; // Importing a CSS file for custom styles

function VacationPackagesList({ content, setPageNum, setVacationId }) {

    if (!content) {
        return <p>Loading...</p>;
    }

    return (
        <main className="vacation-main">
            <section className="text-center my-4">
                <h1 className="vacation-title">Vacation Packages Available:</h1>
                <p className="vacation-description">Imagine what your travel agency could look like</p>
                <Button variant="success" className="my-3 vacation-button" onClick={() => setPageNum(4)}>Add Vacation Package</Button>
            </section>
            <section className="packages-section d-flex flex-wrap justify-content-around">
                {content.map((vacationItem) => (
                    <Card key={vacationItem.id} className="vacation-card text-center" style={{ width: '18rem', margin: '10px' }}>
                        <Card.Img variant="top" src={vacationItem.image_url} alt={vacationItem.package_name} className="vacation-image" />
                        <Card.Body>
                            <Card.Title>{vacationItem.package_name}</Card.Title>
                            <Card.Text>
                                <strong>Price:</strong>${vacationItem.price}
                                <br />
                                <strong>Days: </strong>{vacationItem.vacation_length}
                            </Card.Text>
                            <Button variant="primary" className="view-details-button" onClick={() => {
                                setVacationId(vacationItem.id);
                                setPageNum(2);
                            }}>
                                View Details
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </section>
        </main>
    );
}

export default VacationPackagesList;