import { Outlet } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "../components/navbar"

//Boilerplate layout which is added to every page

export default function MainLayout() {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <ToastContainer autoClose={1000}/>
    </>
  )
}
