
import Footer from "@/Includes/Footer";
import Navbar from "@/Includes/Navbar";
import Sidebar from "@/Includes/Sidebar";
import { useEffect } from "react"

export default function AuthenticatedLayout({ children }) {
    // const user = usePage().props.auth.user;
    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}