import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import { Home,  } from './pages'
import { Navbar, Footer } from './components'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
])

function App() {

  return (
    <>
      <Navbar/>
      <RouterProvider router={router} />
      <Footer/>
    </>
  )
}

export default App
