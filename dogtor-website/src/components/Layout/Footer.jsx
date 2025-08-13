import { Github, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-primary-600">Dogtor</span>
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-gray-600 text-sm">
              {t('footer.description')}
            </p>
            <p className="text-primary-600 font-semibold text-sm mt-2">
              🏆 {t('footer.award')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/features" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">
                  {t('footer.quickLinks.features')}
                </a>
              </li>
              <li>
                <a href="/download" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">
                  {t('footer.quickLinks.download')}
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">
                  {t('footer.quickLinks.about')}
                </a>
              </li>
            </ul>
          </div>

          {/* Project Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('footer.resources.title')}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/zxdxjtu/dogtor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>{t('footer.resources.github')}</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://chromewebstore.google.com/detail/bfgfgemgggofneiakijdnadoendfnlhm?utm_source=website" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>{t('footer.resources.chrome')}</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://tcn0t06t3c8f.feishu.cn/docx/N7Q8dVXutokDkmx0snJcYheSnuf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <span>{t('footer.resources.docs')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              {t('footer.copyright')}
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              {t('footer.builtWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;