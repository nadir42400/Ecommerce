import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Slider() {
    const images = [
        {
            id: 1,
            src: "https://media.materiel.net/encart/p/18173_b.jpg",
            alt: "carousel 1",
            title: "carousel 1",
            description:
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
        },
        {
            id: 2,
            src: "https://media.materiel.net/encart/p/18200_b.jpg",
            alt: "carousel 2",
            title: "carousel 2",
            description:
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
        },
        {
            id: 3,
            src: "https://media.materiel.net/encart/p/18163_b.jpg",
            alt: "carousel 3",
            title: "carousel 3",
            description:
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
        },
    ];

    return (
        <Carousel
            className="hidden sm:block"
            autoPlay
            transitionTime={700}
            interval={5000}
            thumbWidth={120}
            infiniteLoop
            dynamicHeight={false}
            showArrows={false}
            showIndicators={false}
            showStatus={false}
        >
            {images.map((slide) => (
                <div key={slide.id}>
                    <img
                        className="block object-cover h-full w-full"
                        src={slide.src}
                        alt={slide.alt}
                    />
                </div>
            ))}
        </Carousel>
    );
}
