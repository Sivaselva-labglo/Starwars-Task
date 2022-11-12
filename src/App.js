import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navBar';
import People from './navBar Components/people';
import Planets from './navBar Components/planets';
import Starships from './navBar Components/starships';
import Films from './navBar Components/films';
import Species from './navBar Components/species';
import Vehicles from './navBar Components/vehicles';
import Peopledetails from './detailsComponent/peopleDetails';
import Planetdetails from './detailsComponent/planetsDetails';
import Starshipdetails from './detailsComponent/starshipDetails';
import Filmdetails from './detailsComponent/filmDetails';
import Speciesdetails from './detailsComponent/speciesDetails';
import Vehicledetails from './detailsComponent/vehicleDetails';
import Homepage from './homePage';

function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Homepage/>} />
        <Route exact path='/people' element={<People />} />
        <Route exact path='/planets' element={<Planets />} />
        <Route exact path='/starships' element={<Starships />} />
        <Route exact path='/films' element={<Films />} />
        <Route exact path='/species' element={<Species />} />
        <Route exact path='/vehicles' element={<Vehicles />} />
        <Route exact path='/people/peopledetails/:name/:pageNo' element={<Peopledetails />} />
        <Route exact path='/planets/planetdetails/:name/:pageNo' element={<Planetdetails />} />
        <Route exact path='/starships/starshipdetails/:shipname/:pageNo' element={<Starshipdetails />} />
        <Route exact path='/films/filmdetails/:id' element={<Filmdetails />} />
        <Route exact path='/species/speciesdetails/:name/:pageNo' element={<Speciesdetails />} />
        <Route exact path='/vehicles/vehicledetails/:vehiclename/:pageNo' element={<Vehicledetails />} />
      </Routes>
    </Router>
  );
}

export default App;
