import './Brands.css'
import React, { useEffect, useState } from "react";
import { IProductPageProps } from "../../models/IProductPageProps";
import { IBrandProps } from "../../models/IBrandProps";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import BrandCard from "../../components/Product/BrandCard";

const Brands = (props: IProductPageProps) => {
    const router = useRouter();
    let brand = router.query.brand;

    const variants = {
        hidden: {
            opacity: 0
        },
        visible: ({delay = 1}) => ({
            opacity: 1,
            transition: {
                delay,
                duration: 2,
                staggerChildren: 4,
            }
        })
    }

    const BrandCards = (data: { brands: IBrandProps[] }) => {
        return (
            <>
                <div className="wrapper-grid" key="wrapper">
                    {
                        data.brands.map((item, index) =>
                            <div key={item.name}>
                                <BrandCard key={index} imgSrc={item.imgSrc}
                                           description={item.description}
                                           link={"/marcas/" + item.name} name={item.name}/>
                            </div>
                        )
                    }
                </div>
            </>
        )
    };

    const [brands, setBrands] = useState<IBrandProps[]>([]);
    const [page, setActivePage] = useState<number>(0);

    const initializePage = async (pageParam: number) => {
        const BRANDS: IBrandProps[] = [
            //... your brands data
        ]

        setBrands(BRANDS)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        initializePage(page)
    }, [page, props]);

    return (
        <AnimatedPage>
            <AnimatePresence>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <div className="title">
                        <h1>CATALOGO DE {props.name}</h1>
                        <h2>{props.description}</h2>
                    </div>
                </motion.div>
            </AnimatePresence>

            {
                <>
                    <section className="normalSection">
                        <BrandCards brands={brands}/>
                    </section>
                </>
            }

        </AnimatedPage>
    );
}

export default Brands;
