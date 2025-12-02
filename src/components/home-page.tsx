import { HeroSlideshow } from './hero-slideshow';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'home' | 'signin' | 'signup') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <span className="text-indigo-600">Intrepren</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('signin')}
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Why Choose Intrepren</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Empowering entrepreneurs with the knowledge and skills to build successful ventures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Expert Courses',
                description: 'Learn from industry leaders and successful entrepreneurs'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Connect with like-minded entrepreneurs worldwide'
              },
              {
                icon: Award,
                title: 'Certificates',
                description: 'Earn recognized certifications for your achievements'
              },
              {
                icon: TrendingUp,
                title: 'Track Progress',
                description: 'Monitor your learning journey and celebrate milestones'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who are building their dream businesses with Intrepren
          </p>
          <button
            onClick={() => onNavigate('signup')}
            className="px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                <span className="text-white">Intrepren</span>
              </div>
              <p className="text-gray-400">
                Empowering the next generation of entrepreneurs
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Intrepren. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
