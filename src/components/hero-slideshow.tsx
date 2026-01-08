import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Learn to Build Your Dreams',
    subtitle: 'Master entrepreneurship with expert-led courses',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600'
  },
  {
    title: 'Connect with Innovators',
    subtitle: 'Join a global community of ambitious entrepreneurs',
    gradient: 'from-cyan-500 via-blue-600 to-indigo-600'
  },
  {
    title: 'Turn Ideas into Reality',
    subtitle: 'Practical skills for launching and scaling your venture',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600'
  },
  {
    title: 'Accelerate Your Growth',
    subtitle: 'Resources and mentorship to take your business further',
    gradient: 'from-amber-500 via-orange-600 to-red-600'
  }
];

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`w-full h-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}>
            <div className="text-center px-4 max-w-4xl">
              <h1 className="text-white mb-6 animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-delay">
                {slide.subtitle}
              </p>
              <div className="flex gap-4 justify-center animate-fade-in-delay-2">
                <button className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                  Explore Courses
                </button>
                <button className="px-8 py-3 bg-white/10 text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
