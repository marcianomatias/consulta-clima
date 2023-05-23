const apikey = "a1ea9e4ffe87b595d6201dd44ac9e925";

const input = document.querySelector("input");
const button = document.querySelector("button");

const place = document.querySelector("#place");
const degrees = document.querySelector("#degrees");
const img = document.querySelector("img");
const wind = document.querySelector("#wind");
const content = document.querySelector(".content");

button.addEventListener("click", () => {
    if (!input.value) 
        return;
    
    getDataApi();
});

async function getDataApi() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input.value
    )}&units=metric&appid=${apikey}`;

    try {
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (
                    data?.cod && data.cod === "404"
                ) {
                    return alert("Local não encontrado!");
                }

                loadData(data);
            });
    } catch (error) {
        alert(error);
    }
}

function loadData(data) {
    place.innerHTML = `${data.name}, ${data.sys.country}`;
    degrees.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}°C`;
    img.src = `http://openweathermap.org/img/wn/${data
        .weather[0]
        .icon}@2x.png`;
    wind.innerHTML = `Vento: ${data.wind.speed} Km/h`;
    content.style.display = "flex";
}