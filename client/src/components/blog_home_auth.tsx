import React, { useState } from 'react';
import { BookOpen, User, Mail, Lock, Eye, EyeOff, Home, PenTool, Search } from 'lucide-react';

export default function BlogSite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showPassword, setShowPassword] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends and technologies shaping the future of web development in 2025...",
      author: "Sarah Chen",
      date: "Oct 28, 2025",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
    },
    {
      id: 2,
      title: "Mastering React Hooks",
      excerpt: "A comprehensive guide to understanding and implementing React Hooks in your projects...",
      author: "Michael Roberts",
      date: "Oct 25, 2025",
      category: "Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
    },
    {
      id: 3,
      title: "Design Systems at Scale",
      excerpt: "How leading companies build and maintain design systems that scale across products...",
      author: "Emma Wilson",
      date: "Oct 22, 2025",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
    }
  ];

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BlogSpace
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Home</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Articles</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Categories</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">About</a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentPage('login')}
                className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition"
              >
                Login
              </button>
              <button
                onClick={() => setCurrentPage('register')}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Stories That
            <span className="block bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Inspire & Educate
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore insightful articles on technology, design, and development from industry experts
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg shadow-sm"
            />
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={blogPosts[0].image}
                alt="Featured post"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4 w-fit">
                Featured
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {blogPosts[0].author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{blogPosts[0].author}</p>
                    <p className="text-sm text-gray-500">{blogPosts[0].date}</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {post.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo & Back */}
        <div className="text-center mb-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to continue to BlogSpace</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                Forgot password?
              </a>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('register')}
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const RegisterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo & Back */}
        <div className="text-center mb-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <PenTool className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join BlogSpace and start sharing</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="flex items-start">
              <input type="checkbox" className="w-4 h-4 mt-1 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition"
            >
              Create Account
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'register' && <RegisterPage />}
    </>
  );
}