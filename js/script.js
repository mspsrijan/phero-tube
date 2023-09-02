const handleCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categories = data.data;

  const categoriesTabs = document.getElementById("tabs");

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerHTML = category.category;
    button.classList.add(
      "btn",
      "btn-sm",
      "h-10",
      "px-4",
      "md:px-6",
      "rounded-xl",
      "font-medium",
      "normal-case",
      "hover:text-white",
      "hover:bg-[#FF1F3D]"
    );
    categoriesTabs.appendChild(button);
    button.addEventListener("click", function () {
      handleLoadVideos(category.category_id);
      //this.classList.add("bg-[#FF1F3D]", "text-white");
    });
  });
};

const handleLoadVideos = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();

  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";

  videos = data.data;

  if (videos.length === 0) {
    const emptyContainer = document.getElementById("emptyContainer");
    emptyContainer.classList.remove("hidden");
    emptyContainer.classList.add("flex");
    emptyContainer.innerHTML = `
    <img src="./images/Icon.png" alt="No Video Found" class="w-24" />
    <p class="text-center text-xl font-semibold">
      Opps!! Sorry, there is no content here.
    </p>
    `;
    return;
  }

  videos.forEach((video) => {
    const postedDateInSec = video.others.posted_date;
    const postedDateinHourAndMinString =
      convertSecondsToHourAndMinString(postedDateInSec);

    const videoCard = document.createElement("div");
    videoCard.classList.add("card", "card-compact", "bg-base-100");
    videoCard.innerHTML = `
    <div class="relative">
      <figure>
        <img
          src="${video.thumbnail}"
          alt="Video Thumb"
          class="rounded-xl w-full h-48 md:h-40 object-cover"
        />
      </figure>
      <p
        class="postedDate absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/60 text-xs text-right text-gray-300"
      >
        ${postedDateinHourAndMinString}
      </p>
    </div>

    <div class="py-4 flex gap-2">
      <div>
        <img
          src="${video.authors[0].profile_picture}"
          alt=""
          class="rounded-full w-8 h-8 object-cover"
        />
      </div>
      <div class="space-y-1">
        <h3 class="card-title text-base">
          ${video.title}
        </h3>
        <div class="flex gap-1 items-center">
          <p class="max-w-max text-gray-500">${
            video.authors[0].profile_name
          }</p>

          ${
            video.authors[0].verified
              ? '<img src="./images/verified-badge.png" alt="" class="w-5 h-5 object-cover"></img>'
              : ""
          }
        </div>
        <p class="text-gray-500">${video.others.views} views</p>
      </div>
    </div>
    `;
    videosContainer.appendChild(videoCard);
    // let postedDateElement = document.getElementsByClassName("postedDate");
    // console.log(postedDateElement);
    // // if (postedDateinHourAndMinString === 0) {
    // //   postedDateElement.classList.add("hidden");
    // // }

    // const viewCountString = video.others.views;
    // const viewCountNum =
    //   viewCountString.slice(0, viewCountString.length - 1) * 1000;
  });
};

handleCategories();
handleLoadVideos(1000);

function convertSecondsToHourAndMinString(seconds) {
  if (seconds) {
    const hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return hours + " hrs " + minutes + " min ago";
  }
  return "";
}
