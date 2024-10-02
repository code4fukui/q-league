import { fetchOrLoad, HTMLParser, CSV, nextTag, prevTag, table2json, table2csv, sleep } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";

const fnidx = "q-league-index.csv";
const fn = "q-league.csv";
const list = await CSV.fetchJSON(fnidx);

const fnp = "q-league-player.csv";
const players = [];

for (const item of list) {
  const html = await fetchOrLoad(item.url);
  const dom = HTMLParser.parse(html);

  const h4 = dom.querySelector(".su-column-inner h4");
  item.phrase = h4.text;
  item.goal = nextTag(h4).text;
  //console.log(item);

  const tables = dom.querySelectorAll("table");
  //console.log(tables.length);

  for (const table of tables) {
    const tblname = prevTag(table).text;
    if (tblname == "選手情報") {
      const json = table2json(table);
      json.forEach(i => players.push({
        name: i.選手氏名,
        position: i.ポジション,
        no: i.背番号,
        team_name: item.name,
        team_league: item.league,
        url: item.url,
      }))
    } else if (tblname == "監督・コーチ情報") {
      const csv = table2csv(table);
      item.director = csv[0][1];
      item.coach = csv[1][1];
    } else {
      const csv = table2csv(table);
      const position = csv[0][0];
      const ja2en = {
        "シャツ": "shirt",
        "ショーツ": "shorts",
        "ソックス": "socks",
        "ストッキング": "socks",
      }
      for (let i = 1; i < csv.length; i++) {
        item[ja2en[csv[i][0]] + "_" + position + "_main"] = csv[i][1];
        item[ja2en[csv[i][0]] + "_" + position + "_sub"] = csv[i][2];
      }
    }
  }
  console.log(item);
  //break;
  //await sleep(500);
}
//console.log(players);

console.log(list.length);
await Deno.writeTextFile(fn, CSV.stringify(list));
console.log(players.length);
await Deno.writeTextFile(fnp, CSV.stringify(players));
