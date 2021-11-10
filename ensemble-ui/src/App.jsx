import './scss/app.scss'
import {BrowserRouter as Router, Route} from 'react-router-dom'

// pages
import HomePage from './pages/HomePage';
import NavigationBar from './components/NavigationBar';
import MusiciansPage from "./pages/MusiciansPage";
import InstrumentsPage from "./pages/InstrumentsPage";
import VenuesPage from "./pages/VenuesPage";
import ConcertCyclesPage from "./pages/ConcertCyclesPage";
import ServicesPage from "./pages/ServicesPage";
import PiecesPage from "./pages/PiecesPage";
import MusiciansInstrumentsPage from "./pages/MusiciansInstrumentsPage";
import MusiciansConcertCyclesPage from "./pages/MusiciansConcertCyclesPage";
import PiecesConcertCyclesPage from "./pages/PiecesConcertCyclesPage";


function App() {
  return (
    <Router basename={"/~awanf"}>
      <NavigationBar />
      <Route path="/" exact component={HomePage} />
      {/* toggle this back when the quarter is over: using static routes to be clearer */}
      {/*<Route path="/:entityName" component={EntityPage}/>*/}
      {/* for now, use clear static routes to make it easier to follow for people unfamiliar with react */}
      <Route path="/Musicians" component={MusiciansPage}/>
      <Route path="/Instruments" component={InstrumentsPage}/>
      <Route path="/Venues" component={VenuesPage}/>
      <Route path="/ConcertCycles" component={ConcertCyclesPage}/>
      <Route path="/Services" component={ServicesPage}/>
      <Route path="/Pieces" component={PiecesPage}/>
      <Route path="/MusiciansInstruments" component={MusiciansInstrumentsPage}/>
      <Route path="/MusiciansConcertCycles" component={MusiciansConcertCyclesPage}/>
      <Route path="/PiecesConcertCycles" component={PiecesConcertCyclesPage}/>
    </Router>
  );
}

export default App;
