import { Route, Routes } from "react-router-dom"
import LandingPage from "../components/LandingPage/LandingPage"
import Home from '../components/HomePage/Home'
import ActivityCreate from '../components/ActivityCreate/ActivityCreate'
import Detail from '../components/Detail/Detail'


function App() {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/activity" element={<ActivityCreate />} />
      <Route path="/home/:id" element={<Detail />} />
    </Routes>
  )
}

export default App
