import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Target, Heart, Github, ExternalLink, Trophy, Star, MessageCircle, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedLogo from '../components/Logo/AnimatedLogo';
import wechatQr from '../assets/images/wechat-qr.jpg';
import xhsQr from '../assets/images/xhs_qr.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const awardRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const award = awardRef.current;
    const mission = missionRef.current;
    const team = teamRef.current;

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

    // 获奖信息动画
    gsap.fromTo(award.children,
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
          trigger: award,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 使命愿景动画
    gsap.fromTo(mission.querySelectorAll('.mission-card'),
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
          trigger: mission,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 团队信息动画
    gsap.fromTo(team.children,
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
          trigger: team,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const missionItems = [
    {
      icon: <Target className="w-8 h-8" />,
      title: t('about.mission.title'),
      description: t('about.mission.description')
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('about.vision.title'),
      description: t('about.vision.description')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('about.values.title'),
      description: t('about.values.description')
    }
  ];

  const achievements = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: t('about.achievements.award.title'),
      description: t('about.achievements.award.description'),
      highlight: true
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: t('about.achievements.innovation.title'),
      description: t('about.achievements.innovation.description'),
      highlight: false
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('about.achievements.ux.title'),
      description: t('about.achievements.ux.description'),
      highlight: false
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
              {t('about.hero.title')} <span className="text-primary-600">Dogtor</span>
            </h1>
            
            {/* 获奖标识 */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Award className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-primary-600">
                {t('about.hero.award')}
              </span>
            </div>
            
            {/* 描述 */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('about.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* 获奖信息 */}
      <section ref={awardRef} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('about.achievements.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('about.achievements.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  achievement.highlight 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  achievement.highlight 
                    ? 'bg-yellow-100 text-yellow-600' 
                    : 'bg-primary-100 text-primary-600'
                }`}>
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使命愿景 */}
      <section ref={missionRef} className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('about.missionVision.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('about.missionVision.subtitle')}
            </p>
          </div>
          
          <div className="space-y-8">
            {missionItems.map((item, index) => (
              <div
                key={index}
                className="mission-card bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 团队信息 */}
      <section ref={teamRef} className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('about.team.subtitle')}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-8 rounded-xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('about.team.name')}
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('about.team.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('about.team.expertise.title')}
                  </h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• {t('about.team.expertise.chrome')}</li>
                    <li>• {t('about.team.expertise.frontend')}</li>
                    <li>• {t('about.team.expertise.ux')}</li>
                    <li>• {t('about.team.expertise.health')}</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('about.team.philosophy.title')}
                  </h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• {t('about.team.philosophy.userCentric')}</li>
                    <li>• {t('about.team.philosophy.scientific')}</li>
                    <li>• {t('about.team.philosophy.simple')}</li>
                    <li>• {t('about.team.philosophy.innovation')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 社交媒体 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('about.social.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('about.social.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 微信公众号 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg border border-green-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t('about.social.wechat.title')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('about.social.wechat.description')}
                </p>
                <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                  <img 
                    src={wechatQr} 
                    alt="微信公众号二维码" 
                    className="w-32 h-32 mx-auto"
                  />
                  <p className="text-sm text-gray-500 mt-2">{t('about.social.wechat.scan')}</p>
                </div>
              </div>
            </div>
            
            {/* 小红书 */}
            <div className="bg-gradient-to-br from-red-50 to-pink-100 p-8 rounded-xl shadow-lg border border-red-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t('about.social.xiaohongshu.title')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('about.social.xiaohongshu.description')}
                </p>
                <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                  <img 
                    src={xhsQr} 
                    alt="小红书二维码" 
                    className="w-32 h-32 mx-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2">{t('about.social.xiaohongshu.scan')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 项目信息 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('about.project.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('about.project.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center mr-4">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{t('about.project.opensource.title')}</h3>
                  <p className="text-gray-600">{t('about.project.opensource.subtitle')}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                {t('about.project.opensource.description')}
              </p>
              <a
                href="https://github.com/zxdxjtu/dogtor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                {t('about.project.opensource.link')}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{t('about.project.award.title')}</h3>
                  <p className="text-gray-600">{t('about.project.award.subtitle')}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                {t('about.project.award.description')}
              </p>
              <a
                href="https://tcn0t06t3c8f.feishu.cn/docx/N7Q8dVXutokDkmx0snJcYheSnuf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
              >
                {t('about.project.award.link')}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('about.cta.title')}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {t('about.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/download"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {t('about.cta.download')}
            </a>
            <a
              href="https://github.com/zxdxjtu/dogtor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105"
            >
              <Github className="w-5 h-5 mr-2" />
              {t('about.cta.github')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;