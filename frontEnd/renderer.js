window.DEV.reloadCallback(() => { window.location.reload() });

var hosts = []

async function getData() {
    hosts = await window.data.getHosts();
    hostsToHTML();
}

function hostsToHTML() {
    var HTML = ""
    for (host of hosts) {
        HTML += `<div class="host" name="${host.label != undefined ? host.label : host.IP}"><h3>${host.label != undefined ? host.label : host.IP}</h3><button type="button" class="edit"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"></path></svg></button><button type="button" class="connect">connect</button></div>`;
    }
    document.querySelector("#hosts").innerHTML = HTML
}

document.querySelectorAll(".setting > input").forEach((element) => element.addEventListener("input", () => element.style.width = `${element.value.length}ch`));

document.querySelectorAll('#addButton, #settings>[name="close"]').forEach((element) => element.addEventListener("click", () => document.querySelector("#settings").classList.toggle("hide")));

document.querySelector('#settings>[name="add"]').addEventListener("click", () => {
    settings = {}
    document.querySelectorAll(".setting>input").forEach((element) => {
        settings[element.name] = element.value;
        element.value = element.name == "port" ? "22" : "";
    })

    hosts.push(settings);

    hostsToHTML();

    document.querySelector("#settings").classList.add("hide")
})

getData()