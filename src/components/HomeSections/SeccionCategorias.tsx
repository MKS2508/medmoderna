import React, { useEffect, useState } from "react";
import { FaCannabis, FaTshirt, FaCapsules, FaHandHoldingWater, FaLightbulb } from "react-icons/fa";
import CategoryCard from "../CategoryCard/CategoryCard";
import { ICategoryProps } from "../../models/ICategoryProps";

import SeccionResponsiveVideoBackground from "./SeccionResponsiveVideoBackground";

// En SeccionCategorias.tsx
interface ISeccionCategoriasProps {
    title: string;
    videoSrc: string;
    isVideoFetched: (fetched: boolean) => void;
    height: string;
    categories: ICategoryProps[];
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

// ...
const SeccionCategorias: React.FC<ISeccionCategoriasProps> = ({ title, videoSrc, isVideoFetched , height, categories}) => {

    // Usa la función para obtener el tamaño de la ventana
    const windowSize = useWindowSize();

    return (
        <SeccionResponsiveVideoBackground
            title={title}
            videoSrc={videoSrc}
            // Usa `windowSize.width` en lugar de `window.innerWidth`
            height={(windowSize.width >= 768) ? height : "40vh"}
            hasVideo={true} hideContentContainer={false} useAutoHeightContent={false}
            isVideoFetched={(fetched) =>{isVideoFetched(fetched) ;console.log('Video fetched:', fetched)}}
        >
            {categories.map((category) => (
                <CategoryCard
                    key={category.name}
                    name={category.name}
                    link={category.link}
                    Icon={category.icon}
                />
            ))}
        </SeccionResponsiveVideoBackground>

    );
};

export default SeccionCategorias;
