import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../style/editvacationpackage.css';

function EditVacationPackage({ vacationId, setVacationId, setPageNum, content, setContent}){
    const[item, setItem] = useState(null);
    const[formData, setFormData] = useState({
        package_name: '',
        price: '',
        vacation_length: '',
        description: '',
        image_url: ''
    });

     useEffect(() => {
            async function fetchSinglePage(){
                try{
                    const response = await fetch(`http://localhost:8000/api/vacationpackages/${vacationId}`);
                    const data = await response.json();
                    setItem(data);
                    setFormData({
                        package_name: data.package_name,
                        price: data.price,
                        vacation_length: data.vacation_length,
                        description: data.description,
                        image_url: data.image_url
                    });
                } catch(error){
                    console.error('Error Fetching Single Vacation Package:', error);
                }
            }
            fetchSinglePage();
        }, [vacationId]);

        if (!item){
            return <p>Loading...</p>;
        }

        const handleChange = (e) => {
            const{ name, value } = e.target;
            setFormData({ ...formData, [name]: value});
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                const response = await fetch(`http://localhost:8000/api/vacationpackages/${vacationId}`, {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        price: parseFloat(formData.price, 10),
                        vacation_length: parseInt(formData.vacation_length)
                    }),
                });
                if(response.ok){
                    const data = await response.json();
                    console.log('Vacation Package Updated:', data);
                    setContent(content.map(item => item.id === data.id ? data : item));
                    setVacationId(data.id);
                    setPageNum(2);
                } else {
                    console.error('Error updating vacation package:', response.statusText);
                }
            } catch(error){
                console.error('Error Updating Vacation Package:', error);
            }
        };

    
        return (
            <Container className="edit-vacation-container my-5">
                <h1 className="text-center my-4">Edit Vacation Package</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formPackageName">
                        <Form.Label>Package Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="package_name"
                            value={formData.package_name}
                            onChange={handleChange}
                            placeholder="Enter package name"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                        />
                    </Form.Group>
                    <Form.Group controlId="formVacationLength">
                        <Form.Label>Vacation Length</Form.Label>
                        <Form.Control
                            type="number"
                            name="vacation_length"
                            value={formData.vacation_length}
                            onChange={handleChange}
                            placeholder="Enter vacation length (days)"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                        />
                    </Form.Group>
                    <Form.Group controlId="formImageUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                        />
                    </Form.Group>
                    <div className="text-center my-3">
                        <Button variant="success" type="submit" className="mx-2">Save Changes</Button>
                        <Button variant="secondary" type="button" className="mx-2" onClick={() => setPageNum(1)}>Cancel</Button>
                    </div>
                </Form>
            </Container>
        );
}

export default EditVacationPackage;