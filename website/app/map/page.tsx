"use client";

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FeatureCollection, Feature, Point, Polygon } from 'geojson';

const HurricaneTrackingSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize Mapbox map
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXNpbm9jY2hpIiwiYSI6ImNtMjZ6em9hMDBybHcyanEwZ3MzbmY4N2IifQ.UE9LnWhOP0XeWrfsbqyHCg';
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-85.5, 25.5],
      zoom: 4,
    });

    map.on('load', () => {
      console.log("Map loaded successfully");

      // Define Hurricane Path Data
      const hurricanePathData: FeatureCollection<Point> = {
        type: "FeatureCollection",
        features: [
          createPathPoint([-94.5, 21.0], "October 5, 2024, 11:00 PM ET", "Tropical Storm", 50),
          createPathPoint([-90.0, 22.5], "October 8, 2024, 5:00 AM ET", "Category 4", 150),
          createPathPoint([-85.5, 25.0], "October 9, 2024, 11:00 AM ET", "Category 4", 155),
          createPathPoint([-82.0, 27.5], "October 10, 2024, 10:00 AM ET", "Category 3", 120),
        ]
      };

      // Define Wind Swath Data
      const windSwathData: FeatureCollection<Polygon> = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[
                [-95.0, 21.0],
                [-94.0, 28.0],
                [-88.0, 32.0],
                [-80.0, 28.0],
                [-81.0, 22.0],
                [-90.0, 18.0],
                [-95.0, 21.0]
              ]]
            },
            properties: {
              minStrength: "Tropical Storm",
              minWinds: 50
            }
          }
        ]
      };

      // Add sources and layers
      map.addSource('hurricane-path', { type: 'geojson', data: hurricanePathData });
      map.addSource('wind-swath', { type: 'geojson', data: windSwathData });

      map.addLayer({
        id: 'wind-swath-layer',
        type: 'fill',
        source: 'wind-swath',
        paint: { 'fill-color': '#88b6e0', 'fill-opacity': 0.3 }
      });

      map.addLayer({
        id: 'hurricane-path-layer',
        type: 'line',
        source: 'hurricane-path',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#ff4444', 'line-width': 3 }
      });

      map.addLayer({
        id: 'hurricane-points',
        type: 'circle',
        source: 'hurricane-path',
        paint: {
          'circle-radius': 6,
          'circle-color': [
            'match',
            ['get', 'category'],
            'Tropical Storm', '#ffeda0',
            'Category 1', '#feb24c',
            'Category 2', '#fd8d3c',
            'Category 3', '#fc4e2a',
            'Category 4', '#e31a1c',
            'Category 5', '#b10026',
            '#ff4444' // Default color
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      map.on('mouseenter', 'hurricane-points', (e) => {
        console.log('Mouse entered hurricane point');
        map.getCanvas().style.cursor = 'pointer';
        
        const features = e.features;
        if (features && features.length > 0) {
          const feature = features[0] as Feature<Point>;
          
          if (feature.geometry && feature.properties) {
            const coordinates = feature.geometry.coordinates.slice() as [number, number];
            const properties = feature.properties;
            
            const popupContent = `
              <div style="font-family: Arial, sans-serif; padding: 10px; color: black;">
                <h3 style="margin: 0 0 10px 0; font-size: 16px;">Milton</h3>
                <p style="margin: 0; font-weight: bold;">PAST POSITION</p>
                <p style="margin: 5px 0;"><strong>DATE:</strong> ${properties.date || 'N/A'}</p>
                <p style="margin: 5px 0;"><strong>MAX STRENGTH:</strong> ${properties.category || 'N/A'}</p>
                <p style="margin: 5px 0;"><strong>MAX WINDS:</strong> ${properties.windSpeed || 'N/A'} mph</p>
              </div>
            `;

            console.log('Popup content:', popupContent);

            // Ensure that the popup has content before adding it to the map
            popup.setLngLat(coordinates)
                 .setHTML(popupContent)
                 .addTo(map);
          }
        }
      });

      map.on('mouseleave', 'hurricane-points', () => {
        console.log('Mouse left hurricane point');
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

      map.on('mouseenter', 'wind-swath-layer', (e) => {
        console.log('Mouse entered wind swath');
        map.getCanvas().style.cursor = 'pointer';
        
        const features = e.features;
        if (features && features.length > 0) {
          const feature = features[0] as Feature<Polygon>;
          
          if (feature.properties) {
            const properties = feature.properties;
            
            const popupContent = `
              <div style="font-family: Arial, sans-serif; padding: 10px; color: black;">
                <h3 style="margin: 0 0 10px 0; font-size: 16px;">Milton</h3>
                <p style="margin: 0; font-weight: bold;">WIND SWATH</p>
                <p style="margin: 5px 0;">Extent of tropical storm-force winds</p>
                <p style="margin: 5px 0;"><strong>MIN STRENGTH:</strong> ${properties.minStrength || 'N/A'}</p>
                <p style="margin: 5px 0;"><strong>MIN WINDS:</strong> ${properties.minWinds || 'N/A'} mph</p>
              </div>
            `;

            console.log('Popup content:', popupContent);

            popup.setLngLat(e.lngLat)
                 .setHTML(popupContent)
                 .addTo(map);
          }
        }
      });

      map.on('mouseleave', 'wind-swath-layer', () => {
        console.log('Mouse left wind swath');
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

      // Add Storm Strength Indicator
      const stormStrengthLegend = document.createElement('div');
      stormStrengthLegend.id = 'storm-strength-legend';
      stormStrengthLegend.style.position = 'absolute';
      stormStrengthLegend.style.bottom = '20px';
      stormStrengthLegend.style.left = '20px';
      stormStrengthLegend.style.background = 'rgba(255, 255, 255, 0.8)';
      stormStrengthLegend.style.padding = '10px';
      stormStrengthLegend.style.borderRadius = '5px';
      stormStrengthLegend.style.color = 'black';
      stormStrengthLegend.innerHTML = `
        <h4 style="margin-bottom: 5px;">Storm strength</h4>
        <div style="display: flex; align-items: center;">
          <div style="width: 20px; height: 20px; background: #ffeda0; margin-right: 5px;"></div>
          <span>Tropical Storm</span>
        </div>
        <div style="display: flex; align-items: center;">
          <div style="width: 20px; height: 20px; background: #feb24c; margin-right: 5px;"></div>
          <span>1</span>
        </div>
        <div style="display: flex; align-items: center;">
          <div style="width: 20px; height: 20px; background: #fd8d3c; margin-right: 5px;"></div>
          <span>2</span>
        </div>
        <div style="display: flex; align-items: center;">
          <div style="width: 20px; height: 20px; background: #fc4e2a; margin-right: 5px;"></div>
          <span>3</span>
        </div>
        <div style="display: flex; align-items: center;">
          <div style="width: 20px; height: 20px; background: #e31a1c; margin-right: 5px;"></div>
          <span>4</span>
        </div>
        <div style="display: flex; align-items: center;">
          <div style="width: 20px; height: 20px; background: #b10026; margin-right: 5px;"></div>
          <span>5</span>
        </div>
      `;
      
      if (mapContainer.current) {
        mapContainer.current.appendChild(stormStrengthLegend);
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Hurricane Tracking</h2>
      <div
        ref={mapContainer}
        className="w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden"
      ></div>
    </section>
  );
};

function createPathPoint(coordinates: [number, number], date: string, category: string, windSpeed: number): Feature<Point> {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: coordinates
    },
    properties: {
      date: date,
      category: category,
      windSpeed: windSpeed
    }
  };
}

export default HurricaneTrackingSection;