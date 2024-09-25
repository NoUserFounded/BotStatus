//If you have more than one discord you can put the different links of the webhooks ["link1", "link2"];
const webhooks = ["https://discord.com/api/webhooks/1274103241122250796/oMxsYmYrt_YzhMvSzfnV4yv_CYK-A-gx3JQ9i52JEsi63Y6X36oo5z_5aElnyNgrjB3p"]; 
const url = "https://arma3-servers.net/server/294424/";
var idMessage = -1;
//White space
const espacioBlanco = "‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎";


/* Start of optional section */
const avatarImage = "https://cdn6.aptoide.com/imgs/b/9/0/b90164f4704fa68b84fcd97328f3b6ea_icon.png"; /*    The logo of your brand or Discord server, maybe?    */
const shortDescription = url; /*    A little bit of information about the response received, so you don't forget in the future?    */
const colour = "#008080"; /*    A custom colour? Example: #78A8C6    */
const mention = ""; /*Mention yourself or a role - it should look like <@!7890975289098612689> or <@&7890975289098612689>    */
/* End of optional section */
var items = [];

if (!webhooks) throw "You forgot the webhook :)";

function deleteMessages () {
  idMessage =PropertiesService.getScriptProperties().getProperty('idMessageAnterior');
  const getEmbed = { "method": "DELETE", "headers": { "Content-Type": "application/json" }, muteHttpExceptions: true, "payload": JSON.stringify()};
      for (var i = 0; i < webhooks.length; i++) { var msg= UrlFetchApp.fetch(webhooks[i]+"/messages/"+ idMessage, getEmbed); }
      Logger.log(idMessage);
      Logger.log(msg);
};

function embedText(e) {
  deleteMessages ();
  // Request Info
  const info = webScrapping();

  //Define Values
  var title = info [0];
  var ip = info [1];
  var status = info [2];
  var players = info [3];
  if (status == "Online") {
    status = ":green_circle: " + " ** " + status +" ** ";
  } else {
    status = ":red_circle:" + " ** " + status +" ** "
  };
  const question = "Estado" + espacioBlanco + " Dirección:Puerto" + espacioBlanco + "Jugadores";
  const answer = status + "‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎" + ip + espacioBlanco + players + "\n" + "\n" + "By LoSantosYT";
  items.push({ "name": question, "value": answer });
  function data(item) { return [`**${item.name}**`, `${item.value}`].join("\n"); }

  try {
    if (avatarImage !== null) {
      const embedSetup = { "method": "post", "headers": { "Content-Type": "application/json" }, muteHttpExceptions: true, "payload": JSON.stringify({ "content": (mention) ? `${mention}` : " ", "embeds": [{ "title": (title) ? title : form.getTitle(), "thumbnail": { "url": encodeURI(avatarImage) }, "color": (colour) ? parseInt(colour.substr(1), 16) : Math.floor(Math.random() * 16777215), "description": (shortDescription) ? `${shortDescription}\n\n${items.map(data).join('\n\n')}` : items.map(data).join('\n\n'), "timestamp": new Date().toISOString(), }] }) };
      for (var i = 0; i < webhooks.length; i++) {infoWebHook =  UrlFetchApp.fetch(webhooks[i]+"?wait=true", embedSetup); }
    } else {
      const embedSetup = { "method": "post", "headers": { "Content-Type": "application/json" }, muteHttpExceptions: true, "payload": JSON.stringify({ "content": (mention) ? `${mention}` : " ", "embeds": [{ "title": (title) ? title : form.getTitle(), "color": (colour) ? parseInt(colour.substr(1), 16) : Math.floor(Math.random() * 16777215), "description": (shortDescription) ? `${shortDescription}\n\n${items.map(data).join('\n\n')}` : items.map(data).join('\n\n'), "timestamp": new Date().toISOString(), }] }) };
      for (var i = 0; i < webhooks.length; i++) { infoWebHook = UrlFetchApp.fetch(webhooks[i]+"?wait=true", embedSetup); }
    }
    infoWebHook = infoWebHook.getContentText();
    var indiceInicio = infoWebHook.indexOf("id", 1126)+5;
    var indiceFin = indiceInicio + 19;
    idMessage = infoWebHook.substring(indiceInicio, indiceFin);
    Logger.log(idMessage);
    PropertiesService.getScriptProperties().setProperty('idMessageAnterior', idMessage);
  } catch (error) {
    return Logger.log(error);
  }
}

function webScrapping() {
  // URL && HTML

  try {
    var response = UrlFetchApp.fetch(url, {
      "headers": {
        "muteHttpExceptions": "true",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "PHPSESSID=dakq4uuml1i52ctp4efrrmqk5t; google-analytics_v4_jWXd__ga4sid=1379604264; google-analytics_v4_jWXd__session_counter=1; google-analytics_v4_jWXd__ga4=b1d2552b-8c34-483a-89d4-d251163ac165; CookieScriptConsent={\"bannershown\":1}; _awl=2.1707686060.5-4cf88460ef269146cae7724d359ef8f9-6763652d6575726f70652d7765737431-2; google-analytics_v4_jWXd__engagementDuration=0; google-analytics_v4_jWXd__counter=30; google-analytics_v4_jWXd__let=1707686074950; google-analytics_v4_jWXd__engagementStart=1707686081334",
        "Referer": "https://arma3-servers.net/search/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });

    var html = response.getContentText();
    // console.log(html);
  } catch (e) {
    console.log("Error: " + e);
  }

  // //  ServerName
  const mainRegex = /<title>([\s\S]*?)<\/title>/gi;
  var serverName = html.match(mainRegex);
  serverName = eliminarEtiquetas(serverName[0], "title");
  console.log(serverName);


  // Ip
  var searchIp = /Addr([\s\S]*?)<\/tr>/gi;
  var ip = html.match(searchIp);
  ip = eliminarEtiquetas(ip[0], "strong");
  ip = ip.replace("Address</td>", "").trim();
  ip = ip.replace("</tr>", "").trim();
  ip = ip.replace("</strong></td>", "");
  ip = ip.replace("<td>", "");
  Logger.log(ip);

  // Status
  var searchStatus = /btn-sm">O([\s\S]*?)<\/button>/gi;
  var status = html.match(searchStatus);
  status = eliminarEtiquetas(status[0], "button");
  status = status.replace('btn-sm">', "").trim();
  Logger.log(status);


  // Players
  var searchPlayers = /<strong>Players([\s\S]*?)<\/tr>/gi;
  var players = html.match(searchPlayers);
  players = eliminarEtiquetas(players[0], "strong");
  players = players.replace("Players</td>", "").trim();
  players = players.replace("<td>", "");
  players = players.replace("</td>", "");
  players = players.replace("<strong>", "");
  players = players.replace("</strong>", "");
  players = players.replace("</tr>", "").trim();
  Logger.log(players);
  info = [serverName, ip, status, players];
  Logger.log(info);
  return info;
}


function eliminarEtiquetas(texto, etiqueta) {
  // Utiliza una expresión regular para quitar las etiquetas <h2> y </h2>.
  var etiquetaInicio = "<" + etiqueta + ">";
  var etiquetaFin = "</" + etiqueta + ">";
  var textoSinEtiquetas = texto.replace(etiquetaInicio, "");
  var textoSinEtiquetas = textoSinEtiquetas.replace(etiquetaFin, "");
  return textoSinEtiquetas;
}
