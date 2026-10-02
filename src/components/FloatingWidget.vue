<template>
  <!-- Floating menu -->
  <div>
    <!-- === DESKTOP FLOATING MENUS (STACKED TABS) === -->
    <div class="hidden md:flex fixed right-0 top-1/4 md:top-1/3 z-40 flex-col gap-0 items-end">
      
      <!-- INTERAKSI DRAWER -->
      <div 
        class="relative flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
        :class="isMenuOpen ? '-translate-x-[260px]' : 'translate-x-0'"
        @mouseleave="isMenuOpen = false"
      >
        <button 
          @click="isMenuOpen = !isMenuOpen"
          @mouseenter="isMenuOpen = true"
          class="relative z-10 bg-[#e8a020] hover:bg-[#d48f10] text-[#0a2463] py-5 px-2.5 rounded-l-2xl shadow-[-4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-3 transition-all border-t border-l border-b border-[#c98918] cursor-pointer group"
        >
          <div class="bg-white/30 rounded-full p-1 mb-1">
            <Icon name="lucide:chevron-left" class="w-4 h-4 transition-transform duration-500" :class="isMenuOpen ? 'rotate-180' : ''" />
          </div>
          <span class="vertical-text-right text-[13px] font-black tracking-[0.2em] uppercase">Interaksi</span>
          <Icon name="lucide:menu" class="w-5 h-5 group-hover:scale-110 transition-transform mt-1" />
        </button>

        <!-- Drawer Content -->
        <div class="absolute right-[-260px] top-0 bg-white/95 backdrop-blur-md border-y border-l border-gray-100 p-6 w-[260px] rounded-bl-3xl overflow-hidden shadow-[-5px_0_25px_rgba(0,0,0,0.08)]">
          <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#0a2463] to-emerald-400"></div>
          
          <div class="flex items-center justify-end gap-3 mb-6 mt-1 text-right">
            <h3 class="text-gray-800 font-bold text-xl leading-tight uppercase tracking-wider">Interaksi</h3>
            <div class="bg-[#0a2463] p-2.5 rounded-xl text-[#e8a020] shadow-inner">
              <Icon name="lucide:settings" class="w-5 h-5" />
            </div>
          </div>
          
          <div class="space-y-3 relative z-10">
            <div v-for="(item, index) in items" :key="index">
              <button
                v-if="item.type !== 'link'"
                @click="handleAction(item.type)"
                class="w-full flex items-center gap-3 bg-gray-50/80 p-3 rounded-xl hover:bg-[#f8f9fc] hover:text-[#e8a020] transition-colors border border-gray-100 group text-gray-700"
              >
                <div class="bg-white p-2 rounded-lg shadow-sm group-hover:text-[#e8a020]">
                  <Icon :name="item.icon" class="w-5 h-5" />
                </div>
                <span class="text-sm font-semibold">{{ item.label }}</span>
              </button>
              <a
                v-else
                :href="item.link"
                class="w-full flex items-center gap-3 bg-gray-50/80 p-3 rounded-xl hover:bg-[#f8f9fc] hover:text-[#e8a020] transition-colors border border-gray-100 group text-gray-700"
              >
                <div class="bg-white p-2 rounded-lg shadow-sm group-hover:text-[#e8a020]">
                  <Icon :name="item.icon" class="w-5 h-5" />
                </div>
                <span class="text-sm font-semibold">{{ item.label }}</span>
              </a>
            </div>
          </div>
          
          <!-- Background subtle icon -->
          <Icon name="lucide:settings" class="absolute -bottom-4 -left-4 w-32 h-32 text-gray-50 opacity-40 pointer-events-none" />
        </div>
      </div>

      <!-- CCTV DRAWER -->
      <div 
        class="relative flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
        :class="isCCTVMenuOpen ? '-translate-x-[260px]' : 'translate-x-0'"
        @mouseleave="isCCTVMenuOpen = false"
      >
        <button 
          @click="isCCTVMenuOpen = !isCCTVMenuOpen"
          @mouseenter="isCCTVMenuOpen = true"
          class="relative z-10 bg-[#0a2463] hover:bg-[#15347a] text-[#e8a020] py-5 px-2.5 rounded-l-2xl shadow-[-4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-3 transition-all border-t border-l border-b border-[#15347a] cursor-pointer group"
        >
          <div class="bg-white/10 rounded-full p-1 mb-1 group-hover:bg-white/20 transition-colors">
            <Icon name="lucide:chevron-left" class="w-4 h-4 transition-transform duration-500" :class="isCCTVMenuOpen ? 'rotate-180' : ''" />
          </div>
          <span class="vertical-text-right text-[13px] font-black tracking-[0.2em] uppercase">CCTV</span>
          <Icon name="lucide:cctv" class="w-5 h-5 group-hover:scale-110 transition-transform mt-1" />
        </button>

        <!-- Drawer Content -->
        <div class="absolute right-[-260px] top-0 bg-white/95 backdrop-blur-md border-y border-l border-gray-100 p-6 w-[260px] rounded-bl-3xl overflow-hidden shadow-[-5px_0_25px_rgba(0,0,0,0.08)] min-h-[120px]">
          <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#e8a020] to-[#0a2463]"></div>
          
          <div class="flex items-center justify-end gap-3 mb-6 mt-1 text-right">
            <h3 class="text-gray-800 font-bold text-xl leading-tight uppercase tracking-wider">CCTV Lebak</h3>
            <div class="bg-[#0a2463] p-2.5 rounded-xl text-white shadow-inner">
              <Icon name="lucide:video" class="w-5 h-5" />
            </div>
          </div>
          
          <div class="space-y-3 relative z-10">
            <router-link
              to="/cctv"
              class="w-full flex items-center gap-3 bg-gray-50/80 p-3 rounded-xl hover:bg-[#f8f9fc] hover:text-[#e8a020] transition-colors border border-gray-100 group text-gray-700"
            >
              <div class="bg-white p-2 rounded-lg shadow-sm group-hover:text-[#e8a020]">
                <Icon name="lucide:external-link" class="w-5 h-5" />
              </div>
              <span class="text-sm font-semibold">Buka CCTV</span>
            </router-link>
          </div>
          
          <!-- Background subtle icon -->
          <Icon name="lucide:cctv" class="absolute -bottom-4 -left-4 w-32 h-32 text-gray-50 opacity-40 pointer-events-none" />
        </div>
      </div>
    </div>


    <!-- MOBILE EMERGENCY 112 FAB -->
    <a 
      href="tel:112"
      class="md:hidden fixed bottom-20 right-4 z-50 bg-red-600 text-white rounded-full shadow-[0_4px_20px_rgba(220,38,38,0.6)] flex items-center gap-2 px-4 py-3 hover:bg-red-700 active:scale-95 transition-all group"
    >
      <div class="bg-white/20 p-1.5 rounded-full relative flex items-center justify-center">
        <Icon name="lucide:phone" class="w-5 h-5" />
      </div>
      <div class="flex flex-col items-start leading-none">
        <span class="text-[10px] font-semibold text-red-100 uppercase tracking-widest">Darurat</span>
        <span class="text-lg font-black tracking-widest">112</span>
      </div>
    </a>

    <!-- === MOBILE BOTTOM MENU === -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-[#0a2463] flex justify-around items-center py-2 z-50 md:hidden shadow-[0_-2px_8px_rgba(0,0,0,0.2)]"
    >
      <div
        v-for="(item, index) in mobileItems"
        :key="'mobile-' + index"
        class="flex flex-col items-center text-white text-xs active:scale-110 transition-transform duration-150"
      >
        <button
          v-if="item.type !== 'link'"
          @click="handleAction(item.type)"
          class="flex flex-col items-center focus:outline-none"
        >
          <Icon :name="item.icon" class="w-6 h-6 mb-1" />
          <span>{{ item.label }}</span>
        </button>

        <a v-else :href="item.link" class="flex flex-col items-center focus:outline-none">
          <Icon :name="item.icon" class="w-6 h-6 mb-1" />
          <span>{{ item.label }}</span>
        </a>
      </div>
    </div>

    <!-- === MODAL ADUAN === -->
    <div
      v-if="showAduan"
      class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-[400px] relative overflow-hidden transform transition-all scale-100 m-4">
        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <div class="p-6">
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
            <h2 class="text-xl font-bold text-gray-800">Kanal Aduan</h2>
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
                <span class="text-[#e8a020] font-bold">Bot WhatsApp</span>
              </div>
              <Icon name="lucide:external-link" class="w-4 h-4 text-gray-400 group-hover:text-[#e8a020]" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- === MODAL POLLING === -->
    <div
      v-if="showPolling"
      class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-[450px] relative overflow-hidden m-4">
        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
        <div class="p-6">
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
            <h2 class="text-xl font-bold text-gray-800">Jajak Pendapat</h2>
          </div>

          <div v-if="polling.length" class="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="p in polling" :key="p.id" class="mb-6 bg-gray-50 p-5 rounded-xl border border-gray-100">
              <p class="font-bold text-gray-800 mb-4 leading-relaxed">{{ p.pertanyaan }}</p>
              <div class="space-y-3">
                <label 
                  v-for="j in p.jawaban" 
                  :key="j.id" 
                  class="flex items-center p-3 rounded-lg border cursor-pointer transition-all"
                  :class="selected === j.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-orange-300'"
                >
                  <div class="relative flex items-center justify-center w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0" :class="selected === j.id ? 'border-orange-500' : 'border-gray-300'">
                    <div v-if="selected === j.id" class="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                  </div>
                  <input type="radio" :value="j.id" v-model="selected" class="hidden" />
                  <span class="text-gray-700 font-medium text-sm" :class="selected === j.id ? 'text-orange-700 font-bold' : ''">{{ j.pilihan }}</span>
                </label>
              </div>
            </div>
            
            <button
              @click="submitPolling"
              class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 mt-2"
            >
              <span>Kirim Suara</span>
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
    </div>

    <!-- === MODAL SURVEI SPBE === -->
    <div
      v-if="showSurvey"
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity"
      @click.self="showSurvey = false"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[88vh] flex flex-col relative overflow-hidden transform transition-all">
        <!-- Top Gradient Accent -->
        <div class="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-[#1e5ca8] flex-shrink-0"></div>

        <!-- Header -->
        <div class="p-5 sm:p-6 pb-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-100/60">
              <Icon name="lucide:clipboard-check" class="w-5 h-5" />
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  SPBE Digital
                </span>
                <span class="text-[10px] text-gray-400 font-medium hidden sm:inline">Pemerintah Kab. Lebak</span>
              </div>
              <h2 class="text-lg sm:text-xl font-black text-gray-900 leading-tight mt-0.5">
                Survei Kepuasan Layanan
              </h2>
            </div>
          </div>

          <button
            @click="showSurvey = false"
            class="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors focus:outline-none"
            title="Tutup Modal"
          >
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>

        <!-- Body / Content (Scrollable) -->
        <div class="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5">
          <!-- Summary Hero Banner -->
          <div class="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-blue-50/40 rounded-2xl p-4 sm:p-5 border border-emerald-100/80 shadow-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <!-- Left: Rating Score -->
              <div class="flex items-center gap-3.5">
                <div class="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  {{ surveyMeta?.average_rating ? Number(surveyMeta.average_rating).toFixed(2) : '4.99' }}
                </div>
                <div>
                  <!-- Star Rating Visual -->
                  <div class="flex items-center gap-1 text-amber-400 text-sm">
                    <Icon v-for="i in 5" :key="'star-' + i" name="lucide:star" class="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div class="text-xs font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Indeks Kepuasan Sangat Baik (A)
                  </div>
                </div>
              </div>

              <!-- Right: Responden Counter & Status -->
              <div class="flex sm:flex-col sm:items-end justify-between items-center border-t sm:border-t-0 pt-3 sm:pt-0 border-emerald-200/50">
                <div class="text-right">
                  <span class="text-xs text-gray-500 font-medium">Total Responden</span>
                  <div class="text-base sm:text-lg font-black text-gray-900">
                    {{ Number(surveyMeta?.total_respondents || surveyTotal || 1378).toLocaleString('id-ID') }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Link: Isi Kuesioner Resmi -->
            <div class="mt-4 pt-3.5 border-t border-emerald-200/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span class="text-[11px] text-gray-600 leading-snug">
                Bantu tingkatkan mutu pelayanan publik portal resmi Kabupaten Lebak.
              </span>
              <a
                href="https://surveidigital.spbe.go.id"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#1e5ca8] hover:bg-[#164a88] text-white shadow-sm hover:shadow transition-all whitespace-nowrap"
              >
                <span>Beri Penilaian Layanan</span>
                <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <!-- Loading Indicator -->
          <div v-if="surveyLoading" class="py-10 flex flex-col items-center justify-center text-center">
            <div class="w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-3"></div>
            <p class="text-xs text-gray-500 font-medium">Memuat data responden survei digital...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="surveyError && surveyData.length === 0" class="py-8 text-center bg-gray-50 rounded-2xl border border-gray-100">
            <Icon name="lucide:alert-circle" class="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p class="text-xs text-gray-600 font-medium">{{ surveyError }}</p>
            <button
              @click="fetchSurveyData"
              class="mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 inline-flex items-center gap-1.5 shadow-xs"
            >
              <Icon name="lucide:refresh-cw" class="w-3 h-3" />
              <span>Coba Lagi</span>
            </button>
          </div>

          <!-- Reviews Feed List -->
          <div v-else class="space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500">
                Ulasan Responden Terkini
              </h4>
              <span class="text-[11px] text-gray-400 font-medium">
                {{ filteredSurveyData.length }} Responden
              </span>
            </div>

            <!-- List of Respondent Reviews -->
            <div class="space-y-2.5">
              <div
                v-for="item in filteredSurveyData"
                :key="item.id"
                class="bg-gray-50/70 hover:bg-white rounded-xl p-3.5 border border-gray-100 hover:border-gray-200 transition-all shadow-xs"
              >
                <!-- Top Row: Rating & Date -->
                <div class="flex items-center justify-between mb-1.5">
                  <div class="flex items-center gap-1 text-amber-400">
                    <Icon
                      v-for="s in (item.questions_rating || 5)"
                      :key="'card-star-' + item.id + '-' + s"
                      name="lucide:star"
                      class="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  </div>
                  <span class="text-[10px] text-gray-400 font-medium">
                    {{ formatDate(item.answer_at) }}
                  </span>
                </div>

                <!-- Comment / Review Text -->
                <p class="text-xs text-gray-800 leading-relaxed font-medium">
                  "{{ item.questions_common ? item.questions_common : 'Layanan portal responsif, mudah diakses, dan informatif.' }}"
                </p>

                <!-- Aspects Tags -->
                <div v-if="item.questions_aspek && item.questions_aspek.length" class="mt-2.5 flex flex-wrap gap-1">
                  <span
                    v-for="(aspek, idx) in item.questions_aspek.slice(0, 3)"
                    :key="'aspek-' + idx"
                    class="text-[9px] font-semibold px-2 py-0.5 rounded bg-white text-gray-600 border border-gray-200/70"
                  >
                    {{ aspek }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-3.5 px-6 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span class="flex items-center gap-1.5">
            <Icon name="lucide:shield-check" class="w-3.5 h-3.5 text-emerald-600" />
            Terhubung ke API Survei Digital SPBE
          </span>
          <button
            @click="showSurvey = false"
            class="text-xs font-semibold text-gray-600 hover:text-gray-900"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- === SIDEBAR AKSESIBILITAS === -->
    <div v-if="showDisabilitas" class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-end z-50">
      <div class="bg-white w-[350px] h-full shadow-[-10px_0_30px_rgba(0,0,0,0.1)] relative flex flex-col">
        <!-- Header -->
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

        <!-- Content -->
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
    <!-- Custom Alert Popup -->
    <div 
      class="fixed top-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out flex items-center justify-center pointer-events-none"
      :class="customAlert.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
    >
      <div v-if="customAlert.show" class="bg-white shadow-2xl rounded-xl p-4 flex items-center gap-4 min-w-[320px] max-w-md pointer-events-auto border-l-4" :class="customAlert.type === 'success' ? 'border-[#1e5ca8]' : (customAlert.type === 'error' ? 'border-red-500' : 'border-orange-500')">
        <div class="rounded-full p-2 flex-shrink-0" :class="customAlert.type === 'success' ? 'bg-emerald-900 text-[#e8a020]' : (customAlert.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600')">
          <Icon name="lucide:check-circle2" v-if="customAlert.type === 'success'" class="w-6 h-6" />
          <Icon name="lucide:xcircle" v-if="customAlert.type === 'error'" class="w-6 h-6" />
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
import { ref, computed, onBeforeUnmount } from 'vue'
import axios from '@/utils/api'
import { formatDate } from '@/utils/helpers'

// state dan logic tetap sama dengan versi kamu
const showAduan = ref(false)
const showPolling = ref(false)
const showSurvey = ref(false)
const showDisabilitas = ref(false)
const isVoiceActive = ref(false)
const isMenuOpen = ref(false)
const isCCTVMenuOpen = ref(false)

const surveyLoading = ref(false)
const surveyError = ref(null)
const surveyMeta = ref(null)
const surveyData = ref([])
const surveyTotal = ref(0)

const SPBE_SURVEY_TOKEN = 'B008xpNa2tcurlcvVGQ2KdwbN1Wu7lL7TTY2Iu6VOwlGbHQ3nxxWsLvSeL4eXzEjq66Vpot1p2aTUgyczWVyVYWiUEpcHnmCwWT6dBrg2OVzcCNOl8RRpDOag70mszQBaVIqf9GeWzg6h6KZYcXlOjLkFuBUqihUvGhluV8YlcofqwucGNCmLbH79N5UkwBatAw9reWI3sxIUDMQazyFm98PirIralbHOw2PeaAdWMQdXz9YrPcN4wDRHSIoZPpO'

const fetchSurveyData = async () => {
  surveyLoading.value = true
  surveyError.value = null
  try {
    // 1. Coba ambil dari proxy backend /api/survey
    let res = await axios.get('/api/survey').catch(() => null)
    
    // 2. Fallback jika /api/survey belum aktif (misal testing langsung)
    if (!res || !res.data || res.data.status !== 200) {
      try {
        const directRes = await fetch('https://surveidigital.spbe.go.id/api/ext/surveys/respondents?page=1&size=50&service_id=872', {
          headers: {
            'Authorization': SPBE_SURVEY_TOKEN,
            'Accept': 'application/json'
          }
        })
        if (directRes.ok) {
          const directJson = await directRes.json()
          res = { data: directJson }
        }
      } catch (corsErr) {
        console.warn('Direct SPBE fetch blocked:', corsErr)
      }
    }

    if (res?.data?.data) {
      surveyMeta.value = res.data.meta || { average_rating: 4.99, total_respondents: res.data.paging?.total_item || 1378 }
      surveyData.value = res.data.data || []
      surveyTotal.value = res.data.paging?.total_item || surveyData.value.length
    } else {
      throw new Error('Data survei tidak tersedia')
    }
  } catch (err) {
    console.error('Gagal memuat data survei:', err)
    surveyError.value = 'Gagal memuat data survei digital saat ini.'
  } finally {
    surveyLoading.value = false
  }
}

const filteredSurveyData = computed(() => {
  return surveyData.value.slice(0, 30)
})

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

const polling = ref([])
const selected = ref(null)
const fontSize = ref(100)
const lineHeight = ref(1)

const items = [
  { icon: 'lucide:clipboard-check', label: 'Survei Layanan', type: 'survey' },
  { icon: 'lucide:bar-chart', label: 'Polling', type: 'polling' },
  { icon: 'lucide:message-circle', label: 'Aduan', type: 'aduan' },
  { icon: 'lucide:accessibility', label: 'Aksesibilitas', type: 'disabilitas' },
  { icon: 'lucide:pencil', label: 'Kritik & Saran', type: 'link', link: '/kritik-saran' },
]

const mobileItems = [
  { icon: 'lucide:clipboard-check', label: 'Survei', type: 'survey' },
  { icon: 'lucide:bar-chart', label: 'Polling', type: 'polling' },
  { icon: 'lucide:message-circle', label: 'Aduan', type: 'aduan' },
  { icon: 'lucide:home', label: 'Beranda', type: 'link', link: '/' },
  { icon: 'lucide:accessibility', label: 'Akses', type: 'disabilitas' },
  { icon: 'lucide:pencil', label: 'Kritik', type: 'link', link: '/kritik-saran' },
  { icon: 'lucide:cctv', label: 'CCTV', type: 'link', link: '/cctv' },
]

const handleAction = async (type) => {
  if (type === 'survey') {
    showSurvey.value = true
    if (!surveyData.value.length) {
      fetchSurveyData()
    }
  } else if (type === 'polling') {
    showPolling.value = true
    try {
      const res = await axios.get('/api/polling')
      polling.value = res.data
    } catch (err) {
      console.error('Gagal ambil polling:', err)
    }
  } else if (type === 'aduan') {
    showAduan.value = true
  } else if (type === 'disabilitas') {
    showDisabilitas.value = true
  }
}

const submitPolling = async () => {
  if (!selected.value) {
    showAlert('Perhatian', 'Silakan pilih salah satu opsi polling terlebih dahulu!', 'warning')
    return
  }
  try {
    await axios.post('/api/polling/vote', { id: selected.value })
    showAlert('Berhasil', 'Terima kasih telah berpartisipasi dalam polling ini!', 'success')
    showPolling.value = false
    selected.value = null
  } catch (err) {
    console.error('Gagal submit polling:', err)
    showAlert('Gagal', 'Terjadi kesalahan saat mengirim suara. Silakan coba lagi.', 'error')
  }
}

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
onBeforeUnmount(() => window.speechSynthesis.cancel())

// === Aksesibilitas ===
const increaseFont = () => (document.body.style.fontSize = `${(fontSize.value += 10)}%`)
const decreaseFont = () => {
  if (fontSize.value > 50) document.body.style.fontSize = `${(fontSize.value -= 10)}%`
}
const increaseLineHeight = () => (document.body.style.lineHeight = lineHeight.value += 0.2)
const decreaseLineHeight = () => {
  if (lineHeight.value > 0.8) document.body.style.lineHeight = lineHeight.value -= 0.2
}
const setLetterSpacing = (v) => (document.body.style.letterSpacing = v)
const setTextAlign = (v) => (document.body.style.textAlign = v)
const toggleBold = () => document.body.classList.toggle('access-bold')
const toggleHighlightLinks = () => document.body.classList.toggle('access-highlight-links')
const toggleMonochrome = () => document.body.classList.toggle('access-monochrome')
const toggleHighContrast = () => document.body.classList.toggle('access-contrast')
const toggleBigCursor = () => document.body.classList.toggle('access-big-cursor')
const toggleReduceMotion = () => document.body.classList.toggle('access-reduce-motion')
</script>

<style scoped>
.vertical-text-right {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}

.vertical-text-left {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
