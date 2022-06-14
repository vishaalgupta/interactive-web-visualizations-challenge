# interactive-web-visualizations-challenge

# This challenge shows how to update visualizations when changing the value in the dropdown.

# I started by getting the dropdown values from the sample.json file. I then set up an onChange function that creates the visulizations when the dropdown value is changed.

# The first visualization was a horizontal bar chart. I grabbed the first ten otu_ids, otu_labels, and sample_values belonging to the dropdown value. I then plotted the otu_ids against the sample_values and used the otu_labels as hover text. 

# The second visualization was a bubble chart. I grabbed all the otu_ids belonging to the dropdown value and then sorted them in ascending order. Using the indexes of the sorted otu_ids, I was able to sort all of the otu_labels and sample_values belonging to the dropdown value. I plotted the sample_values against the otu_ids and used the otu_labes as hover text.

# The final visualzation is a panel showing all of the demographic information associated with the dropdown value. I updated the html of the panel div to include all of the demographic information. 
