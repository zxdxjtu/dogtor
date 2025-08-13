import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Github, Award, Shield, Zap, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedLogo from '../components/Logo/AnimatedLogo';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const features = featuresRef.current;
    const cta = ctaRef.current;

    // 英雄区域动画
    gsap.fromTo(hero.children, 
      { 
        opacity: 0, 
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    // 功能卡片动画
    gsap.fromTo(features.querySelectorAll('.feature-card'),
      {
        opacity: 0,
        y: 30,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: features,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // CTA区域动画
    gsap.fromTo(cta.children,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cta,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('features.realtime.title'),
      description: t('features.realtime.description')
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('features.ai.title'),
      description: t('features.ai.description')
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('features.therapy.title'),
      description: t('features.therapy.description')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 英雄区域 */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <AnimatedLogo size="xl" className="drop-shadow-lg" />
            </div>
            
            {/* 标题 */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-primary-600">Dogtor</span>
              <br />
              <span className="text-2xl md:text-4xl font-medium text-gray-700">
                {t('hero.title').replace('Dogtor - ', '')}
              </span>
            </h1>
            
            {/* 获奖标识 */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Award className="w-6 h-6 text-yellow-500" />
              <span className="text-lg font-semibold text-primary-600">
                {t('about.award.title')}
              </span>
            </div>
            
            {/* 描述 */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            {/* 按钮组 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/download"
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5 mr-2" />
                {t('hero.cta')}
              </Link>
              
              <a
                href="https://github.com/zxdxjtu/dogtor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <Github className="w-5 h-5 mr-2" />
                {t('download.github.button')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('download.title')}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {t('download.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/download"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              {t('hero.cta')}
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105"
            >
              {t('hero.learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;