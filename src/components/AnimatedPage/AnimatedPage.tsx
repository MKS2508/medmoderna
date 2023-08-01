import { motion, useViewportScroll } from "framer-motion";
import { useEffect, useState } from 'react';

const AnimatedPage = ({ children }: any) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        setIsSmallScreen(window.innerWidth <= 768);
    }, []);

    const animations = {
        initial: isSmallScreen ? { opacity: 0, y: 100 } : { opacity: 0, x: 100 },
        animate: isSmallScreen ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 },
        exit: isSmallScreen ? { opacity: 0, y: -100 } : { opacity: 0, x: -100 },
    };

    return (
        <motion.div className={"AnimPage"}
                    initial={animations.initial}
                    animate={animations.animate}
                    exit={animations.exit}
                    transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
