import React, { useState } from 'react';

import arrow from "../../static/img/arrow.svg";
import storeIcon from "../../static/img/storeIcon.png";

const Carousel = (props) => {
    const { content=[] } = props;
    const [current, setCurrent] = useState(1);

    const contentLength = content.length;

    const slideForward = () => {
        if (current >= contentLength) { 
            setCurrent(1)
        } else {
            setCurrent(current + 1);
        }
    }

    const slideBack = () => {
        if (current <= 1) { 
            setCurrent(contentLength) 
        } else {
            setCurrent(current - 1);
        }
    }

    const validURL = (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    return (
        <section className="Carousel overflow-auto">
            <ul 
                className="slide-container flex flex-row"
                style={{ transform: `translateX(-${current - 1}00%)` }}
            >
                {content.length ? 
                    content.map((content, index) => (
                        <li key={index} className="min-w-full pr-1">
                            {validURL(content) ? (
                                <div className="container--16-9">
                                    <iframe 
                                        className="video" 
                                        src={content}
                                        frameBorder="0" 
                                        allow="autoplay; fullscreen" 
                                        allowFullScreen
                                        title="Video"
                                    >
                                    </iframe>
                                </div>
                            ) : (
                                <div 
                                    className="w-full h-full bg-contain bg-no-repeat bg-center" 
                                    style={{ backgroundImage: `url(${content.childImageSharp.fluid.src})`}}
                                >
                                </div>
                            )}
                        </li>
                )) : (
                    <li className="min-w-full pr-1">
                        <div className="container--16-9 bg-gray-200">
                            <img 
                                src={storeIcon}
                                className="placeholder"
                            />
                        </div>
                        
                    </li>
                )}
            </ul>
            {content.length ? (
                <div className="absolute left-0 -bottom-1 flex flex-row justify-center items-center w-full py-4">
                    <button
                        onClick={() => slideBack()}
                        className="px-2 py-1 arrow"
                    >
                        <img src={arrow} className="w-2 transform rotate-180" />
                    </button>
                    <div className="flex flex-row items-center px-6">
                        {content.map((_, index) => (
                            <div 
                                key={index} 
                                className={`circle ${index === (current - 1) && "active"}`}
                            >
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => slideForward()}
                        className="px-2 py-1 arrow"
                    >
                        <img src={arrow} className="w-2" />
                    </button>
                </div>
            ): null}
        </section>
    )
}

export default Carousel;