import { ImFacebook2 } from "react-icons/im";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  const logo =
    "https://i.ibb.co/k9Nmx7J/Blue-Modern-Domain-Registrar-Business-Company-Logo.png";
  return (
    <footer className="p-10 text-base-content mt-28">
      <div className="footer md:flex md:justify-between">
        <aside>
          <img className="w-36" src={logo} alt="" />
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav>
          <h6 className="font-bold text-red-700">Contact Us</h6>
          <a className="link link-hover">info@blood.com</a>
          <a className="link link-hover">(212) 555-1234</a>
          <a className="link link-hover">
            123 Main Street, New York City, NY 10001
          </a>
        </nav>
        <nav>
          <h6 className="font-bold text-red-700">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Free Guides</a>
          <a className="link link-hover">Press kit</a>
        </nav>
      </div>
      <footer className="footer footer-center px-10 py-4 mt-5 text-base-content">
        <nav>
          <h6 className="font-bold text-red-700">
            *-*-*-*-*-*-*-*- Follow Us On -*-*-*-*-*-*-*-*
          </h6>
          <hr />
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.facebook.com/">
              {" "}
              <ImFacebook2 className="h-7 w-8 text-red-700" />
            </a>
            <a href="https://www.x.com/">
              {" "}
              <FaTwitter className="h-8 w-8 text-red-700" />
            </a>
            <a href="https://www.instagram.com/">
              {" "}
              <FaInstagramSquare className="h-8 w-8 text-red-700" />
            </a>
          </div>
        </nav>
      </footer>
    </footer>
  );
};

export default Footer;
