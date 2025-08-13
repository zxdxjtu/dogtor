import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  Zap, 
  Heart, 
  Clock, 
  RotateCw, 
  Bell, 
  Settings, 
  Monitor, 
  Activity,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedLogo from '../components/Logo/AnimatedLogo';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const coreRef = useRef(null);
  const detailsRef = useRef(null);
  const benefitsRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const core = coreRef.current;
    const details = detailsRef.current;
    const benefits = benefitsRef.current;

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

    // 核心功能动画
    gsap.fromTo(core.querySelectorAll('.feature-card'),
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
          trigger: core,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 详细功能动画
    gsap.fromTo(details.querySelectorAll('.detail-item'),
      {
        opacity: 0,
        x: -30
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: details,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 优势特点动画
    gsap.fromTo(benefits.querySelectorAll('.benefit-card'),
      {
        opacity: 0,
        scale: 0.8,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: benefits,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const coreFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('features.realtime.title'),
      description: t('features.realtime.description'),
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <RotateCw className="w-8 h-8" />,
      title: t('features.ai.title'),
      description: t('features.ai.description'),
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: t('features.therapy.title'),
      description: t('features.therapy.description'),
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: t('features.progress.title'),
      description: t('features.progress.description'),
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const detailedFeatures = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "时间追踪",
      description: "精确追踪用户在每个网页的停留时间，智能分析浏览模式"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "网页旋转",
      description: "通过CSS3动画实现平滑的网页旋转效果，引导用户进行颈椎运动"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "运动指导",
      description: "提供科学的颈椎运动指导，包括运动方向、幅度和节奏"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "健康数据",
      description: "记录用户的运动频率和健康改善情况，提供个性化建议"
    }
  ];

  const benefits = [
    {
      title: "预防颈椎疾病",
      description: "有效预防长时间使用电脑导致的颈椎问题",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "提高工作效率",
      description: "定期运动缓解疲劳，保持良好的工作状态",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "改善生活质量",
      description: "减少颈椎不适，提升整体生活质量",
      icon: <Heart className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 英雄区域 */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <AnimatedLogo size="large" className="drop-shadow-lg" />
            </div>
            
            {/* 标题 */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-primary-600">Dogtor</span> {t('features.title')}
            </h1>
            
            {/* 描述 */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              探索Dogtor的强大功能，了解它如何通过智能化的方式
              帮助您在日常工作中保护颈椎健康
            </p>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section ref={coreRef} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              核心功能
            </h2>
            <p className="text-lg text-gray-600">
              Dogtor的四大核心功能，为您的颈椎健康保驾护航
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 详细功能介绍 */}
      <section ref={detailsRef} className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              功能详解
            </h2>
            <p className="text-lg text-gray-600">
              深入了解Dogtor如何工作，以及每个功能的具体实现
            </p>
          </div>
          
          <div className="space-y-8">
            {detailedFeatures.map((feature, index) => (
              <div
                key={index}
                className="detail-item bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 工作原理 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              工作原理
            </h2>
            <p className="text-lg text-gray-600">
              了解Dogtor是如何智能地保护您的颈椎健康
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  智能监测
                </h3>
                <p className="text-gray-600">
                  实时监测用户的网页浏览时间和行为模式
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  智能提醒
                </h3>
                <p className="text-gray-600">
                  根据用户习惯智能判断最佳提醒时机
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  引导运动
                </h3>
                <p className="text-gray-600">
                  通过网页旋转动画引导用户进行颈椎运动
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 使用优势 */}
      <section ref={benefitsRef} className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              使用优势
            </h2>
            <p className="text-lg text-gray-600">
              使用Dogtor为您带来的健康和工作效率提升
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术特点 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              技术特点
            </h2>
            <p className="text-lg text-gray-600">
              先进的技术实现，确保最佳的用户体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                前端技术
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Chrome Extension API
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  CSS3 动画和变换
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  JavaScript ES6+
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  本地存储管理
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                设计理念
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  非侵入式设计
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  智能化交互
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  个性化体验
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  科学健康理念
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            体验Dogtor的强大功能
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            立即下载安装，开始您的智能颈椎健康保护之旅
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/download"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              立即下载
            </a>
            <a
              href="/about"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105"
            >
              了解更多
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;