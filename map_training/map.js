// 載入 Maps Javascript API
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyAvWBwdZYsvgikzP1kaKTWfzB7NFVo6w_I", // 你的 API Key
    v: "weekly", // 使用的 API 版本
  });

// 正式開始
let map;
let taiwan = {lat: 23.553118, lng: 121.0211024};
let ntub = {lat: 25.0424835, lng: 121.5252657};

// 移動至北商的按鈕
function moveToNTUB(map) {
  const controlButton = document.createElement("button");

  // Set CSS for the control.
  controlButton.style.backgroundColor = "#fff";
  controlButton.style.border = "2px solid #fff";
  controlButton.style.borderRadius = "3px";
  controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlButton.style.color = "rgb(25,25,25)";
  controlButton.style.cursor = "pointer";
  controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
  controlButton.style.fontSize = "16px";
  controlButton.style.lineHeight = "38px";
  controlButton.style.margin = "8px 0 22px";
  controlButton.style.padding = "0 5px";
  controlButton.style.textAlign = "center";
  controlButton.textContent = "回到北商";
  controlButton.title = "Click to recenter the map";
  controlButton.type = "button";
  // Setup the click event listeners: simply set the map to Chicago.
  controlButton.addEventListener("click", () => {
    map.setCenter(ntub);
    map.setZoom(18);
  });
  return controlButton;
}

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const {ColorScheme} = await google.maps.importLibrary("core")

  map = new Map(document.getElementById("map"), {
    center: taiwan,
    zoom: 8,
    colorScheme: ColorScheme.LIGHT, // 顏色主題 地圖配色方案 (LIGHT、DARK 或 FOLLOW_SYSTEM)
    zoomControl: false, // 縮放
    scaleControl: true, // 比例尺
    mapTypeControl: true, // 地圖類型
    streetViewControl: true, // 街景
    fullscreenControl: true, // 全螢幕
  });

  // Create the DIV to hold the control.
  const centerControlDiv = document.createElement("div");
  // Create the control.
  const centerControl = moveToNTUB(map);

  // Append the control to the DIV.
  centerControlDiv.appendChild(centerControl);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

initMap();