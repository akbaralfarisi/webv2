const popup = document.getElementById("popup");
const popupContent = document.getElementById("popupContent");
const closeBtn = document.getElementById("closeBtn");
const downloadBtn = document.getElementById("downloadBtn");

document.querySelectorAll(".media-thumb").forEach((el) => {
  el.addEventListener("click", () => {
    popup.style.display = "flex";
    popupContent.innerHTML = "";

    const isVideo = el.tagName.toLowerCase() === "video";
    const src = el.getAttribute("src");

    let clone;
    if (isVideo) {
      clone = document.createElement("video");
      clone.src = src;
      clone.controls = true;
    } else {
      clone = document.createElement("img");
      clone.src = src;
    }

    popupContent.appendChild(clone);
    downloadBtn.href = src;
  });
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  popupContent.innerHTML = "";
});