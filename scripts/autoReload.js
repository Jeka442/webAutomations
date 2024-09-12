

if(window.localStorage.getItem("autoReload")){
    window.localStorage.removeItem("autoReload");
}else{
    window.localStorage.setItem("autoReload", "true");
}
window.location.reload();

