import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import CurrentEmployees from './pages/CurrentEmployees/CurrentEmployees'

function App() {

  return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/current-employees' element={<CurrentEmployees />} />
        </Routes>
      </div>
  )
}

export default App
