// Set Variable for sample data
var sample_data = './samples.json'

// Create funtion to import data and create dropdown listing of all names
function init() {
    var dropdown = d3.select("#selDataset")
    d3.json(sample_data).then(function (data) {
        var id = data.names;
        
        id.forEach(name => dropdown
            .append("option")
            .text(name)
            .property('value', name))

            console.log(data);

        console.log(id[0]);
        demographics(id[0]);
        buildPlots(id[0]);
    });
};

init();

function demographics(unique_id) {
    var panel_sample = d3.select("#sample-metadata")
    panel_sample.html("")
    d3.json(sample_data).then(function (data) {
        // console.log(data);
        var info = data.metadata;
        info = info.filter(row => row.id == unique_id)[0];
        Object.entries(info).forEach(function ([key, value]) {
            panel_sample.append("p").text(`${key}: ${value}`)
            // console.log(`${key}: ${value}`)
        });
    });
};

// Create a function to create horizontal bar chart and bubble chart
function buildPlots(unique_id) {
    d3.json(sample_data).then(function (data) {
        // console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == unique_id);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        // Build the bar chart//
        var bar_trace = {
            type: 'bar',
            orientation: 'h',
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            text: otu_labels.slice(0, 10).reverse(),
        };

        var bar_data = [bar_trace];

        var bar_layout = {
            title: "Top 10 OTU's per individual",
        };

        Plotly.newPlot("bar", bar_data, bar_layout);

        // Build the bubble chart //
        var bubble_trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            },
            text: otu_labels
        };

        var bubble_data = [bubble_trace];

        var bubble_layout = {
            title: "Bacteria Cultures Per Sample",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Frequency"}
        };

        Plotly.newPlot("bubble", bubble_data, bubble_layout)
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildPlots(newSample);
    demographics(newSample);
};