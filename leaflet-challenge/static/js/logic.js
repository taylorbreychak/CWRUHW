var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function(data) {
    
    createFeatures(data.features);
  });
  
  
  function createFeatures(eqData) {
  
    
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
        "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
    };
  
    
    var earthquakes = L.geoJSON(eqData, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        var color;
  
        if (feature.properties.mag < 4) {
          color = 'rgb(191,255,0)'
        } else if (feature.properties.mag < 5) {
          color = 'rgb(255, 246, 0)' 
        } else if (feature.properties.mag < 6) {
          color = 'rgb(255,191,0)'
        } else if (feature.properties.mag < 7) {
          color = 'rgb(255,128,0)'
        } else if (feature.properties.mag < 8) {
          color = 'rgb(255,64,0)'
        } else {
          color = 'rgb(255,0,0)'
        }
      
        var geojsonMarkerOptions = {
          radius: 4*feature.properties.mag,
          fillColor: color,
          color: "black",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        };
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
    });
  
  
    createMap(earthquakes);
  
  };
  
  
  function createMap(earthquakes) {
  
    
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: "pk.eyJ1IjoidGJyZXljaGFrIiwiYSI6ImNrM3A5Y2NubzAwc3YzbXJ2bGU4Z3llbjgifQ.B4e8BPRqrzuyP9Ua52KA0A"
    });
  
    
    var map = L.map("map-id", {
      center: [37.09, -95.71],
      zoom: 2,
      layers: [lightmap, earthquakes]
    });
  

  function getColor(d) {
    return d < 4 ? 'rgb(191,255,0)' :
          d < 5 ? 'rgb(255, 246, 0)' :
          d < 6  ? 'rgb(255,191,0)' :
          d < 7  ? 'rgb(255,128,0)' :
          d < 8  ? 'rgb(255,64,0)' :
          d < 9  ? 'rgb(255,0,0)' :
                      'rgb(255,0,0)';
  };
  
  
  
  var legend = L.control({position: 'bottomright'});
  
  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [3, 4, 5, 6, 7, 8]
      labels = ["Minor", "Light", "Moderate", "Strong", "Major", "Great"];
  
    
      div.innerHTML+='<b>Ritcher Magnitude Scale<b><br><hr>'
      
    
      for (var i = 0; i < labels.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            (labels[i] + '<br>');
  }
  
  return div;
  };
  
  legend.addTo(map);
  
  };