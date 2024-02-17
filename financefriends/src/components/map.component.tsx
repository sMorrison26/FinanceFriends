'use client';

// src/components/MapComponent.tsx
import React, { useEffect, useRef } from "react";
import mapboxgl, { GeoJSONSourceRaw } from "mapbox-gl";

interface MovingObject {
  id: number;
  name: string;
  coordinates: number[];
}
// interface MapComponentProps {
//   defaultCenter: [-73.691482, 42.732983]; // Define types for default center coordinates
//   defaultZoom: 16;
//   defaultMaxZoom: 25;
//   defaultPitch: 65;
//   defaultBearing: 125;
// }

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  const movingObjects: MovingObject[] = [
    // Define your moving objects here
  ];

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiaGVucnlyb2JiIiwiYSI6ImNsc3E5cWZwbTB6MWQybm51ZWhnNXZqdGYifQ.VP-6WVFeERn_zB1sN8PZdA";

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-73.691482, 42.732983],
        zoom: 16,
        maxZoom: 25,
        pitch: 65,
        bearing: 125,
      });

      // Add zoom controls
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      // Add your custom markers and lines here
      map.on('style.load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayer = layers.find((layer) => layer.type === 'symbol' && layer.layout && layer.layout['text-field']);
        const labelLayerId = labelLayer ? labelLayer.id : undefined;

        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
          {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
              'fill-extrusion-color': '#aaa',

              // Use an 'interpolate' expression to
              // add a smooth transition effect to
              // the buildings as the user zooms in.
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
            }
          },
          labelLayerId
        );
      });
      // Clean up on unmount
      return () => map.remove();
    }
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
    />
  );
};

export default MapComponent;