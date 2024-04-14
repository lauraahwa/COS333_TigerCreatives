import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import { Home, Shop, Sellers, Profile, About, Listing, CreateListing  } from './pages'
import { Navbar, Footer } from './components'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/sellers",
    element: <Sellers />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/listing/:id",
    element: <Listing />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/create",
    element: <CreateListing />
  }
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
