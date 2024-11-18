import React from 'react';
import { useRef } from 'react';
import { Users, Target, Eye, Lightbulb, CheckCircle, TrendingUp, Users2 } from 'lucide-react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';




const ScrollAnimationWrapper = ({ children, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Modify the opacity and transform animations to maintain visibility when fully in view
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [50, 0, 0, 50]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1, 0.9]
  );

  return (
    <motion.div
      ref={ref}
      style={{ 
        opacity, 
        y, 
        scale,
        transformOrigin: 'center'
      }}
      initial={{ opacity: 0, y: 50 }}
    >
      {children}
    </motion.div>
  );
};


const Home = () => {

  const blink = {
    initial: { opacity: 0.4 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const text = "Ready to Share Your Feedback?";
  
  const titleContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const letterAnimation = {
    initial: { 
      opacity: 10,
      x: -20 
    },
    animate: {
      opacity: [0, 1, 1, 0],
      x: [
        -20,  // Start position (off-screen left)
        0,    // In position
        0,    // Hold in position
        20    // Move off-screen right
      ],
      transition: {
        duration: 4,
        times: [0, 0.3, 0.7, 1],
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  const sectionRef = useRef(null);
  const isFullyInView = useInView(sectionRef, { 
    amount: "all"  // Only consider fully in view
  });

  const features = [
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
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

<header className="w-full">
      {/* White Section at the Top */}
      <div className="w-full bg-white py-2 sm:py-4 px-4 flex items-center justify-between sm:justify-around">
        {/* Left Logo */}
        <img 
          src="https://ptu.ac.in/wp-content/themes/cynic/images/classic-logo.png" 
          alt='PTU logo' 
          className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain'
        />
        
        {/* Center Text */}
        <div className='text-center flex-1 mx-4'>
          <div className='text-blue-800 font-bold text-[8px] sm:text-sm md:text-base lg:text-lg'>
            ਆਈ. ਕੇ. ਗੁਜਰਾਲ ਪੰਜਾਬ ਟੈਕਨੀਕਲ ਯੂਨੀਵਰਸਿਟੀ, ਜਲੰਧਰ
          </div>
          <div className='text-red-600 font-bold text-[8px] sm:text-sm md:text-base lg:text-lg'>
            I.K. GUJRAL PUNJAB TECHNICAL UNIVERSITY, JALANDHAR
          </div>
          <div className='text-blue-900 font-bold text-[6px] sm:text-xs md:text-sm lg:text-base'>
            (A State University Established by Govt. of Punjab vide Punjab Act No. 1 of 1997)
          </div>
        </div>
        
        {/* Right Logo */}
        <img 
          src="https://ptu.ac.in/wp-content/themes/cynic/images/classic-logo.png" 
          alt="PTU logo" 
          className='w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain'
        />
      </div>

      {/* Main Header Section */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center">
        {/* Dark overlay with improved gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />

        {/* Campus Image */}
        <img
          src="https://www.pturesults.in/resources/images/slider/ptu-campus-main-1.jpg"
          alt="University Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          {/* Content Container */}
          <div className="bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg mx-4">
            {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-6">
              IKGPTU Feedback System
            </h1> */}
            <motion.h1 initial="initial" animate="animate" variants={blink} className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-6">IKGPTU Feedback System</motion.h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-200">
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
              {/* <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to Share Your Feedback?
              </h3> */}
              <motion.div 
      className="overflow-hidden relative"
    >
      <motion.h3
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 inline-block"
        variants={titleContainer}
        initial="initial"
        animate="animate"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h3>
    </motion.div>
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

      {/* <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              About Our Feedback System
            </motion.h2>
            
            <motion.div 
              className="w-24 h-1 bg-blue-600 mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our comprehensive feedback system is designed to bridge the gap between students and administration, 
              ensuring continuous improvement in educational quality and student experience.
            </motion.p>
          </div>
        </FadeInWhenVisible>

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
              <FadeInWhenVisible key={index} delay={index * 0.2}>
                <div className="flex items-start space-x-4 transform hover:scale-105 transition-transform duration-300">
                  <motion.div 
                    className="bg-blue-100 rounded-lg p-3"
                    whileHover={{ scale: 1.1 }}
                  >
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </div>
    </div> */}



<div 
      ref={sectionRef} 
      className="bg-white py-20"
    >
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={isFullyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
            >
              About Our Feedback System
            </motion.h2>
            
            <motion.div 
              className="w-24 h-1 bg-blue-600 mx-auto mb-8"
              initial={{ width: 0 }}
              animate={isFullyInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8 }}
            />
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={isFullyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our comprehensive feedback system is designed to bridge the gap between students and administration, 
              ensuring continuous improvement in educational quality and student experience.
            </motion.p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <ScrollAnimationWrapper key={index} index={index}>
                <div className="flex items-start space-x-4 transform hover:scale-105 transition-transform duration-300">
                  <motion.div 
                    className="bg-blue-100 rounded-lg p-3"
                    whileHover={{ scale: 1.1 }}
                  >
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-xl font-bold text-gray-900 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isFullyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isFullyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
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
