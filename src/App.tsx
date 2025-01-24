import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Sidebar from './components/Sidebar';
import MyLines from './pages/MyLines';
import PersonalAgent from './pages/PersonalAgent';
import AgentEvents from './pages/AgentEvents';
import AgentEventDetail from './pages/AgentEventDetail';
import LineDetails from './pages/LineDetails';
import LineRecharge from './pages/LineRecharge';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PlanChange from './pages/PlanChange';
import DeviceDetail from './pages/DeviceDetail';
import InitialScreen from './pages/home';
import Authorization from './pages/Authorization';
import FAQ from './pages/FAQ';
import { AgentSettingsProvider } from './contexts/AgentSettingsContext';

interface LayoutProps {
  children: ReactNode;
}

const LayoutWithSidebar: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Sidebar />
    <div>{children}</div>
  </div>
);

const LayoutWithoutSidebar: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <div>{children}</div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <AgentSettingsProvider>
          <Routes>
            {/* Rutas sin Sidebar */}
            <Route
              path="/"
              element={
                <LayoutWithoutSidebar>
                  <InitialScreen />
                </LayoutWithoutSidebar>
              }
            />
            <Route
              path="/authorization"
              element={
                <LayoutWithoutSidebar>
                  <Authorization />
                </LayoutWithoutSidebar>
              }
            />
            <Route
              path="/payment-success"
              element={
                <LayoutWithoutSidebar>
                  <PaymentSuccess />
                </LayoutWithoutSidebar>
              }
            />

            {/* Rutas con Sidebar */}
            <Route
              path="/lines"
              element={
                <LayoutWithSidebar>
                  <MyLines />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/lines/:number"
              element={
                <LayoutWithSidebar>
                  <LineDetails />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/lines/:number/recharge"
              element={
                <LayoutWithSidebar>
                  <LineRecharge />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/checkout/:number/:packageId"
              element={
                <LayoutWithSidebar>
                  <Checkout />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/lines/:number/change-plan"
              element={
                <LayoutWithSidebar>
                  <PlanChange />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/devices/:serialNumber"
              element={
                <LayoutWithSidebar>
                  <DeviceDetail />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/agent"
              element={
                <LayoutWithSidebar>
                  <PersonalAgent />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/agent/events"
              element={
                <LayoutWithSidebar>
                  <AgentEvents />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/agent/events/:id"
              element={
                <LayoutWithSidebar>
                  <AgentEventDetail />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/faq"
              element={
                <LayoutWithSidebar>
                  <FAQ />
                </LayoutWithSidebar>
              }
            />
          </Routes>
        </AgentSettingsProvider>
      </UserProvider>
    </Router>
  );
};

export default App;