<script setup lang="ts">
import Button from '@/components/Button.vue';
import { useGenerateStore } from '@/stores/generate';

const generate = useGenerateStore();
</script>

<template>
  <div class="max-w-[1200px] mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl">🎬 Faceless Video Dashboard</h1>
      <p class="text-xl mt-2.5 text-gray-500">
        Step-by-step Vietnamese video generation from VNExpress headlines
      </p>

      <div
        class="text-white p-3.5 rounded-[10px] my-5 text-center font-bold"
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      >
        🆕 NEW: 50-Second Videos | 5 Parts × 10 Seconds | 👨 Male Voice | 💰 Point System
      </div>

      <div
        class="text-white p-3.5 rounded-[10px] my-5 text-center text-lg font-bold"
        style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      >
        💰 System Points: Loading...
      </div>
    </div>

    <!-- System Statistics -->
    <div
      class="bg-white rounded-[15px] p-5 mb-[30px]"
      style="box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1)"
    >
      <h2 class="text-center mb-5">📊 System Statistics</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px]">
        <div class="bg-[#f8f9fa] p-[15px] rounded-[8px] text-center">
          <div class="text-sm font-bold text-[#007bff]">-</div>
          <div class="text-gray-500 mt-[5px]">Headlines Crawled</div>
        </div>

        <div class="bg-[#f8f9fa] p-[15px] rounded-[8px] text-center">
          <div class="text-sm font-bold text-[#007bff]">-</div>
          <div class="text-gray-500 mt-[5px]">Articles Generated</div>
        </div>

        <div class="bg-[#f8f9fa] p-[15px] rounded-[8px] text-center">
          <div class="text-sm font-bold text-[#007bff]">-</div>
          <div class="text-gray-500 mt-[5px]">Videos Created</div>
        </div>

        <div class="bg-[#f8f9fa] p-[15px] rounded-[8px] text-center">
          <div class="text-sm font-bold text-[#007bff]">-</div>
          <div class="text-gray-500 mt-[5px]">Total Points</div>
        </div>
      </div>
    </div>

    <!-- Workflow Steps -->
    <div
      class="bg-white rounded-2xl p-[30px] mb-[30px]"
      style="box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1)"
    >
      <h2 class="text-3xl mb-5 text-gray-500 text-center">
        📋 50-Second Video Generation Workflow (5 Parts)
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mb-5">
        <!-- Step 1: Get Headline -->
        <div
          class="bg-[#f8f9fa] border-2 rounded-[10px] p-5 text-center transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer"
          :class="[
            generate.steps.headline.status === 'completed' && '!border-[#28a745] !bg-[#d4edda]',
            generate.steps.headline.status === 'error' && 'opacity-50',
            generate.stepActive === 'headline' && '!border-[#007bff]',
          ]"
        >
          <div
            class="bg-[#6c757d] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center mt-0 mb-[15px] mx-auto font-bold text-lg"
            :class="[
              generate.steps.headline.status === 'completed' && '!bg-[#28a745]',
              generate.stepActive === 'headline' && '!border-[#007bff] !bg-[#007bff]',
            ]"
          >
            1
          </div>

          <div class="text-lg font-bold mb-2.5">📰 Get Headline</div>

          <div class="text-sm text-gray-500 mb-[15px] leading-3.5">
            {{ generate.headline || 'Crawl latest headline from VNExpress' }}
          </div>

          <div class="text-sm text-[#28a745] font-bold mb-2.5">+5 Points</div>

          <Button
            @click="generate.getHeadline"
            :disabled="
              generate.steps.headline.status === 'completed' ||
              generate.stepActive !== 'headline' ||
              generate.loading
            "
            :class="generate.steps.headline.status === 'completed' && '!bg-[#28a745]'"
          >
            Get Headline
          </Button>
        </div>

        <!-- Step 2: Generate Article -->
        <div
          class="bg-[#f8f9fa] border-2 rounded-[10px] p-5 text-center transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer"
          :class="[
            generate.steps.article.status === 'completed' && '!border-[#28a745] !bg-[#d4edda]',
            generate.steps.article.status === 'error' && 'opacity-50',
            generate.stepActive === 'article' && '!border-[#007bff]',
          ]"
        >
          <div
            class="bg-[#6c757d] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center mt-0 mb-[15px] mx-auto font-bold text-lg"
            :class="[
              generate.steps.article.status === 'completed' && '!bg-[#28a745]',
              generate.stepActive === 'article' && '!border-[#007bff] !bg-[#007bff]',
            ]"
          >
            2
          </div>

          <div class="text-lg font-bold mb-2.5">📝 Generate Article</div>

          <div class="text-sm text-gray-500 mb-[15px] leading-3.5">
            Create Vietnamese article (250-300 words for 50s)
          </div>

          <div class="text-sm text-[#28a745] font-bold mb-2.5">+10 Points</div>

          <Button
            :disabled="
              generate.steps.article.status === 'completed' ||
              generate.stepActive !== 'article' ||
              generate.loading
            "
            :class="generate.steps.article.status === 'completed' && '!bg-[#28a745]'"
          >
            Generate Article
          </Button>
        </div>

        <!-- Step 3: Create Videos -->
        <div
          class="bg-[#f8f9fa] border-2 rounded-[10px] p-5 text-center transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer"
          :class="[
            generate.steps.videos.status === 'completed' && '!border-[#28a745] !bg-[#d4edda]',
            generate.steps.videos.status === 'error' && 'opacity-50',
            generate.stepActive === 'videos' && '!border-[#007bff]',
          ]"
        >
          <div
            class="bg-[#6c757d] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center mt-0 mb-[15px] mx-auto font-bold text-lg"
            :class="[
              generate.steps.videos.status === 'completed' && '!bg-[#28a745]',
              generate.stepActive === 'videos' && '!border-[#007bff] !bg-[#007bff]',
            ]"
          >
            3
          </div>
          <div class="text-lg font-bold mb-2.5">🎬 Create 5 Videos</div>

          <div class="text-sm text-gray-500 mb-[15px] leading-3.5">
            Generate 5 parts with Male Vietnamese TTS (10s each)
          </div>

          <div class="text-sm text-[#28a745] font-bold mb-2.5">+10 Points</div>

          <Button
            :disabled="
              generate.steps.videos.status === 'completed' ||
              generate.stepActive !== 'videos' ||
              generate.loading
            "
            :class="generate.steps.videos.status === 'completed' && '!bg-[#28a745]'"
          >
            Create 5 Videos
          </Button>
        </div>

        <!-- Step 4: Merge & Save -->
        <div
          class="bg-[#f8f9fa] border-2 rounded-[10px] p-5 text-center transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer"
          :class="[
            generate.steps.merge.status === 'completed' && '!border-[#28a745] !bg-[#d4edda]',
            generate.steps.merge.status === 'error' && 'opacity-50',
            generate.stepActive === 'merge' && '!border-[#007bff]',
          ]"
        >
          <div
            class="bg-[#6c757d] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center mt-0 mb-[15px] mx-auto font-bold text-lg"
            :class="[
              generate.steps.merge.status === 'completed' && '!bg-[#28a745]',
              generate.stepActive === 'merge' && '!border-[#007bff] !bg-[#007bff]',
            ]"
          >
            4
          </div>

          <div class="text-lg font-bold mb-2.5">🔗 Merge & Save</div>

          <div class="text-sm text-gray-500 mb-[15px] leading-3.5">
            Combine into 50-second final result
          </div>

          <div class="text-sm text-[#28a745] font-bold mb-2.5">+20 Points</div>

          <Button
            :disabled="
              generate.steps.merge.status === 'completed' ||
              generate.stepActive !== 'merge' ||
              generate.loading
            "
            :class="generate.steps.merge.status === 'completed' && '!bg-[#28a745]'"
          >
            Merge & Save
          </Button>
        </div>
      </div>

      <!-- Utility Buttons -->
      <div class="text-center mb-5">
        <Button variant="warning" size="small">🔄 Reset Workflow</Button>
        <Button variant="secondary" size="small">↻ Refresh Page</Button>
        <Button variant="secondary" size="small">📊 Refresh Stats</Button>
        <Button variant="secondary" size="small">
          <a href="/test-ffmpeg">🔧 Test FFmpeg</a>
        </Button>
      </div>
    </div>

    <!-- Status Messages -->
    <div id="status-container"></div>

    <!-- Results Display -->
    <div id="results-container"></div>

    <!-- Previous Videos Section -->
    <div class="mt-[40px]">
      <h2 class="text-3xl mb-5 text-gray-500 text-center">🎞️ Previous Videos (50 Seconds Each)</h2>

      <div class="text-center p-[30px] text-gray-700">
        <h3>No videos generated yet</h3>
        <p>Use the workflow above to create your first 50-second video with 5 parts!</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
        <div
          class="bg-white rounded-[10px] p-[15px]"
          style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)"
        >
          <div class="flex items-center justify-between mb-2.5">
            <div class="text-lg font-bold">ID: <span>1</span></div>
          </div>

          <div
            class="bg-[#f1f1f1] p-2.5 rounded-lg text-lg leading-1.5 min-h-[80px] overflow-auto mb-2.5"
          >
            Sample video text content...
          </div>

          <div class="flex flex-wrap gap-2.5">
            <a href="/video/1" class="btn btn-primary btn-small" target="_blank">
              ▶️ Watch Video (50s)
            </a>

            <button class="btn btn-secondary btn-small copy-btn">📋 Copy URL</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
