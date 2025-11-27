document.addEventListener('DOMContentLoaded', () => {
    // Date Display
    const dateDisplay = document.getElementById('currentDate');
    if (dateDisplay) {
        dateDisplay.textContent = new Date().getFullYear();
    }

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active State
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter;

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'grid';
                    // Small delay to allow display:grid to apply before opacity transition
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 50);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500); // Wait for transition
                }
            });
        });
    });

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectItems.forEach(item => {
        observer.observe(item);
    });

    // --- Language Support ---
    const translations = {
        ko: {
            hero_subtitle: "우리는 정교함과 열정으로 디지털 경험을 경작합니다. 단순함에 뿌리를 둔 혁신.",
            scroll_indicator: "스크롤하여 탐험하기",
            filter_all: "전체",
            filter_games: "게임",
            filter_novels: "소설",
            filter_apps: "앱",
            cat_game: "게임",
            cat_novel: "소설",
            cat_app: "앱",
            title_fencekeeper: "양치기 소년",
            desc_fencekeeper: "평화로운 초원에서 양무리를 돌보는 힐링 시뮬레이션. (PC 최적화)",
            title_cheonlajimang: "천라지망",
            desc_cheonlajimang: "무협의 전설, 『신조협려』 속 양과의 절기 '천라지망'을 직접 체험하세요.",
            title_gosu: "양치기 소년: 은둔고수",
            desc_gosu: "평범해 보이는 양치기 소년, 사실은 무림의 은둔고수였다?",
            title_guppy: "구피 연구소",
            desc_guppy: "나만의 특별한 구피를 개량하고 키워보세요!",
            title_slide: "슬라이드 퍼즐",
            desc_slide: "내 사진으로 즐기는 커스텀 슬라이드 퍼즐 게임.",
            title_mars: "(화성 행정관)",
            desc_mars: "화성 식민지의 AI 행정관과 이에 맞서는 인간들의 이야기. 무엇이 진정한 최선인가?",
            title_fridge: "스마트 냉장고",
            desc_fridge: "냉장고 속 재료를 효율적으로 관리하는 스마트 키친 도구.",
            title_asset: "자산 그래프",
            desc_asset: "월별·연도별 자산 변화를 시각화하여 보여주는 대시보드.",
            btn_launch: "프로젝트 실행",
            btn_soon: "준비중",
            btn_open: "앱 열기"
        },
        en: {
            hero_subtitle: "We cultivate digital experiences with precision and passion. Innovation rooted in simplicity.",
            scroll_indicator: "Scroll to Explore",
            filter_all: "All",
            filter_games: "Games",
            filter_novels: "Novels",
            filter_apps: "Apps",
            cat_game: "Game",
            cat_novel: "Novel",
            cat_app: "App",
            title_fencekeeper: "Fence Keeper",
            desc_fencekeeper: "Become a shepherd in a peaceful meadow. A healing simulation game optimized for PC.",
            title_cheonlajimang: "Cheonlajimang",
            desc_cheonlajimang: "Experience the legendary martial arts technique from 'The Return of the Condor Heroes'.",
            title_gosu: "Gosu Shepherd",
            desc_gosu: "The shepherd was actually a hidden master of martial arts. A twist on the classic simulation.",
            title_guppy: "Guppy Lab",
            desc_guppy: "Create your own special Guppy fish through selective breeding and genetics.",
            title_slide: "Slide Puzzle",
            desc_slide: "A custom slide puzzle game using your own photos.",
            title_mars: "Mars Administrator",
            desc_mars: "An AI administrator on a penal colony vs. human rebellion. What is the true definition of 'Optimal'?",
            title_fridge: "Fridge Mate",
            desc_fridge: "Smart inventory management for your kitchen.",
            title_asset: "Asset Graph",
            desc_asset: "Visual dashboard for tracking monthly and yearly asset growth.",
            btn_launch: "Launch Project",
            btn_soon: "Coming Soon",
            btn_open: "Open App"
        }
    };

    const langBtns = document.querySelectorAll('.lang-btn');

    // Check browser language or default to KO
    let currentLang = localStorage.getItem('podo_lang') || 'ko';
    updateLanguage(currentLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            updateLanguage(lang);
        });
    });

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('podo_lang', lang);

        // Update Buttons
        langBtns.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update Text
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }
});
