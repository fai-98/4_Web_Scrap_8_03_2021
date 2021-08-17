let request = require("request");
let cheerio = require("cheerio");
let url =
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(url, cb);

function cb(err, response, html) {
  let chSelector = cheerio.load(html);
  let tables = chSelector(".table.batsman");
  // console.log(tables.length);
  // let bowlersHtmlString = "";
  let hrsName = "";
  let hRuns = 0;
  for (let i = 0; i < tables.length; i++) {
    // bowlersHtmlString += chSelector(tables[i]).text();
    // find function find an element inside an element
    let teamBatsman = chSelector(tables[i]).find("tr");
    //each row with batsman has 8 cols , out of wich 0th idx is name , 2nd idx is Runs
    for (let j = 0; j < teamBatsman.length; j++) {
      // let bolHtml = chSelector(teamBowlers[j]).text();
      let eachbatCol = chSelector(teamBatsman[j]).find("td");
      if (eachbatCol.length == 8) {
        let playerName = chSelector(eachbatCol[0]).text();
        let runs = chSelector(eachbatCol[2]).text();
        console.log(playerName, "    ", runs);
        // console.log(bolHtml);
        // tr -> name ,wickets column
        if (hRuns <= Number(runs)) {
          hRuns = runs;
          hrsName = playerName;
        }
      }
    }
    console.log("```````````````````````````````````");
    console.log("Player", hrsName, "with runs :", hRuns);
    console.log("```````````````````````````````````");

  }
  // console.log(bowlersHtmlString);
  // innings bowler table-> 2
  //  get bowler name wickets
  // compare the wicket get the highest wicket taker
  //  let lbc= element.text();
  //    console.log(lbc);
}
// cheerio slect
