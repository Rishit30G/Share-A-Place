const theme = document.querySelector("#theme-link");
const sharePlaceTheme = document.querySelector("#share-places-theme-link");

document.querySelector(".btn-toogle").addEventListener("click", function () {
    if (theme.getAttribute("href") == "assets/styles/dark.css") {
        console.log("DARK");
        theme.href = "assets/styles/app.css";
        sharePlaceTheme.href = "assets/styles/share-place.css";
        document.querySelector(".btn-toogle").innerHTML = "Dark";
    } else {
        console.log("LIGHT");
        theme.href = "assets/styles/dark.css";
        sharePlaceTheme.href = "assets/styles/dark-share-place.css"
        document.querySelector(".btn-toogle").innerHTML = "Light";
    }
});