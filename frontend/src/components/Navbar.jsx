import { Link } from "react-router-dom";
import Shizen from "../assets/Shizen.png";

const Navbar = () => {
  return (
    <nav className="w-[50%] flex bg-white justify-between items-center mx-auto rounded-full px-6 py-3">
      <div>
        <Link to="/">
          <img src={Shizen} alt="" className="w-28 h-auto -translate-y-[5px]" />
        </Link>
      </div>

      {/* nav */}
      <ul className="flex space-x-8 text-black text-xl font-semibold font-raleway">
        <li className="hover:text-green-500 transition-colors">
          <Link>Home</Link>
        </li>
        <li className="hover:text-green-500 transition-colors">
          <Link>Challanges</Link>
        </li>
        <li className="hover:text-green-500 transition-colors">
          <Link>Leaderboard</Link>
        </li>
        <li className="hover:text-green-500 transition-colors">
          <Link>Report</Link>
        </li>
      </ul>

      {/* login button */}
      <div className="flex-grow-0">
        <Link to="/login">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-3xl items-center justify-center">Login</button>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
