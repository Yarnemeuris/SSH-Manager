var hosts = {}

async function getData() {
    hosts = await window.data.getHosts();
    hostsToHTML();
}

function settingsChange() {
    document.querySelector('#settings>[name="change"]').classList.remove("hide");
    document.querySelector('#settings>[name="add"]').classList.add("hide");
    document.querySelector("#settings").classList.remove("hide");

}

function settingsAdd() {
    document.querySelector('#settings>[name="change"]').classList.add("hide");
    document.querySelector('#settings>[name="add"]').classList.remove("hide");

    document.querySelectorAll(".setting>input").forEach((element)=>{
        element.value = element.name == "port" ? "22" : "";
        element.style.width = `${element.value.length}ch`
    })

    document.querySelector("#settings").classList.remove("hide");
}

function editHost(event) {
    var host = hosts[event.target.parentElement.getAttribute('name')]
    event.target.classList.add("editing")

    document.querySelectorAll(".setting>input").forEach((element) => {
        element.value = host[element.name]
        element.style.width = `${element.value.length}ch`
    })

    settingsChange();
}

document.querySelector("#settings>[name='change']").addEventListener("click", () => {
    var settings = hosts[document.querySelector(".editing").parentNode.getAttribute("name")]

    document.querySelectorAll(".setting>input").forEach((element) => {
        settings[element.name] = element.value;
        element.value = element.name == "port" ? "22" : "";
    })

    window.data.addHost(settings.label != undefined ? settings.label : settings.IP ,settings);
    getData();

    document.querySelector("#settings").classList.add("hide")
})

function hostsToHTML() {
    var HTML = ""
    for (var host in hosts) {
        HTML += `<div class="host" name="${host}"><h3>${host}</h3><button type="button" class="edit" onclick="editHost(event)"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"></path></svg></button><button type="button" class="connect">connect</button></div>`;
    }
    document.querySelector("#hosts").innerHTML = HTML
}

document.querySelectorAll(".setting > input").forEach((element) => element.addEventListener("input", () => element.style.width = `${element.value.length}ch`));

document.querySelector('#settings>[name="close"]').addEventListener("click", () => document.querySelector("#settings").classList.toggle("hide"));

document.querySelector("#addButton").addEventListener("click", () => settingsAdd())

document.querySelector('#settings>[name="add"]').addEventListener("click", () => {
    settings = {}
    document.querySelectorAll(".setting>input").forEach((element) => {
        settings[element.name] = element.value;
        element.value = element.name == "port" ? "22" : "";
    })

    window.data.addHost(element.label != undefined ? element.label : element.IP, settings)
    getData();

    document.querySelector("#settings").classList.add("hide")
})

getData()