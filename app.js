
function init() {
    // add IDs to dropdown
    var dropdown = d3.select("#selDataset");

    d3.json("copiedsamples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        optionChanged(data.names[0]);
        
    });
}
init();

function plots(id) {
    
        d3.json("copiedsamples.json").then (data =>{
            console.log(data)
            var ids = data.samples.filter(meta => meta.id.toString() === id)[0].otu_ids;
            var sampleValues =  data.samples.filter(meta => meta.id.toString() === id)[0].sample_values.slice(0,10).reverse();
            var labels =  data.samples.filter(meta => meta.id.toString() === id)[0].otu_labels.slice(0,10);
            // top 10
            var OTU_top = (data.samples.filter(meta => meta.id.toString() === id)[0].otu_ids.slice(0, 10)).reverse();
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
            var labels =  data.samples.filter(meta => meta.id.toString() === id)[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
           
            var trace1 = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                type:"bar",
                orientation: "h",
            };
            var data1 = [trace1];
    
            var layout = {
                title: "Top 10 OTU"
            };
    
        Plotly.newPlot("bar", data1, layout);
            
            var trace2 = {
                x: data.samples.filter(meta => meta.id.toString() === id)[0].otu_ids,
                y: data.samples.filter(meta => meta.id.toString() === id)[0].sample_values,
                mode: "markers",
                marker: {
                    size: data.samples.filter(meta => meta.id.toString() === id)[0].sample_values,
                    color: data.samples.filter(meta => meta.id.toString() === id)[0].otu_ids
                },
                text:  data.samples.filter(meta => meta.id.toString() === id)[0].otu_labels
    
            };
            var layout_2 = {
                xaxis:{title: "OTU ID"}
            };
            var data2 = [trace2];
        Plotly.newPlot("bubble", data2, layout_2); 
        });
    }  
    
function demographics(id) {
    d3.json("copiedsamples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)
    
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
         
        var demographicInfo = d3.select("#sample-metadata");
        
        demographicInfo.html("");
    
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
    
function optionChanged(id) {
    console.log("changing option", id)
    plots(id);
    demographics(id);
}
    
