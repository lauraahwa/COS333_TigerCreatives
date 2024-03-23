import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import { Home, User } from './pages'
import { Navbar } from './components'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user",
    element: <User />
  },
])

function App() {

  return (
    <>
      <Navbar/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
