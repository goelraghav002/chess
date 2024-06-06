import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import GamePage from './pages/GamePage'


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </div>
  )
}

export default App
