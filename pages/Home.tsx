import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, TESTIMONIALS } from '../data';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal (Staggered Lines)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.from(".hero-text-line span", {
        yPercent: 120, // Move down 120%
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.2
      })
      .from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8");

      // 2. Hero Image Parallax (Scrub)
      gsap.to(".hero-bg-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 3. Horizontal Scroll Section
      const sections = gsap.utils.toArray(".horizontal-item");
      if (sections.length > 0) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1, // Smooth scrub
            snap: 1 / (sections.length - 1),
            end: () => "+=" + (horizontalRef.current?.offsetWidth || 0)
          }
        });
      }

      // 4. Feature Reveal (Subtle Stagger)
      gsap.from(".feature-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 85%",
        }
      });

      // 5. Testimonials Reveal
      gsap.from(".testimonial-card", {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        stagger: 0.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 80%"
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div ref={containerRef} className="bg-light min-h-screen">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="hero-bg-img w-full h-[120%] object-cover opacity-60 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
          <div className="reveal-text-container mb-4">
            <p className="hero-text-line block overflow-hidden">
              <span className="block text-primary font-bold tracking-[0.3em] uppercase text-sm md:text-base">New Collection 2024</span>
            </p>
          </div>
          <div className="reveal-text-container">
            <h1 className="hero-text-line font-black font-['Oswald'] uppercase leading-[0.9] text-6xl md:text-9xl tracking-tight overflow-hidden">
              <span className="block">Redefine</span>
            </h1>
          </div>
          <div className="reveal-text-container mb-12">
            <h1 className="hero-text-line font-black font-['Oswald'] uppercase leading-[0.9] text-6xl md:text-9xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 overflow-hidden">
               <span className="block">Your Reality</span>
            </h1>
          </div>
          <div className="hero-cta">
            <Link to="/shop" className="group inline-flex items-center gap-3 bg-primary hover:bg-white hover:text-dark text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(5,150,105,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]">
              Explore Now <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Showcase */}
      <section ref={horizontalRef} className="h-screen bg-white overflow-hidden flex items-center relative">
        <div className="absolute top-10 left-6 md:left-20 z-10 pointer-events-none mix-blend-difference text-white">
          <h2 className="text-4xl md:text-6xl font-black font-['Oswald'] uppercase">
            Best <span className="text-primary">Sellers</span>
          </h2>
        </div>
        
        <div className="flex w-[400%] h-full">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="horizontal-item w-screen h-full flex items-center justify-center p-6 md:p-20 border-r border-gray-50 last:border-0 relative bg-off-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-7xl">
                <div className="order-2 md:order-1 space-y-8 relative z-10">
                  <span className="text-[12rem] font-black text-gray-100 absolute -top-32 -left-20 -z-10 select-none opacity-50">{`0${index + 1}`}</span>
                  <div className="space-y-4">
                    <p className="text-sm font-bold tracking-widest uppercase text-primary mb-2">{product.category}</p>
                    <h3 className="text-5xl md:text-7xl font-black font-['Oswald'] uppercase leading-none">{product.name}</h3>
                  </div>
                  <p className="text-gray-600 text-lg md:text-xl max-w-md leading-relaxed">{product.description}</p>
                  <div className="flex items-center gap-8">
                    <p className="text-4xl font-bold text-dark">${product.price}</p>
                    <Link to={`/product/${product.id}`} className="group flex items-center gap-2 border-b-2 border-dark pb-1 text-dark font-bold uppercase tracking-widest text-sm hover:text-primary hover:border-primary transition-all duration-300">
                      View Product <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                <div className="order-1 md:order-2 h-[40vh] md:h-[70vh] w-full relative group">
                  <div className="absolute inset-0 bg-gray-200 rounded-3xl transform rotate-3 scale-95 group-hover:rotate-0 transition-transform duration-700 ease-out"></div>
                  <div className="absolute inset-0 bg-gray-100 rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-700 ease-out">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-[#0F1115] text-white features-grid relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card p-10 bg-white/5 backdrop-blur-sm rounded-3xl hover:bg-white/10 transition-colors border border-white/5 group">
              <h3 className="text-3xl font-bold font-['Oswald'] mb-6 text-primary group-hover:translate-x-2 transition-transform duration-300">Premium Materials</h3>
              <p className="text-gray-400 text-lg leading-relaxed">Sourced from the finest suppliers globally to ensure longevity, comfort, and unmatched aesthetic appeal.</p>
            </div>
            <div className="feature-card p-10 bg-white/5 backdrop-blur-sm rounded-3xl hover:bg-white/10 transition-colors border border-white/5 group">
              <h3 className="text-3xl font-bold font-['Oswald'] mb-6 text-primary group-hover:translate-x-2 transition-transform duration-300">Sustainable</h3>
              <p className="text-gray-400 text-lg leading-relaxed">100% Carbon neutral shipping and recycled packaging materials. Luxury doesn't have to cost the earth.</p>
            </div>
            <div className="feature-card p-10 bg-white/5 backdrop-blur-sm rounded-3xl hover:bg-white/10 transition-colors border border-white/5 group">
              <h3 className="text-3xl font-bold font-['Oswald'] mb-6 text-primary group-hover:translate-x-2 transition-transform duration-300">Lifetime Warranty</h3>
              <p className="text-gray-400 text-lg leading-relaxed">We stand by our craftsmanship. If it breaks, we fix it. A promise of quality that lasts a lifetime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-40 bg-[#FAFAFA] testimonials-section relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black font-['Oswald'] uppercase mb-6 tracking-tight">Voices of Apex</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="testimonial-card bg-white p-12 rounded-[2rem] luxury-shadow relative group hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                   <Quote size={32} />
                </div>
                <p className="text-2xl text-dark font-medium italic mb-10 relative z-10 leading-relaxed tracking-tight">"{t.text}"</p>
                <div className="flex items-center gap-5 pt-8 border-t border-gray-100">
                  <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden">
                     <img src={`https://ui-avatars.com/api/?name=${t.author}&background=0F1115&color=fff`} alt={t.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark font-['Oswald'] uppercase tracking-widest text-lg">{t.author}</h4>
                    <p className="text-xs text-primary font-bold tracking-wider uppercase mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-40 bg-primary relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         {/* Animated circle decoration */}
         <div className="absolute -top-1/2 -right-1/2 w-[100vw] h-[100vw] rounded-full border border-white/10 opacity-30"></div>
         
         <div className="container mx-auto px-6 text-center relative z-10">
           <h2 className="text-5xl md:text-8xl font-black font-['Oswald'] text-white uppercase mb-8 tracking-tighter">Join the Movement</h2>
           <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light">Get exclusive access to limited drops and member-only pricing.</p>
           <form className="max-w-lg mx-auto flex flex-col md:flex-row gap-4 p-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
             <input 
               type="email" 
               placeholder="Enter your email" 
               className="flex-1 px-8 py-4 bg-transparent text-white placeholder-white/50 focus:outline-none"
             />
             <button className="px-10 py-4 bg-dark text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-900 transition-all duration-300 shadow-lg">
               Subscribe
             </button>
           </form>
         </div>
      </section>
    </div>
  );
};

export default Home;