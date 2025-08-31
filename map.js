// 載入 Maps Javascript API
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "Your API Key", // 你的 API Key
    v: "weekly", // 使用的 API 版本
  });

// 正式開始
let map;
let taiwan = {lat: 23.553118, lng: 121.0211024};
let ntub = {lat: 25.0424835, lng: 121.5252657};

// 初始化地圖
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  // 地圖建構
  map = new Map(document.getElementById("map"), {
    center: taiwan,
    zoom: 8,
    mapId: "DEMO_MAP_ID",
    zoomControl: false, // 縮放
    scaleControl: true, // 比例尺
    mapTypeControl: true, // 地圖類型
    streetViewControl: true, // 街景
    fullscreenControl: true, // 全螢幕
  });

  // 自訂基本標記
  const pin = new PinElement({
    scale: 1.5,
    background: "pink",
    borderColor: "purple",
    glyph: "B",
    glyphColor: "purple",
  });

  // 標記建構
  const marker = new AdvancedMarkerElement({
    map,
    title: "北商在這裡",
    position: ntub,
    content: pin.element,
  });

  // 資訊視窗內容
  const infoContent = `
    <img src="https://lh5.googleusercontent.com/p/AF1QipN8YfUxx3LY-t5AtJiBrCS1ckjXLpm0Wzk6cyAC=w408-h271-k-no" alt="北商" style="width: auto; height: 150px; background-position: center center; background-size: cover;">
    <div style="font-size: 20px; font-weight: bold;">國立臺北商業大學</div>
    <div style="font-size: 14px; font-weight: bold;">地址：100台北市中正區濟南路一段321號</div>
    <div style="font-size: 14px; font-weight: bold;">電話：02-3322-2777</div>
    <div style="font-size: 14px; font-weight: bold;">網站：<a href="https://www.ntub.edu.tw/" target="_blank">https://www.ntub.edu.tw/</a></div>
    `;

  // 資訊視窗建構
  const infowindow = new google.maps.InfoWindow({
    content: infoContent,
    ariaLabel: "NTUB",
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });

  // 移動至北商的按鈕
  const ntubDiv = document.createElement('div');
  const NTUB_Button = moveToNTUB(map);
  ntubDiv.appendChild(NTUB_Button);

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(ntubDiv);
}

// 移動至北商的按鈕
function moveToNTUB(map) {
  const NTUB_Button = document.createElement("button");

  NTUB_Button.style.backgroundColor = "#fff";
  NTUB_Button.style.border = "2px solid #fff";
  NTUB_Button.style.borderRadius = "3px";
  NTUB_Button.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  NTUB_Button.style.color = "rgb(25,25,25)";
  NTUB_Button.style.cursor = "pointer";
  NTUB_Button.style.fontFamily = "Roboto,Arial,sans-serif";
  NTUB_Button.style.fontSize = "16px";
  NTUB_Button.style.lineHeight = "38px";
  NTUB_Button.style.margin = "8px 0 22px";
  NTUB_Button.style.padding = "0 5px";
  NTUB_Button.style.textAlign = "center";

  NTUB_Button.textContent = "移動到北商";
  NTUB_Button.title = "點擊移動到北商";
  NTUB_Button.type = "button";

  NTUB_Button.addEventListener("click", () => {
    map.setCenter(ntub);
    map.setZoom(18);
  });

  return NTUB_Button;
}

initMap();