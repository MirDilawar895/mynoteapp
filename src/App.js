import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import NotesListPage from './pages/NotesListPage';
import Home from './components/Home';
import ListItem from './components/ListItem';
import NotePage from './pages/NotePage';
import Header from './components/Header';

function App() {
  return (
    <Router>
    
    <div className="container dark">
     <div className="app">
       <Header/>
     <Route path="/Home" component={Home}/>
     <Route path="/ListItem" component={ListItem}/>
     <Route path="/Note/:id" component={NotePage}/>
    <Route path = "/" exact component={NotesListPage}/>
    </div>
    </div>
    </Router>
  );
}

export default App;
