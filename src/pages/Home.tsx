import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { Button } from "../components/Button"
import { useEffect, useRef, useState } from "react"
import { MonthResume } from "../components/MonthResume"
import { DailyResume } from "../components/DailyResume"

export const Home = () => {
    const navigate = useNavigate()

    const [mpd, setmpd] = useState(1)

    const [animar, setAnimar] = useState<boolean>(false)
    const productos: Record<string, () => string> = {
        1: () => "helado",
        2: () => "carne-picada",
        3: () => "pollo-trozado"
    }


    const firstRender = useRef(true)





    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }

        setAnimar(true)
        const timeout = setTimeout(() => {
            setAnimar(false)
        }, 500)

        return () => clearTimeout(timeout)
    }, [mpd])



    return (
        <div className="w-full  max-w-3xl mx-auto  flex mt-[5vh]  flex-col gap-5 px-2 overflow-hidden ">

            <Header />

            <DailyResume animar={animar} producto={productos[mpd]()} />

            <MonthResume producto={productos[mpd]()} animar={animar} />

            <div className={`flex w-full justify-center text-2xl p-4 text-center items-center`}>
                <div className="w-80 sm:w-2/3 flex justify-center items-center">
                    <div className=" border-2 rounded-2xl " onClick={() => setmpd(mpd > 1 ? mpd - 1 : 3)}>
                        <span ><i className="fa-solid fa-angle-left p-2"></i></span>
                    </div>
                    <div className={`w-2/3 font-bold ${animar ? "animate-bounce" : ""}`}>
                        <span>{productos[mpd]() == "helado" ? "Helado" : productos[mpd]() == "pollo-trozado" ? "Pollo Trozado" : productos[mpd]() == "carne-picada" ? "Carne Picada" : ""}</span>
                    </div>
                    <div className="border-2 rounded-2xl" onClick={() => setmpd(mpd < 3 ? mpd + 1 : 1)}>
                        <span ><i className="fa-solid fa-angle-right p-2"></i></span>
                    </div>
                </div>
            </div>

            <div className="  w-[98%]   flex flex-col-reverse  justify-center  items-center gap-4  absolute bottom-[5vh]  sm:static  sm:flex-row  sm:gap-10  sm:justify-evenly " >
                <Button tipo="button" texto={"Comprar"} onClick={() => navigate("/buy")} />
                <Button tipo="button" texto={"Vender"} onClick={() => navigate("/sell")} />
            </div>

        </div>
    );

}