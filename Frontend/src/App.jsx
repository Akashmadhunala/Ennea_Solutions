import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom"
import React,{Suspense} from "react"

const AllCourses=React.lazy(()=>import('./components/AllCourses'))
import MainLayout from "./layouts/MainLayout"
const SingleCourse=React.lazy(()=>import("./components/SingleCourse"))
import NotFoundPage from "./pages/NotFoundPage"
const UserProfile=React.lazy(()=>import("./components/UserProfile"))
const AllUsers=React.lazy(()=>import("./components/AllUsers"))
const SearchResults=React.lazy(()=>import("./components/SearchResults"))
const Categories=React.lazy(()=>import("./components/Categories"))
const Wishlist=React.lazy(()=>import("./components/Wishlist"))
const Cart=React.lazy(()=>import("./components/Cart"))
const MyCourses=React.lazy(()=>import("./components/MyCourses"))
import Login from "./components/Login"
import Signup from "./components/Signup"
import AddCourse from "./components/AddCourse"
import Spinner from "./components/Spin"

function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
    // Main Layout and surrounds other routes meaning part of every route
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<Suspense fallback={<Spinner/>}><AllCourses/></Suspense>} />
      <Route path="/categories/:query" element={<Suspense fallback={<Spinner/>}><Categories/></Suspense>} />
      <Route path="/search/:query" element={<Suspense fallback={<Spinner/>}><SearchResults/></Suspense>} />
      <Route path="/users/courses_enrolled/:id" element={<Suspense fallback={<Spinner/>}><MyCourses/></Suspense>} />
      <Route path="/users/wishlist/:id" element={<Suspense fallback={<Spinner/>}><Wishlist/></Suspense>} />
      <Route path="/users/cart/:id" element={<Suspense fallback={<Spinner/>}><Cart/></Suspense>} />
      <Route path="/course/:id" element={<Suspense fallback={<Spinner/>}><SingleCourse/></Suspense>}/>  
      <Route path="/profile/:id" element={<Suspense fallback={<Spinner/>}><UserProfile/></Suspense>}/>
      <Route path="/allusers" element={<Suspense fallback={<Spinner/>}><AllUsers/></Suspense>}/>
      <Route path='/login' element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/course/add" element={<AddCourse/>} />
      <Route path="*" element={<NotFoundPage/>}/>
      
    </Route>
    )
  );  
  
  return <RouterProvider router={router}/>
}

export default App
