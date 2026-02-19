import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { SimulationProvider } from './context/SimulationContext';

import ProblemPage from './pages/ProblemPage';
import ExperiencePage from './pages/ExperiencePage';
import SystemPage from './pages/SystemPage';
import FlowPage from './pages/FlowPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  return (
    <SimulationProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProblemPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/system" element={<SystemPage />} />
            <Route path="/flow" element={<FlowPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Layout>
      </Router>
    </SimulationProvider>
  );
};

export default App;
