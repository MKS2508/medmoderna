import React from "react";
import Link from 'next/link';
import { IconType } from "react-icons";

interface ICategoryProps {
    name: string;
    link: string;
    Icon: IconType;
}

const CategoryCard = (props: ICategoryProps) => {
    const { Icon } = props;

    return (
        <div className="categoryCard">
            <Link href={props.link} className="categoryCard-link">
                    <Icon className="categoryCard-icon" />
                    <span className="categoryCard-text">{props.name}</span>

            </Link>
        </div>
    );
};

export default CategoryCard;
