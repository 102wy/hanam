
$(document).ready(function () {
});
window.onload = function () {
    
    // 모달창 관련 코드
    $('.modal-close').click(function(){
        $('.modal').hide();
    })
    
    // 주메뉴 관련 코드
    var sc_y = $(window).scrollTop();

    $(window).scroll(function () {
        sc_y = $(window).scrollTop();

        if (sc_y > 50) {

            $('body').addClass('body-focus');
            $('.header').addClass('header-focus');
            $('.header-main').addClass('header-main-focus');
            $('.menu > li').addClass('menu-li-focus');
            $('.menu > li > a').addClass('menu-li-a-focus');
            $('.help').addClass('help-focus');
            $('.logo').addClass('logo-focus');
            $('.depth2-wrap').addClass('depth2-wrap-focus');
        } else {
            $('body').removeClass('body-focus');
            $('.header').removeClass('header-focus');
            $('.header-main').removeClass('header-main-focus');

            $('.menu > li').removeClass('menu-li-focus');
            $('.menu > li > a').removeClass('menu-li-a-focus');

            $('.help').removeClass('help-focus');
            $('.logo').removeClass('logo-focus');
            $('.depth2-wrap').removeClass('depth2-wrap-focus');
        }
    });

    // 기타 상단 관련 코드
    $('.language').click(function (e) {
        // href 막기
        e.preventDefault();
        $('.language-list').stop().slideToggle('fast');
        $(this).toggleClass('language-focus-right');
    });

    $('.language-list > li > a').click(function (e) {

        e.preventDefault();
        $('.language-list').stop().slideUp('fast');
        $('.language').removeClass('language-focus-right');

    });


    // 사이트 검색 관련

    $('.search-bt').click(function () {
        $('.search-wrap').fadeToggle('fast');
        $(this).toggleClass('search-bt-focus');

        // 폼태그의 내용 비우기
        $('.search-word').val('');
    });

    // 메뉴관련 코드
    // 주메뉴 모음
    var mainmenu = $('.menu > li > a');

    // 늘어나야 하는 영역
    var depth2_wrap = $('.depth2-wrap');

    // 어느만큼 늘어나야 하는가?
    var depth2_height = [
        490, 570, 680, 430, 485, 350
    ];
    
    // depth2를 저장한다.
    var depth2_div = $('.depth2');
    
    // 주메뉴 hover 시 처리
    $.each(mainmenu, function (index, item) {
        $(this).mouseenter(function () {

            // 서브메뉴 영역의 높이를 변경한다
            // 그림자 추가한다
            depth2_wrap.addClass('depth2-wrap-shadow');
            depth2_wrap.stop().animate({
                height: depth2_height[index]
            });
            
            // 일단 모든 depth2 fadeOut
            depth2_div.stop().fadeOut(500);
            depth2_div.eq(index).stop().fadeIn(500);
        });
    });

    // gnb 마우스 아웃하면 메뉴 영역 사라져라
    $('.gnb').mouseleave(function () {

        depth2_wrap.stop().animate({
            height: 0
        }, function () {
            // 그림자 삭제한다.
            depth2_wrap.removeClass('depth2-wrap-shadow');
            // depth2 를 숨긴다.
            depth2_div.hide();
        });
    });

    // 말줄임
    $(".pic-txt").dotdotdot({
        wrapper: 'div',
        /*  콘텐트를 감쌀 요소. */
        ellipsis: '... ',
        /*  말줄임표를 뭘로 할지 */
        wrap: 'letter',
        /*  자를 단위. 다음 옵션 중 하나 선택: 'word'/'letter'/'children' */
        after: null,
        /*  자르고 나서도 유지시킬 요소를 jQuery 선택자로 적는다. */
        watch: false,
        /*  윈도우가 리사이즈될 때 업데이트할 건지: true/'window' */
        height: 70,
        /*  선택. max-height를 지정한다. 만약 null이면 알아서 잰다. */
        tolerance: 0 /*  글이 넘치면 이만큼쯤 height를 늘린다 */
    });



    // city-info 링크 슬라이드
    // 정보영역 슬라이드 옵션을 저장한다.

    var sw_info_opt = {
        // 무한반복
        loop: true,
        // 모션 속도 조절
        speed: 1000,
        // 몇장을 보여줄 것인가?
        slidesPerView: 1,
        pagination: {
            el: '.sw-info-pg',
            type: 'fraction'
        },
        navigation: {
            prevEl: '.sw-info-prev',
            nextEl: '.sw-info-next',
        },
        observer: true,
        observeParents: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        }

    };

    // city-ad 링크 슬라이드
    // 홍보 슬라이드 옵션을 저장한다.
    var sw_ad_opt = {

        // 무한반복
        loop: true,
        // 모션 속도 조절
        speed: 500,
        // 몇장을 보여줄 것인가?
        slidesPerView: 1,
        pagination: {
            el: '.sw-ad-pg',
            type: 'fraction'
        },
        navigation: {
            prevEl: '.sw-ad-prev',
            nextEl: '.sw-ad-next',
        },
        observer: true,
        observeParents: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        }
    };

    // swiper toggle 버튼
    var city_ad_cate = $('.city-ad-cate');
    var city_sw_wrap = $('.city-sw-wrap');
    var city_sw_bt = $('.sw-city-bt');

    // 슬라이드가 배치되는 div 중 첫번째 것을 보여준다
    city_sw_wrap.eq(0).show();
    // 정보 슬라이드를 처음으로 보여주기 위해서 만든다
    var sw_info = new Swiper('.sw-info', sw_info_opt);

    // 활성화 된 슬라이드 번호 저장
    var city_sw_index = 0;

    // 플레이어 버튼 처리
    $.each(city_sw_bt, function (index, item) {

        $(this).click(function () {
            if (city_sw_index == index) {
                // 아이콘을 바꾼다.
                var ok = $(this).hasClass('sw-city-pause');
                if (ok == true) {
                    // 다시 자동 실행하라
                    startSw(index);
                } else {
                    // 자동 실행 멈춰라
                    stopSw(index);
                }
            }

        });

    });

    // 스위퍼를 멈추는 기능
    function stopSw(_aaa) {
        if (_aaa == 0) {
            // 정보 슬라이드 자동실행을 멈춘다.

            sw_info.autoplay.stop();
            city_sw_bt.eq(0).addClass('sw-city-pause');
        } else if (_aaa == 1) {
            // 홍보 슬라이드 자동실행을 멈춘다.
            sw_ad.autoplay.stop();
            city_sw_bt.eq(1).addClass('sw-city-pause');
        }
    }


    // 스위퍼 재실행 기능
    function startSw(_aaa) {
        if (_aaa == 0) {
            // 정보 슬라이드 자동재생 한다
            sw_info.autoplay.start();
            // 눌렀을 때 이모티콘 바꾸기
            city_sw_bt.eq(0).removeClass('sw-city-pause');
        } else if (_aaa == 1) {
            // 홍보 슬라이드 자동재생 한다
            sw_ad.autoplay.start();
            // 눌렀을 때 이모티콘 바꾸기
            city_sw_bt.eq(1).removeClass('sw-city-pause');
        }
    }

    // 상단의 버튼을 클릭 했을 때 슬라이드 보여주기, 숨기기
    $.each(city_ad_cate, function (index, item) {
        $(this).click(function () {
            // 이미 오픈되어 있는 버튼을 누른 경우라면
            if (city_sw_index == index) {
                return;
            }
            // 기존에 보였던것은 어떻게 하지?
            city_sw_bt.removeClass('sw-city-bt-pause');

            if (index == 0) {
                // info 버튼 누른경우
                sw_ad.destroy();
                sw_info = new Swiper('.sw-info', sw_info_opt);

            } else if (index == 1) {
                // ad 버튼 누른경우
                sw_info.destroy();
                sw_ad = new Swiper('.sw-ad', sw_ad_opt);
            }


            city_sw_index = index;


            city_ad_cate.removeClass('city-ad-cate-focus');
            city_ad_cate.eq(index).addClass('city-ad-cate-focus');

            city_sw_wrap.hide();
            city_sw_wrap.eq(index).show();
        });
    });



    // 뉴스 슬라이드
    var sw_news_opt = {
        slidesPerView: 3,
        spaceBetween: 8,
        navigation: {
            prevEl: '.city-news-prev',
            nextEl: '.city-news-next',
        },
        pagination: {
            el: '.city-news-pg',
            type: 'fraction',
        },
        observer: true,
        observeParents: true,
    };

    // 뉴스 슬라이드 버튼
    var sw_news_menu = $('.city-news-list > li');

    // 슬라이드 div 저장
    var sw_news_slide = $('.city-news-slide > .swiper-container');

    // 뉴스 공지사항 슬라이드
    var sw_news_1 = new Swiper('.sw-news-1', sw_news_opt);

    $.each(sw_news_menu, function (index, item) {

        var lis = $(this);
        var span_bt = $(this).find('>span');

        span_bt.click(function () {
            // 적용된 포커스를 제거
            sw_news_menu.removeClass('news-focus');
            // 새롭게 li에 focus 적용           
            lis.addClass('news-focus');
            // 이제 swiper를 만들어라

            // 기존 swiper 제거
            sw_news_1.destroy();
            sw_news_slide.hide(); // 모든 슬라이드 display:none;
            sw_news_slide.eq(index).show(); // 1개는 보여주자
            // 새로운 스위퍼 만들자
            // 클릭된 번호에 해당하는 클래스 단어를 만들자
            // .sw-news- + (0 + 1) = .sw-news-1
            // .sw-news- + (1 + 1) = .sw-news-2
            // .sw-news- + (2 + 1) = .sw-news-3

            var temp = '.sw-news-' + (index + 1);
            sw_news_1 = new Swiper(temp, sw_news_opt);
        });
    });

    $('.news-tit').dotdotdot({
        wrapper: 'div',
        ellipsis: '... ',
        wrap: 'letter',
        after: null,
        watch: false,
        height: null,
        tolerance: 0
    });

    $('.news-desc').dotdotdot({
        wrapper: 'div',
        ellipsis: '... ',
        wrap: 'letter',
        after: null,
        watch: false,
        height: null,
        tolerance: 0
    });



    // favo 링크 슬라이드
    var sw_favo_opt = {
        loop: true,
        speed: 500,
        slidesPerView: 9,
    };
    var sw_favo = new Swiper('.sw-favo', sw_favo_opt);

    // 현재 어떤 상태인지를 저장해 둔다.
    var sw_favo_state = 'slide';

    var sw_favo_more = $('.favo-more');
    sw_favo_more.click(function (e) {
        // href 를 막는다.
        e.preventDefault();
        if (sw_favo_state == 'slide') {
            sw_favo.destroy();
            // float 로 스타일링 한다.
            sw_favo_state = 'block';
            $('.sw-favo .swiper-slide').css('width', 'auto');
            $('.sw-favo .swiper-slide').css('height', 144);
            $('.sw-favo .swiper-slide:last-child .city-favo-link').addClass('city-favo-link-last');

            $('.city-favo-slide').css('height', 320);
            $('.sw-favo .swiper-wrapper').css('flex-wrap', 'wrap');
            $('.city-favo-link').css('width', 144.45);

            // 클래스 추가한다.
            $(this).addClass('favo-more-block');
            $(this).text('닫기');

        } else {

            $('.sw-favo .swiper-slide').css('width', '100%');
            $('.sw-favo .swiper-slide').css('height', '100%');
            $('.sw-favo .swiper-slide:last-child .city-favo-link').removeClass('city-favo-link-last');
            $('.city-favo-slide').css('height', 160);
            $('.sw-favo .swiper-wrapper').css('flex-wrap', 'nowrap');
            $('.city-favo-link').css('width', 140);

            sw_favo = new Swiper('.sw-favo', sw_favo_opt);
            // 슬라이드 상태로 변경
            sw_favo_state = 'slide';

            // 클래스 제거한다.
            $(this).removeClass('favo-more-block');
            $(this).text('전체보기');
        }

    });

    // sns 슬라이드
    var sw_sns_opt = {
        loop: false,
        slidesPerView: 5,
        spaceBetween: 30,
    };

    // sns 버튼 관련 코드
    var 버튼들 = $('.sns-bt');
    // 시작할 때 sw_sns_new 를 만든다.
    var sw_sns = new Swiper('.sw-sns-new', sw_sns_opt);

    $.each(버튼들, function (index, item) {

        $(this).click(function () {

            $('.city-sns-list button').removeClass('sns-bt-active');

            $(this).addClass('sns-bt-active');

            $('.city-sns-wrap > div').removeClass('slide-sns-active');

            // 일단 슬라이드 지운다.
            sw_sns.destroy();

            if (index == 0) {
                $('.slide-fb').addClass('slide-sns-active');
                sw_sns = new Swiper('.sw-sns-fb', sw_sns_opt);
            }
            if (index == 1) {
                $('.slide-bg').addClass('slide-sns-active');
                sw_sns = new Swiper('.sw-sns-bg', sw_sns_opt);
            }
            if (index == 2) {
                $('.slide-yt').addClass('slide-sns-active');
                sw_sns = new Swiper('.sw-sns-yt', sw_sns_opt);
            }

        });

    });
    // 하단 배너 슬라이드
    var sw_banner_opt = {
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        direction: 'vertical',
        speed: 600,
        navigation: {
            prevEl: '.bt-up',
            nextEl: '.bt-down',
        }
    }

    var sw_banner = new Swiper('.sw-banner', sw_banner_opt);

    // 일시멈춤
    var sw_banner_bt = $('.bt-pause');
    sw_banner_bt.click(function (e) {
        //href막기
        e.preventDefault();
        $(this).toggleClass('bt-stop');
        var temp = $(this).hasClass('bt-stop');
        if (temp == true) {
            sw_banner.autoplay.stop();
        } else {
            sw_banner.autoplay.start();
        }
    });
}
