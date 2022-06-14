let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let otu_names = [];
d3.json(url).then(function(data) {
    for(let i=0; i < 10; i++){
        otu_names.push(data.samples[i]);
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
        createBubbleChart(value);
        createDemographics(value);
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
        console.log("OTU Data", otu_data.otu_ids);
        console.log(otu_data);
        for (let j = 0; j < 10; j++) {
            otu_id.push("OTU" + (otu_data.otu_ids[j]).toString());
            otu_label.push(otu_data.otu_labels[j]);
            sample_value.push(otu_data.sample_values[j]);
        }
        console.log("OTU ID", otu_id);
        console.log("OTU label", otu_label);
        console.log("OTU Value", sample_value);
    
        var trace1 = {
            x: sample_value.reverse(),
            y: otu_id.reverse(),
            hovertemplate: otu_label.reverse(),
            type: 'bar',
            orientation: 'h'
          };
        
          var data = [trace1];
        
          Plotly.newPlot('bar', data);
    });
}

function createBubbleChart(value) {
    let otu_data = "";
    let otu_id = [];
    let otu_id_sort = [];
    let otu_label = [];
    let sample_value = [];
    let index_list = [];
    console.log("Creating Bubble Chart")
    d3.json(url).then(function(data) {
        for(let i = 0; i < 10; i++) {
            if (value == data.samples[i].id) {
                otu_data = data.samples[i];
            }
        }
        console.log("OTU Data", otu_data);
        console.log(otu_data);
        for (let j = 0; j < otu_data.otu_ids.length; j++) {
            otu_id.push(otu_data.otu_ids[j]);
            otu_label.push(otu_data.otu_labels[j]);
        }
        otu_id_sort = otu_id.sort(function(a, b){return a-b});
        for (let x = 0; x < otu_id_sort.length; x++) {
            index_list.push(otu_data.otu_ids.indexOf(otu_id_sort[x]));
            sample_value.push(otu_data.sample_values[index_list[x]]);
            otu_label.push(otu_data.otu_labels[index_list[x]]);
        }
        console.log("OTU ID", otu_id_sort);
        console.log("OTU label", otu_label);
        console.log("OTU Value", sample_value);
    
        var trace1 = {
            type: 'scatter',
            mode: 'markers',
            y: sample_value,
            x: otu_id_sort,
            hovertemplate: otu_label,
            marker: { color: otu_id_sort, size: sample_value}
          };
        
          var data = [trace1];
        
          Plotly.newPlot('bubble', data);
    });
}

function createDemographics(value) {
    let all_data = [];

    d3.json(url).then(function(data) {
        for(let i=0; i < 10; i++){
            all_data.push(data.metadata[i]);
          }
        console.log("All Data", all_data);
        let demo_data = "";
        for (i = 0; i < all_data.length; i++) {
            if (value == all_data[i].id) {
                demo_data = all_data[i];
            }
        }
        console.log("Demo Data", demo_data);
        let demo_select = d3.select('#sample-metadata');
        demo_select.html("ID: " + demo_data.id + "<br> ethnicity: " + demo_data.ethnicity + "<br> gender: " + demo_data.gender + "<br> age: " + demo_data.age + "<br> location: " + demo_data.location + "<br> bbtype: " + demo_data.bbtype + "<br> wfreq: " + demo_data.wfreq);
    });
}