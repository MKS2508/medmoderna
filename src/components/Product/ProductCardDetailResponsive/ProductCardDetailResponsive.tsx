import React, {useEffect, useState} from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import logo from "../../../assets/logo4.png"
import { PayPalButton } from "react-paypal-button-v2";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {RiInstagramFill, RiShoppingCart2Fill} from "react-icons/ri";
import {FaCcMastercard, FaCcVisa} from "react-icons/fa";
import {homeProds} from "../../../assets/HomeProds/HomeProductsLists";
import {getProductsFromCategory} from "../../../services/api-products-service";
import {CATEGORIES} from "../../../WebParameters";
import ProductCardNew from "../ProductCardNew/ProductCardNew";

interface Props {
    key: string;
    imgSrc: string;
    description: string;
    price: number;
    productId: string;
    name: string;
    brand: string;
    category: string;
}

const ProductCardDetailResponsive: React.FC<Props> = ({
                                                          imgSrc,
                                                          description,
                                                          price,
                                                          productId,
                                                          name,
                                                          brand,
                                                          category,
                                                      }) => {
    const [displayedProducts, setDisplayedProducts] = useState(homeProds);
    const fetchProducts = async () => {
        try {
            const result = await getProductsFromCategory({
                id: 0,
                name: category,
                elementsSize: 3
            });
            setDisplayedProducts(result.products);
        } catch (error) {
            console.error("Error al obtener productos por categoría:", error);
        }
    };

    useEffect(() => {
     fetchProducts().then(() => {console.log("related products fetched category")})
    }, [])
        return (
        <>
            <div className="background-images">
                <div className="background-image1">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image2">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image3">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image4">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image5">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image6">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image7">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image8">
                    <img src={logo} width={150}/>
                </div>
            </div>

            <div className="contentWithNavigation">
                <nav className="navbar">
                    <ul className="navbar-menu">
                        <li>
                            <Link href={`/${category}`} className="glass-button">
                                    <span className="boldi">Volver a la categoría de productos de {category}</span>

                            </Link>
                        </li>
                        <li>
                            <Link href={`/MARCAS/${brand}`} className="glass-button">
                                    <span className="boldi">Mas productos de la marca {brand}</span>
                            </Link>
                        </li>
                    </ul>
                </nav>                <motion.div
                    className="product-card-detail-responsive"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >





                    <div className="container">

                        <div className="imgBx">

                            <img
                                src={`${imgSrc}`}
                                alt={name}
                                className="product-image"
                            />
                        </div>
                        <div className="details">

                            <div className="content">
                                <h2>
                                    {name}
                                    <br />
                                    <span><Link   href={"/MARCAS/" + brand} > <span style={{ textDecoration: "none", color: "71B957FF", fontWeight: 900}} >{brand}</span></Link></span>
                                </h2>
                                <p className="product-description"> {description}</p>
                                <p className="product-price">{price.toFixed(2)}€</p>
                                <p className="product-id">Product ID: {productId}</p>
                                <p className="product-category">Categoría: <Link  href={"/" + category} > <span  >{category}</span></Link></p>
                                <p className="product-colors">
                                    Tamaños disponibles:
                                    <span className="red"></span>
                                    <span className="orange"></span>
                                </p>
                                <button className="glass-button">
                                    <span>Añadir al carrito <RiShoppingCart2Fill/></span>
                                </button>
                            </div>

                        </div>
                        <div className="acceptedPaymentsMobile">
                            <div className="acceptedPaymentsHeader">Métodos de pago aceptados</div>

                            <div className="acceptedPaymentsItem">
                                <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
                                     alt="Botón de PayPal"/>
                            </div>
                            <div className="acceptedPaymentsItem">
                                <img src="https://www.bisbatdeterrassa.org/parroquies/santissima-trinitat/logo-bizum.png/@@images/image.png"
                                     alt="Botón de Bizum" width={120}/>
                            </div>
                            <div className="acceptedPaymentsItem">
                                <span><FaCcVisa size={"80"}/>   {" "}
                                    <FaCcMastercard size={"80"}/></span>
                            </div>

                        </div>

                    </div>


                </motion.div>
                <div className="acceptedPaymentsBig">
                    <div className="acceptedPaymentsHeader">Quizás te interesen tambien estos productos.. 😉 </div>
                    <div className="relatedProducts">

                        {displayedProducts.map((item, index) => (
                            <>
                                <ProductCardNew
                                    blur={"12px"}
                                    key={item.name + Math.floor(Math.random() * 10001).toString()}
                                    index={index} // Añade el índice aquí
                                    imgSrc={item.imgSrc}
                                    description={item.description}
                                    mobileVersion={false}
                                    price={item.price}
                                    productId={item.productId}
                                    name={item.name}
                                    brand={item.brand}
                                    category={item.category}
                                    maxLines={1}
                                    maxCharsPerLine={70}
                                />
                            </>
                        ))}
                    </div>
                    <div className="acceptedPaymentsHeader">Métodos de pago aceptados</div>
                    <div className="acceptedPaymentItems">

                        <div className="acceptedPaymentsItem">
                            <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
                                 alt="Botón de PayPal"/>
                        </div>
                        <div className="acceptedPaymentsItem">
                            <img src="https://www.bisbatdeterrassa.org/parroquies/santissima-trinitat/logo-bizum.png/@@images/image.png"
                                 alt="Botón de Bizum" width={120}/>
                        </div>
                        <div className="acceptedPaymentsItem">
                                <span><FaCcVisa size={"80"}/>   {" "}
                                    <FaCcMastercard size={"80"}/></span>
                        </div>

                    </div>
                </div>





            </div>

        </>

    );
};

export default ProductCardDetailResponsive;
