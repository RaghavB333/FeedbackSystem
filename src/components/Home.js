import React from 'react';
import { ChevronDown, Users, BookOpen, Award, ArrowRight, Target, Eye, Lightbulb, CheckCircle, TrendingUp, Users2 } from 'lucide-react';
const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">

        <header className="relative">
          {/* White Section at the Top */}
          <div className="w-full h-[15vh] bg-white flex items-center justify-center">
            <h2 className="text-lg md:text-xl font-medium text-gray-800">
              <img src="https://ptu.ac.in/wp-content/themes/cynic/images/classic-logo.png" alt="" width={75} height={75} className='absolute left-[29.5vw] top-4' />
            </h2>
            <div className='absolute left-[35.5vw] top-4'>ਆਈ. ਕੇ. ਗੁਜਰਾਲ ਪੰਜਾਬ ਟੈਕਨੀਕਲ ਯੂਨੀਵਰਸਿਟੀ, ਜਲੰਧਰ</div>
            <div className='absolute left-[35.5vw] top-10 text-red-600 text-lg'>I.K. GUJRAL PUNJAB TECHNICAL UNIVERSITY, JALANDHAR</div>
            <div className='absolute left-[35.5vw] top-[70px] text-blue-900 font-bold text-sm'>(A State University Established by Govt. of Punjab vide Punjab Act No. 1 of 1997)</div>
          </div>

          {/* Main Header Section */}
          <div className="relative h-[70vh] flex items-center justify-center">
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />

            {/* Placeholder image for university campus */}
            <img
              src="https://www.pturesults.in/resources/images/slider/ptu-campus-main-1.jpg"
              alt="University Campus"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-16">
              {/* Background overlay for better text visibility */}
              <div className="bg-black bg-opacity-50 p-8 rounded-lg">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  IKGPTU Feedback System
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8">
                  Your voice shapes the future of education
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-white text-black py-16">
          <main className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-lg max-w-2xl mx-auto">
                Our feedback system is designed to make your voice heard and improve the educational experience for everyone.
              </p>
            </div>

            {/* Ready to Share Your Feedback Section - Moved here */}
            <div className="bg-blue-50 rounded-2xl p-8 md:p-12 text-center mt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Share Your Feedback?
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of students who are already making a difference through their valuable feedback.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative top-10">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Register</h3>
                <p className="text-gray-600 mb-6">
                  Create your account in minutes and join our community of engaged students.
                </p>
                <a
                  href="/registration"
                  className="block w-full border-2 border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center"
                >
                  Register Now
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Student Dashboard</h3>
                <p className="text-gray-600 mb-6">
                  Access your personalized dashboard to manage and submit your data.
                </p>
                <a
                  href="/dashboard"
                  className="block w-full border-2 border-gray-200 hover:border-green-600 text-gray-700 hover:text-green-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center"
                >
                  View Dashboard
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Admin Portal</h3>
                <p className="text-gray-600 mb-6">
                  Secure administrative area for managing feedback and generating insights.
                </p>
                <a
                  href="/admin-login"
                  className="block w-full border-2 border-gray-200 hover:border-purple-600 text-gray-700 hover:text-purple-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center"
                >
                  Admin Login
                </a>
              </div>
            </div>
          </main>
        </div>

        <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Our Feedback System</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive feedback system is designed to bridge the gap between students and administration, 
              ensuring continuous improvement in educational quality and student experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  icon: CheckCircle,
                  title: "Real-Time Feedback",
                  description: "Provide instant feedback on courses, teaching methods, and facilities."
                },
                {
                  icon: TrendingUp,
                  title: "Data-Driven Improvements",
                  description: "Analytics-based decision making for continuous educational enhancement."
                },
                {
                  icon: Users,
                  title: "Anonymous Submissions",
                  description: "Safe and confidential platform for honest student opinions."
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-1">
                <div className="bg-white rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Statistics</h3>
                  <div className="space-y-6">
                    {[
                      { label: "Student Satisfaction", value: "92%" },
                      { label: "Response Rate", value: "85%" },
                      { label: "Implementation Rate", value: "78%" }
                    ].map((stat, index) => (
                      <div key={index} className="relative">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">{stat.label}</span>
                          <span className="font-bold text-blue-600">{stat.value}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{ width: stat.value }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>


      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Eye className="w-16 h-16 mx-auto text-blue-400 mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Vision</h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: "Excellence in Education",
                description: "Striving to maintain the highest standards of educational quality through continuous feedback and improvement."
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "Fostering innovative teaching methods and learning environments based on student insights and suggestions."
              },
              {
                icon: Users2,
                title: "Student-Centric",
                description: "Placing students at the heart of our decision-making process through transparent feedback mechanisms."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <item.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-4">IKGPTU Feedback System</h4>
              <p className="mb-4">Empowering student voices since 2024</p>
              <p>© {new Date().getFullYear()} IKGPTU University. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
