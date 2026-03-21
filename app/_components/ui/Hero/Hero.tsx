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
    title: 'Expertise for Your Needs',
    description: 'We provide top-notch services to help you succeed.',
    buttonText: 'Learn More',
    img: Img2
  },
  {
    label: 'Innovation 🚀',
    subtitle: 'Think Ahead',
    title: 'Modern Challenges, Creative Ideas',
    description: 'Explore our creative ideas for modern challenges.',
    buttonText: 'Explore',
    img: Img3
  }
];

export default function Hero() {
  return (
    <section className="w-[95%] max-w-8xl mx-auto">
      <Carousel
        opts={{ loop: true }}
        className="
    w-full md:h-125 rounded-3xl overflow-hidden
    bg-gray-900 dark:bg-[#151414]
    transition-colors duration-500
  "
      >
        <CarouselContent className="h-full">
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="h-full">
              <div className="flex flex-col md:flex-row h-full w-full lg:gap-50 ml-8">
                {/* Text Side */}
                <div className="w-full md:w-[75%] flex flex-col justify-center p-6 md:p-16 space-y-12 md:space-y-8 order-2 md:order-1">
                  <span
                    className="
                      px-4 py-1.5 
                      bg-gray-200 dark:bg-teal-100 
                      text-gray-800 dark:text-gray-500 
                      text-xs font-bold rounded-full w-fit
                      transition-colors
                    "
                  >
                    {slide.label}
                  </span>

                  <div className="space-y-2">
                    <h4 className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                      {slide.subtitle}
                    </h4>

                    <h2
                      className="
                      text-3xl md:text-5xl lg:text-6xl font-extrabold 
                      text-gray-900 dark:text-white 
                      leading-[1.1]
                      transition-colors
                    "
                    >
                      {slide.title}
                    </h2>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg max-w-full md:max-w-xl leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Button */}
                  <button
                    className="
                      group relative px-7 py-3.5 
                      bg-black dark:bg-white 
                      text-white dark:text-black 
                      font-bold rounded-xl overflow-hidden w-fit 
                      hover:pr-12 transition-all cursor-pointer 
                      dark:hover:bg-gray-200 hover:bg-gray-900
                    "
                  >
                    <span className="relative z-10">{slide.buttonText}</span>
                    <span
                      className="
                        absolute right-4 opacity-0 
                        group-hover:opacity-100 
                        transition-all duration-300
                      "
                    >
                      →
                    </span>
                  </button>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 h-62.5 md:h-full order-1 md:order-2 overflow-hidden hidden md:block my-12">
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

        {/* Controls */}
        <CarouselPrevious
          className="
            left-4 bg-white/70 dark:bg-black/50 
            hover:bg-white dark:hover:bg-black 
            border border-gray-300 dark:border-gray-700 
            text-black dark:text-white cursor-pointer
            transition
          "
        />
        <CarouselNext
          className="
            right-4 bg-white/70 dark:bg-black/50 
            hover:bg-white dark:hover:bg-black 
            border border-gray-300 dark:border-gray-700 
            text-black dark:text-white cursor-pointer
            transition
          "
        />
      </Carousel>
    </section>
  );
}
