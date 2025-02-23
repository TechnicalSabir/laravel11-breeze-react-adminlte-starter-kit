
import Footer from "@/Includes/Footer";
import Navbar from "@/Includes/Navbar";
import Sidebar from "@/Includes/Sidebar";
// import { usePage } from "@inertiajs/react";
import { useEffect } from "react"

export default function AuthenticatedLayout({ children }) {
    useEffect(() => {
        document.body.classList = `sidebar-mini layout-fixed`;
    }, [])

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