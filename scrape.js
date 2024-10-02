import { fetchOrLoad, HTMLParser, CSV, nextTag, prevTag, table2json, table2csv, sleep } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";

const fn = "q-league-index.csv";
const url = "https://q-league.net/div/";

const html = await fetchOrLoad(url);
const dom = HTMLParser.parse(html);

const divs = dom.querySelectorAll(".item div.title a,h4");
console.log(divs.length); // 18 2+16teams

const list = [];

let league = null;
for (const item of divs) {
  if (item.tagName == "H4") {
    league = item.text;
  } else {
    const name = item.text;
    const url = item.getAttribute("href");
    list.push({ name, league, url });
  }
}
console.log(list, list.length);
await Deno.writeTextFile(fn, CSV.stringify(list));
Deno.exit();

const links = divs
  .filter(i => i.text.indexOf("年開催") >= 0)
  .map(i => i.querySelector("a").getAttribute("href"))
  .reverse();
//console.log(links);

//const list = []; // for init

for (const link of links) {
  console.log(link);
  const html = await fetchOrLoad(link);
  const dom = HTMLParser.parse(html);
  const tbl = dom.querySelector(".style_table");
  const json = table2json(tbl, "タイトル");
  //console.log(csv, json);
  for (const item of json) {
    if (!item.タグ) continue;
    if (list.find(i => i.タグ == item.タグ)) continue;
    if (!item.URL) item.URL = "https://kosenconf.jp/?" + item.タグ;
    item.中止フラグ = item.タイトル.endsWith("中止") ? 1 : 0;
    list.push(item);
  }
  await sleep(100);
  //break;
}

