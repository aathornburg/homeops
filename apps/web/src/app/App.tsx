import { useState } from 'react'
import reactLogo from '../../public/react.svg'
import viteLogo from '../../public/vite.svg'
import heroImg from '../../public/hero.png'
import './App.css'
import { Header } from '../shared/ui/components/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
    </>
  )
}

export default App
