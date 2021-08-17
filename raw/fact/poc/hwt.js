let request = require("request");
let cheerio = require("cheerio");
let url ="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(url, cb)

//automation-browser
function cb(err,response,html){
  let chSelector = cheerio.load(html);
  let tables = chSelector(".table.bowler");
//console.log(tables.length);
// let bowlersHtmlString="";
//iterate over tables ans find all rows

for (let i=0; i<tables.length; i++){  
  let hWckts =0;
  let hwtName="";
  let teamBowlers=chSelector(tables[i]).find("tr"); //used to find inside an ...
  //console.log(teamBowlers);
  //now each row is for one bowler , 0th col is name , 4th col is wckts 
  for(let j=0; j<teamBowlers.length; j++){
     let eachbowlcol=chSelector(teamBowlers[j]).find("td"); //td is cols is html 
     let playerName = chSelector(eachbowlcol[0]).text();
     let wickets = chSelector(eachbowlcol[4]).text();
     console.log(playerName,"->", wickets);
     if(hWckts<=Number(wickets)){
       hWckts=wickets;
       hwtName=playerName;
     }

  }

  console.log("``````````````````````````````");
  console.log("Player", hwtName, "with wickets :", hWckts);
}

// console.log(bowlersHtmlString);
}