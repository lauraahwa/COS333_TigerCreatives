import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import {ProfileProvider} from '@/components/ProfileInfo';
import { Home, Shop, Services, Seller, Profile, EditProfile, About, Login, Listing, CreateListing, ContactPage, Review, NotFound, SellerReviews} from './pages'
import { Navbar, Footer} from './components'

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
      { path: "/services", element: <Services /> },
      { path: "/about", element: <About /> },
      { path: "/listing/:id", element: <Listing /> },
      { path: "/profile", element: <Profile /> },
      { path: "/seller/:id", element: <Seller />},
      { path: "/itemized-reviews/:id", element: <SellerReviews /> },
      { path: "/review/:id", element: <Review />},
      { path: "/editprofile", element: <EditProfile /> },
      { path: "/index", element: <EditProfile /> },
      { path: "/login", element: <Login /> },
      { path: "/create", element: <CreateListing /> },
      { path: "/contact", element: <ContactPage /> },
    ]
  },
  { path: '*', element: <NotFound /> }
]);

function App() {

  return (
    <ProfileProvider>
      <RouterProvider router={router} />
    </ProfileProvider>
  )
}

export default App
