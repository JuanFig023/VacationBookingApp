import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../style/addvacationpackage.css';


function AddVacationPackage({ content, setContent, setPageNum}){
    const[formData, setFormData] = useState({
        package_name: '',
        price: '',
        vacation_length: '',
        description: '',
        image_url: ''
    });

    const handleChange = (e) => {
        const{ name, value} = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{      
            const response = await fetch('http://localhost:8000/api/vacationpackages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price, 10),
                    vacation_length: parseInt(formData.vacation_length)
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Vacation Package Added:', data);
                setContent([...content, data]);
                setPageNum(1);
            } else {
                console.error('Error adding vacation package:', response.statusText);
            }
        } catch (error) {
            console.error('Error Adding Vacation Package:', error);
        }
    };
        
    return (
        <Container className="add-vacation-container">
            <h1 className="text-center my-4">Add Vacation Package</h1>
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
                      <Button variant="success" type="submit" className="mx-2">Add Package</Button>
                      <Button variant="secondary" type="button" className="mx-2" onClick={() => setPageNum(1)}>Cancel</Button>
                   </div>
               </Form>
           </Container>
      );
}

export default AddVacationPackage;