import './App.css'
import { Routes, Route } from 'react-router-dom'
import AddRuleSet from './pages/AddRuleSet'
import Home from './pages/Home'
import RuleDetail from './pages/RuleDetail'
import EditRuleSet from './pages/EditRuleSet'
import PageNotFound from './pages/PageNotFound'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/addruleset' element={<AddRuleSet />} />
      <Route path='/editruleset/:endpoint' element={<EditRuleSet />} />
      <Route path='/rule/:endpoint' element={<RuleDetail />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
