import React, { useEffect, useState } from "react";
import { AuthProvider } from "../Auth/AuthContext";
import TopBar, {device} from "../components/TopBar/TopBar";
import SideBar from "../components/SideBar/SideBar";
import { menuItems } from "../WebParameters";
import { ToastContainer } from "react-toastify";
import 'antd/dist/antd.min.css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import styled, {createGlobalStyle, keyframes} from "styled-components";
import '../components/Product/ProductCardList.css'
import '../components/TopBar/TopBar.css'
import "../components/Product/ProductCardNew/ProductCardNew.css";
import "./Home.css";
import "./App.css";
import "./CategoryCard.css";
import "./Footer.css";
import "./SeccionCategorias.css";
import "./ProductSwitcher.css";
import "./SeccionProductosDestacados.css";
import "./SeccionMarcas.css";

import 'font-awesome/css/font-awesome.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import "./SeccionResponsiveVideoBackground.css";
import "./AdminDashboard.css";
import "./ProductCardDetailResponsive.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './SeccionFacebook.css';
import './SeccionInstagram.css';
import './LoadingPage.css';

function App({ Component, pageProps }: AppProps) {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    const listenToScroll = () => {
        let heightToHideFrom = 30;
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        if (winScroll > heightToHideFrom) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        if (router.pathname !== "/") {
            setIsVisible(false);
        }

        window.addEventListener("scroll", listenToScroll);
        return () => window.removeEventListener("scroll", listenToScroll);
    }, [router.pathname]);

    return (
        <React.StrictMode>
            <AuthProvider>
                <TopBar />
                <SideBar sideBarMenuItems={menuItems} />
                <Component {...pageProps} />
                <ToastContainer />
                <GlobalStyle />
            </AuthProvider>
        </React.StrictMode>

    );
}
export const GlobalStyle = createGlobalStyle`


  @media (max-width: ${device.mobile}) {
    :root {
      --topbar-height: 10vh;
      --miniheader-height: 6vh;
      --sidebar-width: clamp(10vw, 17vw, 25vw)!important;
      --nav-item-padding: clamp(0.5rem, 0.5rem, 0.6rem);
      --sidebar-height: calc(100vh - var(--topbar-height) - var(--miniheader-height))!important;
    }
  }
  @media (max-width: ${device.tablet}) {
    /*
    :root {
      --sidebar-width: clamp(4vw,7vw,10vw);
      --nav-item-padding: clamp(0.5rem, 2vh, 1rem);
      --sidebar-height: calc(104vh - var(--topbar-height) - var(--miniheader-height));

      --topbar-height: 10vh;
  
      --miniheader-height: 5vh;
    }
    
     */
  }
  @media (max-width:${device.laptop}) {
    /*
   :root {
    
     --sidebar-width: clamp(4vw,7vw,10vw);
     --nav-item-padding: clamp(0.5rem, 2vh, 1rem);
     --sidebar-height: calc(104vh - var(--topbar-height) - var(--miniheader-height));

     // Estilos para laptop
     --topbar-height: 10vh;
     --miniheader-height: 5vh;
   }
   
      */
  }
  @media (max-width: ${device.laptopL}) {
    :root {
      /*
      // Estilos para laptopL
      --topbar-height: 10vh;
      --miniheader-height: 5vh;
      --sidebar-width: clamp(4vw,7vw,10vw);
      --nav-item-padding: clamp(0.5rem, 2vh, 1rem);
      --sidebar-height: calc(104vh - var(--topbar-height) - var(--miniheader-height));
*/
    }
  }
  @media (max-width: ${device.desktop}) {
    :root {
      // Estilos para desktop
      /*
      --topbar-height: 10vh;
      --miniheader-height: 5vh;
      --sidebar-width: clamp(4vw,7vw,10vw);
      --nav-item-padding: clamp(0.5rem, 2vh, 1rem);
      --sidebar-height: calc(104vh - var(--topbar-height) - var(--miniheader-height));
      
       */

    }
  }
  @media (max-width: ${device.desktopL}) {
    :root {
      // Estilos para desktopL
      --topbar-height: 10vh;
      --miniheader-height: 5vh;
      --sidebar-width: clamp(4vw,5vw,8vw);
      --nav-item-padding: clamp(0.5rem, 2vh, 1rem);
      --sidebar-height: calc(100vh - var(--topbar-height) - var(--miniheader-height));

    }
  }
`;
const marquee = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const MiniHeader = styled.div`
  position: fixed;
  width: 100vw;
  height: var(--miniheader-height);
  background-color: #24af4e;
  text-align: center;
  z-index: 22;

  h3 {
    color: white;
    font-size: 1rem;
    margin: 0;
    padding: 0.5rem 0;
    white-space: nowrap;
    overflow: hidden;
    animation: ${marquee} 30s linear infinite;
  }
`;

export  const TopBarElement = styled.div`
  position: fixed;
  height: var(--topbar-height);
  background-color: hsla(0, 9%, 91%, 0.13);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 25;
  margin-top: var(--miniheader-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 5vw;
  width: 100vw;
`;
export default App;
