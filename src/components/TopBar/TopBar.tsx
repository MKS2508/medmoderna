import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'

// @ts-ignore
import {config} from "@fortawesome/fontawesome-svg-core";
import { RiShoppingCart2Fill, RiUser2Fill} from "react-icons/ri";
import logo from '../../assets/logo4.png'
import {AnimatePresence, motion} from "framer-motion";
import {IProductProps} from "../../models/IProductProps";
import {getProductsFromQuery, postProduct} from "../../services/api-products-service";
import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import ProductCardList from "../Product/ProductCardList";
import styled, { css, keyframes} from "styled-components";
import LoginComponent, {GoogleSignInButton} from "../Login/LoginModa";
import Cart from "../ShoppingCart/ShoppingCart";
import {MiniHeader, TopBarElement} from "../../pages/_app";

export const device = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '1920px',
    desktopL: '2560px',
};


const logoAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;


const LogoBanner = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 1vw;
  z-index: 22;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: ${logoAnimation} 2s infinite;
  margin-right: 20px;

  img {
    z-index: 22;
    max-width: 100%;
    max-height: 100%;
  }

  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
  }

  @media (min-width: 1024px) {
    width: 70px;
    height: 70px;
  }

  @media (min-width: 1200px) {
    width: 80px;
    height: 80px;
  }
`;


const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;



// Convierte .topBar a styled-component

const StyledReactSearchAutocomplete = styled.div`
  z-index: 22;
  position: relative;
  font-size: 2.4rem;
  width: 40vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  left: 12vw;
  border: none;
  outline: none;
  border-radius: 3rem;
  transition: all 0.2s;
  transition-delay: 0.1s;

  &:hover {
    width: 45vw;
  }

  &::placeholder {
    opacity: 0.8;
  }
  input::placeholder {
    color: black; /* Cambia '#color-code' con el código de color que deseas */
    opacity: 0.8;
  }
`;
const TopBarIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5vw;
  height: 100%;
  width: 100%;
`;
// Continúa convirtiendo los demás elementos a styled-components

const MiniHeaderH3 = styled(motion.h3)`
  color: white;
  font-size: 1rem;
  margin: 0;
  padding: 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  animation: marquee 30s linear infinite;
`;



const LogoBannerImg = styled.img`
  z-index: 22;
  width: 100%;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const LoginModal = styled.div`
  position: absolute;
  top: 100%;
  z-index: 30;
  right: 0;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1rem;
  /* Agrega más estilos para el modal de inicio de sesión/registro */
`;

const CartModal = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 1rem;
  /* Agrega más estilos para el modal de carrito de la compra */
`;

const glassmorphismTheme = {
    height: "40px",
    border: "none",
    backdropFilter: "blur(10px)",
    overflow:"scroll",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    hoverBackgroundColor: "rgba(255, 255, 255, 0.7)",
    color: "black",
    fontSize: "1rem",
    fontFamily: "Arial, sans-serif",
    iconColor: "white",
    lineColor: "rgba(255, 255, 255, 0.2)",
    placeholderColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 1000,
    clearIconMargin: "0 10px",
    searchIconMargin: "10px",
};

const TopBar = () => {
    const router = useRouter();

    config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [active, setActive] = useState(true);
    const [items, setItems] = useState<IProductProps[]>([]);
    const [placeholderStr, setPlaceholderStr] = useState<string>("Encuentra lo que buscas");
    const [isVisible, setIsVisible] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);

    const listenToScroll = () => {
        let heightToHideFrom = 30;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;

        if (winScroll > heightToHideFrom) {
            isVisible &&      // to limit setting state only the first time
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        if (window.location.pathname != "/") {
            setIsVisible(false)
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            //debugger;
            let actualPlaceholder = placeholderStr
            actualPlaceholder = actualPlaceholder + ".";
            if (actualPlaceholder == "Encuentra lo que buscas....") {
                setPlaceholderStr("Encuentra lo que buscas");
            } else {
                setPlaceholderStr(actualPlaceholder);
            }
        }, 400);
        return () => clearInterval(interval);
    }, [placeholderStr]);

    useEffect(() => {


        if (items.length < 1) {
            let searchedProducts: IProductProps[] = [];
            getProductsFromQuery(" ").then((result) => {
                searchedProducts = result;
                setItems(searchedProducts);
            })
        }
        if (window.location.pathname != "/") {
            setIsVisible(false)
        }

        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);

    }, [])

    const handleOnSearch = async (string: any, results: any) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
        setSearchQuery(string);

        if (string.length > 3) {
            const searchedProducts = await getProductsFromQuery(string);
            setItems(searchedProducts)
            console.log({searchedProducts})
        }

    }

    const handleOnHover = (result: any) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item: any) => {
        // the item selected
        window.location.href = `/product/${item.productId}`
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item: any) => {
        return (
            <>
                <span style={{display: 'block', textAlign: 'left'}}>
                <ProductCardList key={item.name} imgSrc={item.imgSrc}
                                 description={item.description} price={item.price}
                                 productId={item.productId} name={item.name} brand={item.brand}
                                 category={item.category}/></span>

            </>
        )
    }


    return (
        <>
            <MiniHeader>
                <MiniHeaderH3>
                    <a href={""} style={{ color: "inherit" }}>
                        Puedes encontrarnos en Avenida de Mendavia, Nº16 Pabellón 2, 26009 Logroño, La Rioja
                    </a>
                </MiniHeaderH3>
            </MiniHeader>
            <TopBarElement id={"topBarElement"}>
                <LogoBanner id={"logoBanner"} onClick={() => router.push("/")}>
                    <LogoBannerImg alt="logo" src={logo} />
                </LogoBanner>
                <SearchBarContainer id={"SearchBarContainer"}>
                    <StyledReactSearchAutocomplete>
                        <ReactSearchAutocomplete
                            styling={glassmorphismTheme}
                            key={"searchBar"}
                            items={items}
                            onSearch={handleOnSearch}
                            onHover={handleOnHover}
                            onSelect={handleOnSelect}
                            onFocus={handleOnFocus}
                            autoFocus
                            formatResult={formatResult}
                            placeholder={placeholderStr}
                        />
                    </StyledReactSearchAutocomplete>
                </SearchBarContainer>
                <TopBarIcons id={"topBarIcons"}>
                    <IconWrapper onClick={() => setShowLoginModal(!showLoginModal)}>
                        <RiUser2Fill size={30}/>
                        {showLoginModal && (
                            <LoginModal>
                                <LoginComponent/>
                                <GoogleSignInButton>Inicia sesion</GoogleSignInButton>
                                {/* Contenido del modal de inicio de sesión/registro */}
                            </LoginModal>
                        )}
                    </IconWrapper>
                    <IconWrapper onClick={() => setShowCartModal(!showCartModal)}>
                        <RiShoppingCart2Fill size={30} />
                        {showCartModal && (
                            <CartModal>
                              <Cart></Cart>
                                {/* Contenido del modal de carrito de la compra */}
                            </CartModal>
                        )}
                    </IconWrapper>
                </TopBarIcons>
            </TopBarElement>
        </>
    );


}

export default TopBar