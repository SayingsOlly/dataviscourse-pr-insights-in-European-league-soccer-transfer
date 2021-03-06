var utils = {};
var leagues = [];
var years = ["2008-2009","2009-2010", '2010-2011', '2011-2012', '2012-2013', '2013-2014'];
var forceDirect, leagueSelectionBar, teamSelectionBar, yearTrendDiagram, teamDetailDiagram;

var fileName = "transfer";

window.onload = function () {

  d3.select("#show-player")
    .style("width","120px")
    .style("height", "120px")
    .on("click",function(d){
      d3.select(this)
        .style("width","120px")
        .style("height", "120px");

      d3.select("#show-fee")
        .style("width","80px")
        .style("height", "80px");

      console.log("asdfas");
      fileName = "transfer";
      init();
    });

  d3.select("#show-fee")
    .on("click", function(d){
      d3.select(this)
          .style("width","120px")
          .style("height", "120px");

      d3.select("#show-player")
          .style("width","80px")
          .style("height", "80px");
      fileName = "transfer_fee";
      init();
    });

  init();


};

function setUp(leagues, matrix) {
    /*
     Color scale.
     */
    utils.color = d3.scaleOrdinal()
        .domain(d3.range(11))
        .range(["#1f78b4","#cab2d6","#b2df8a", "#33a02c",  "#fb9a99", "#e31a1c", "#fdbf6f","#ff7f00","#6a3d9a","#a6cee3", "#ffff99"]);

    utils.handleDisplayValue = function (d) {
        return (fileName == "transfer_fee"?"€"+(d).toFixed(2):d+"");
    }
}
var FIRST_TIME = true;
function init(){
  forceDirect = new ForceDirect();

  d3.csv("../../data/league_"+fileName+"2008-2009.csv", function(error, csvData){
        var transferMatrix = [];
        var i = 0;
        csvData.forEach(function(d){
            var item = [];
            for(k in d){
                if(i==0){
                    FIRST_TIME && leagues.push(k+"");
                  console.log("ad");
                  console.log(k);
                }

                item.push(d[k]*1000);
            }
            i++;
            transferMatrix.push(item);
        });
      FIRST_TIME = false;

      setUp(leagues, transferMatrix);
      yearTrendDiagram = new YearTrendDiagram();
      teamDetailDiagram = new TeamDetailDiagram();
      teamSelectionBar = new TeamSelectionBar(forceDirect);
      leagueSelectionBar = new LeagueSelectionBar(teamSelectionBar, forceDirect);

    yearChart();
    buildChord(transferMatrix);
      forceDirect.loadYear("2008-2009", transferMatrix);
    });
}
