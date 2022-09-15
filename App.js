// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';

// Define the function that renders the content in routes using State.
function App() {

  const [exercise, setExercise] = useState([]);

  return (
    <>
      <Router>

          <header>
            <h1>Exercise Bookkeeping</h1>
            <p>Use this webpage to keep track of your daily workout! </p>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact>
              <HomePage setExercise={setExercise} />
            </Route>

            <Route path="/create-exercise">
              <CreateExercisePage />
            </Route>
            
            <Route path="/edit-exercise">
              <EditExercisePage exercise={exercise} />
            </Route>
          </main>

          <footer>
            <p>© 2022 Bashar Akkary</p>
          </footer>

      </Router>
    </>
  );
}

export default App;