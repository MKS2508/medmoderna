import { useRouter } from 'next/router';
import Products from '../../pagesComponents/Products/Products';
import React, { useEffect, useState } from 'react';

const BrandProductsPage: React.FC = () => {
    const router = useRouter();
    const { brand } = router.query;
    const [elementsSize, setElementsSize] = useState(0);

    useEffect(() => {
        setElementsSize(10); // Aquí puedes reemplazar esto con la lógica para obtener el tamaño real del producto
    }, [brand]);

    return (
        <Products
            name={brand as string}
            id={5} // Aquí puedes reemplazar esto con el ID real del producto
            description={`Todos los productos de ${brand}`}
            elementsSize={elementsSize}
            pagination={0}
        />
    );
}

export default BrandProductsPage;
