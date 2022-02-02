import "./scss/app.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// site header and footer
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

// context hooks
import EntityAPIProvider from "./hooks/useEntity";

// pages
import HomePage from "./pages/HomePage";
import MusiciansPage from "./pages/EntityPages/MusiciansPage";
import InstrumentsPage from "./pages/EntityPages/InstrumentsPage";
import VenuesPage from "./pages/EntityPages/VenuesPage";
import ConcertCyclesPage from "./pages/EntityPages/ConcertCyclesPage";
import ServicesPage from "./pages/EntityPages/ServicesPage";
import PiecesPage from "./pages/EntityPages/PiecesPage";
import MusiciansInstrumentsPage from "./pages/EntityPages/MusiciansInstrumentsPage";
import MusiciansConcertCyclesPage from "./pages/EntityPages/MusiciansConcertCyclesPage";
import PiecesConcertCyclesPage from "./pages/EntityPages/PiecesConcertCyclesPage";

function Layout() {
  return (
    <>
      <div className="flex-grow-1 flex-shrink-0">
        <NavigationBar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="entity">

            <Route
              exact
              path="Musicians"
              element={(
                <EntityAPIProvider entityName="Musicians">
                  <MusiciansPage />
                </EntityAPIProvider>
              )}
            />

            <Route
              exact
              path="Instruments"
              element={(
                <EntityAPIProvider entityName="Instruments">
                  <InstrumentsPage />
                </EntityAPIProvider>
              )}
            />

            <Route
              exact
              path="Venues"
              element={(
                <EntityAPIProvider entityName="Venues">
                  <VenuesPage />
                </EntityAPIProvider>
              )}
            />

            <Route
              exact
              path="ConcertCycles"
              element={(
                <EntityAPIProvider entityName="ConcertCycles">
                  <ConcertCyclesPage />
                </EntityAPIProvider>
              )}
            />

            <Route
              exact
              path="Services"
              element={(
                <EntityAPIProvider entityName="Services">
                  <ServicesPage />
                </EntityAPIProvider>
              )}
            />

            <Route
              exact
              path="Pieces"
              element={(
                <EntityAPIProvider entityName="Pieces">
                  <PiecesPage />
                </EntityAPIProvider>
              )}
            />

            <Route
              exact
              path="MusiciansInstruments"
              element={(
                <EntityAPIProvider entityName="MusiciansInstruments">
                  <MusiciansInstrumentsPage />
                </EntityAPIProvider>
              )}
            />

            <Route
              exact
              path="MusiciansConcertCycles"
              element={(
                <EntityAPIProvider entityName="MusiciansConcertCycles">
                  <MusiciansConcertCyclesPage />
                </EntityAPIProvider>
              )}
            />

            <Route
              exact
              path="PiecesConcertCycles"
              element={(
                <EntityAPIProvider entityName="PiecesConcertCycles">
                  <PiecesConcertCyclesPage />
                </EntityAPIProvider>
              )}
            />

          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
