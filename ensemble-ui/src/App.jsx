import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EntityPage from './pages/EntityPage';


import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <HomePage/>
        </Route>

        <Route path="/:entityName" component={EntityPage}/>
        
      </Router>
    </div>
  );
}

export default App;
