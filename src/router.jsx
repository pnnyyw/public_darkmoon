import { createBrowserRouter } from "react-router-dom"
import HomePage from "./Public/HomePage"
import DetailPage from "./Public/DetailPage"


const Router = createBrowserRouter ([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/pub/:id",
    element: <DetailPage />,
  }
])

export default Router


