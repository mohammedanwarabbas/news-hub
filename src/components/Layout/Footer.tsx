import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-light py-3">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <p className="mb-0">© 2025 NewsHub. All rights reserved.</p>
            <p>
              Made with{" "}
              <span className="text-danger h3 align-middle"> &#x2661; </span> by
              Anwar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
