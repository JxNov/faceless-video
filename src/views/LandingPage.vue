<script setup lang="ts">
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Video, Bot, Newspaper, Settings, Check, X, Facebook, Twitter, Linkedin, Youtube } from 'lucide-vue-next'

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
})
</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <Video class="text-purple-600 w-7 h-7 mr-2" />
            <span class="text-xl font-bold text-gray-900">Faceless AI Gen</span>
          </div>
        </div>

        <div class="hidden md:ml-6 md:flex md:items-center md:space-x-8">
          <a href="#features" class="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">Features</a>
          <a href="#pricing" class="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">Pricing</a>
          <a href="#about" class="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">About Us</a>
          <a href="/login" class="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium">Login</a>
          <a href="/register"
            class="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700">Register</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero-gradient text-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Transform Articles into Engaging Videos</h1>
          <p class="text-xl mb-8">Automatically generate videos from news sources like VNExpress, Dantri with AI avatars
            and voiceovers.</p>
          <div class="flex space-x-4">
            <a href="/register" class="bg-white text-purple-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100">Get
              Started</a>
            <a href="#demo"
              class="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-purple-600">See
              Demo</a>
          </div>
        </div>

        <div class="md:w-1/2" data-aos="fade-left">
          <img src="http://static.photos/technology/640x360/1" alt="AI Video Generation" class="rounded-lg shadow-xl">
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to create professional videos
          automatically</p>
      </div>
      <div class="grid md:grid-cols-3 gap-10">
        <div class="bg-gray-50 p-8 rounded-lg" data-aos="fade-up">
          <div class="text-purple-600 mb-4">
            <Bot class="w-9 h-9" />
          </div>
          <h3 class="text-xl font-bold mb-3">AI Avatars</h3>
          <p class="text-gray-600">Choose from multiple realistic AI avatars to present your content professionally.</p>
        </div>
        <div class="bg-gray-50 p-8 rounded-lg" data-aos="fade-up" data-aos-delay="100">
          <div class="text-purple-600 mb-4">
            <Newspaper class="w-9 h-9" />
          </div>
          <h3 class="text-xl font-bold mb-3">Auto Article Fetching</h3>
          <p class="text-gray-600">Daily automated fetching of articles from top Vietnamese news sources.</p>
        </div>
        <div class="bg-gray-50 p-8 rounded-lg" data-aos="fade-up" data-aos-delay="200">
          <div class="text-purple-600 mb-4">
            <Settings class="w-9 h-9" />
          </div>
          <h3 class="text-xl font-bold mb-3">Automated Processing</h3>
          <p class="text-gray-600">Cron jobs automatically process new articles into videos throughout the day.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Demo Video Section -->
  <section id="demo" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">See It In Action</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Watch how our AI transforms articles into engaging videos</p>
      </div>
      <div class="bg-white p-2 rounded-lg shadow-xl max-w-4xl mx-auto" data-aos="zoom-in">
        <div class="aspect-w-16 aspect-h-9">
          <iframe class="w-full h-96" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Choose the plan that works best for your needs</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="border border-gray-200 rounded-lg p-8 pricing-card" data-aos="fade-up">
          <h3 class="text-xl font-bold mb-4">Starter</h3>
          <div class="text-4xl font-bold mb-6">Free</div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> 5 videos/month
            </li>
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> Basic avatars
            </li>
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> Standard voice
            </li>
            <li class="flex items-center">
              <X class="text-gray-400 mr-2" /> No auto-fetching
            </li>
          </ul>
          <a href="/register"
            class="block text-center bg-gray-100 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-200">Get
            Started</a>
        </div>
        <div class="border-2 border-purple-500 rounded-lg p-8 pricing-card transform scale-105" data-aos="fade-up"
          data-aos-delay="100">
          <div class="bg-purple-100 text-purple-800 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">Popular
          </div>
          <h3 class="text-xl font-bold mb-4">Pro</h3>
          <div class="text-4xl font-bold mb-6">500,000₫<span class="text-lg text-gray-600">/month</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> 50 videos/month
            </li>
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> Premium avatars
            </li>
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> Natural voice
            </li>
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> Auto-fetch 3 sources
            </li>
          </ul>
          <a href="/register"
            class="block text-center bg-purple-600 text-white py-3 rounded-md font-medium hover:bg-purple-700">Get
            Started</a>
        </div>
        <div class="border border-gray-200 rounded-lg p-8 pricing-card" data-aos="fade-up" data-aos-delay="200">
          <h3 class="text-xl font-bold mb-4">Enterprise</h3>
          <div class="text-4xl font-bold mb-6">Custom</div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> Unlimited videos
            </li>
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> Custom avatars
            </li>
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> Premium voices
            </li>
            <li class="flex items-center">
              <Check class="text-green-500 mr-2" /> Full auto-fetching
            </li>
          </ul>
          <a href="/contact"
            class="block text-center bg-gray-100 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-200">Contact
            Us</a>
        </div>
      </div>
    </div>
  </section>

  <!-- About Us Section -->
  <section id="about" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:space-x-16">
        <div class="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">About Our Company</h2>
          <p class="text-lg text-gray-600 mb-6">We're a team of AI and media experts passionate about making video
            creation accessible to everyone.</p>
          <p class="text-lg text-gray-600 mb-6">Our technology leverages cutting-edge artificial intelligence to
            transform text content into professional-quality videos automatically.</p>
          <p class="text-lg text-gray-600">Based in Vietnam, we specialize in processing Vietnamese content with high
            accuracy and natural delivery.</p>
        </div>
        <div class="md:w-1/2" data-aos="fade-left">
          <img src="http://static.photos/office/640x360/1" alt="Our Team" class="rounded-lg shadow-xl">
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-16 bg-purple-600 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold mb-6">Ready to Transform Articles into Videos?</h2>
      <p class="text-xl mb-8 max-w-3xl mx-auto">Join thousands of creators who are automating their video content
        creation.</p>
      <a href="/register"
        class="bg-white text-purple-600 px-8 py-3 rounded-md font-medium text-lg hover:bg-gray-100 inline-block">Start
        Free Trial</a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center mb-4">
            <Video class="text-purple-400 w-7 h-7 mr-2" />
            <span class="text-xl font-bold">AI VideoGen</span>
          </div>
          <p class="text-gray-400">Automated video generation from articles using AI technology.</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Product</h3>
          <ul class="space-y-2">
            <li><a href="#features" class="text-gray-400 hover:text-white">Features</a></li>
            <li><a href="#pricing" class="text-gray-400 hover:text-white">Pricing</a></li>
            <li><a href="#demo" class="text-gray-400 hover:text-white">Demo</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Company</h3>
          <ul class="space-y-2">
            <li><a href="#about" class="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="/blog" class="text-gray-400 hover:text-white">Blog</a></li>
            <li><a href="/careers" class="text-gray-400 hover:text-white">Careers</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Connect</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white">
              <Facebook />
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <Twitter />
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <Linkedin />
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <Youtube />
            </a>
          </div>
          <p class="text-gray-400 mt-4">contact@aivideogen.com</p>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        <p>© 2023 AI VideoGen. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.hero-gradient {
  background: linear-gradient(135deg, #6e8efb 0%, #a777e3 100%);
}
</style>
