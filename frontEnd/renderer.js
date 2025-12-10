DEVMode = true;

hosts = {}

async function getData() {
    hosts = await window.data.getHosts();
}

function hostsToHTML(){
    var HTML = ""
    for (host in hosts) {
        HTML += ``;
    }
}

if (DEVMode) window.DEV.reloadCallback(() => {window.location.reload()});

getData()