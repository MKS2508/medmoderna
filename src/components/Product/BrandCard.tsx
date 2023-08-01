import Link from 'next/link';
import React from "react";
import { IBrandProps } from "../../models/IBrandProps";

const BrandCard = (props: IBrandProps) => {
    return (
        <div className="brandCard" key="card">
            <Link href={`/marcas/${props.name}`} className="brandCard-link">
                <img src={props.imgSrc} alt={"img"} className="brandCard-img" />
            </Link>
        </div>
    );
};

export default BrandCard;
