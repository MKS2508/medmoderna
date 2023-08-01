import { useRouter } from 'next/router';
import ProductDetail from '../../pagesComponents/ProductDetail/ProductDetail';
import React, { useEffect, useState } from 'react';

const ProductPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [elementsSize, setElementsSize] = useState(0);

    useEffect(() => {
        setElementsSize(10); // Aquí puedes reemplazar esto con la lógica para obtener el tamaño real del producto
    }, [id]);

    return (
        <ProductDetail
            name={id as string}
            id={5} // Aquí puedes reemplazar este valor con el ID real del producto
            description={id as string} // Aquí puedes reemplazar esto con la descripción real del producto
            elementsSize={elementsSize}
            pagination={0}
            productId={id as string} // Aquí puedes reemplazar esto con el ID real del producto
        />
    );
}

export default ProductPage;
