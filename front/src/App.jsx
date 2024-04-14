import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"

import { Home, Shop, Sellers, Profile, About, Login, Listing, CreateListing  } from './pages'
import { Navbar, Footer } from './components'

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home />, index: true },
      { path: "/shop", element: <Shop /> },
      { path: "/sellers", element: <Sellers /> },
      { path: "/about", element: <About /> },
      { path: "/listing/:id", element: <Listing /> },
      { path: "/profile", element: <Profile /> },
      { path: "/login", element: <Login /> },
      { path: "/create", element: <CreateListing /> },
    ],
  
  },

])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
