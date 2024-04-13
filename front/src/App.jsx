import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

<<<<<<< HEAD
import { Home, Read, Update, Delete, Login} from './pages'
import { Navbar } from './components'
=======
import { Home,  } from './pages'
import { Navbar, Footer } from './components'
>>>>>>> landing

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
<<<<<<< HEAD
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
=======
>>>>>>> landing
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
