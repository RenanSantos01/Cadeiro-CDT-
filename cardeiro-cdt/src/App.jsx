import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Cripto from './pages/Cripto/cripto'
import Suporte from './pages/Suporte/suporte'
import Cursos from './pages/Cursos/curso'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cripto" element={<Cripto />} />
      <Route path="/suporte" element={<Suporte />} />
      <Route path="/cursos" element={<Cursos />} />
    </Routes>
  )
}

export default App