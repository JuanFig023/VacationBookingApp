import React, { useState, useEffect } from 'react';

function VacationPackagesList() {
    const[vacationPackages, setVacationPackages] = useState([]);

    useEffect(() => {
        async function fetchVacationPackages(){
            try{
                const response = await fetch('http://localhost:8000/api/vacationpackages/');
                const data = await response.json();
                setVacationPackages(data);
            }
            catch(error){
                console.error('Error fetching vacation packages:', error);
            }
        }
        fetchVacationPackages();
    }, []);

    if(!vacationPackages) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            <h1>Vacation Packages Available:</h1>
            <ul>
                {vacationPackages.map((vacationItem) => (
                    <li key={vacationItem.id}>
                        <h2>{vacationItem.package_name}</h2>
                        <p>Price: ${vacationItem.price}</p>
                        <p>Description: {vacationItem.description}</p>
                        <img src={vacationItem.image_url} alt={vacationItem.package_name} style={{ width: '200px', height: 'auto' }} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default VacationPackagesList;