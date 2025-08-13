import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Github, Chrome, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedLogo from '../components/Logo/AnimatedLogo';

gsap.registerPlugin(ScrollTrigger);

const DownloadPage = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const stepsRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const steps = stepsRef.current;
    const links = linksRef.current;

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

    // 安装步骤动画
    gsap.fromTo(steps.querySelectorAll('.step-card'),
      {
        opacity: 0,
        x: -30,
        scale: 0.9
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: steps,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 下载链接动画
    gsap.fromTo(links.children,
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
          trigger: links,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const installSteps = [
    {
      step: 1,
      title: "下载扩展文件",
      description: "从GitHub仓库下载最新版本的Dogtor扩展文件",
      icon: <Download className="w-6 h-6" />
    },
    {
      step: 2,
      title: "打开Chrome扩展管理",
      description: "在Chrome浏览器中打开 chrome://extensions/ 页面",
      icon: <Chrome className="w-6 h-6" />
    },
    {
      step: 3,
      title: "启用开发者模式",
      description: "在扩展管理页面右上角开启\"开发者模式\"开关",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 4,
      title: "加载扩展",
      description: "点击\"加载已解压的扩展程序\"，选择下载的Dogtor文件夹",
      icon: <CheckCircle className="w-6 h-6" />
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
              {t('download.title')} <span className="text-primary-600">Dogtor</span>
            </h1>
            
            {/* 描述 */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('download.subtitle')}
            </p>
            
            {/* 状态提示 */}
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full mb-8">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">{t('download.chrome.status')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 下载链接 */}
      <section ref={linksRef} className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('download.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('download.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* GitHub下载 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center mr-4">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{t('download.github.title')}</h3>
                  <p className="text-gray-600">{t('download.github.description')}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                {t('download.github.description')}
              </p>
              <a
                href="https://github.com/zxdxjtu/dogtor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center w-full justify-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
              >
                <Github className="w-5 h-5 mr-2" />
                {t('download.github.button')}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Chrome商店 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-4">
                  <Chrome className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{t('download.chrome.title')}</h3>
                  <p className="text-gray-600">{t('download.chrome.description')}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                {t('download.chrome.description')}
              </p>
              <a
                href="https://chromewebstore.google.com/detail/bfgfgemgggofneiakijdnadoendfnlhm?utm_source=website"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center w-full justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-blue-400 hover:border-blue-500"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full mr-3">
                  <Chrome className="w-5 h-5 text-blue-600" />
                </div>
                <span className="flex flex-col items-start">
                   <span className="text-sm font-medium opacity-90">{t('download.chrome.buttonSecondary').split(' ')[0]}</span>
                   <span className="text-lg font-bold leading-tight">Chrome</span>
                 </span>
                <ExternalLink className="w-5 h-5 ml-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 安装步骤 */}
      <section ref={stepsRef} className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              安装步骤
            </h2>
            <p className="text-lg text-gray-600">
              按照以下步骤安装Dogtor Chrome扩展
            </p>
          </div>
          
          <div className="space-y-6">
            {installSteps.map((step, index) => (
              <div
                key={index}
                className="step-card bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-3">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使用指南 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              使用指南
            </h2>
            <p className="text-lg text-gray-600">
              安装完成后，Dogtor将自动开始工作
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  自动检测
                </h3>
                <p className="text-gray-600 mb-4">
                  Dogtor会自动检测您的网页浏览时间，当检测到长时间浏览时，会智能提醒您进行颈椎运动。
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    智能时间检测
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    个性化提醒设置
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  颈椎运动
                </h3>
                <p className="text-gray-600 mb-4">
                  基于医学研究的颈椎旋转运动，通过网页旋转的方式引导您进行科学的颈椎锻炼。
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    科学运动指导
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    实时运动反馈
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            开始保护您的颈椎健康
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            立即下载安装Dogtor，让智能健康提醒成为您工作的好伙伴
          </p>
          <a
            href="https://github.com/zxdxjtu/dogtor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Github className="w-5 h-5 mr-2" />
            立即下载
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default DownloadPage;