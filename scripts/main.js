var App=App||{};App={home:{}},function(){"use strict";App.Map={siteLang:"dari",init:function(){function a(){$("#control").fadeIn(100),$("#title").fadeIn(100),$("#narrative").html(""),$(".select-style").fadeOut(100),$("#back-button").fadeOut(100),$("#cross-hair").addClass("hide"),b(),f.view="home"}function b(){if(f.map.off("dragend"),f.layers.forEach(function(a){f.map.removeLayer(a)}),void 0!==f.homeMarker){var a=f.homeMarker;f.map.removeLayer(a),f.homeMarker=null}if(void 0!==f.distanceMarker){var a=f.distanceMarker;f.map.removeLayer(a),f.distanceMarker=null}}function c(){b(),$("#title").html(""),f.initUserLocationEntry(),$("#control").fadeOut(100),$("#title").fadeOut(100),$(".select-style").fadeIn(100),$("#back-button").fadeIn(100),$("#cross-hair").removeClass("hide"),f._addDrag(),f.view="manual"}function d(){b(),f.view="auto",$("#title").html(""),f.getUserGeoLocation(),$("#title").fadeOut(100),$("#cross-hair").removeClass("hide"),f._addDrag()}function e(){$("#title").html(""),$("#title").fadeOut(100),$("#control").fadeOut(100);var a=L.mapbox.tileLayer("afghan-open.0kmiy66r").addTo(f.map);f.layers.push(a),$("#back-button").fadeIn(100),f.view="all"}var f=this;$("body").hasClass("en")&&(App.Map.siteLang="en");var g="dari"===App.Map.siteLang?"afghan-open.311hsemi,afghan-open.0kmiy66r":"afghan-open.311hsemi,afghan-open.p1z41jor";this.map=L.mapbox.map("map",g,{tileLayer:{format:"jpg80"}}).setView([34.36137,66.363099],6),this.layers=[],this.view="home",this.fillSelect(),$("#auto-map").on("click",function(){"home"!==f.view&&d()});var h={"/":a,"/manual-map":c,"/auto-map":d,"view-map":e},i=Router(h);i.init()},addHome:function(a){L.marker([a.lat,a.lon]).addTo(this.map)},_addDrag:function(){var a=this;this.map.on("dragstart",function(){a.view="manual"}),this.map.on("dragend",function(){App.home={lat:a.map.getCenter().lat,lon:a.map.getCenter().lng},a._renderHome(App.home),a.getClosestPollingStation()})},addPoint:function(a){L.marker([a.lat,a.lon]).addTo(this.map)},addPath:function(a,b){var c=L.polyline([[a.lat,a.lon],[b.lat,b.lon]],{color:"red"}).addTo(this.map);this.map.fitBounds(c.getBounds())},_renderHome:function(a){if(this.homeMarker)this.homeMarker.setLatLng([a.lat,a.lon]).update();else{var b=L.divIcon({className:"current-location",iconSize:[20,20],iconAnchor:[8,12]});this.homeMarker=L.marker([a.lat,a.lon],{icon:b}).addTo(this.map)}},_renderDestination:function(a,b){if(this.distanceMarker)this.distanceMarker.setLatLng([a.lat,a.lon]).update();else{var c=L.divIcon({className:"dest-location",iconSize:[30,30],iconAnchor:[15,17]});this.distanceMarker=L.marker([a.lat,a.lon],{icon:c}).addTo(this.map)}var d=function(a,b,c,d,e){var f=Math.PI*a/180,g=Math.PI*c/180,h=(Math.PI*b/180,Math.PI*d/180,b-d),i=Math.PI*h/180,j=Math.sin(f)*Math.sin(g)+Math.cos(f)*Math.cos(g)*Math.cos(i);return j=Math.acos(j),j=180*j/Math.PI,j=60*j*1.1515,"K"==e&&(j=1.609344*j),"N"==e&&(j=.8684*j),j},e=d(App.home.lat,App.home.lon,a.lat,a.lon,"K").toFixed(2),f="نزدیک ترین مرکز رای دهی در",g="کیلو متری قرار دارد";return $("#narrative").html(" "+f+" "+b.location+" ،"+b.name+" "+e+" "+g+"."),new L.featureGroup([L.marker([App.home.lat,App.home.lon]),L.marker([a.lat,a.lon])])},getUserGeoLocation:function(){var a=this;return navigator.geolocation?(navigator.geolocation.getCurrentPosition(function(b){App.home={lat:b.coords.latitude,lon:b.coords.longitude},a._renderHome(App.home),a.getClosestPollingStation()}),!0):!1},getClosestPollingStation:function(){var a=this,b=function(b){for(var c=",",d=new RegExp("(\\"+c+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+c+"\\r\\n]*))","gi"),e=[[]],f=null;f=d.exec(b);){var g=f[1];if(g.length&&g!=c&&e.push([]),f[2])var h=f[2].replace(new RegExp('""',"g"),'"');else var h=f[3];e[e.length-1].push(h)}App.pollingStations=e,a.getNearestNeighbor()},c="dari"===this.siteLang?"data/data_dr.csv":"../data/data_en.csv";$.ajax({type:"GET",url:c,dataType:"text",success:function(a){b(a)}})},getNearestNeighbor:function(){for(var a=1/0,b=0,c=function(a,b){var c=0,d=0;return c=b.x-a.x,c*=c,d=b.y-a.y,d*=d,Math.sqrt(c+d)},d=1;d<App.pollingStations.length;d++){var e={x:App.home.lat,y:App.home.lon},f={x:App.pollingStations[d][0],y:App.pollingStations[d][1]},g=c(e,f);a>g&&(a=g,b=d)}var h={lon:App.pollingStations[b][1],lat:App.pollingStations[b][0]},i=this._renderDestination(h,{name:App.pollingStations[b][4],location:App.pollingStations[b][3]});return"auto"==this.view&&this.map.fitBounds(i.getBounds()),b},districts:{json:!1,urlDari:"data/districts-dari.json",urlEn:"../data/districts-en.json",get:function(a){var b="dari"===this.siteLang?this.districts.urlDari:this.districts.urlEn,c=this,d=this.districts.json;return d?d:void(d=omnivore.topojson(b).on("ready",function(){c.districts.json=d,a&&a(d)}))}},fillSelect:function(){var a=$.proxy(this.districts.get,this),b=this,c="dari"===this.siteLang?"ولسوالی تان را انتخاب کنید":"Choose your district",d="dari"===this.siteLang?"dari_dist":"dist_name";a(function(a){var e={},f=$("#districts");for(var g in a._layers)e[a._layers[g].feature.properties[d]]=a._layers[g];f.append($("<option />").text(c).val("default").attr("selected","selected")),$.each(e,function(a){f.append($("<option />").val(a).text(a))}),f.change(function(){var a=$("select option:selected").val();"default"!==a&&(b.map.fitBounds(e[a]),setTimeout(function(){App.home={lat:b.map.getCenter().lat,lon:b.map.getCenter().lng},b._renderHome(App.home),b.getClosestPollingStation()},1e3),window.location.hash="/manual-map",manualMap())})})},initUserLocationEntry:function(){var a=$.proxy(this.districts.get,this),b=this;a(function(a){a.addTo(b.map),b.layers.push(a)})}},window.App=App}(),$(document).ready(function(){App.Map.init()});