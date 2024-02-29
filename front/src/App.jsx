import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { Home, User } from './pages'

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
      <RouterProvider router={router} />
    </>
  )
}

export default App
