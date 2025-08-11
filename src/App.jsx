import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SpaceBackground from './SpaceBackground'
import Layout from './Layout'
import ClipLoader from 'react-spinners/ClipLoader'

function Home(){
  return (
    <Layout>
      <motion.div className="container text-center home-card"
        initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} exit={{opacity:0}} transition={{duration:0.45}}>
        <h1 className="display-5 mb-3">Welcome to My Space Portfolio</h1>
        <p className="lead mb-4">Cybersecurity student • Frontend hobbyist</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/dashboard" className="btn btn-lg btn-primary btn-glow">Dashboard</Link>
          <Link to="/certificate" className="btn btn-lg btn-outline-light btn-glow">Certificate</Link>
          <Link to="/contact" className="btn btn-lg btn-outline-info btn-glow">Contact</Link>
        </div>
      </motion.div>
    </Layout>
  )
}

function Dashboard(){
  return (
    <Layout>
      <motion.div className="container" initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} exit={{opacity:0}} transition={{duration:0.45}}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-4 bg-dark text-light panel">
              <h3>Dashboard</h3>
              <p>Status: Learning Cybersecurity</p>
              <div className="info-grid">
                <div className="info-item">Skills<br/><strong>Web, CTF</strong></div>
                <div className="info-item">Projects<br/><strong>2</strong></div>
                <div className="info-item">Achievements<br/><strong>Finalist LKS</strong></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}

function Certificate(){
  return (
    <Layout>
      <motion.div className="container text-center" initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} exit={{opacity:0}} transition={{duration:0.5}}>
        <h2 className="mb-3">My Certificate</h2>
        <div className="card cert-card p-3 bg-dark shadow-lg">
          <motion.img src="/certificate.jpg" alt="Certificate" className="img-fluid rounded cert-img"
            initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.6}} />
        </div>
      </motion.div>
    </Layout>
  )
}

function Contact(){
  return (
    <Layout>
      <motion.div className="container text-center" initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} exit={{opacity:0}} transition={{duration:0.35}}>
        <h2>Contact Me</h2>
        <p>Email: fahri@example.com</p>
        <p>Instagram: @fhribagasjtmko</p>
      </motion.div>
    </Layout>
  )
}

function TopNav(){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark topnav">
      <div className="container">
        <Link className="navbar-brand" to="/">space-portfolio</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/certificate">Certificate</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function AppInner(){
  const location = useLocation();
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    const t = setTimeout(()=> setLoading(false), 450);
    return ()=> clearTimeout(t);
  },[location]);

  return (
    <>
      <SpaceBackground />
      <TopNav />
      {loading ? <div className="loading-wrap"><ClipLoader color="#06b6d4" size={50} /></div> : (
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial="initial" animate="animate" exit="exit">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}

export default function App(){
  const [showSplash,setShowSplash] = useState(true);
  useEffect(()=>{
    const t = setTimeout(()=> setShowSplash(false), 1200);
    return ()=> clearTimeout(t);
  },[]);
  return (
    <Router>
      {showSplash ? <div className="full-splash"><div className="splash-anim"><div className="rocket-large">🚀</div></div></div> : <AppInner />}
    </Router>
  )
}
