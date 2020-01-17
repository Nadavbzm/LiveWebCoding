function run(){
  var iframe = document["querySelector"]("iframe");

  var html = document.getElementById("html");
  var css = document.getElementById("css");
  var javascript = document.getElementById("javascript");

  var html2 = html.value;
  var css2 = css.value;
  var javascript2 = javascript.value;

  if(html2[html2.length-1]=='<')
  {
    var txt=document.createTextNode(">")
    html.appendChild(txt);
    console.log("aaa");
        iframe.srcdoc =
                html.value + ">" + '<style>' +
                css.value + '</style>' + '<script>' +
                javascript.value + '<\/script>';
  }
}

function runLive() {
  var iframe = document["querySelector"]("iframe");
  var area = document.querySelectorAll('textarea');

  for (var i = area.length - 1; i >= 0; i--) {
    if (area[i].addEventListener) {
      area[i].addEventListener('input', run, false);
    } else if (area[i].attachEvent) {
      area[i].attachEvent('onpropertychange', run);
    }
  }
}

function detach(){
  var iframe = document["querySelector"]("iframe");
  var area = document.querySelectorAll('textarea');

  for (var i = area.length - 1; i >= 0; i--) {
    if (area[i].removeEventListener){
      area[i].removeEventListener('input', run, false);
    } else if (area[i].dettachEvent) {
      area[i].dettachEvent('onpropertychange', run);
    }
  }
}

function toggleLive(){
  if(document.getElementById("checkbox").checked)
  {
    document.getElementById("button").style.display = "none";
    document.getElementById("button").value = "";
    document.getElementById("button").setAttribute("type", "hidden");
    runLive();
  }
  else{
    document.getElementById("button").setAttribute("type", "button");
    document.getElementById("button").style.display = "block";
    document.getElementById("button").value = "Run";
    detach();
  }
}


function save(){
    var html = document.getElementById("html");
    var css = document.getElementById("css");
    var javascript = document.getElementById("javascript");
    var data =
                  html.value + '<style>' +
                  css.value + '</style>' + '<script>' +
                  javascript.value + '<\/script>';


      var file = new Blob([data], {type: "html"});
      if (window.navigator.msSaveOrOpenBlob) // IE10+
          window.navigator.msSaveOrOpenBlob(file, "site.html");
      else { // Others
          var a = document.createElement("a"),
                  url = URL.createObjectURL(file);
          a.href = url;
          a.download = "site.html";
          document.body.appendChild(a);
          a.click();
          setTimeout(function() {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
          }, 0);
      }
}
