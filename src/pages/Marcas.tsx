import Brands from '../pagesComponents/Brands/Brands';
import React, { useEffect, useState } from 'react';

const BrandsPage: React.FC = () => {
    const [elementsSize, setElementsSize] = useState(0);

    useEffect(() => {
        setElementsSize(10); // Aquí puedes reemplazar esto con la lógica para obtener el tamaño real
    }, []);

    return (
        <Brands
            name="MARCAS"
            id={5} // Aquí puedes reemplazar esto con el ID real
            description="Todas nuestras marcas"
            elementsSize={elementsSize}
            pagination={0}
        />
    );
}

export default BrandsPage;
