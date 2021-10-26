import './scss/app.scss'
import EntityPage from './pages/EntityPage';


import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Route path="/" exact component={HomePage} />
      <Route path="/:entityName" component={EntityPage}/>
    </Router>
  );
}

export default App;
