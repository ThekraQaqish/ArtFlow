import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
