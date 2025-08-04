import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import { motion } from "motion/react"

export default function App() {
  return (
    <div
      className="w-full min-h-screen justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
    <motion.div
    className="py-10"
    >
        <Navbar />
    </motion.div>
      <div className="w-[70%] flex-col justify-center mt-20 space-y-4 items-center mx-auto">
        <h1 className="text-white text-center text-8xl font-bold font-montserrat">
          Seberapa Sehat Udara di Kotamu Hari Ini?
        </h1>
        <p className="text-center text-white font-raleway">Cek kualitas udara lokal di kota Anda dengan{" "}
            <span className="font-bold font-raleway">Shizen</span>
        </p>

        <div className="mx-auto">
            <Searchbar />
        </div>
      </div>
    </div>
  );
}
