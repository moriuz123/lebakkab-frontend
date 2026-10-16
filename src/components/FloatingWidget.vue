<template>
  <div>
    <!-- ==============================================
         DESKTOP FLOATING MENUS: SISTEM LACI (FLOATING SLIDE)
         Stacked vertical tabs on right edge that slide out
         ============================================== -->
    <div class="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-1 items-end">
      
      <!-- 1. LACI: MENU UTAMA -->
      <div 
        class="relative flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
        :class="activeDrawer === 'menu' ? '-translate-x-[360px]' : 'translate-x-0'"
        @mouseleave="onMouseLeaveDrawer('menu')"
      >
        <!-- Tab Handle -->
        <button 
          @click="toggleDrawer('menu')"
          @mouseenter="onMouseEnterTab('menu')"
          class="relative z-10 bg-[#0a2463] hover:bg-[#15347a] text-[#e8a020] py-3.5 px-2 rounded-l-2xl shadow-[-4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-2 transition-all border-t border-l border-b border-[#15347a] cursor-pointer group"
          title="Menu Utama Portal"
        >
          <div class="bg-white/10 rounded-full p-1 group-hover:bg-white/20 transition-colors">
            <Icon name="lucide:chevron-left" class="w-3.5 h-3.5 transition-transform duration-500" :class="activeDrawer === 'menu' ? 'rotate-180' : ''" />
          </div>
          <span class="vertical-text-right text-[11px] font-black tracking-[0.15em] uppercase">Menu</span>
          <Icon name="lucide:menu" class="w-4 h-4 text-[#e8a020] group-hover:scale-110 transition-transform" />
        </button>

        <!-- Drawer Content (Laci Menu) -->
        <div class="absolute right-[-360px] top-0 bg-white/98 backdrop-blur-md border-y border-l border-gray-100 p-5 w-[360px] rounded-bl-3xl overflow-hidden shadow-[-8px_0_30px_rgba(0,0,0,0.1)] flex flex-col max-h-[80vh]">
          <div class="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-l from-[#0a2463] to-[#1e5ca8]"></div>
          
          <div class="flex items-center justify-between mb-4 mt-1 border-b border-gray-100 pb-3">
            <div class="flex items-center gap-2.5">
              <div class="bg-[#0a2463] p-2 rounded-xl text-[#e8a020] shadow-inner">
                <Icon name="lucide:menu" class="w-4 h-4" />
              </div>
              <div>
                <h3 class="text-gray-900 font-bold text-base leading-tight">Menu Utama</h3>
                <p class="text-[11px] text-gray-500">Navigasi resmi portal daerah</p>
              </div>
            </div>
            <button @click="activeDrawer = null" class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
              <Icon name="lucide:x" class="w-4 h-4" />
            </button>
          </div>

          <!-- Search Filter -->
          <div class="relative mb-3">
            <Icon name="lucide:search" class="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              v-model="menuSearchQuery"
              type="text"
              placeholder="Cari menu / layanan..."
              class="w-full pl-8 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#1e5ca8] text-gray-800"
            />
            <button v-if="menuSearchQuery" @click="menuSearchQuery = ''" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Icon name="lucide:x" class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- Menu Tree List -->
          <div class="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
            <div v-if="loadingMenu" class="space-y-2 py-4">
              <div v-for="i in 4" :key="i" class="h-9 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
            <div v-else-if="filteredMenuList.length === 0" class="text-center py-8 text-gray-400 text-xs font-semibold">
              Menu tidak ditemukan.
            </div>
            <div v-else v-for="item in filteredMenuList" :key="item.id" class="rounded-xl border border-gray-100/80 overflow-hidden bg-white text-xs">
              <!-- Item with Children -->
              <div v-if="item.children && item.children.length > 0">
                <button
                  type="button"
                  @click="toggleSubmenu(item.id)"
                  class="w-full flex items-center justify-between p-2.5 text-left font-bold text-gray-800 hover:bg-blue-50/50 transition-colors"
                >
                  <span class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#1e5ca8]"></span>
                    {{ item.title }}
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200"
                    :class="openSubmenus[item.id] ? 'rotate-180 text-[#1e5ca8]' : ''"
                  />
                </button>
                <div v-show="openSubmenus[item.id]" class="bg-gray-50 px-3 py-1.5 border-t border-gray-100 space-y-1">
                  <div v-for="child in item.children" :key="child.id">
                    <a
                      v-if="child.link_type === 'eksternal' || (child.url && child.url.startsWith('http'))"
                      :href="resolveMenuUrl(child)"
                      target="_blank"
                      rel="noopener noreferrer"
                      @click="activeDrawer = null"
                      class="flex items-center justify-between py-1.5 px-2 rounded text-gray-600 hover:text-[#1e5ca8] hover:bg-white transition-colors"
                    >
                      <span>{{ child.title }}</span>
                      <Icon name="lucide:external-link" class="w-3 h-3 text-gray-400" />
                    </a>
                    <router-link
                      v-else
                      :to="resolveMenuUrl(child)"
                      @click="activeDrawer = null"
                      class="flex items-center justify-between py-1.5 px-2 rounded text-gray-600 hover:text-[#1e5ca8] hover:bg-white transition-colors"
                    >
                      <span>{{ child.title }}</span>
                      <Icon name="lucide:arrow-right" class="w-3 h-3 text-gray-400" />
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Item Single -->
              <div v-else>
                <a
                  v-if="item.link_type === 'eksternal' || (item.url && item.url.startsWith('http'))"
                  :href="resolveMenuUrl(item)"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="activeDrawer = null"
                  class="flex items-center justify-between p-2.5 font-bold text-gray-800 hover:bg-blue-50/50 hover:text-[#1e5ca8] transition-colors"
                >
                  <span class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#e8a020]"></span>
                    {{ item.title }}
                  </span>
                  <Icon name="lucide:external-link" class="w-3.5 h-3.5 text-gray-400" />
                </a>
                <router-link
                  v-else
                  :to="resolveMenuUrl(item)"
                  @click="activeDrawer = null"
                  class="flex items-center justify-between p-2.5 font-bold text-gray-800 hover:bg-blue-50/50 hover:text-[#1e5ca8] transition-colors"
                >
                  <span class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#e8a020]"></span>
                    {{ item.title }}
                  </span>
                  <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 text-gray-400" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. LACI: INTERAKSI -->
      <div 
        class="relative flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
        :class="activeDrawer === 'interaksi' ? '-translate-x-[280px]' : 'translate-x-0'"
        @mouseleave="onMouseLeaveDrawer('interaksi')"
      >
        <!-- Tab Handle -->
        <button 
          @click="toggleDrawer('interaksi')"
          @mouseenter="onMouseEnterTab('interaksi')"
          class="relative z-10 bg-[#e8a020] hover:bg-[#d48f10] text-[#0a2463] py-3.5 px-2 rounded-l-2xl shadow-[-4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-2 transition-all border-t border-l border-b border-[#c98918] cursor-pointer group"
          title="Interaksi Publik"
        >
          <div class="bg-white/30 rounded-full p-1">
            <Icon name="lucide:chevron-left" class="w-3.5 h-3.5 transition-transform duration-500" :class="activeDrawer === 'interaksi' ? 'rotate-180' : ''" />
          </div>
          <span class="vertical-text-right text-[11px] font-black tracking-[0.15em] uppercase">Interaksi</span>
          <Icon name="lucide:sparkles" class="w-4 h-4 group-hover:scale-110 transition-transform text-[#0a2463]" />
        </button>

        <!-- Drawer Content -->
        <div class="absolute right-[-280px] top-0 bg-white/98 backdrop-blur-md border-y border-l border-gray-100 p-5 w-[280px] rounded-bl-3xl overflow-hidden shadow-[-8px_0_30px_rgba(0,0,0,0.1)]">
          <div class="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-l from-[#e8a020] to-[#0a2463]"></div>
          
          <div class="flex items-center justify-between mb-5 mt-1 border-b border-gray-100 pb-3">
            <h3 class="text-gray-900 font-bold text-base leading-tight uppercase tracking-wider">Interaksi</h3>
            <div class="bg-[#0a2463] p-2 rounded-xl text-[#e8a020] shadow-inner">
              <Icon name="lucide:sparkles" class="w-4 h-4" />
            </div>
          </div>
          
          <div class="space-y-2.5 relative z-10">
            <button
              @click="triggerSurvey"
              class="w-full flex items-center gap-3 bg-gray-50/90 p-2.5 rounded-xl hover:bg-blue-50 hover:text-[#1e5ca8] transition-colors border border-gray-100 group text-gray-700 text-xs font-bold text-left"
            >
              <div class="bg-white p-2 rounded-lg shadow-xs group-hover:text-[#1e5ca8]">
                <Icon name="lucide:clipboard-check" class="w-4 h-4" />
              </div>
              <span>Survei Kepuasan</span>
            </button>

            <button
              @click="triggerPolling"
              class="w-full flex items-center gap-3 bg-gray-50/90 p-2.5 rounded-xl hover:bg-amber-50 hover:text-amber-800 transition-colors border border-gray-100 group text-gray-700 text-xs font-bold text-left"
            >
              <div class="bg-white p-2 rounded-lg shadow-xs group-hover:text-[#e8a020]">
                <Icon name="lucide:bar-chart" class="w-4 h-4" />
              </div>
              <span>Jajak Pendapat</span>
            </button>

            <button
              @click="triggerAduan"
              class="w-full flex items-center gap-3 bg-gray-50/90 p-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-800 transition-colors border border-gray-100 group text-gray-700 text-xs font-bold text-left"
            >
              <div class="bg-white p-2 rounded-lg shadow-xs group-hover:text-rose-600">
                <Icon name="lucide:message-circle" class="w-4 h-4" />
              </div>
              <span>Kanal Pengaduan</span>
            </button>

            <button
              @click="triggerDisabilitas"
              class="w-full flex items-center gap-3 bg-gray-50/90 p-2.5 rounded-xl hover:bg-purple-50 hover:text-purple-800 transition-colors border border-gray-100 group text-gray-700 text-xs font-bold text-left"
            >
              <div class="bg-white p-2 rounded-lg shadow-xs group-hover:text-purple-600">
                <Icon name="lucide:accessibility" class="w-4 h-4" />
              </div>
              <span>Aksesibilitas</span>
            </button>

            <router-link
              to="/kritik-saran"
              @click="activeDrawer = null"
              class="w-full flex items-center gap-3 bg-gray-50/90 p-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 transition-colors border border-gray-100 group text-gray-700 text-xs font-bold text-left"
            >
              <div class="bg-white p-2 rounded-lg shadow-xs group-hover:text-emerald-600">
                <Icon name="lucide:pencil" class="w-4 h-4" />
              </div>
              <span>Kritik & Saran</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- 3. TAB: BERANDA (HOME - DIRECT LINK) -->
      <router-link
        to="/"
        class="bg-[#1e5ca8] hover:bg-[#174885] text-white py-3 px-2 rounded-l-2xl shadow-[-4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-1.5 transition-all border-t border-l border-b border-[#174885] cursor-pointer group"
        title="Kembali ke Beranda"
      >
        <span class="vertical-text-right text-[11px] font-black tracking-[0.15em] uppercase">Beranda</span>
        <Icon name="lucide:home" class="w-4 h-4 group-hover:scale-110 transition-transform" />
      </router-link>

      <!-- 4. LACI: STATISTIK PENGUNJUNG -->
      <div 
        class="relative flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
        :class="activeDrawer === 'statistik' ? '-translate-x-[280px]' : 'translate-x-0'"
        @mouseleave="onMouseLeaveDrawer('statistik')"
      >
        <!-- Tab Handle -->
        <button 
          @click="toggleDrawer('statistik')"
          @mouseenter="onMouseEnterTab('statistik')"
          class="relative z-10 bg-emerald-700 hover:bg-emerald-600 text-white py-3.5 px-2 rounded-l-2xl shadow-[-4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-2 transition-all border-t border-l border-b border-emerald-800 cursor-pointer group"
          title="Statistik Pengunjung Portal"
        >
          <div class="bg-white/20 rounded-full p-1">
            <Icon name="lucide:chevron-left" class="w-3.5 h-3.5 transition-transform duration-500" :class="activeDrawer === 'statistik' ? 'rotate-180' : ''" />
          </div>
          <span class="vertical-text-right text-[11px] font-black tracking-[0.15em] uppercase">Statistik</span>
          <Icon name="lucide:bar-chart-2" class="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        <!-- Drawer Content -->
        <div class="absolute right-[-280px] top-0 bg-white/98 backdrop-blur-md border-y border-l border-gray-100 p-5 w-[280px] rounded-bl-3xl overflow-hidden shadow-[-8px_0_30px_rgba(0,0,0,0.1)]">
          <div class="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-l from-emerald-600 to-teal-400"></div>
          
          <div class="flex items-center justify-between mb-5 mt-1 border-b border-gray-100 pb-3">
            <h3 class="text-gray-900 font-bold text-base leading-tight uppercase tracking-wider">Statistik</h3>
            <div class="bg-emerald-900 p-2 rounded-xl text-[#e8a020] shadow-inner">
              <Icon name="lucide:users" class="w-4 h-4" />
            </div>
          </div>
          
          <div class="space-y-2.5 relative z-10">
            <div class="flex justify-between items-center bg-gray-50/90 p-2.5 rounded-xl border border-gray-100">
              <span class="text-gray-600 text-xs font-semibold">Hari Ini</span>
              <span class="font-bold text-[#e8a020] bg-white shadow-xs px-2.5 py-0.5 rounded-lg text-xs">{{ stats.today.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between items-center bg-gray-50/90 p-2.5 rounded-xl border border-gray-100">
              <span class="text-gray-600 text-xs font-semibold">Bulan Ini</span>
              <span class="font-bold text-[#e8a020] bg-white shadow-xs px-2.5 py-0.5 rounded-lg text-xs">{{ stats.thisMonth.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between items-center bg-gray-50/90 p-2.5 rounded-xl border border-gray-100">
              <span class="text-gray-600 text-xs font-semibold">Tahun Ini</span>
              <span class="font-bold text-[#e8a020] bg-white shadow-xs px-2.5 py-0.5 rounded-lg text-xs">{{ stats.thisYear.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between items-center bg-gradient-to-r from-[#0a2463] to-emerald-600 p-3 rounded-xl text-white shadow-md mt-3">
              <span class="text-blue-50 text-xs font-bold">Total Visitor</span>
              <span class="font-bold bg-white/20 px-2.5 py-0.5 rounded-lg backdrop-blur-sm text-xs">{{ stats.total.toLocaleString('id-ID') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. LACI: LIVE STREAMING -->
      <div 
        class="relative flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
        :class="activeDrawer === 'live' ? '-translate-x-[280px]' : 'translate-x-0'"
        @mouseleave="onMouseLeaveDrawer('live')"
      >
        <!-- Tab Handle -->
        <button 
          @click="toggleDrawer('live')"
          @mouseenter="onMouseEnterTab('live')"
          class="relative z-10 text-white py-3.5 px-2 rounded-l-2xl shadow-[-4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-2 transition-all border-t border-l border-b cursor-pointer group"
          :class="ytData.is_live ? 'bg-[#cc0000] hover:bg-[#e60000] border-[#990000]' : 'bg-[#990000] hover:bg-[#cc0000] border-[#770000] opacity-95'"
          title="Live Streaming Diskominfosp"
        >
          <div class="bg-white/20 rounded-full p-1">
            <Icon name="lucide:chevron-left" class="w-3.5 h-3.5 transition-transform duration-500" :class="activeDrawer === 'live' ? 'rotate-180' : ''" />
          </div>
          <span class="vertical-text-right text-[11px] font-black tracking-[0.15em] uppercase">Live</span>
          <div class="relative">
            <Icon name="lucide:youtube" class="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span v-if="ytData.is_live" class="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 border border-white rounded-full animate-ping"></span>
          </div>
        </button>

        <!-- Drawer Content -->
        <div class="absolute right-[-280px] top-0 bg-white/98 backdrop-blur-md border-y border-l border-gray-100 p-5 w-[280px] rounded-bl-3xl overflow-hidden shadow-[-8px_0_30px_rgba(0,0,0,0.1)]">
          <div class="absolute top-0 right-0 w-full h-1.5" :class="ytData.is_live ? 'bg-gradient-to-l from-[#cc0000] to-rose-400' : 'bg-gradient-to-l from-gray-500 to-gray-700'"></div>
          
          <div class="flex items-center justify-between mb-5 mt-1 border-b border-gray-100 pb-3">
            <h3 class="text-gray-900 font-bold text-base leading-tight uppercase tracking-wider">Live Stream</h3>
            <div class="p-2 rounded-xl text-white shadow-inner" :class="ytData.is_live ? 'bg-[#cc0000] animate-pulse' : 'bg-gray-600'">
              <Icon name="lucide:youtube" class="w-4 h-4" />
            </div>
          </div>
          
          <div class="space-y-3 relative z-10">
            <button
              @click="showLiveModal = true; activeDrawer = null"
              class="w-full flex items-center gap-3 p-3 rounded-xl transition-colors border group"
              :class="ytData.is_live ? 'bg-red-50/80 hover:bg-red-100 text-red-700 border-red-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'"
            >
              <div class="bg-white p-2 rounded-lg shadow-xs" :class="ytData.is_live ? 'text-red-600' : 'text-gray-800'">
                <Icon name="lucide:play" class="w-4 h-4" />
              </div>
              <span class="text-xs font-bold">{{ ytData.is_live ? 'Tonton Live Sekarang' : 'Tonton Siaran Ulang' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 6. LACI: CCTV (DINAMIS) -->
      <div 
        class="relative flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
        :class="activeDrawer === 'cctv' ? '-translate-x-[280px]' : 'translate-x-0'"
        @mouseleave="onMouseLeaveDrawer('cctv')"
      >
        <!-- Tab Handle -->
        <button 
          @click="toggleDrawer('cctv')"
          @mouseenter="onMouseEnterTab('cctv')"
          class="relative z-10 bg-[#0f4c81] hover:bg-[#145a99] text-cyan-200 py-3.5 px-2 rounded-l-2xl shadow-[-4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-2 transition-all border-t border-l border-b border-[#0a355c] cursor-pointer group"
          :title="cctvTitle"
        >
          <div class="bg-white/10 rounded-full p-1 group-hover:bg-white/20 transition-colors">
            <Icon name="lucide:chevron-left" class="w-3.5 h-3.5 transition-transform duration-500" :class="activeDrawer === 'cctv' ? 'rotate-180' : ''" />
          </div>
          <span class="vertical-text-right text-[11px] font-black tracking-[0.15em] uppercase">CCTV</span>
          <div class="relative">
            <Icon name="lucide:cctv" class="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span v-if="cctvStatus === 'active'" class="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span v-else-if="cctvStatus === 'maintenance'" class="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
          </div>
        </button>

        <!-- Drawer Content -->
        <div class="absolute right-[-280px] top-0 bg-white/98 backdrop-blur-md border-y border-l border-gray-100 p-5 w-[280px] rounded-bl-3xl overflow-hidden shadow-[-8px_0_30px_rgba(0,0,0,0.1)]">
          <div class="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-l from-[#0f4c81] to-cyan-400"></div>
          
          <div class="flex items-center justify-between mb-4 mt-1 border-b border-gray-100 pb-3">
            <div>
              <h3 class="text-gray-900 font-bold text-base leading-tight uppercase tracking-wider">CCTV Lebak</h3>
              <p class="text-[11px] text-gray-500">Pemantauan kamera daerah</p>
            </div>
            <div class="bg-[#0f4c81] p-2 rounded-xl text-white shadow-inner">
              <Icon name="lucide:cctv" class="w-4 h-4" />
            </div>
          </div>

          <!-- Status Indicator -->
          <div class="mb-4">
            <span v-if="cctvStatus === 'active'" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Siaran Aktif
            </span>
            <span v-else-if="cctvStatus === 'maintenance'" class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Icon name="lucide:wrench" class="w-3.5 h-3.5 text-amber-600" />
              Mode Pemeliharaan
            </span>
            <span v-else class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-[#e8a020]" />
              Segera Hadir
            </span>
          </div>

          <!-- Action CTA -->
          <button
            type="button"
            @click="handleCctvClick"
            class="w-full flex items-center justify-center gap-2.5 p-3 rounded-xl bg-gradient-to-r from-[#0f4c81] to-[#1e5ca8] text-white text-xs font-bold shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <Icon name="lucide:external-link" class="w-4 h-4 text-cyan-300" />
            <span>{{ cctvStatus === 'active' ? 'Buka Siaran CCTV' : 'Lihat Halaman CCTV' }}</span>
          </button>
        </div>
      </div>

      <!-- 7. LACI: CALL CENTER DARURAT 112 -->
      <div 
        class="relative flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
        :class="activeDrawer === '112' ? '-translate-x-[280px]' : 'translate-x-0'"
        @mouseleave="onMouseLeaveDrawer('112')"
      >
        <!-- Tab Handle -->
        <button 
          @click="toggleDrawer('112')"
          @mouseenter="onMouseEnterTab('112')"
          class="relative z-10 bg-rose-700 hover:bg-rose-600 text-white py-3.5 px-2 rounded-l-2xl shadow-[-4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-2 transition-all border-t border-l border-b border-rose-800 cursor-pointer group"
          title="Layanan Darurat 112 (Bebas Pulsa)"
        >
          <div class="bg-white/20 rounded-full p-1 animate-pulse">
            <Icon name="lucide:chevron-left" class="w-3.5 h-3.5 transition-transform duration-500" :class="activeDrawer === '112' ? 'rotate-180' : ''" />
          </div>
          <span class="vertical-text-right text-[11px] font-black tracking-[0.15em] uppercase">112</span>
          <Icon name="lucide:phone-call" class="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        <!-- Drawer Content -->
        <div class="absolute right-[-280px] top-0 bg-white/98 backdrop-blur-md border-y border-l border-gray-100 p-5 w-[280px] rounded-bl-3xl overflow-hidden shadow-[-8px_0_30px_rgba(0,0,0,0.1)]">
          <div class="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-l from-rose-700 to-red-500"></div>
          
          <div class="flex items-center justify-between mb-3 mt-1 border-b border-gray-100 pb-2.5">
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider text-red-600 block">Layanan Darurat</span>
              <h3 class="text-gray-900 font-black text-lg leading-tight">Call Center 112</h3>
            </div>
            <div class="bg-red-100 p-2 rounded-xl text-red-600 shadow-inner">
              <Icon name="lucide:phone-call" class="w-4 h-4 animate-pulse" />
            </div>
          </div>

          <p class="text-xs text-gray-600 leading-relaxed mb-4">
            Bebas pulsa 24 jam untuk evakuasi bencana, ambulans medis darurat, kebakaran, dan keselamatan warga.
          </p>

          <a
            href="tel:112"
            class="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-black rounded-xl shadow-md transition-transform hover:scale-105"
          >
            <Icon name="lucide:phone" class="w-4 h-4" />
            Panggil 112 Sekarang
          </a>
        </div>
      </div>

    </div>


    <!-- ==============================================
         MOBILE FLOATING BOTTOM BAR (7 ITEMS)
         Fixed bottom bar across the screen on mobile
         ============================================== -->
    <div
      class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a2463]/98 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 shadow-[0_-4px_25px_rgba(0,0,0,0.35)] flex items-center justify-around"
      style="padding-bottom: max(0.5rem, env(safe-area-inset-bottom));"
    >
      <!-- 1. Menu -->
      <button
        type="button"
        @click="openMobileDrawer('menu')"
        class="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-90"
        :class="activeMobileDrawer === 'menu' ? 'text-[#e8a020]' : 'text-gray-300 hover:text-white'"
      >
        <Icon name="lucide:menu" class="w-5 h-5 mb-0.5" />
        <span class="text-[10px] font-bold tracking-tight leading-none">Menu</span>
      </button>

      <!-- 2. Interaksi -->
      <button
        type="button"
        @click="openMobileDrawer('interaksi')"
        class="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-90"
        :class="activeMobileDrawer === 'interaksi' ? 'text-[#e8a020]' : 'text-gray-300 hover:text-white'"
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
        @click="openMobileDrawer('statistik')"
        class="flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-transform active:scale-90"
        :class="activeMobileDrawer === 'statistik' ? 'text-[#e8a020]' : 'text-gray-300 hover:text-white'"
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
         MOBILE DRAWERS (SLIDE UP / MODALS FOR MOBILE)
         ============================================== -->
    <!-- Mobile Menu Drawer -->
    <Transition name="fade">
      <div v-if="activeMobileDrawer === 'menu'" class="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="activeMobileDrawer = null"></div>
        <div class="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col z-10 overflow-hidden">
          <div class="p-4 bg-[#0a2463] text-white flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Icon name="lucide:menu" class="w-5 h-5 text-[#e8a020]" />
              <h3 class="font-bold text-sm">Menu Utama</h3>
            </div>
            <button @click="activeMobileDrawer = null" class="text-white/80 p-1">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>
          <div class="p-3 bg-gray-50 border-b border-gray-100">
            <input
              v-model="menuSearchQuery"
              type="text"
              placeholder="Cari menu..."
              class="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-800"
            />
          </div>
          <div class="flex-1 overflow-y-auto p-4 space-y-2">
            <div v-for="item in filteredMenuList" :key="item.id" class="border border-gray-100 rounded-xl p-3 bg-white text-xs">
              <div v-if="item.children && item.children.length > 0">
                <button @click="toggleSubmenu(item.id)" class="w-full flex justify-between font-bold text-gray-800">
                  <span>{{ item.title }}</span>
                  <Icon name="lucide:chevron-down" class="w-4 h-4 text-gray-400" :class="openSubmenus[item.id] ? 'rotate-180' : ''" />
                </button>
                <div v-show="openSubmenus[item.id]" class="mt-2 pl-2 border-l border-gray-200 space-y-1">
                  <div v-for="child in item.children" :key="child.id">
                    <a v-if="child.link_type === 'eksternal'" :href="resolveMenuUrl(child)" target="_blank" @click="activeMobileDrawer = null" class="block py-1 text-gray-600">{{ child.title }}</a>
                    <router-link v-else :to="resolveMenuUrl(child)" @click="activeMobileDrawer = null" class="block py-1 text-gray-600">{{ child.title }}</router-link>
                  </div>
                </div>
              </div>
              <div v-else>
                <a v-if="item.link_type === 'eksternal'" :href="resolveMenuUrl(item)" target="_blank" @click="activeMobileDrawer = null" class="block font-bold text-gray-800">{{ item.title }}</a>
                <router-link v-else :to="resolveMenuUrl(item)" @click="activeMobileDrawer = null" class="block font-bold text-gray-800">{{ item.title }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile Interaksi Drawer -->
    <Transition name="fade">
      <div v-if="activeMobileDrawer === 'interaksi'" class="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="activeMobileDrawer = null"></div>
        <div class="relative w-full bg-white rounded-t-3xl shadow-2xl p-5 z-10 space-y-3">
          <div class="flex items-center justify-between border-b pb-3">
            <h3 class="font-bold text-gray-800 text-sm">Interaksi Publik</h3>
            <button @click="activeMobileDrawer = null" class="text-gray-400"><Icon name="lucide:x" class="w-5 h-5"/></button>
          </div>
          <button @click="triggerSurvey" class="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-xs font-bold text-gray-700">
            <Icon name="lucide:clipboard-check" class="w-4 h-4 text-[#1e5ca8]" /> Survei Kepuasan
          </button>
          <button @click="triggerPolling" class="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-xs font-bold text-gray-700">
            <Icon name="lucide:bar-chart" class="w-4 h-4 text-[#e8a020]" /> Jajak Pendapat
          </button>
          <button @click="triggerAduan" class="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-xs font-bold text-gray-700">
            <Icon name="lucide:message-circle" class="w-4 h-4 text-rose-600" /> Kanal Pengaduan
          </button>
          <button @click="triggerDisabilitas" class="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-xs font-bold text-gray-700">
            <Icon name="lucide:accessibility" class="w-4 h-4 text-purple-600" /> Aksesibilitas
          </button>
          <router-link to="/kritik-saran" @click="activeMobileDrawer = null" class="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-xs font-bold text-gray-700">
            <Icon name="lucide:pencil" class="w-4 h-4 text-emerald-600" /> Kritik & Saran
          </router-link>
        </div>
      </div>
    </Transition>

    <!-- Mobile Statistik Drawer -->
    <Transition name="fade">
      <div v-if="activeMobileDrawer === 'statistik'" class="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="activeMobileDrawer = null"></div>
        <div class="relative w-full bg-white rounded-t-3xl shadow-2xl p-5 z-10 space-y-3">
          <div class="flex items-center justify-between border-b pb-3">
            <h3 class="font-bold text-gray-800 text-sm">Statistik Pengunjung</h3>
            <button @click="activeMobileDrawer = null" class="text-gray-400"><Icon name="lucide:x" class="w-5 h-5"/></button>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-xs">
            <span class="text-gray-600 font-semibold">Hari Ini</span>
            <span class="font-bold text-[#e8a020] bg-white px-2 py-0.5 rounded shadow-xs">{{ stats.today.toLocaleString('id-ID') }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-xs">
            <span class="text-gray-600 font-semibold">Bulan Ini</span>
            <span class="font-bold text-[#e8a020] bg-white px-2 py-0.5 rounded shadow-xs">{{ stats.thisMonth.toLocaleString('id-ID') }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-xs">
            <span class="text-gray-600 font-semibold">Tahun Ini</span>
            <span class="font-bold text-[#e8a020] bg-white px-2 py-0.5 rounded shadow-xs">{{ stats.thisYear.toLocaleString('id-ID') }}</span>
          </div>
          <div class="flex justify-between items-center p-3.5 bg-gradient-to-r from-[#0a2463] to-emerald-600 text-white rounded-xl text-xs font-bold">
            <span>Total Pengunjung</span>
            <span class="bg-white/20 px-2.5 py-0.5 rounded">{{ stats.total.toLocaleString('id-ID') }}</span>
          </div>
        </div>
      </div>
    </Transition>


    <!-- ==============================================
         GLOBAL MODALS: LIVE STREAM, POLLING, ADUAN, AKSESIBILITAS, SPBE
         ============================================== -->
    <!-- Modal Live Streaming -->
    <div
      v-if="showLiveModal"
      class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity"
    >
      <div class="bg-gray-950 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-800 flex flex-col">
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
            class="flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 p-4 rounded-xl text-gray-700 hover:text-blue-700 font-semibold transition-all group text-sm"
          >
            <span>SP4N Lapor</span>
            <Icon name="lucide:external-link" class="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
          </a>
          <a 
            href="https://wbs.lebakkab.go.id/" 
            target="_blank" 
            class="flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 p-4 rounded-xl text-gray-700 hover:text-blue-700 font-semibold transition-all group text-sm"
          >
            <span>WBS Inspektorat</span>
            <Icon name="lucide:external-link" class="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
          </a>
          <a 
            href="https://wa.me/6281944114581" 
            target="_blank" 
            class="flex items-center justify-between bg-gray-50 hover:bg-[#f8f9fc] border border-gray-100 hover:border-[#1e5ca8] p-4 rounded-xl text-gray-700 hover:text-[#e8a020] font-semibold transition-all group text-sm"
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

// State Drawer Laci Aktif di Desktop
// 'menu' | 'interaksi' | 'statistik' | 'live' | 'cctv' | '112' | null
const activeDrawer = ref(null)
let closeDrawerTimer = null

// Mobile State
const activeMobileDrawer = ref(null)

// Global Modal States
const showLiveModal = ref(false)
const showAduan = ref(false)
const showPolling = ref(false)
const showSurvey = ref(false)
const showDisabilitas = ref(false)
const isVoiceActive = ref(false)

// Menu Utama State
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

// ==== DRAWER LACI INTERACTION (DESKTOP) ====
const onMouseEnterTab = (name) => {
  if (closeDrawerTimer) clearTimeout(closeDrawerTimer)
  activeDrawer.value = name
  onOpenDrawerContent(name)
}

const onMouseLeaveDrawer = (name) => {
  closeDrawerTimer = setTimeout(() => {
    if (activeDrawer.value === name) {
      activeDrawer.value = null
    }
  }, 350)
}

const toggleDrawer = (name) => {
  if (closeDrawerTimer) clearTimeout(closeDrawerTimer)
  if (activeDrawer.value === name) {
    activeDrawer.value = null
  } else {
    activeDrawer.value = name
    onOpenDrawerContent(name)
  }
}

const onOpenDrawerContent = (name) => {
  if (name === 'menu' && mainMenuList.value.length === 0) {
    fetchMainMenu()
  } else if (name === 'statistik') {
    fetchVisitorStats()
  } else if (name === 'live') {
    fetchYoutubeStatus()
  }
}

// Mobile drawer open
const openMobileDrawer = (name) => {
  activeMobileDrawer.value = name
  onOpenDrawerContent(name)
}

const toggleLiveModal = () => {
  showLiveModal.value = !showLiveModal.value
  if (showLiveModal.value) {
    fetchYoutubeStatus()
  }
}

// CCTV CTA action
const handleCctvClick = () => {
  activeDrawer.value = null
  activeMobileDrawer.value = null
  const status = cctvStatus.value
  const url = cctvUrl.value

  if (status === 'active' && url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
  }
  router.push('/cctv')
}

// Subaction triggers from Interaksi
const triggerSurvey = () => {
  activeDrawer.value = null
  activeMobileDrawer.value = null
  showSurvey.value = true
}

const triggerPolling = () => {
  activeDrawer.value = null
  activeMobileDrawer.value = null
  showPolling.value = true
  fetchPolling()
}

const triggerAduan = () => {
  activeDrawer.value = null
  activeMobileDrawer.value = null
  showAduan.value = true
}

const triggerDisabilitas = () => {
  activeDrawer.value = null
  activeMobileDrawer.value = null
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
    activeDrawer.value = null
    activeMobileDrawer.value = null
    showLiveModal.value = false
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
.vertical-text-right {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
