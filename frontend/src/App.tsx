import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UsersPage } from './pages/UsersPage';
import { ProjectsPage } from './pages/ProjectsPage';
import './App.css';

/**
 * Main App component with routing configuration
 * Sets up routes for Home, Users, and Projects pages
 */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
