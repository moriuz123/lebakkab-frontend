<template>
  <div>
    <!-- ==============================================
         1. DESKTOP FLOATING DOCK (CENTER BOTTOM)
         Modern macOS/Island style floating bar
         ============================================== -->
    <div
      class="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 items-center transition-all duration-300"
      :class="isDockMinimized ? 'translate-y-12 opacity-80 hover:translate-y-0 hover:opacity-100' : 'translate-y-0 opacity-100'"
    >
      <nav
        class="bg-[#0a2463]/95 backdrop-blur-xl border border-white/15 rounded-full px-4 py-2 shadow-[0_12px_40px_rgba(10,36,99,0.35)] flex items-center gap-1.5 lg:gap-2 text-white"
        aria-label="Floating Navigation Dock"
      >
        <!-- 1. Menu Utama -->
        <button
          type="button"
          @click="toggleMainMenu"
          class="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 group"
          :class="showMainMenu ? 'bg-[#e8a020] text-[#0a2463] shadow-md' : 'text-gray-200 hover:text-white hover:bg-white/10'"
          title="Menu Utama Portal"
        >
          <div class="p-1 rounded-full" :class="showMainMenu ? 'bg-[#0a2463]/10' : 'group-hover:scale-110 transition-transform'">
            <Icon name="lucide:menu" class="w-4 h-4" />
          </div>
          <span>Menu</span>
        </button>

        <span class="w-px h-5 bg-white/15"></span>

        <!-- 2. Interaksi -->
        <button
          type="button"
          @click="toggleInteraksi"
          class="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 group relative"
          :class="showInteraksi ? 'bg-[#e8a020] text-[#0a2463] shadow-md' : 'text-gray-200 hover:text-white hover:bg-white/10'"
          title="Interaksi & Partisipasi Publik"
        >
          <div class="p-1 rounded-full" :class="showInteraksi ? 'bg-[#0a2463]/10' : 'group-hover:scale-110 transition-transform'">
            <Icon name="lucide:sparkles" class="w-4 h-4 text-[#e8a020] group-hover:text-amber-300" :class="showInteraksi ? 'text-[#0a2463]' : ''" />
          </div>
          <span>Interaksi</span>
        </button>

        <span class="w-px h-5 bg-white/15"></span>

        <!-- 3. Beranda -->
        <router-link
          to="/"
          class="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 group"
          :class="route.path === '/' ? 'bg-white/20 text-[#e8a020]' : 'text-gray-200 hover:text-white hover:bg-white/10'"
          title="Kembali ke Beranda"
        >
          <div class="p-1 rounded-full group-hover:scale-110 transition-transform">
            <Icon name="lucide:home" class="w-4 h-4" />
          </div>
          <span>Beranda</span>
        </router-link>

        <span class="w-px h-5 bg-white/15"></span>

        <!-- 4. Statistik Pengunjung -->
        <button
          type="button"
          @click="toggleStatistik"
          class="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 group"
          :class="showStatistik ? 'bg-[#e8a020] text-[#0a2463] shadow-md' : 'text-gray-200 hover:text-white hover:bg-white/10'"
          title="Statistik Pengunjung"
        >
          <div class="p-1 rounded-full" :class="showStatistik ? 'bg-[#0a2463]/10' : 'group-hover:scale-110 transition-transform'">
            <Icon name="lucide:bar-chart-2" class="w-4 h-4 text-emerald-400" :class="showStatistik ? 'text-[#0a2463]' : ''" />
          </div>
          <span>Statistik</span>
        </button>

        <span class="w-px h-5 bg-white/15"></span>

        <!-- 5. Live Streaming -->
        <button
          type="button"
          @click="toggleLiveModal"
          class="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 group relative"
          :class="showLiveModal ? 'bg-red-600 text-white shadow-md' : 'text-gray-200 hover:text-white hover:bg-white/10'"
          title="Live Streaming Diskominfosp"
        >
          <div class="relative p-1 rounded-full group-hover:scale-110 transition-transform">
            <Icon name="lucide:youtube" class="w-4 h-4 text-red-400 group-hover:text-red-300" :class="showLiveModal ? 'text-white' : ''" />
            <span v-if="ytData.is_live" class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <span>Live</span>
          <span v-if="ytData.is_live" class="px-1.5 py-0.2 bg-red-600 text-white text-[9px] rounded-full uppercase tracking-widest animate-pulse font-extrabold">On</span>
        </button>

        <span class="w-px h-5 bg-white/15"></span>

        <!-- 6. CCTV -->
        <button
          type="button"
          @click="handleCctvClick"
          class="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 group relative"
          :class="route.path === '/cctv' ? 'bg-blue-600/60 text-white' : 'text-gray-200 hover:text-white hover:bg-white/10'"
          :title="cctvTitle"
        >
          <div class="relative p-1 rounded-full group-hover:scale-110 transition-transform">
            <Icon name="lucide:cctv" class="w-4 h-4 text-cyan-400" />
            <span
              v-if="cctvStatus === 'active'"
              class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full"
            ></span>
            <span
              v-else-if="cctvStatus === 'maintenance'"
              class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full"
            ></span>
          </div>
          <span>CCTV</span>
        </button>

        <span class="w-px h-5 bg-white/15"></span>

        <!-- 7. Call Center Darurat 112 -->
        <button
          type="button"
          @click="handleCall112"
          class="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-xs font-black bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md hover:shadow-lg transition-all duration-200 group hover:scale-105"
          title="Layanan Panggilan Darurat 112 (Bebas Pulsa)"
        >
          <div class="bg-white/20 p-1 rounded-full animate-pulse">
            <Icon name="lucide:phone-call" class="w-3.5 h-3.5 text-white" />
          </div>
          <span>112 Darurat</span>
        </button>

        <!-- Minimize/Expand Button -->
        <button
          type="button"
          @click="isDockMinimized = !isDockMinimized"
          class="ml-1 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          :title="isDockMinimized ? 'Tampilkan Dock' : 'Sembunyikan Dock'"
        >
          <Icon :name="isDockMinimized ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="w-3.5 h-3.5" />
        </button>
      </nav>
    </div>


    <!-- ==============================================
         2. MOBILE FLOATING BOTTOM BAR
         Fixed bottom bar with all 7 requested features
         ============================================== -->
    <div
      class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a2463]/98 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 shadow-[0_-4px_25px_rgba(0,0,0,0.35)] flex items-center justify-around"
      style="padding-bottom: max(0.5rem, env(safe-area-inset-bottom));"
    >
      <!-- 1. Menu -->
      <button
        type="button"
        @click="toggleMainMenu"
        class="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-90"
        :class="showMainMenu ? 'text-[#e8a020]' : 'text-gray-300 hover:text-white'"
      >
        <Icon name="lucide:menu" class="w-5 h-5 mb-0.5" />
        <span class="text-[10px] font-bold tracking-tight leading-none">Menu</span>
      </button>

      <!-- 2. Interaksi -->
      <button
        type="button"
        @click="toggleInteraksi"
        class="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-90"
        :class="showInteraksi ? 'text-[#e8a020]' : 'text-gray-300 hover:text-white'"
      >
        <Icon name="lucide:sparkles" class="w-5 h-5 mb-0.5 text-[#e8a020]" />
        <span class="text-[10px] font-bold tracking-tight leading-none">Interaksi</span>
      </button>

      <!-- 3. Beranda -->
      <router-link
        to="/"
        class="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-90"
        :class="route.path === '/' ? 'text-[#e8a020]' : 'text-gray-300 hover:text-white'"
      >
        <Icon name="lucide:home" class="w-5 h-5 mb-0.5" />
        <span class="text-[10px] font-bold tracking-tight leading-none">Beranda</span>
      </router-link>

      <!-- 4. Statistik -->
      <button
        type="button"
        @click="toggleStatistik"
        class="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-90"
        :class="showStatistik ? 'text-[#e8a020]' : 'text-gray-300 hover:text-white'"
      >
        <Icon name="lucide:bar-chart-2" class="w-5 h-5 mb-0.5 text-emerald-400" />
        <span class="text-[10px] font-bold tracking-tight leading-none">Statistik</span>
      </button>

      <!-- 5. Live -->
      <button
        type="button"
        @click="toggleLiveModal"
        class="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-90 relative"
        :class="showLiveModal ? 'text-red-400' : 'text-gray-300 hover:text-white'"
      >
        <div class="relative">
          <Icon name="lucide:youtube" class="w-5 h-5 mb-0.5 text-red-500" />
          <span v-if="ytData.is_live" class="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping"></span>
        </div>
        <span class="text-[10px] font-bold tracking-tight leading-none">Live</span>
      </button>

      <!-- 6. CCTV -->
      <button
        type="button"
        @click="handleCctvClick"
        class="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-90 relative"
        :class="route.path === '/cctv' ? 'text-cyan-300' : 'text-gray-300 hover:text-white'"
      >
        <div class="relative">
          <Icon name="lucide:cctv" class="w-5 h-5 mb-0.5 text-cyan-400" />
          <span
            v-if="cctvStatus === 'active'"
            class="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full"
          ></span>
        </div>
        <span class="text-[10px] font-bold tracking-tight leading-none">CCTV</span>
      </button>

      <!-- 7. Call Center Darurat 112 (Red Highlight) -->
      <a
        href="tel:112"
        class="flex flex-col items-center justify-center flex-1 py-1 bg-red-600 text-white rounded-xl focus:outline-none transition-transform active:scale-95 shadow-md mx-1"
        title="Panggil 112"
      >
        <Icon name="lucide:phone-call" class="w-4 h-4 mb-0.5 animate-pulse" />
        <span class="text-[10px] font-black tracking-tight leading-none">112</span>
      </a>
    </div>


    <!-- ==============================================
         DRAWER 1: MENU UTAMA (HIERARCHICAL / SEARCHABLE)
         ============================================== -->
    <Transition name="slide-left">
      <div v-if="showMainMenu" class="fixed inset-0 z-50 flex">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showMainMenu = false"></div>

        <!-- Drawer Content -->
        <div class="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
          <!-- Header -->
          <div class="p-5 bg-[#0a2463] text-white flex items-center justify-between shadow-md">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/15 p-1.5 flex items-center justify-center">
                <Icon name="lucide:menu" class="w-6 h-6 text-[#e8a020]" />
              </div>
              <div>
                <h3 class="font-black text-lg leading-tight">Menu Utama</h3>
                <p class="text-xs text-blue-200">Navigasi resmi Portal Kabupaten Lebak</p>
              </div>
            </div>
            <button
              @click="showMainMenu = false"
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Tutup Menu"
            >
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>

          <!-- Search Filter in Menu -->
          <div class="p-4 bg-gray-50 border-b border-gray-100">
            <div class="relative">
              <Icon name="lucide:search" class="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                v-model="menuSearchQuery"
                type="text"
                placeholder="Cari menu atau layanan..."
                class="w-full pl-10 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5ca8] text-gray-800"
              />
              <button
                v-if="menuSearchQuery"
                @click="menuSearchQuery = ''"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon name="lucide:x" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Menu List Body -->
          <div class="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            <!-- Loading -->
            <div v-if="loadingMenu" class="space-y-3 py-4">
              <div v-for="i in 5" :key="i" class="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
            </div>

            <!-- Empty Search Results -->
            <div v-else-if="filteredMenuList.length === 0" class="text-center py-12 text-gray-500">
              <Icon name="lucide:search-x" class="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p class="text-sm font-semibold">Menu tidak ditemukan</p>
            </div>

            <!-- Hierarchical Menu Items -->
            <div v-else v-for="item in filteredMenuList" :key="item.id" class="rounded-xl border border-gray-100 overflow-hidden bg-white shadow-2xs">
              <!-- Item with Children -->
              <div v-if="item.children && item.children.length > 0">
                <button
                  type="button"
                  @click="toggleSubmenu(item.id)"
                  class="w-full flex items-center justify-between p-3.5 text-left font-bold text-gray-800 hover:bg-blue-50/60 transition-colors"
                >
                  <span class="flex items-center gap-2.5">
                    <span class="w-2 h-2 rounded-full bg-[#1e5ca8]"></span>
                    {{ item.title }}
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="w-4 h-4 text-gray-400 transition-transform duration-200"
                    :class="openSubmenus[item.id] ? 'rotate-180 text-[#1e5ca8]' : ''"
                  />
                </button>
                <!-- Child List -->
                <div v-show="openSubmenus[item.id]" class="bg-gray-50/80 px-4 py-2 border-t border-gray-100 space-y-1">
                  <div v-for="child in item.children" :key="child.id">
                    <a
                      v-if="child.link_type === 'eksternal' || (child.url && child.url.startsWith('http'))"
                      :href="resolveMenuUrl(child)"
                      target="_blank"
                      rel="noopener noreferrer"
                      @click="showMainMenu = false"
                      class="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium text-gray-600 hover:text-[#1e5ca8] hover:bg-white transition-colors"
                    >
                      <span>{{ child.title }}</span>
                      <Icon name="lucide:external-link" class="w-3.5 h-3.5 text-gray-400" />
                    </a>
                    <router-link
                      v-else
                      :to="resolveMenuUrl(child)"
                      @click="showMainMenu = false"
                      class="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium text-gray-600 hover:text-[#1e5ca8] hover:bg-white transition-colors"
                    >
                      <span>{{ child.title }}</span>
                      <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 text-gray-400" />
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Item Single (No Children) -->
              <div v-else>
                <a
                  v-if="item.link_type === 'eksternal' || (item.url && item.url.startsWith('http'))"
                  :href="resolveMenuUrl(item)"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="showMainMenu = false"
                  class="flex items-center justify-between p-3.5 font-bold text-gray-800 hover:bg-blue-50/60 hover:text-[#1e5ca8] transition-colors"
                >
                  <span class="flex items-center gap-2.5">
                    <span class="w-2 h-2 rounded-full bg-[#e8a020]"></span>
                    {{ item.title }}
                  </span>
                  <Icon name="lucide:external-link" class="w-4 h-4 text-gray-400" />
                </a>
                <router-link
                  v-else
                  :to="resolveMenuUrl(item)"
                  @click="showMainMenu = false"
                  class="flex items-center justify-between p-3.5 font-bold text-gray-800 hover:bg-blue-50/60 hover:text-[#1e5ca8] transition-colors"
                >
                  <span class="flex items-center gap-2.5">
                    <span class="w-2 h-2 rounded-full bg-[#e8a020]"></span>
                    {{ item.title }}
                  </span>
                  <Icon name="lucide:arrow-right" class="w-4 h-4 text-gray-400" />
                </router-link>
              </div>
            </div>
          </div>

          <!-- Quick Portal Links Footer in Menu Drawer -->
          <div class="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2 text-xs">
            <router-link to="/berita" @click="showMainMenu = false" class="px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#1e5ca8]">Berita</router-link>
            <router-link to="/pengumuman" @click="showMainMenu = false" class="px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#1e5ca8]">Pengumuman</router-link>
            <router-link to="/agenda" @click="showMainMenu = false" class="px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#1e5ca8]">Agenda</router-link>
            <router-link to="/dokumen" @click="showMainMenu = false" class="px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#1e5ca8]">Dokumen</router-link>
          </div>
        </div>
      </div>
    </Transition>


    <!-- ==============================================
         DRAWER 2: INTERAKSI PUBLIK
         ============================================== -->
    <Transition name="slide-left">
      <div v-if="showInteraksi" class="fixed inset-0 z-50 flex">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showInteraksi = false"></div>

        <!-- Drawer Content -->
        <div class="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
          <!-- Header -->
          <div class="p-5 bg-gradient-to-r from-[#e8a020] to-amber-500 text-[#0a2463] flex items-center justify-between shadow-md">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#0a2463] text-[#e8a020] flex items-center justify-center shadow-inner">
                <Icon name="lucide:sparkles" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-black text-lg leading-tight">Interaksi Publik</h3>
                <p class="text-xs text-[#0a2463]/80 font-semibold">Layanan interaktif dan aspirasi warga</p>
              </div>
            </div>
            <button
              @click="showInteraksi = false"
              class="w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-[#0a2463] flex items-center justify-center transition-colors"
              title="Tutup"
            >
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>

          <!-- Items -->
          <div class="p-5 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            <!-- 1. Survei Kepuasan -->
            <button
              type="button"
              @click="triggerSurvey"
              class="w-full flex items-center gap-3.5 p-3.5 bg-gray-50 hover:bg-blue-50 text-gray-800 hover:text-[#1e5ca8] rounded-2xl border border-gray-100 transition-all group text-left"
            >
              <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#1e5ca8] group-hover:bg-[#1e5ca8] group-hover:text-white transition-colors">
                <Icon name="lucide:clipboard-check" class="w-5 h-5" />
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm">Survei Kepuasan (IKM)</h4>
                <p class="text-xs text-gray-500">Berikan penilaian terhadap layanan portal</p>
              </div>
              <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <!-- 2. Polling / Jajak Pendapat -->
            <button
              type="button"
              @click="triggerPolling"
              class="w-full flex items-center gap-3.5 p-3.5 bg-gray-50 hover:bg-amber-50 text-gray-800 hover:text-amber-800 rounded-2xl border border-gray-100 transition-all group text-left"
            >
              <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#e8a020] group-hover:bg-[#e8a020] group-hover:text-[#0a2463] transition-colors">
                <Icon name="lucide:bar-chart" class="w-5 h-5" />
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm">Jajak Pendapat / Polling</h4>
                <p class="text-xs text-gray-500">Ikuti jajak pendapat topik daerah terkini</p>
              </div>
              <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <!-- 3. Kanal Aduan -->
            <button
              type="button"
              @click="triggerAduan"
              class="w-full flex items-center gap-3.5 p-3.5 bg-gray-50 hover:bg-rose-50 text-gray-800 hover:text-rose-800 rounded-2xl border border-gray-100 transition-all group text-left"
            >
              <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Icon name="lucide:message-circle" class="w-5 h-5" />
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm">Kanal Pengaduan</h4>
                <p class="text-xs text-gray-500">SP4N Lapor, WBS, dan WhatsApp</p>
              </div>
              <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <!-- 4. Aksesibilitas Disabilitas -->
            <button
              type="button"
              @click="triggerDisabilitas"
              class="w-full flex items-center gap-3.5 p-3.5 bg-gray-50 hover:bg-purple-50 text-gray-800 hover:text-purple-800 rounded-2xl border border-gray-100 transition-all group text-left"
            >
              <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Icon name="lucide:accessibility" class="w-5 h-5" />
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm">Aksesibilitas / Disabilitas</h4>
                <p class="text-xs text-gray-500">Audio reader, ukuran teks, dan kontras</p>
              </div>
              <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <!-- 5. Kritik & Saran -->
            <router-link
              to="/kritik-saran"
              @click="showInteraksi = false"
              class="w-full flex items-center gap-3.5 p-3.5 bg-gray-50 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 rounded-2xl border border-gray-100 transition-all group text-left"
            >
              <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Icon name="lucide:pencil" class="w-5 h-5" />
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-sm">Kritik & Saran</h4>
                <p class="text-xs text-gray-500">Kirimkan masukan pembangunan Lebak</p>
              </div>
              <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </router-link>
          </div>
        </div>
      </div>
    </Transition>


    <!-- ==============================================
         DRAWER 3: STATISTIK PENGUNJUNG
         ============================================== -->
    <Transition name="slide-left">
      <div v-if="showStatistik" class="fixed inset-0 z-50 flex">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showStatistik = false"></div>

        <!-- Drawer Content -->
        <div class="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
          <!-- Header -->
          <div class="p-5 bg-gradient-to-r from-[#0a2463] to-emerald-700 text-white flex items-center justify-between shadow-md">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-[#e8a020]">
                <Icon name="lucide:bar-chart-2" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-black text-lg leading-tight">Statistik Pengunjung</h3>
                <p class="text-xs text-emerald-200">Data trafik real-time portal</p>
              </div>
            </div>
            <button
              @click="showStatistik = false"
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Tutup"
            >
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>

          <!-- Content Body -->
          <div class="p-5 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
            <!-- Total Banner -->
            <div class="bg-gradient-to-br from-[#0a2463] via-[#103b9b] to-emerald-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
              <Icon name="lucide:users" class="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 pointer-events-none" />
              <div class="relative z-10">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-300">Total Kunjungan</span>
                <h2 class="text-3xl font-black mt-1 mb-1 tracking-tight">{{ stats.total.toLocaleString('id-ID') }}</h2>
                <p class="text-[11px] text-blue-100 opacity-90">Total akumulasi visitor resmi portal</p>
              </div>
            </div>

            <!-- Detail Cards -->
            <div class="space-y-3">
              <!-- Hari Ini -->
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-100 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-blue-50 text-[#1e5ca8] flex items-center justify-center">
                    <Icon name="lucide:calendar" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-xs text-gray-500 font-semibold block">Hari Ini</span>
                    <span class="text-xs text-gray-400">Pengunjung aktif</span>
                  </div>
                </div>
                <span class="text-lg font-black text-gray-900 bg-white px-3 py-1 rounded-xl shadow-xs border border-gray-100">
                  {{ stats.today.toLocaleString('id-ID') }}
                </span>
              </div>

              <!-- Bulan Ini -->
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-emerald-100 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Icon name="lucide:calendar-range" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-xs text-gray-500 font-semibold block">Bulan Ini</span>
                    <span class="text-xs text-gray-400">Bulan berjalan</span>
                  </div>
                </div>
                <span class="text-lg font-black text-gray-900 bg-white px-3 py-1 rounded-xl shadow-xs border border-gray-100">
                  {{ stats.thisMonth.toLocaleString('id-ID') }}
                </span>
              </div>

              <!-- Tahun Ini -->
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-amber-100 transition-colors">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-amber-50 text-[#e8a020] flex items-center justify-center">
                    <Icon name="lucide:calendar-days" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-xs text-gray-500 font-semibold block">Tahun Ini</span>
                    <span class="text-xs text-gray-400">Tahun kalender</span>
                  </div>
                </div>
                <span class="text-lg font-black text-gray-900 bg-white px-3 py-1 rounded-xl shadow-xs border border-gray-100">
                  {{ stats.thisYear.toLocaleString('id-ID') }}
                </span>
              </div>
            </div>

            <!-- Refresh Button -->
            <button
              type="button"
              @click="fetchVisitorStats"
              class="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors"
            >
              <Icon name="lucide:refresh-cw" class="w-3.5 h-3.5" />
              Perbarui Data
            </button>
          </div>
        </div>
      </div>
    </Transition>


    <!-- ==============================================
         MODAL: LIVE STREAMING
         ============================================== -->
    <div
      v-if="showLiveModal"
      class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity"
    >
      <div class="bg-gray-950 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-800 flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900 text-white">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center" :class="ytData.is_live ? 'animate-pulse' : ''">
              <Icon name="lucide:youtube" class="w-5 h-5" />
            </div>
            <div>
              <h2 class="text-base font-bold leading-tight">Live Streaming Diskominfosp</h2>
              <div class="flex items-center gap-2 mt-0.5">
                <span v-if="ytData.is_live" class="inline-flex items-center gap-1 text-[10px] font-black text-red-400 uppercase tracking-wider">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                  Sedang Siaran Langsung
                </span>
                <span v-else class="text-[10px] text-gray-400">Siaran Terakhir / Arsip Siaran</span>
              </div>
            </div>
          </div>
          <button @click="showLiveModal = false" class="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Video Container -->
        <div class="relative w-full aspect-video bg-black flex items-center justify-center">
          <iframe 
            class="absolute top-0 left-0 w-full h-full"
            :src="ytData.is_live ? ytData.live_url : ytData.offline_url" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>


    <!-- ==============================================
         MODAL: CALL CENTER DARURAT 112 (DESKTOP PROMPT)
         ============================================== -->
    <div
      v-if="show112Modal"
      class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden border border-red-100">
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-rose-500"></div>
        <button @click="show112Modal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>

        <div class="flex items-center gap-3 mb-4 mt-1">
          <div class="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
            <Icon name="lucide:phone-call" class="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span class="text-xs font-black uppercase tracking-wider text-red-600">Layanan Gawat Darurat</span>
            <h3 class="text-xl font-black text-gray-900 leading-tight">Call Center 112 Lebak</h3>
          </div>
        </div>

        <p class="text-sm text-gray-600 leading-relaxed mb-6">
          Layanan darurat bebas pulsa 24 jam Pemerintah Kabupaten Lebak untuk penanganan bencana alam, ambulans/medis gawat darurat, kebakaran, dan gangguan keamanan.
        </p>

        <div class="space-y-3">
          <a
            href="tel:112"
            class="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black rounded-xl shadow-lg transition-transform hover:scale-[1.02] text-base"
          >
            <Icon name="lucide:phone" class="w-5 h-5" />
            Panggil 112 Sekarang (Bebas Pulsa)
          </a>
          <button
            type="button"
            @click="show112Modal = false"
            class="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>


    <!-- ==============================================
         SUB-MODALS (ADUAN, POLLING, AKSESIBILITAS, SPBE)
         ============================================== -->
    <!-- Modal Aduan -->
    <div
      v-if="showAduan"
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden p-6 border border-gray-100">
        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <button
          @click="showAduan = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
        >
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
        
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-blue-100 p-2.5 rounded-xl text-blue-600">
            <Icon name="lucide:message-circle" class="w-6 h-6" />
          </div>
          <h2 class="text-xl font-bold text-gray-800">Kanal Aduan Resmi</h2>
        </div>
        
        <div class="flex flex-col gap-3">
          <a
            href="https://www.lapor.go.id/instansi/pemerintah-kabupaten-lebak"
            target="_blank"
            class="flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 p-4 rounded-xl text-gray-700 hover:text-blue-700 font-semibold transition-all group"
          >
            <span>SP4N Lapor</span>
            <Icon name="lucide:external-link" class="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
          </a>
          <a 
            href="https://wbs.lebakkab.go.id/" 
            target="_blank" 
            class="flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 p-4 rounded-xl text-gray-700 hover:text-blue-700 font-semibold transition-all group"
          >
            <span>WBS Inspektorat</span>
            <Icon name="lucide:external-link" class="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
          </a>
          <a 
            href="https://wa.me/6281944114581" 
            target="_blank" 
            class="flex items-center justify-between bg-gray-50 hover:bg-[#f8f9fc] border border-gray-100 hover:border-[#1e5ca8] p-4 rounded-xl text-gray-700 hover:text-[#e8a020] font-semibold transition-all group"
          >
            <div class="flex items-center gap-2">
              <span class="text-[#e8a020] font-bold">Bot WhatsApp Pengaduan</span>
            </div>
            <Icon name="lucide:external-link" class="w-4 h-4 text-gray-400 group-hover:text-[#e8a020]" />
          </a>
        </div>
      </div>
    </div>

    <!-- Modal Polling -->
    <div
      v-if="showPolling"
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full relative overflow-hidden p-6 border border-gray-100">
        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
        <button
          @click="showPolling = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
        >
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
        
        <div class="flex items-center gap-3 mb-6">
          <div class="bg-orange-100 p-2.5 rounded-xl text-orange-600">
            <Icon name="lucide:bar-chart" class="w-6 h-6" />
          </div>
          <h2 class="text-xl font-bold text-gray-800">Jajak Pendapat Publik</h2>
        </div>

        <div v-if="polling.length" class="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <div v-for="p in polling" :key="p.id" class="mb-6 bg-gray-50 p-5 rounded-xl border border-gray-100">
            <p class="font-bold text-gray-800 mb-4 leading-relaxed">{{ p.pertanyaan }}</p>
            <div class="space-y-3">
              <label 
                v-for="j in p.jawaban" 
                :key="j.id" 
                class="flex items-center p-3 rounded-lg border cursor-pointer transition-all"
                :class="selectedPollingOption === j.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-orange-300'"
              >
                <div class="relative flex items-center justify-center w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0" :class="selectedPollingOption === j.id ? 'border-orange-500' : 'border-gray-300'">
                  <div v-if="selectedPollingOption === j.id" class="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                </div>
                <input type="radio" :value="j.id" v-model="selectedPollingOption" class="hidden" />
                <span class="text-gray-700 font-medium text-sm" :class="selectedPollingOption === j.id ? 'text-orange-700 font-bold' : ''">{{ j.pilihan }}</span>
              </label>
            </div>
          </div>
          
          <button
            @click="submitPolling"
            class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 mt-2"
          >
            <span>Kirim Suara Polling</span>
            <Icon name="lucide:send" class="w-4 h-4" />
          </button>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-10 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Icon name="lucide:bar-chart" class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">Belum Ada Polling</h3>
          <p class="text-gray-500 text-sm">Saat ini tidak ada jajak pendapat yang aktif.</p>
        </div>
      </div>
    </div>

    <!-- Sidebar Aksesibilitas -->
    <div v-if="showDisabilitas" class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-end z-50">
      <div class="bg-white w-[350px] h-full shadow-[-10px_0_30px_rgba(0,0,0,0.1)] relative flex flex-col">
        <div class="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <div class="flex items-center gap-3">
            <div class="bg-purple-100 p-2.5 rounded-xl text-purple-600">
              <Icon name="lucide:accessibility" class="w-6 h-6" />
            </div>
            <h2 class="text-lg font-bold text-gray-800">Aksesibilitas</h2>
          </div>
          <button
            @click="showDisabilitas = false"
            class="text-gray-400 hover:text-gray-700 bg-white shadow-sm border border-gray-100 hover:bg-gray-50 rounded-full p-2 transition-colors"
          >
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>

        <div class="p-6 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
          <!-- Mode Suara -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Audio Pembaca</h3>
            <button 
              @click="toggleVoiceMode" 
              class="w-full flex items-center justify-between p-4 rounded-xl border transition-all shadow-sm"
              :class="isVoiceActive ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-purple-100' : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700'"
            >
              <div class="flex items-center gap-3">
                <Icon name="lucide:volume2" class="w-5 h-5" :class="isVoiceActive ? 'text-purple-600' : 'text-gray-400'" />
                <span class="font-semibold text-sm">{{ isVoiceActive ? 'Mode Suara Aktif' : 'Aktifkan Pembaca' }}</span>
              </div>
              <div class="w-10 h-6 rounded-full relative transition-colors" :class="isVoiceActive ? 'bg-purple-500' : 'bg-gray-200'">
                <div class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform" :class="isVoiceActive ? 'translate-x-4' : ''"></div>
              </div>
            </button>
          </div>

          <!-- Tipografi -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Tipografi</h3>
            <div class="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-100 shadow-sm">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-700 flex items-center gap-2"><Icon name="lucide:type" class="w-4 h-4 text-gray-400"/> Ukuran Teks</span>
                <div class="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <button @click="decreaseFont" class="px-3 py-1.5 hover:bg-gray-100 text-gray-600 border-r border-gray-200 hover:text-purple-600">-</button>
                  <span class="px-3 py-1.5 text-sm font-bold text-gray-800 min-w-[3.5rem] text-center">{{ fontSize }}%</span>
                  <button @click="increaseFont" class="px-3 py-1.5 hover:bg-gray-100 text-gray-600 border-l border-gray-200 hover:text-purple-600">+</button>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-700 flex items-center gap-2"><Icon name="lucide:arrow-up-down" class="w-4 h-4 text-gray-400"/> Tinggi Baris</span>
                <div class="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <button @click="decreaseLineHeight" class="px-3 py-1.5 hover:bg-gray-100 text-gray-600 border-r border-gray-200 hover:text-purple-600">-</button>
                  <span class="px-3 py-1.5 text-sm font-bold text-gray-800 min-w-[3.5rem] text-center">{{ lineHeight.toFixed(1) }}</span>
                  <button @click="increaseLineHeight" class="px-3 py-1.5 hover:bg-gray-100 text-gray-600 border-l border-gray-200 hover:text-purple-600">+</button>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
              <span class="text-sm font-semibold text-gray-700 mb-3 block">Spasi Huruf</span>
              <div class="grid grid-cols-3 gap-2">
                <button @click="setLetterSpacing('0px')" class="py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm">Biasa</button>
                <button @click="setLetterSpacing('2px')" class="py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm tracking-wide">Sedang</button>
                <button @click="setLetterSpacing('4px')" class="py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm tracking-widest">Lebar</button>
              </div>
            </div>
          </div>

          <!-- Tampilan Visual -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Tampilan Visual</h3>
            <div class="grid grid-cols-2 gap-3">
              <button @click="toggleBold" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <Icon name="lucide:bold" class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700">Tebalkan Teks</span>
              </button>
              <button @click="toggleHighlightLinks" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <Icon name="lucide:link" class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700">Sorot Tautan</span>
              </button>
              <button @click="toggleMonochrome" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <Icon name="lucide:monitor-play" class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700">Monokrom</span>
              </button>
              <button @click="toggleHighContrast" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <Icon name="lucide:sun" class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700">Kontras Tinggi</span>
              </button>
              <button @click="toggleBigCursor" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <Icon name="lucide:mouse-pointer2" class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700 text-center">Kursor Besar</span>
              </button>
              <button @click="toggleReduceMotion" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <Icon name="lucide:video-off" class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700 text-center">Hentikan Animasi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SPBE Native Survey Modal -->
    <SpbeSurveyModal v-model="showSurvey" />

    <!-- Custom Alert Notification Popup -->
    <div 
      class="fixed top-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out flex items-center justify-center pointer-events-none"
      :class="customAlert.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
    >
      <div v-if="customAlert.show" class="bg-white shadow-2xl rounded-2xl p-4 flex items-center gap-4 min-w-[320px] max-w-md pointer-events-auto border-l-4" :class="customAlert.type === 'success' ? 'border-[#1e5ca8]' : (customAlert.type === 'error' ? 'border-red-500' : 'border-orange-500')">
        <div class="rounded-full p-2 flex-shrink-0" :class="customAlert.type === 'success' ? 'bg-blue-100 text-[#1e5ca8]' : (customAlert.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600')">
          <Icon name="lucide:check-circle2" v-if="customAlert.type === 'success'" class="w-6 h-6" />
          <Icon name="lucide:x-circle" v-if="customAlert.type === 'error'" class="w-6 h-6" />
          <Icon name="lucide:alert-circle" v-if="customAlert.type === 'warning'" class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-gray-800 text-sm">{{ customAlert.title }}</h4>
          <p class="text-gray-600 text-xs mt-0.5">{{ customAlert.message }}</p>
        </div>
        <button @click="customAlert.show = false" class="text-gray-400 hover:text-gray-700 transition-colors p-1">
          <Icon name="lucide:x" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/utils/api'
import { useSettingsStore } from '@/stores/settings'
import SpbeSurveyModal from '@/components/SpbeSurveyModal.vue'

const route = useRoute()
const router = useRouter()
const settingsStore = useSettingsStore()

// State visibility drawers/modals
const showMainMenu = ref(false)
const showInteraksi = ref(false)
const showStatistik = ref(false)
const showLiveModal = ref(false)
const show112Modal = ref(false)
const isDockMinimized = ref(false)

// Submodals
const showAduan = ref(false)
const showPolling = ref(false)
const showSurvey = ref(false)
const showDisabilitas = ref(false)
const isVoiceActive = ref(false)

// Menu utama state
const mainMenuList = ref([])
const loadingMenu = ref(false)
const menuSearchQuery = ref('')
const openSubmenus = ref({})

// YouTube Live data
const ytData = ref({
  is_live: false,
  live_url: '',
  offline_url: ''
})

// Visitor stats
const stats = ref({
  today: 0,
  thisMonth: 0,
  thisYear: 0,
  total: 0
})

// CCTV properties from settingsStore
const cctvStatus = computed(() => settingsStore.cctvStatus || 'coming_soon')
const cctvUrl = computed(() => settingsStore.cctvUrl || '')
const cctvTitle = computed(() => {
  if (cctvStatus.value === 'active') return 'Buka Pantauan CCTV (Aktif)'
  if (cctvStatus.value === 'maintenance') return 'CCTV (Mode Pemeliharaan)'
  return 'CCTV (Segera Hadir)'
})

// Polling data
const polling = ref([])
const selectedPollingOption = ref(null)

// Accessibility state
const fontSize = ref(100)
const lineHeight = ref(1)

// Custom alert popup
const customAlert = ref({
  show: false,
  title: '',
  message: '',
  type: 'success'
})

const showAlert = (title, message, type = 'success') => {
  customAlert.value = { show: true, title, message, type }
  setTimeout(() => {
    customAlert.value.show = false
  }, 3500)
}

// ==== TOGGLE METHODS ====
const toggleMainMenu = () => {
  showMainMenu.value = !showMainMenu.value
  if (showMainMenu.value) {
    showInteraksi.value = false
    showStatistik.value = false
    if (mainMenuList.value.length === 0) {
      fetchMainMenu()
    }
  }
}

const toggleInteraksi = () => {
  showInteraksi.value = !showInteraksi.value
  if (showInteraksi.value) {
    showMainMenu.value = false
    showStatistik.value = false
  }
}

const toggleStatistik = () => {
  showStatistik.value = !showStatistik.value
  if (showStatistik.value) {
    showMainMenu.value = false
    showInteraksi.value = false
    fetchVisitorStats()
  }
}

const toggleLiveModal = () => {
  showLiveModal.value = !showLiveModal.value
  if (showLiveModal.value) {
    fetchYoutubeStatus()
  }
}

// CCTV CTA action
const handleCctvClick = () => {
  const status = cctvStatus.value
  const url = cctvUrl.value

  if (status === 'active' && url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
  }
  // Otherwise route to /cctv where dynamic states (coming_soon, maintenance, active) are handled
  router.push('/cctv')
}

// Call 112 action
const handleCall112 = () => {
  show112Modal.value = true
}

// Subaction triggers
const triggerSurvey = () => {
  showInteraksi.value = false
  showSurvey.value = true
}

const triggerPolling = () => {
  showInteraksi.value = false
  showPolling.value = true
  fetchPolling()
}

const triggerAduan = () => {
  showInteraksi.value = false
  showAduan.value = true
}

const triggerDisabilitas = () => {
  showInteraksi.value = false
  showDisabilitas.value = true
}

// Fetch Main Menu
const fetchMainMenu = async () => {
  loadingMenu.value = true
  try {
    const res = await axios.get('/api/menus/main')
    if (res.data?.status === 'success') {
      mainMenuList.value = res.data.data || []
    }
  } catch (err) {
    console.error('Gagal mengambil menu utama:', err)
  } finally {
    loadingMenu.value = false
  }
}

const toggleSubmenu = (id) => {
  openSubmenus.value[id] = !openSubmenus.value[id]
}

const resolveMenuUrl = (item) => {
  if (item.url) return item.url
  switch (item.link_type) {
    case 'home':
      return '/'
    case 'halaman_statis':
      return `/page/${item.slug || item.link_ref}`
    case 'kategori_berita':
      return `/berita/kategori/${item.slug || item.link_ref}`
    case 'kategori_dokumen':
      return `/dokumen/kategori/${item.slug || item.link_ref}`
    case 'pejabat':
      return `/profil-pejabat/${item.link_ref}`
    case 'modul':
      if (item.link_ref === 'profil-daerah') return '/profil-kabupaten'
      if (item.link_ref === 'pejabat') return '/profil-pejabat'
      return `/${item.link_ref}`
    case 'eksternal':
      return item.url || '#'
    default:
      return '#'
  }
}

// Filtered menu search
const filteredMenuList = computed(() => {
  if (!menuSearchQuery.value) return mainMenuList.value
  const q = menuSearchQuery.value.toLowerCase()

  return mainMenuList.value.filter((item) => {
    const titleMatch = (item.title || '').toLowerCase().includes(q)
    const childMatch = item.children && item.children.some((c) => (c.title || '').toLowerCase().includes(q))
    return titleMatch || childMatch
  })
})

// Fetch Visitor Stats
const fetchVisitorStats = async () => {
  try {
    const res = await axios.get('/api/visitor-stats')
    if (res.data?.status === 'success' && res.data?.data) {
      stats.value = {
        today: res.data.data.today || 0,
        thisMonth: res.data.data.thisMonth || 0,
        thisYear: res.data.data.thisYear || 0,
        total: res.data.data.total || 0
      }
    }
  } catch (err) {
    console.error('Failed to fetch visitor stats:', err)
  }
}

// Fetch YouTube Live
const fetchYoutubeStatus = async () => {
  try {
    const res = await axios.get('/api/youtube-live')
    ytData.value = res.data || {}
  } catch (err) {
    console.error('Failed to fetch youtube status:', err)
  }
}

// Fetch Polling
const fetchPolling = async () => {
  try {
    const res = await axios.get('/api/polling')
    polling.value = res.data || []
  } catch (err) {
    console.error('Gagal ambil polling:', err)
  }
}

const submitPolling = async () => {
  if (!selectedPollingOption.value) {
    showAlert('Perhatian', 'Silakan pilih salah satu opsi polling terlebih dahulu!', 'warning')
    return
  }
  try {
    await axios.post('/api/polling/vote', { id: selectedPollingOption.value })
    showAlert('Berhasil', 'Terima kasih telah berpartisipasi dalam polling ini!', 'success')
    showPolling.value = false
    selectedPollingOption.value = null
  } catch (err) {
    console.error('Gagal submit polling:', err)
    showAlert('Gagal', 'Terjadi kesalahan saat mengirim suara. Silakan coba lagi.', 'error')
  }
}

// Voice synthesizer mode
let utterance = null
const toggleVoiceMode = () => {
  if (isVoiceActive.value) {
    window.speechSynthesis.cancel()
    isVoiceActive.value = false
  } else {
    isVoiceActive.value = true
    utterance = new SpeechSynthesisUtterance(document.body.innerText)
    utterance.lang = 'id-ID'
    window.speechSynthesis.speak(utterance)
  }
}

// Accessibility methods
const increaseFont = () => (document.body.style.fontSize = `${(fontSize.value += 10)}%`)
const decreaseFont = () => {
  if (fontSize.value > 50) document.body.style.fontSize = `${(fontSize.value -= 10)}%`
}
const increaseLineHeight = () => (document.body.style.lineHeight = lineHeight.value += 0.2)
const decreaseLineHeight = () => {
  if (lineHeight.value > 0.8) document.body.style.lineHeight = lineHeight.value -= 0.2
}
const setLetterSpacing = (v) => (document.body.style.letterSpacing = v)
const toggleBold = () => document.body.classList.toggle('access-bold')
const toggleHighlightLinks = () => document.body.classList.toggle('access-highlight-links')
const toggleMonochrome = () => document.body.classList.toggle('access-monochrome')
const toggleHighContrast = () => document.body.classList.toggle('access-contrast')
const toggleBigCursor = () => document.body.classList.toggle('access-big-cursor')
const toggleReduceMotion = () => document.body.classList.toggle('access-reduce-motion')

const onOpenSpbeSurvey = () => {
  showSurvey.value = true
}

const handleGlobalKeydown = (e) => {
  if (e.key === 'Escape') {
    showMainMenu.value = false
    showInteraksi.value = false
    showStatistik.value = false
    showLiveModal.value = false
    show112Modal.value = false
    showAduan.value = false
    showPolling.value = false
    showDisabilitas.value = false
  }
}

onMounted(() => {
  window.addEventListener('open-spbe-survey', onOpenSpbeSurvey)
  window.addEventListener('keydown', handleGlobalKeydown)
  fetchYoutubeStatus()
  fetchVisitorStats()
})

onBeforeUnmount(() => {
  if (window.speechSynthesis) window.speechSynthesis.cancel()
  window.removeEventListener('open-spbe-survey', onOpenSpbeSurvey)
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f8fafc;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
