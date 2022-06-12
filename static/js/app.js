let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let otu_names = [];
d3.json(url).then(function(data) {
    for(let i=0; i < 10; i++){
        otu_names.push(data.samples[i])
      }
    console.log(otu_names);
    init(otu_names);
});

function init(otu_names) {
    console.log("Init", otu_names.length);
    let otu_select = d3.select('#selDataset');
    console.log("Init Select", otu_select);
    otu_select.attr("class","form-select form-select-lg mb-3 fw-bold fs-4");
    otu_select.append("option")
                .text("Select ID");

    for(let i = 0; i < otu_names.length; i++){
        otu_select.append("option")
            .text(otu_names[i].id)
            .attr("value", otu_names[i].id)
  }
}
