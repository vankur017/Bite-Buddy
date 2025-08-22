import { useContext } from "react";
import UserContext from "../../utils/UserContext";

const Footer = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <footer className="fixed bottom-0 left-0 w-full">
      <div
        className="
          flex justify-between items-center py-1 px-6
          rounded-none shadow-lg
          bg-gradient-to-r from-gray-900/70 via-gray-800/60 to-gray-900/70
          backdrop-blur-md border-t border-gray-700
          text-gray-200
        "
      >
        <div className="foot-content">
          <h3 className="text-lg font-semibold text-gray-100">Copyright</h3>
          <ul className="space-y-1 text-sm">
            <li>BiteBuddy 2024 Limited</li>
            <li>© 2024 BiteBuddy Technologies Pvt. Ltd</li>
          </ul>
        </div>

        <div className="foot-content text-right">
          <h3 className="text-lg font-semibold text-gray-100">Made By</h3>
          <h4 className="text-md italic text-gray-300">{loggedInUser}</h4>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
