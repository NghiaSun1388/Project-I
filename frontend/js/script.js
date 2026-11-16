
/* 1. data */

const newsData = [

    {
        id: 1,
        category: "Công nghệ",
        title: "Trí tuệ nhân tạo đang thay đổi cách con người làm việc",
        summary: "AI đang được ứng dụng rộng rãi trong nhiều lĩnh vực, từ giáo dục đến y tế và sản xuất.",
        source: "Tech News",
        time: "2 giờ trước",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800"
    },

    {
        id: 2,
        category: "Kinh tế",
        title: "Thương mại điện tử tiếp tục phát triển mạnh",
        summary: "Xu hướng mua sắm trực tuyến đang tạo ra nhiều thay đổi trong thị trường bán lẻ.",
        source: "Economic Daily",
        time: "3 giờ trước",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
    },

    {
        id: 3,
        category: "Thế giới",
        title: "Các thành phố đang đẩy mạnh phát triển giao thông xanh",
        summary: "Nhiều quốc gia đầu tư vào phương tiện công cộng và năng lượng sạch.",
        source: "World News",
        time: "5 giờ trước",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800"
    },

    {
        id: 4,
        category: "Khoa học",
        title: "Những khám phá mới trong nghiên cứu vũ trụ",
        summary: "Các nhà khoa học tiếp tục mở rộng hiểu biết về những hành tinh ngoài hệ Mặt Trời.",
        source: "Science Today",
        time: "6 giờ trước",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800"
    },

    {
        id: 5,
        category: "Công nghệ",
        title: "Những xu hướng công nghệ đáng chú ý trong năm nay",
        summary: "Điện toán đám mây, AI và tự động hóa tiếp tục là những lĩnh vực được quan tâm.",
        source: "Tech News",
        time: "8 giờ trước",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
    },

    {
        id: 6,
        category: "Kinh tế",
        title: "Thanh toán không tiền mặt ngày càng phổ biến",
        summary: "Ví điện tử và thanh toán qua mã QR đang thay đổi thói quen tiêu dùng.",
        source: "Economic Daily",
        time: "1 ngày trước",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800"
    }

];


/* 2. dom element */

const newsGrid = document.getElementById("newsGrid");

const categoryList = document.getElementById("categoryList");

const searchInput = document.getElementById("searchInput");

const searchButton = document.getElementById("searchButton");

const emptyMessage = document.getElementById("emptyMessage");

const newsSection = document.getElementById("newsSection");

const feedView = document.getElementById("feedView");

const feedContainer = document.getElementById("feedContainer");

const feedEmptyMessage = document.getElementById("feedEmptyMessage");

const openFeedButton = document.getElementById("openFeed");

const closeFeedButton = document.getElementById("closeFeed");


/* 3. app */

let currentCategory = "Tất cả";

let searchKeyword = "";

const likedNews = new Set();

const savedNews = new Set();


/* 4. filter news */

function getFilteredNews() {

    const keyword = searchKeyword.toLowerCase();

    return newsData.filter(news => {

        const matchCategory =
            currentCategory === "Tất cả" ||
            news.category === currentCategory;

        const matchSearch =
            news.title.toLowerCase().includes(keyword) ||
            news.summary.toLowerCase().includes(keyword);

        return matchCategory && matchSearch;

    });

}


/* 5. news card */

function renderNews() {

    const filteredNews = getFilteredNews();

    newsGrid.innerHTML = "";

    emptyMessage.hidden = filteredNews.length > 0;

    filteredNews.forEach(news => {

        const card = document.createElement("article");

        card.className = "news-card";

        card.innerHTML = `

            <img
                class="news-image"
                src="${news.image}"
                alt="${news.title}"
            >

            <div class="news-content">

                <span class="news-category">
                    ${news.category}
                </span>

                <h3 class="news-title">
                    ${news.title}
                </h3>

                <p class="news-summary">
                    ${news.summary}
                </p>

                <div class="news-meta">

                    <span>
                        ${news.source} · ${news.time}
                    </span>

                    <div class="news-actions">

                        <button
                            class="${likedNews.has(news.id) ? "active" : ""}"
                            data-action="like"
                            data-id="${news.id}"
                            aria-label="Thích bài viết">

                            ${likedNews.has(news.id) ? "❤️" : "♡"}

                        </button>

                        <button
                            class="${savedNews.has(news.id) ? "active" : ""}"
                            data-action="save"
                            data-id="${news.id}"
                            aria-label="Lưu bài viết">

                            ${savedNews.has(news.id) ? "🔖" : "♧"}

                        </button>

                    </div>

                </div>

            </div>

        `;

        newsGrid.appendChild(card);

    });

}


/* 6. filter */

categoryList.addEventListener("click", function(event) {

    const button = event.target.closest(".category");

    if (!button) return;

    currentCategory = button.dataset.category;

    document.querySelectorAll(".category").forEach(item => {

        item.classList.remove("active");

    });

    button.classList.add("active");

    renderNews();

    if (!feedView.hidden) {
        renderFeed();
    }

});


/* 7. search  */

function handleSearch() {

    searchKeyword = searchInput.value.trim();

    renderNews();

    if (!feedView.hidden) {
        renderFeed();
    }

}

searchButton.addEventListener("click", handleSearch);

searchInput.addEventListener("input", handleSearch);


/* 8. Like/bookmark news */

function toggleNewsAction(button) {

    const id = Number(button.dataset.id);

    const action = button.dataset.action;

    let isActive;

    if (action === "like") {

        if (likedNews.has(id)) {
            likedNews.delete(id);
        } else {
            likedNews.add(id);
        }

        isActive = likedNews.has(id);

    }

    else if (action === "save") {

        if (savedNews.has(id)) {
            savedNews.delete(id);
        } else {
            savedNews.add(id);
        }

        isActive = savedNews.has(id);

    }

    button.classList.toggle("active", isActive);

    if (action === "like") {
        button.textContent = isActive ? "❤️" : "♡";
    }

    if (action === "save") {
        button.textContent = isActive ? "🔖" : "♧";
    }

}


/* Xử lý sự kiện thích/lưu trên News Grid */

newsGrid.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    toggleNewsAction(button);

});


/*   9. op/cl feed */

openFeedButton.addEventListener("click", function() {

    newsSection.hidden = true;

    feedView.hidden = false;

    renderFeed();

    window.scrollTo({
        top: feedView.offsetTop,
        behavior: "smooth"
    });

});


closeFeedButton.addEventListener("click", function() {

    feedView.hidden = true;

    newsSection.hidden = false;

    window.scrollTo({
        top: newsSection.offsetTop,
        behavior: "smooth"
    });

});


/*   10. RENDER NEWS FEED */

function renderFeed() {

    const filteredNews = getFilteredNews();

    feedContainer.innerHTML = "";

    feedEmptyMessage.hidden = filteredNews.length > 0;

    feedContainer.hidden = filteredNews.length === 0;

    filteredNews.forEach(news => {

        const feedItem = document.createElement("article");

        feedItem.className = "feed-item";

        feedItem.innerHTML = `

            <img
                src="${news.image}"
                alt="${news.title}"
            >

            <div class="feed-overlay"></div>

            <div class="feed-content">

                <span class="news-category">
                    ${news.category}
                </span>

                <h2>
                    ${news.title}
                </h2>

                <p>
                    ${news.summary}
                </p>

                <div class="feed-info">

                    <span>
                        ${news.source} · ${news.time}
                    </span>

                    <div class="feed-actions">

                        <button
                            data-action="like"
                            data-id="${news.id}"
                            class="${likedNews.has(news.id) ? "active" : ""}"
                            aria-label="Thích bài viết">

                            ${likedNews.has(news.id) ? "❤️" : "♡"}

                        </button>

                        <button
                            data-action="save"
                            data-id="${news.id}"
                            class="${savedNews.has(news.id) ? "active" : ""}"
                            aria-label="Lưu bài viết">

                            ${savedNews.has(news.id) ? "🔖" : "♧"}

                        </button>

                    </div>

                </div>

            </div>

        `;

        feedContainer.appendChild(feedItem);

    });

}


/*    11. Like/Bookmark */

feedContainer.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    toggleNewsAction(button);

});


/*   12. init */

renderNews();
