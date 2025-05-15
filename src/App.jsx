import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cripto from './pages/Cripto/cripto'
import Suporte from './pages/Suporte/suporte'
import Cadastro from './pages/Cadastro/cadastro'
import Login from './pages/Login/login'
import Sobre from './pages/Sobre/sobre'
import Configuracoes from './pages/Configuracoes/configuracoes'

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/cripto" element={<Cripto />} />
      <Route path="/suporte" element={<Suporte />} />
      <Route path='/cadastro' element={<Cadastro/>}/>
      <Route path='/configuracoes' element={<Configuracoes/>}/>
      <Route path='/' element={<Login/>}/>
    </Routes>

  )
}

export default App