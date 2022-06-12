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

function optionChanged(value) {
    if (value != "Select ID") {
        createBarChart(value);
    }
}

function createBarChart(value) {
    let otu_data = "";
    let otu_id = [];
    let otu_label = [];
    let sample_value = [];
    console.log("Creating Bar Chart")
    d3.json(url).then(function(data) {
        for(let i = 0; i < 10; i++) {
            if (value == data.samples[i].id) {
                otu_data = data.samples[i];
            }
        }
        console.log(otu_data);
        for (let j = 0; j < 10; j++) {
            otu_id.push(otu_data.otu_ids[j]);
            otu_label.push(otu_data.otu_labels[j]);
            sample_value.push(otu_data.sample_values[j]);
        }
    });
    console.log("OTU ID", Object.values(otu_id));
    console.log("OTU label", otu_label);
    console.log("OTU Value", sample_value);

    var trace1 = {
        x: sample_value.map(row => row),
        y: otu_id.map(row => "OTU" + row),
        //hoverInfo: otu_label,
        type: 'bar',
        orientation: 'h'
      };
    
      var data = [trace1];
    
      Plotly.newPlot('bar', data);
}
