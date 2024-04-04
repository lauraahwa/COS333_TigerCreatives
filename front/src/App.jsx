import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import { Home, Read, Update, Delete, Login} from './pages'
import { Navbar } from './components'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/read",
    element: <Read />
  },
  {
    path: "/update",
    element: <Update />
  },
  {
    path: "/delete",
    element: <Delete />
  },
  {
    path: "/login",
    element: <Login />
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
