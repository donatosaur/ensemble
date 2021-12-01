import './scss/app.scss'
import {BrowserRouter as Router, Route} from 'react-router-dom'

// site header and footer
import NavigationBar from './components/NavigationBar';

// context provider
import EntityAPIProvider from "./hooks/useEntity";

// pages
import HomePage from './pages/HomePage';
import MusiciansPage from "./pages/MusiciansPage";
import InstrumentsPage from "./pages/InstrumentsPage";
import VenuesPage from "./pages/VenuesPage";
import ConcertCyclesPage from "./pages/ConcertCyclesPage";
import ServicesPage from "./pages/ServicesPage";
import PiecesPage from "./pages/PiecesPage";
import MusiciansInstrumentsPage from "./pages/MusiciansInstrumentsPage";
import MusiciansConcertCyclesPage from "./pages/MusiciansConcertCyclesPage";
import PiecesConcertCyclesPage from "./pages/PiecesConcertCyclesPage";
import Footer from './components/Footer';


function App() {
  return (
   

    <Router> 
    <div className="content">

      <NavigationBar />

      <Route exact path="/" component={HomePage} />

      <Route exact path="/Musicians">
        <EntityAPIProvider entityName="Musicians">
          <MusiciansPage />
        </EntityAPIProvider>
      </Route>

      <Route exact path="/Instruments">
        <EntityAPIProvider entityName="Instruments">
          <InstrumentsPage />
        </EntityAPIProvider>
      </Route>

      <Route exact path="/Venues">
        <EntityAPIProvider entityName="Venues">
          <VenuesPage />
        </EntityAPIProvider>
      </Route>

      <Route exact path="/ConcertCycles">
        <EntityAPIProvider entityName="ConcertCycles">
          <ConcertCyclesPage />
        </EntityAPIProvider>
      </Route>

      <Route exact path="/Services">
        <EntityAPIProvider entityName="Services">
          <ServicesPage />
        </EntityAPIProvider>
      </Route>

      <Route exact path="/Pieces">
        <EntityAPIProvider entityName="Pieces">
          <PiecesPage />
        </EntityAPIProvider>
      </Route>

      <Route exact path="/MusiciansInstruments">
        <EntityAPIProvider entityName="MusiciansInstruments">
          <MusiciansInstrumentsPage />
        </EntityAPIProvider>
      </Route>

      <Route exact path="/MusiciansConcertCycles">
        <EntityAPIProvider entityName="MusiciansConcertCycles">
          <MusiciansConcertCyclesPage />
        </EntityAPIProvider>
      </Route>

      <Route exact path="/PiecesConcertCycles">
        <EntityAPIProvider entityName="PiecesConcertCycles">
          <PiecesConcertCyclesPage />
        </EntityAPIProvider>
      </Route> 
      </div>
      <Footer/>
    </Router>
   
  );
}

export default App;
