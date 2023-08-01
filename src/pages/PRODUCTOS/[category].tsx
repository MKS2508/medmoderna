import { useRouter } from 'next/router'
import Products from '../../pagesComponents/Products/Products';
import React, { useEffect, useState } from 'react';

interface IDescriptions {
    [key: string]: string;
}

interface IIds {
    [key: string]: number;
}

const descriptions: IDescriptions = {
    CBD: "Aqui puedes encontrar lo relacionado con el CBD. Flores, extractos...",
    PARAFERNALIA: "Aqui puedes encontrar lo relacionado con papeles, mecheros, grinders...",
    ILUMINACION: "Aqui puedes encontrar lo relacionado con iluminacion para tu cultivo...",
    CULTIVO: "Aqui puedes encontrar lo relacionado con productos para tu cultivo",
    ROPA: "Toda nuestra ropa",
}

const ids: IIds = {
    CBD: 1,
    PARAFERNALIA: 2,
    ILUMINACION: 3,
    CULTIVO: 4,
    ROPA: 6,
}

const Category: React.FC = () => {
    const router = useRouter()
    const { category } = router.query
    const [elementsSize, setElementsSize] = useState(0);

    useEffect(() => {
        setElementsSize(10);
    }, [category]);

    if (category === undefined) {
        // Renderizar un componente de carga, o simplemente devolver null
        return null; // O return <LoadingComponent />;
    }
    return (
        <>
            <Products
                name={category as string}
                id={ids[(category as string).toUpperCase()]}
                description={descriptions[(category as string).toUpperCase()]}
                elementsSize={elementsSize}
                pagination={0}
            />
        </>
    )
}

export default Category;
