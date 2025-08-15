import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Target, Users, Github, ExternalLink, Award, Code, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedLogo from '../components/Logo/AnimatedLogo';

gsap.registerPlugin(ScrollTrigger);

const Docs = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const sectionsRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const sections = sectionsRef.current;

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

    // 内容区域动画
    gsap.fromTo(content.children,
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
          trigger: content,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 各个部分动画
    gsap.fromTo(sections.querySelectorAll('.doc-section'),
      {
        opacity: 0,
        x: -30
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sections,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projectSections = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: t('docs.overview.title'),
      content: t('docs.overview.content')
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t('docs.target.title'),
      content: t('docs.target.content')
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('docs.problem.title'),
      content: t('docs.problem.content')
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: t('docs.solution.title'),
      content: t('docs.solution.content')
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
              {t('docs.hero.title')}
            </h1>
            
            {/* 获奖标识 */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Award className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-primary-600">
                {t('docs.hero.award')}
              </span>
            </div>
            
            {/* 描述 */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('docs.hero.description')}
            </p>
            
            {/* 链接按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://tcn0t06t3c8f.feishu.cn/docx/N7Q8dVXutokDkmx0snJcYheSnuf?from=from_copylink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                {t('docs.hero.viewOriginal')}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a
                href="https://github.com/zxdxjtu/dogtor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Github className="w-5 h-5 mr-2" />
                {t('docs.hero.viewCode')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 项目概览 */}
      <section ref={contentRef} className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('docs.summary.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('docs.summary.subtitle')}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-8 rounded-xl border border-primary-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('docs.summary.projectName')}
                </h3>
                <p className="text-gray-700 mb-6">
                  Dogtor
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('docs.summary.slogan')}
                </h3>
                <p className="text-gray-700 mb-6">
                  {t('docs.summary.sloganText')}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('docs.summary.links.title')}
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://github.com/zxdxjtu/dogtor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    {t('docs.summary.links.github')}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="https://chromewebstore.google.com/detail/bfgfgemgggofneiakijdnadoendfnlhm?utm_source=website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <span className="w-5 h-5 mr-2 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">C</span>
                    {t('docs.summary.links.chrome')}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 详细内容 */}
      <section ref={sectionsRef} className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {projectSections.map((section, index) => (
              <div
                key={index}
                className="doc-section bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
                      {section.icon}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {section.title}
                    </h3>
                    <div className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术特色 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('docs.features.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('docs.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('docs.features.innovation.title')}
              </h3>
              <p className="text-gray-700">
                {t('docs.features.innovation.description')}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('docs.features.userExperience.title')}
              </h3>
              <p className="text-gray-700">
                {t('docs.features.userExperience.description')}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('docs.features.technology.title')}
              </h3>
              <p className="text-gray-700">
                {t('docs.features.technology.description')}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('docs.features.health.title')}
              </h3>
              <p className="text-gray-700">
                {t('docs.features.health.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('docs.cta.title')}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {t('docs.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/download"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {t('docs.cta.download')}
            </a>
            <a
              href="https://github.com/zxdxjtu/dogtor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105"
            >
              <Github className="w-5 h-5 mr-2" />
              {t('docs.cta.github')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Docs;