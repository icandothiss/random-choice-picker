const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");
let tags = [];
textarea.focus();

textarea.addEventListener("keyup", (e) => {
  Array.from(tagsEl.childNodes).forEach((element) => {
    console.log(element.classList);
    if (element.classList.contains("highlight")) {
      console.log("yyy");
      while (tagsEl.firstChild) {
        tagsEl.removeChild(tagsEl.lastChild);
      }
      tags = [];
    }
  });
  if (e.keyCode !== 13) {
    let text = textarea.value;

    tags = text
      .split(",")
      .filter((tag) => tag.trim() !== "")
      .map((tag) => tag.trim());
    if (text.length === 1) {
      let tag = document.createElement("span");
      tag.classList.add("tag");
      tagsEl.appendChild(tag);
    }
    if (e.keyCode === 188) {
      const tagsChildren = document.querySelectorAll(".tag");

      if (tagsChildren.length === tags.length) {
        let tag = document.createElement("span");
        tag.classList.add("tag");
        tag.style.padding = "0";
        tagsEl.appendChild(tag);
      }
    } else {
      const tagsChildren = Array.from(tagsEl.childNodes);
      if (tagsChildren.length === tags.length) {
        tagsChildren[tagsChildren.length - 1].innerText = tags[tags.length - 1];
        tagsChildren[tagsChildren.length - 1].style.padding = "10px 20px";
      }
    }
  } else if (e.keyCode === 13) {
  }
});

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

textarea.addEventListener("keyup", (e) => {
  pickRandomTag();

  if (e.keyCode === 13) {
    randomSelect();
    textarea.value = "";
    tags = [];
  }
});

function randomSelect() {
  const times = 30;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    if (randomTag !== undefined) {
      highlightTag(randomTag);

      setTimeout(() => {
        unHighlightTag(randomTag);
      }, 100);
    }
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();

      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function unHighlightTag(tag) {
  tag.classList.remove("highlight");
}
