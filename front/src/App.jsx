import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import {ProfileProvider} from '@/components/ProfileInfo';
import { Home, Shop, Sellers, Profile, EditProfile, About, Login, Listing, CreateListing, CreateBidListing  } from './pages'
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
      { path: "/editprofile", element: <EditProfile /> },
      { path: "/login", element: <Login /> },
      { path: "/create", element: <CreateListing /> },
      { path: "/create-bid", element: <CreateBidListing /> },
    ],
  
  },

])

function App() {

  return (
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  )
}

export default App
