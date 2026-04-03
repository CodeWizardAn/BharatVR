import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminPanel from './pages/AdminPanel'

function App() {
  // useLocation tells Framer Motion WHICH page we're on
  // so it can animate out the old page and in the new one
  const location = useLocation()

  return (
    <div className="page-wrapper">

      {/* Navbar stays fixed across ALL pages */}
      <Navbar />

      {/* AnimatePresence watches for route changes
          and plays exit animations before mounting new page */}
      <AnimatePresence mode="wait">

        <Routes location={location} key={location.pathname}>

          <Route path="/"                    element={<Home />} />
          <Route path="/destinations"        element={<Destinations />} />
          <Route path="/destinations/:id"    element={<DestinationDetail />} />
          <Route path="/login"               element={<Login />} />
          <Route path="/register"            element={<Register />} />
          <Route path="/profile"             element={<Profile />} />
          <Route path="/admin"               element={<AdminPanel />} />

        </Routes>

      </AnimatePresence>

      {/* Footer stays fixed across ALL pages */}
      <Footer />

    </div>
  )
}

export default App