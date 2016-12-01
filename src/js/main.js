var utils = {};
var leagues = [];
var years = ["2008-2009","2009-2010", '2010-2011', '2011-2012', '2012-2013', '2013-2014'];
var forceDirect, leagueSelectionBar, teamSelectionBar;

window.onload = function () {
    forceDirect = new ForceDirect();

    //d3.select('.collapsable').on('mouseover', function() {
    //    var handle = d3.select('.hover-handle');
    //    var content = d3.select('.collapsable').select('.content');
    //    content.classed('show', true);
    //    content.style('display', 'inherit');
    //
    //}).on('mouseout', function() {
    //    var content = d3.select('.collapsable').select('.content');
    //    content.classed('show', false);
    //});

    d3.csv("../../data/transfer2008-2009.csv", function(error, csvData){
        var transferMatrix = [];
        var i = 0;
        csvData.forEach(function(d){
            var item = [];
            for(k in d){
                if(i==0){
                    leagues.push(k+"");
                }

                item.push(d[k]*1000);
            }
            i++;
            transferMatrix.push(item);
        });

      setUp(leagues, transferMatrix);
      teamSelectionBar = new TeamSelectionBar();
      leagueSelectionBar = new LeagueSelectionBar(teamSelectionBar, forceDirect);
      yearChart();
      buildChord(transferMatrix);
      forceDirect.loadYear("2008-2009", transferMatrix);
    });
};

function setUp(leagues, matrix) {
    /*
     Color scale.
     */
    utils.color = d3.scaleOrdinal()
        .domain(d3.range(11))
        .range(["#234928", "#AFDD89", "#957244", "#F26223", "#011227", "#C34222", "#F11223", "#A26229", "#807652", "#640928", "#E78271"]);
}