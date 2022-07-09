var sample_data = './samples.json'

function init() {
    var dropdown = d3.select("#selDataset")
    d3.json(sample_data).then(function (data) {
        console.log(data);
    });
};
//         var id = data.names;
//         id.forEach(name => dropdown
//             .append("option")
//             .text(name)
//             .property('value', name))

//         console.log(id[0]);
//         demographics(id[0]);
//         buildPlots(id[0]);
//     });
// };