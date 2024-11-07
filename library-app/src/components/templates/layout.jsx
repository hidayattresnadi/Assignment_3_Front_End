import Footer from "../templates/footer";
import Header from "../modules/headerSection";
import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );

};

export default Layout;