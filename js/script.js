// html 요소를 참조하는 법
// html 요소 및 이미지, 동영상, 사운드 등.
// 모든 요소가 갖추어지면 실행하도록 한다.
// 아래코드는 딱 한번만 작성한다.
window.onload = function () {
  //crwn 코딩 알림창
  const cwnAlert = document.querySelector(".cwnAlert");
  const cwnBt = document.querySelector(".crwn-close-bt");
  const wrapAll = document.querySelector(".wrap");
  const fixMenu = document.querySelector(".fix-menu");
  cwnBt.addEventListener("click", function () {
    cwnAlert.style.display = "none";
    wrapAll.style.opacity = "1";
    fixMenu.style.opacity = "1";
  });

  // 콤마기능
  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 펼침 목록들 보기 기능
  // 더보기 버튼 저장(button .more-menu-bt #menu-bt)
  {
    const menuBt = document.getElementById("menu-bt");
    const menuList = document.getElementById("menu-list");
    // 참여 목록 기능
    const joinBt = document.getElementById("join-bt");
    const joinList = document.getElementById("join-list");
    // 조합원센터 목록 기능
    const centerBt = document.getElementById("center-bt");
    const centerList = document.getElementById("center-list");
    // 배열은 순서번호가 주어진다.
    // 순서번호를 index 라고 호칭한다.
    const toggleListArr = [menuList, joinList, centerList];
    const toggleBtArr = [menuBt, joinBt, centerBt];

    // html 클릭시 펼침목록 모두 !!! 닫기
    // 이벤트 명 다음에 할일(콜백함수 - Hook 예로)
    document.addEventListener("click", function () {
      toggleListArr.forEach(function (item) {
        item.style.display = "none";
      });
      // 버튼초기화
      toggleBtArr.forEach(function (item) {
        item.classList.remove("active");
      });
    });

    // 목록 전체를 클릭해도 이벤트 전달을 막는다
    toggleListArr.forEach(function (item) {
      item.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });

    function listToggle(버튼, 목록) {
      목록.style.display = "none";
      버튼.addEventListener("click", function (event) {
        // 클릭되었다는 이벤트는 아래로 전달된다
        // 클릭된 이벤트를 아래로 전달하지 못하도록 막아준다
        event.stopPropagation();

        // 일단 모든 버튼들을 그냥 초기화하자.
        // 선택 상관없이
        toggleBtArr.forEach(function (item) {
          item.classList.remove("active");
        });

        const nowListId = 목록.getAttribute("id");
        const hideArr = toggleListArr.filter(function (item) {
          let id = item.getAttribute("id");
          if (id !== nowListId) {
            return this;
          }
        });
        hideArr.forEach(function (item) {
          item.style.display = "none";
        });
        if (this.tagName === "A") {
          event.preventDefault();
        }
        const css = getComputedStyle(목록).display;
        if (css === "none") {
          목록.style.display = "block";
          // 클래스 강제로 추가하기
          this.style.add("active");
        } else {
          목록.style.display = "none";
          // 클래스 강제로 삭제하기
          this.style.remove("active");
        }
      });
    }
    listToggle(menuBt, menuList);
    listToggle(joinBt, joinList);
    listToggle(centerBt, centerList);
    // 위로가기 기능
    // 위로가기 버튼 html 요소를 저장한다.
    // css 를 활용한 선택법
    // 만약 클래스를 활용해서 선택한다면
    // querySelector (1개)
    // querySelectorAll (여러개) :[] 배열
    const fixTopBt = document.querySelector(".fix-top");
    fixTopBt.addEventListener("click", function () {
      // 스크롤바를 최상단으로 이동한다.
      // window.scrollTo({
      //   top: 0,
      //   behavior: "smooth",
      // });

      // GSAP 버전
      // gsap.to(window, 0.4, {
      //   scrollTo: 0,
      // });
      // Anime.js 버전
      const scrollElement =
        window.document.scrollingElement ||
        window.document.body ||
        window.document.documentElement;
      anime({
        targets: scrollElement,
        scrollTop: 0,
        duration: 600,
        easing: "easeInOutQuad",
      });
    });
  }

  {
    // 오늘의 상품 기능
    // const todaygood = {
    //   name: "콩콩크림빵",
    //   unit: "1개",
    //   price: 1500,
    //   tag: "인기",
    //   pic: "good_1.jpg",
    //   id: "0",
    //   link: "#",
    // };
    let VISUAL_ARR;
    let visualTag = document.getElementById("data-visual");
    // 오늘의 상품 데이터 보관
    let TODAY_GOOD;
    let todayTag = document.getElementById("data-today");
    let todayTag2 = document.getElementById("data-today2");

    let SALE_GOOD;
    let saleTag = document.getElementById("data-sale");

    let NEW_GOOD;
    let newTag = document.getElementById("data-new");
    let newListTag = document.getElementById("data-new-list");

    let RECOMMEND_GOOD;
    let recommendTag = document.getElementById("data-recommend");

    let POPULAR_ICON;
    let popularIconTag = document.getElementById("data-popular-icon");

    let POPULAR_GOOD;
    let popularShow = 0; // 목록중 0번을 보여준다
    let popularTag = document.getElementById("data-popular");

    let BANNER_ARR;
    let bannerTag = document.getElementById("data-banner");

    let BRAND_ARR;
    let brandTag = document.getElementById("data-brand");

    let REVIEW_ARR;
    let reviewTag = document.getElementById("data-review");

    let NOTICE_ARR;
    let noticeTag = document.getElementById("data-notice");

    let GOODNEWS_ARR;
    let goodnewsTag = document.getElementById("data-goodnews");

    let SEASON_ARR;
    let seasonTag = document.getElementById("data-season");

    // 비주얼 화면 출력 기능
    function showVisual() {
      let html = "";
      VISUAL_ARR.forEach(function (item) {
        let tag = `
      <div class="swiper-slide">
        <div class="visual-slide-page">
          <a href="${item.link}">
            <img src="images/${item.pic}" alt="${item.name}" />
          </a>
        </div>
      </div>
        `;
        html += tag;
      });
      visualTag.innerHTML = html;
      // 비주얼 슬라이드 기능
      const swVisual = new Swiper(".sw-visual", {
        loop: true,
        navigation: {
          prevEl: ".visual-prev",
          nextEl: ".visual-next",
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".visual-pg",
          type: "fraction",
        },
      });
      // 비주얼 슬라이드 멈춤기능
      const swVisualPlay = document.querySelector(".visual-play");
      swVisualPlay.addEventListener("click", function () {
        // 현재 active 클래스가 있는지 없는지 판단하고
        // 기능을 설정한다.
        if (swVisualPlay.classList.contains("active")) {
          // 새로 시작
          swVisual.autoplay.start();
          swVisualPlay.classList.remove("active");
        } else {
          swVisual.autoplay.stop();
          swVisualPlay.classList.add("active");
        }
      });
    }
    // 오늘의 상품 화면 출력 기능
    function showTodayGood() {
      // console.log(TODAY_GOOD);
      let htmlTop = "";
      let htmlBottom = "";
      // 조건에 맞는 배열 만들기
      // 인덱스 0~3까지 배열만들기
      const topArr = TODAY_GOOD.filter(function (item, index) {
        // console.log(item, index);
        if (index < 4) {
          return item;
        }
      });
      // console.log(topArr);
      topArr.forEach(function (item) {
        let tag = `
        <div class="good-box">
            <!-- 제품이미지 -->
            <a href="${item.link}" class="good-img">
              <img src="images/${item.pic}" alt="${item.name}" />
              <span class="good-type">${item.tag}</span>
            </a>
            <!-- 제품정보 -->
            <a href="${item.link}" class="good-info">
              <em>${item.name}</em>(<em>${item.unit}</em>)
            </a>
            <!-- 제품가격 -->
            <a href="${item.link}" class="good-info-price">${priceToString(
          item.price
        )}<em>원</em></a>
            <!-- 장바구니 -->
            <button class="good-add-cart"></button>
        </div>
      `;

        htmlTop += tag;
      });

      // 인덱스 4~7까지 배열만들기
      const botArr = TODAY_GOOD.filter(function (item, index) {
        if (index > 3) {
          return item;
        }
      });

      botArr.forEach(function (item) {
        let tag = `
          <div class="good-box">
            <!-- 제품이미지 -->
            <a href="${item.link}" class="good-img">
              <img src="images/${item.pic}" alt="${item.name}" />
              <span class="good-type">${item.tag}</span>
            </a>
            <!-- 제품정보 -->
            <a href="${item.link}" class="good-info">
              <em>${item.name}</em>(<em>${item.unit}</em>)
            </a>
            <!-- 제품가격 -->
            <a href="${item.link}" class="good-info-price">${priceToString(
          item.price
        )}<em>원</em></a>
            <!-- 장바구니 -->
            <button class="good-add-cart"></button>
        </div>
        `;
        htmlBottom += tag;
      });

      todayTag.innerHTML = htmlTop;
      todayTag2.innerHTML = htmlBottom;
    }
    // 알뜰 상품 화면 출력 기능
    function showSaleGood() {
      let html = `
      <div class="swiper sw-sale">
        <div class="swiper-wrapper">
      `;
      SALE_GOOD.forEach(function (item) {
        let tag = `
        <div class="swiper-slide">
          <div class="good-box">
              <!-- 제품이미지 -->
              <a href="${item.link}" class="good-img">
                <img src="images/${item.pic}" alt="${item.name}" />
                <span class="good-type">${item.tag}</span>
              </a>
              <!-- 제품정보 -->
              <a href="${item.link}" class="good-info">
                <em>${item.name}</em>(<em>${item.unit}</em>)
              </a>
              <!-- 제품가격 -->
              <a href="${item.link}" class="good-info-price">${priceToString(
          item.price
        )}<em>원</em></a>
              <!-- 장바구니 -->
              <button class="good-add-cart"></button>
          </div>
        </div>
      `;
        html += tag;
      });
      html += `
        </div>
      </div>
      `;
      saleTag.innerHTML = html;

      var swSale = new Swiper(".sw-sale", {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 3,
        navigation: {
          prevEl: ".sale .slide-prev",
          nextEl: ".sale .slide-next",
        },
        pagination: {
          el: ".sale .slide-pg",
          type: "fraction",
        },
      });
    }
    // 신상품 화면 출력 기능
    function showNewGood() {
      // 첫번째 출력자료
      let obj = NEW_GOOD[0];
      let newGoodFirst = `
      <a href="${obj.link}" class="new-img">
        <img src="images/${obj.pic}" alt="${obj.title}" />
      </a>
      <a href="${obj.link}" class="new-title">${obj.title}</a>
      <a href="${obj.link}" class="new-txt">${obj.txt}</a>
    `;
      newTag.innerHTML = newGoodFirst;
      // 나머지 출력 1~4번
      let html = "";
      let tag = "";
      NEW_GOOD.forEach(function (item, index) {
        // 0번이 아닌경우만
        if (index !== 0) {
          tag = `
        <div class="new-box" id="data-new-list">
          <a href="${item.link}" class="new-box-img">
            <img src="images/${item.pic}" alt="${item.title}" />
          </a>
          <a href="${item.link}" class="new-box-title">
          ${item.title}
          </a>
        </div>`;
        }
        html += tag;
      });
      newListTag.innerHTML = html;
    }
    // 추천 상품 화면 출력 기능
    function showRecommendGood() {
      let html = `
      <div class="swiper sw-recommend">
        <div class="swiper-wrapper">
      `;
      RECOMMEND_GOOD.forEach(function (item) {
        let tag = `
        <div class="swiper-slide">
          <div class="good-box">
          <!-- 제품 이미지 -->
          <a href="${item.link}" class="good-img">
            <img src="images/${item.pic}" alt="${item.name}" />
            <span class="good-type">${item.tag}</span>
          </a>
          <!-- 제품정보 -->
          <a href="${item.link}" class="good-info">
            <em>${item.name}</em>(<em>${item.unit}</em>)
          </a>
          <!-- 제품가격 -->
          <a href="${item.link}" class="good-info-price">${priceToString(
          item.price
        )}<em>원</em></a>
          <!-- 장바구니 -->
          <button class="good-add-cart"></button>
          </div>
        </div>
        `;

        html += tag;
      });
      html += `
        </div>
      </div>
      `;
      recommendTag.innerHTML = html;

      var swRecommend = new Swiper(".sw-recommend", {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 3,
        navigation: {
          prevEl: ".recommend .slide-prev",
          nextEl: ".recommend .slide-next",
        },
        pagination: {
          el: ".recommend .slide-pg",
          type: "fraction",
        },
      });
      // 만약에 목록의 개수가 모자랄 경우
      // 1/1 출력한다.
      // 0/0
      const sg = document.querySelector(".recommend .slide-pg");
      sg.style.display = "block";
      if (RECOMMEND_GOOD.length == 0) {
        sg.innerHTML = "0/0";
      } else if (RECOMMEND_GOOD.length < 3) {
        sg.innerHTML = "1/1";
      }
    }
    // 인기 상품 아이콘 화면 출력 기능
    function showPopularIcon() {
      let html = `
      <div class="swiper sw-icon">
        <div class="swiper-wrapper">
      `;
      POPULAR_ICON.forEach(function (item) {
        const tag = `
          <div class="swiper-slide">
            <a href="${item.link}">
              <span
                class="popular-cate-icon"
                style="
                  background: url('images/${item.icon}') no-repeat;
                  background-position: 0px 0px;
              ">
              </span>
              <span class="popular-cate-name">${item.txt}</span>
            </a>
          </div>
        `;
        html += tag;
      });
      html += `
        </div>
      </div>
      `;
      // html 이 화면에 배치하고 나야 js로 참조 0
      popularIconTag.innerHTML = html;

      const swIcon = new Swiper(".sw-icon", {
        slidesPerView: 7,
        slidesPerGroup: 7,
        spaceBetween: 10,
        navigation: {
          prevEl: ".popular-slide-prev",
          nextEl: ".popular-slide-next",
        },
      });
      // html 에 배치가 되었으면 찾을 수 0
      // a 태그 14갤를 찾아야함
      // so, querySelector가 아닌 querySelectorAll 이용
      // querySlectorAll은 배열 [] 을 리턴함
      const tag = document.querySelectorAll(".popular-slide a");
      // 찾아서 저장한 배열의 각 a 태그에 기능을 준다.
      tag.forEach(function (item, index) {
        item.addEventListener("mouseover", function () {
          const spanTag = this.querySelector(".popular-cate-icon");
          spanTag.style.backgroundPositionY = "-64px";
        });
        item.addEventListener("mouseout", function () {
          const spanTag = this.querySelector(".popular-cate-icon");
          spanTag.style.backgroundPositionY = "0px";
        });
        // 클릭하면 버튼의 글자가 변경된다.
        item.addEventListener("click", function (event) {
          event.preventDefault();
          const bt = document.querySelector(".popular-more");
          const title = this.querySelector(".popular-cate-name");
          bt.innerHTML = title.innerHTML + "물품 더보기";

          // 하단의 목록을 갱신한다
          // 현재 클릭된 번호를 popularShow에 담는다
          popularShow = index;
          showPopularGood();
        });
      });
    }
    // 인기 상품 화면 출력 기능
    function showPopularGood() {
      let html = "";
      let popCate = "populargood-" + (popularShow + 1);
      POPULAR_GOOD[popCate].forEach(function (item) {
        let tag = `
        <div class="good-box">
          <!-- 제품이미지 -->
          <a href="${item.link}" class="good-img">
            <img src="images/${item.pic}" alt="${item.name}" />
            <span class="good-type">${item.tag}</span>
          </a>
          <!-- 제품정보 -->
          <a href="${item.link}" class="good-info">
            <em>${item.name}</em>(<em>${item.unit}</em>)
          </a>
          <!-- 제품가격 -->
          <a href="${item.link}" class="good-info-price">${priceToString(
          item.price
        )}<em>원</em></a>
          <!-- 장바구니 -->
          <button class="good-add-cart"></button>
        </div>
`;
        html += tag;
      });
      popularTag.innerHTML = html;
    }
    // 브랜드관 화면 출력 기능
    function showBrand() {
      let html = `
      <div class="swiper sw-brand">
        <div class="swiper-wrapper">
      `;
      BRAND_ARR.forEach(function (item) {
        let tag = `
        <div class="swiper-slide">
        <div class="brand-box">
        <a href="${item.link}">
          <img src="images/${item.image}" alt="${item.title}" />
          <p>${item.title}</p>
          <ul class="brand-info clearfix">
            <li>
              <span class="brand-info-title">${item.txt1}</span>
              <span class="brand-info-value">${item.value1}</span>
            </li>
            <li>
              <span class="brand-info-title">${item.txt2}</span>
              <span class="brand-info-value">${item.value2}</span>
            </li>
          </ul>
        </a>
      </div>
      </div>
        `;
        html += tag;
      });
      html += `
      </div>
      </div>
      `;
      brandTag.innerHTML = html;

      var swBrand = new Swiper(".sw-brand", {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 3,
        navigation: {
          prevEl: ".brand .slide-prev",
          nextEl: ".brand .slide-next",
        },
        pagination: {
          el: ".brand .slide-pg",
          type: "fraction",
        },
      });
    }
    // 배너 화면 출력 기능
    function showBanner() {
      let html = `
      <div class="swiper sw-banner">
        <div class="swiper-wrapper">
      `;
      BANNER_ARR.forEach(function (item) {
        let tag = `
        <div class="swiper-slide">
        <a href="${item.link}">
        <img src="images/${item.image}" alt="${item.title}" />
        </a>
        </div>
        `;
        html += tag;
      });
      html += `
        </div>
      </div>
      `;
      bannerTag.innerHTML = html;

      var swBanner = new Swiper(".sw-banner", {
        loop: true,
        slidesPerView: 2,
        navigation: {
          prevEl: ".banner-slide-prev",
          nextEl: ".banner-slide-next",
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      });
    }
    // 리뷰 화면 출력 기능
    function showReview() {
      let html = `
      <div class="swiper sw-review">
        <div class="swiper-wrapper">
      `;
      REVIEW_ARR.forEach(function (item) {
        const tag = `
        <div class="swiper-slide">
        <div class="review-box">
        <a href="${item.link}">
          <div class="review-box-desc"> 
            <span class="review-box-title">
            ${item.title}
            </span>
            <span class="review-box-star">${item.star}</span>
            <span class="review-box-img">
              <img src="images/${item.pic}" alt="${item.title}" />
            </span>
          </div>
          <p class="review-box-txt">
          ${item.txt}
          </p>
          <span class="review-box-user"> ${item.user} (${item.shop})</span>
        </a>
      </div>
      </div>
      `;
        html += tag;
      });
      html += `
        </div>
      </div>
      `;
      reviewTag.innerHTML = html;

      var swReview = new Swiper(".sw-review", {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 3,
        navigation: {
          prevEl: ".review .slide-prev",
          nextEl: ".review .slide-next",
        },
        pagination: {
          el: ".review .slide-pg",
          type: "fraction",
        },
      });
    }
    // 공지사항 화면 출력 기능
    function showNotice() {
      let html = "";
      NOTICE_ARR.forEach(function (item) {
        const tag = `
        <li><a href="${item.link}"><span>${item.title}</span><em>${item.date}</em></a></li>
        `;
        html += tag;
      });
      noticeTag.innerHTML = html;
    }
    // 물품소식 화면 출력 기능
    function showGoodNews() {
      let html = "";
      GOODNEWS_ARR.forEach(function (item) {
        const tag = `
        <li><a href="${item.link}"><span>${item.title}</span><em>${item.date}</em></a></li>
        `;
        html += tag;
      });
      goodnewsTag.innerHTML = html;
    }
    // 시즌 화면 출력기능
    const buyTotal = document.getElementById("buy-total");
    const buyTotalMoney = document.getElementById("buy-total-money");
    let buyTotalCount = 0;
    let buyTotalMoneyPrice = 0;
    // 제철요리 화면 출력 기능
    function showSeason() {
      let html = "";
      SEASON_ARR.forEach(function (item, index) {
        const tag = `
        <li>
        <div class="season-good clearfix">
          <input
            type="checkbox"
            id="ch${index}"
            class="season-good-check season-item"
            checked 
            value=${item.price}
          />
          <label for="ch${index}" class="season-label">${item.title}</label>
          <a href="${item.link}" class="season-good-img">
            <img src="images/${item.pic}" alt="${item.title}" />
          </a>
          <p class="season-good-info">
            <a href="${item.link}" class="season-good-title">
            ${item.title}
            </a>
            <a href="${item.link}" class="season-good-price">
              <em>${priceToString(item.price)}</em>원
            </a>
          </p>
        </div>
      </li>
        `;
        html += tag;
      });
      seasonTag.innerHTML = html;

      // Smooth Scrollbar
      Scrollbar.initAll();
      // 체크 박스 각각의 기능
      checkBoxFn();
      // 계산 출력하라
      showBuyGood();
    }
    // 전체 체크박스 기능
    const chkAll = document.getElementById("chall");
    chkAll.addEventListener("change", function () {
      const chkArr = document.querySelectorAll(".season-item");
      if (chkAll.checked) {
        // 전체 체크를 해야 하는 경우
        chkArr.forEach(function (item) {
          item.checked = true;
        });
      } else {
        // 전체 체크를 해제 해야 하는 경우
        chkArr.forEach(function (item) {
          item.checked = false;
        });
      }
      showBuyGood();
    });
    // 체크박스 각각의 기능
    function checkBoxFn() {
      const chkArr = document.querySelectorAll(".season-item");
      chkArr.forEach(function (item) {
        item.addEventListener("change", function () {
          // 가격을 다시 계산
          showBuyGood();
        });
      });
    }
    // 계산 출력 기능
    function showBuyGood() {
      // 체크가 된 카운팅을 한다. 그리고 더한다.
      let count = 0;
      let priceTotal = 0;

      const chkArr = document.querySelectorAll(".season-item");
      chkArr.forEach(function (item) {
        const state = item.checked;

        if (state) {
          count += 1;

          const price = parseInt(item.value);
          priceTotal += price;
        }
      });
      buyTotalCount = count;
      buyTotalMoneyPrice = priceTotal;

      buyTotal.innerHTML = buyTotalCount;
      buyTotalMoney.innerHTML = priceToString(buyTotalMoneyPrice);

      // 전체 선택 버튼 해제
      if (buyTotalCount === chkArr.length) {
        // 전체 체크 버튼 checked 되어야함.
        chkAll.checked = true;
      } else {
        // 전체 체크 버튼 checked 해제되어야함.
        chkAll.checked = false;
      }
    }
    // date.json 을 로딩
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (event) {
      const req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        // 불러온 데이터 확인해 보자.
        const str = req.response;
        // 글자로 온 데이터를 객체로 변환
        // 글자가 json 규칙대로 만들어진 문자열이다.
        // 그러므로 json 글자를 객체!! 로 변환하여서 활용한다.
        let obj = JSON.parse(str);
        //  오늘의 상품을 화면에 배치한다.
        VISUAL_ARR = obj.visual;
        TODAY_GOOD = obj.todaygood;
        SALE_GOOD = obj.salegood;
        NEW_GOOD = obj.newgood;
        RECOMMEND_GOOD = obj.recommendgood;
        POPULAR_ICON = obj.popularicon;
        POPULAR_GOOD = obj.populargood;
        BANNER_ARR = obj.banner;
        BRAND_ARR = obj.brand;
        REVIEW_ARR = obj.review;
        NOTICE_ARR = obj.notice;
        GOODNEWS_ARR = obj.goodnews;
        SEASON_ARR = obj.season;

        // 비주얼 화면에 배치한다.
        showVisual();
        // 오늘의 상훔을 화면에 배치한다.
        showTodayGood();
        // 할인 상품을 화면에 배치한다.
        showSaleGood();
        // 신상품을 화면에 배치한다.
        showNewGood();
        // 추천 상품을 화면에 배치한다.
        showRecommendGood();
        // 인기 상품 아이콘을 화면에 배치한다.
        showPopularIcon();
        // 인기 상품을 화면에 배치한다.
        showPopularGood();
        // 브랜드관을 화면에 배치한다.
        showBrand();
        // 배너를 화면에 배치한다.
        showBanner();
        // 리뷰를 화면에 배치한다.
        showReview();
        // 공지사항을 화면에 배치한다.
        showNotice();
        // 물품소식을 화면에 배치한다.
        showGoodNews();
        // 제철요리를 화면에 배치한다.
        showSeason();
      }
    };
    // 자료를 호출한다.
    xhttp.open("GET", "data.json");
    xhttp.send();
  }
  // 커뮤니티 탭 메뉴
  {
    // 탭 버튼
    const tabBtArr = document.querySelectorAll(".community-bt");
    // 탭 내용
    const tabConArr = document.querySelectorAll(".community-notice dd");
    // 탭 포커스
    let tabFocusIndex = 0;
    // 탭 버튼 클릭처리
    tabBtArr.forEach(function (item, index) {
      item.addEventListener("click", function () {
        tabFocusIndex = index;
        tabFocusFn();
        // 포커스 css를 적용 및 제거
        // 일딘 모두 제거

        // this.classList.remove("community-bt-active");
        // this.classList.add("community-bt-active");
      });
    });
    // 탭 포커스 함수를 생성
    function tabFocusFn() {
      tabBtArr.forEach(function (item) {
        item.classList.remove("community-bt-active");
      });
      // 인덱스에 해당하는 것만 적용
      tabBtArr[tabFocusIndex].classList.add("community-bt-active");
      // 내용에서 일단 모두 제거
      tabConArr.forEach(function (item) {
        item.classList.remove("community-visible-active");
      });
      tabConArr[tabFocusIndex].classList.add("community-visible-active");
    }
  }
  // 스크롤시 상단 고정 클래스 추가/제거
  const wrap = document.querySelector(".wrap");
  const header = document.querySelector(".header");
  let scy = 0;

  window.addEventListener("scroll", function () {
    scy = this.document.documentElement.scrollTop;
    if (scy > 0) {
      wrap.classList.add("active");
      header.classList.add("active");
    } else {
      wrap.classList.remove("active");
      header.classList.remove("active");
    }
  });

  // 하단 패밀리 펼침 기능
  // 목록 열기 버튼
  const openBt = document.querySelector(".footer-link");
  const closeBt = document.querySelector(".family-close");
  const family = document.querySelector(".family");

  openBt.addEventListener("click", function () {
    family.classList.add("active");
    this.style.backgroundColor = "#f5f5f5";
  });
  closeBt.addEventListener("click", function () {
    family.classList.remove("active");
    openBt.style.backgroundColor = "transparent";
  });

  // niceScroll 적용
  // const sgl = $(".season-good-list");
  // sgl.niceScroll({
  //   cursorwidth: "8px",
  //   cursoropacitymax: 0.5,
  // });
  // sgl.mouseover(function () {
  //   this.getNiceScroll().resize();
  // });
  // 전체 메뉴 펼침 기능
  const allMenuArea = document.querySelector(".all-menu-area");
  const allMenu = document.querySelector(".all-menu");
  const cateList = document.querySelector(".cate-list");
  const themeList = document.querySelector(".theme-list");

  allMenuArea.addEventListener("mouseleave", function () {
    allMenu.classList.remove("active");
  });
  cateList.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
  });
  themeList.addEventListener("mouseenter", function () {
    allMenu.classList.remove("active");
  });

  // 서브 카테고리 보여주기
  const cateListLis = document.querySelectorAll(".cate-list > li");
  const cateDepth2 = document.querySelectorAll(".cate-depth2-list");
  cateListLis.forEach(function (item, index) {
    item.addEventListener("mouseenter", function () {
      cateDepth2.forEach(function (itemSub, indexSub) {
        itemSub.style.display = "none";
        if (indexSub === index) {
          itemSub.style.display = "block";
        }
      });
    });
  });
};
