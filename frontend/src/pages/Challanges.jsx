import { motion } from "motion/react";
import Navbar from "../components/Navbar";

import crown from "../assets/crown 1.svg";
import axios from "axios";
import { useEffect, useState } from "react";




const Challanges = () => {
    const [player1, setplayer1] = useState("")
    const [player2, setplayer2] = useState("")
    const [player3, setplayer3] = useState("")
    const [topTen, setTopTen] = useState([])


    const fetchData = async () => {
    const result = (await axios.get("localhost:8000/users/leaderboard")).data
    setplayer1(result.topThree[0])
    setplayer2(result.topThree[1])
    setplayer3(result.topThree[2])
    setTopTen(result.topTen)
} 
    useEffect(() => {
        fetchData()
    }, [])
    
  return (
    <div className="w-full min-h-screen justify-center items-center bg-cover bg-center bg-[#204E51]">
      <motion.div className="py-10">
        <Navbar />
      </motion.div>

      <div className="w-[50%] justify-center items-center mx-auto mt-10">
        <h1 className="text-5xl text-center font-montserrat font-semibold text-white">
          🏆Leaderboard🏆
        </h1>
      </div>

      <div className="w-[90%] flex rounded-t-3xl bg-white mx-auto p-8">
        <div className="w-full h-full flex items-center justify-between px-48">
          <div className="w-32 h-32 rounded-full bg-black"></div>

          {/* juara 1 */}
          <div className="flex-col justify-center items-center mx-auto -translate-y-11">
            <img src={crown} className="w-20 h-20 translate-x-12 translate-y-5" alt="" />
            <div className="w-44 h-44 rounded-full bg-black">
                <img src={player1.image} alt="" />
            </div>
            <div>
                <h2>${player1.username}</h2>
                <p>Point: ${player1.point}</p>
            </div>
          </div>

          <div className="w-32 h-32 rounded-full bg-black"></div>
        </div>
      </div>
    </div>
  );
};
export default Challanges;
