'use client'

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">
              ILYASS TV
            </h3>
            <p className="text-gray-400 leading-relaxed">
              منصتك المفضلة لمشاهدة المباريات والقنوات المباشرة بأفضل جودة ممكنة
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <nav className="space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="block text-gray-400 hover:text-primary-400 transition-colors"
              >
                الرئيسية
              </button>
              <button
                onClick={() => scrollToSection('download')}
                className="block text-gray-400 hover:text-primary-400 transition-colors"
              >
                تحميل التطبيقات
              </button>
              <button
                onClick={() => scrollToSection('statistics')}
                className="block text-gray-400 hover:text-primary-400 transition-colors"
              >
                الإحصائيات
              </button>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-2 text-gray-400">
              <p>للدعم الفني والاستفسارات</p>
              <p>support@ilyasstv.com</p>
              <p>متاح 24/7</p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Links */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 rtl:space-x-reverse">
              <button className="text-gray-400 hover:text-primary-400 transition-colors">
                حول
              </button>
              <span className="text-gray-600">•</span>
              <button className="text-gray-400 hover:text-primary-400 transition-colors">
                الخصوصية
              </button>
              <span className="text-gray-600">•</span>
              <button className="text-gray-400 hover:text-primary-400 transition-colors">
                اتصل بنا
              </button>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© 2025 ILYASS TV. جميع الحقوق محفوظة</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}