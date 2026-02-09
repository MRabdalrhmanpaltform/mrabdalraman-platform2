// 🔑 API KEY
const API_KEY = "AIzaSyDxJWcYkSgm3D5LNXHuD4aZ9y4psygAouE";

// 📺 Playlists
const PLAYLISTS = {
  g1: "PLjLTHvFUYuHeuuJ92iXVtFeJ74FOWl1DW",
  g2: "PLjLTHvFUYuHcmWThFIAlst8yQJnfZ_Uw0",
  g3: "PLjLTHvFUYuHeCCtgOmrtXYUVqooTkNnOd",
  g4: "PLjLTHvFUYuHf4eTmxhHgVCEecNRGSSmcA",
  g5: "PLjLTHvFUYuHeGnLMgZ84hioOVxMeazs_c",
  g6: "PLjLTHvFUYuHfvtbavQPt7Wl3HdbfVO6cz",

  p1: "PLjLTHvFUYuHdkXhLkAJG3MMzJPSXkradf",
  p2: "PLjLTHvFUYuHcArf0cq7CZgTq1iODHWgM9a",
  p3: "PLjLTHvFUYuHeqiQu8v7tq2Rt8RTYoI8P9",

  s1: "PLjLTHvFUYuHfgt3VddrseIBLcyNfN6Ta1",
  s2: "PLjLTHvFUYuHdGTtGNOECHkHNQh1F-A8Dl",
  s3: "PLjLTHvFUYuHfs0HFr72F_HiyO4ZpQVwD-"
};

// 🧠 اسم الصفحة
const pageName = window.location.pathname
  .split("/")
  .pop()
  .replace(".html", "");

// 🆔 playlist id
const playlistId = PLAYLISTS[pageName];

// ❌ صفحة الخطأ (صورة)
function showError() {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.innerHTML = `
    <div style="
      width:100vw;
      height:100vh;
      overflow:hidden;
    ">
      <img
        src="https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?w=845&ssl=1"
        style="
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        "
        alt=""
      >
    </div>
  `;
}


// ▶️ تشغيل
if (!playlistId) {
  showError("ERROR 404 - PAGE NOT FOUND");
} else {
  fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
  )
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        showError("ERROR 404 - PLAYLIST NOT FOUND");
        return;
      }

      const container = document.getElementById("videos");

      data.items.forEach(item => {
        const videoId = item.snippet.resourceId.videoId;

        const div = document.createElement("div");
        div.style.marginBottom = "20px";

        div.innerHTML = `
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1"
            frameborder="0"
            allowfullscreen>
          </iframe>
        `;

        container.appendChild(div);
      });
    })
    .catch(() => {
      showError("ERROR - API NOT WORKING");
    });
}
