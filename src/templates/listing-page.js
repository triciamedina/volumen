import React from "react";
import { Link } from "@reach/router";

const ListingPage = (props) => {
    const { name, browsePath, breadcrumb, shortDesc, type } = props;
    console.log(browsePath.replace(/\//g, " > "))

    return (
        <section className="flex flex-row">
            <div className="flex-1 pr-10">
                <Link 
                    to={`/directory${browsePath}`}
                    className="inline-block my-4 border-b-2 border-green-500 text-gray-800 font-straight font-medium"
                    state={{ isOpen: type }}
                >
                    Back
                </Link>
                <h2 className="font-straight font-black text-2xl text-gray-900">{name}</h2>
                <p className="text-base mb-12">{breadcrumb}</p>
                <p className="text-base mb-10">{shortDesc}</p>
            </div>
            <div className="flex-1 bg-gray-200"></div>
        </section>
    )
}

export default ListingPage;