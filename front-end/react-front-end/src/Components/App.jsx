import React, {useEffect, useState} from 'react';
import '../style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VacationPackagesList from './vacationpackages.jsx';
import SinglePage from './singlePage.jsx';
import NavBar from './navbar.jsx';
import EditVacationPackage from './editvacationpackage.jsx';
import AddVacationPackage from './addvacationpackage.jsx';
import DeleteVacationPackage from './deletevacationpackage.jsx';

function App() {
  const [pageNum, setPageNum] = useState(1);
  const [content, setContent] = useState([]);
  const [vacationId, setVacationId] = useState(null);
  

  useEffect(() => {
    async function fetchVacationPackages(){
        try{
            const response = await fetch('http://localhost:8000/api/vacationpackages/');
            const data = await response.json();
            setContent(data);
        }
        catch(error){
            console.error('Error fetching vacation packages:', error);
        }
    }
    fetchVacationPackages();
}, []);


  return (
    <div>
    <NavBar setPageNum={setPageNum} />
    {pageNum === 1 ? <VacationPackagesList
      content={content}
      setPageNum={setPageNum}
      setVacationId={setVacationId}
    /> : pageNum === 2 ? <SinglePage
      setPageNum={setPageNum}
      vacationId={vacationId}
    /> : pageNum === 3 ? <EditVacationPackage 
       vacationId={vacationId}
       setVacationId={setVacationId}
       setPageNum={setPageNum}
       content={content}
       setContent={setContent}
    /> : pageNum === 4 ? <AddVacationPackage 
       content={content}
       setContent={setContent}
       setPageNum={setPageNum}
    />: pageNum === 5 ? <DeleteVacationPackage 
       vacationId={vacationId}
       setContent={setContent}
       setPageNum={setPageNum}
    /> : <h1>Error with Page Routing</h1>}
    </div>
  )
}

export default App
