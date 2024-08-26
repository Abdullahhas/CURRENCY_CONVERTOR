    const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api/latest/currencies";
    const dropdowns = document.querySelectorAll(".dropdown select");
    const btn = document.querySelector("form button");
    const fromCurr = document.querySelector(".from select");
    const toCurr = document.querySelector(".to select");
    const msg = document.querySelector(".msg");

    for (let select of dropdowns) {
        for (let currCode in countryList) {
            let newoption = document.createElement("option");
            newoption.innerText = currCode;
            newoption.value = currCode;
            if (select.name === "from" && currCode === "USD") {
                newoption.selected = "selected";
            } else if (select.name === "to" && currCode === "INR") {
                newoption.selected = "selected";
            }
            select.append(newoption);
        }

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }

    const updateFlag = (element) => {
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
    }

    btn.addEventListener("click", async (evt) => {
        evt.preventDefault();
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;

        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

        try {
            let response = await fetch(URL);
            let data = await response.json();
            let rate = data[toCurr.value.toLowerCase()];
            let finalamount = amtVal * rate;
            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            msg.innerText = "Error fetching exchange rate";
        }
    });
