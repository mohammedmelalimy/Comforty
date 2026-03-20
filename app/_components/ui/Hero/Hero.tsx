import Img1 from '@assets/home-decor-img-11.png';
import Img2 from '@assets/special.png';
import Img3 from '@assets/home-decor-img-08.png';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

import Image from 'next/image';

const slides = [
  {
    label: 'Featured 🎉',
    subtitle: 'Top Picks for You',
    title: 'Welcome to Our Site',
    description: 'Discover amazing features and content tailored for you.',
    buttonText: 'Get Started',
    img: Img1
  },
  {
    label: 'Our Services 💼',
    subtitle: 'What We Offer',
    title: 'Professional Solutions',
    description: 'We provide top-notch services to help you succeed.',
    buttonText: 'Learn More',
    img: Img2
  },
  {
    label: 'Innovation 🚀',
    subtitle: 'Think Ahead',
    title: 'Innovative Solutions',
    description: 'Explore our creative ideas for modern challenges.',
    buttonText: 'Explore',
    img: Img3
  }
];

export default function Hero() {
  return (
    <section className="w-[95%] max-w-7xl mx-auto mt-3">
      <Carousel
        opts={{ loop: true }}
        className="w-full h-100 md:h-125 rounded-3xl overflow-hidden bg-gray-100"
      >
        <CarouselContent className="h-full">
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="h-full">
              <div className="flex flex-col md:flex-row h-full w-full">
                {/* Text Side */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 space-y-5 order-2 md:order-1 bg-gray-100">
                  <span className="px-4 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full w-fit">
                    {slide.label}
                  </span>

                  <div className="space-y-2">
                    <h4 className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest">
                      {slide.subtitle}
                    </h4>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1]">
                      {slide.title}
                    </h2>
                  </div>

                  <p className="text-gray-600 text-sm md:text-lg max-w-xl leading-relaxed">
                    {slide.description}
                  </p>

                  <button className="group relative px-7 py-3.5 bg-gray-900 text-white font-bold rounded-xl overflow-hidden w-fit hover:pr-12 transition-all">
                    <span className="relative z-10">{slide.buttonText}</span>
                    <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      →
                    </span>
                    <div className="absolute inset-0 bg-teal-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </button>
                </div>

                {/* Image Side */}
                <div className="relative w-full md:w-1/2 h-62.5 md:h-full order-1 md:order-2 overflow-hidden">
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Controls */}
        <CarouselPrevious className="left-4 bg-white/70 hover:bg-white cursor-pointer" />
        <CarouselNext className="right-4 bg-white/70 hover:bg-white cursor-pointer" />
      </Carousel>
    </section>
  );
}
