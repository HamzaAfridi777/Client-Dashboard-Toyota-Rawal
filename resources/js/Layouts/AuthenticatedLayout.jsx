import React from "react";
import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import Footer from "@/Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tw-elements/css/tw-elements.min.css";
import "tw-elements";

//import twElements from 'tw-elements'; // Import the plugin directly if needed

export default function Authenticated({ children }) {
    return (
        <div className="app">
            <ToastContainer />
            <div className="grid grid-cols-12 gap-4 min-h-screen">
                <div className="col-span-12 md:col-span-2 ">
                    {" "}
                    <Sidebar />
                </div>

                <div className="col-span-12 md:col-span-10 flex flex-col min-h-screen">
                    {" "}
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
