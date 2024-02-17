'use client';

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

interface MovingObject {
  id: number;
  name: string;
  coordinates: number[];
}

interface MapComponentProps {
  defaultCenter: [number, number]; // Define types for default center coordinates
  defaultZoom: number;
  defaultMaxZoom: number;
  defaultPitch: number;
  defaultBearing: number;

}
const MapComponent: React.FC<MapComponentProps> = ({
  defaultCenter,
  defaultZoom,
  defaultMaxZoom,
  defaultPitch,
  defaultBearing,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null); // Use useRef to hold the map instance

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiaGVucnlyb2JiIiwiYSI6ImNsc3E5cWZwbTB6MWQybm51ZWhnNXZqdGYifQ.VP-6WVFeERn_zB1sN8PZdA";

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: defaultCenter,
        zoom: defaultZoom,
        maxZoom: defaultMaxZoom,
        pitch: defaultPitch,
        bearing: defaultBearing,
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
  }, [defaultCenter, defaultZoom, defaultMaxZoom, defaultPitch, defaultBearing]);

  // In map.component.tsx
  useEffect(() => {
    if (!map.current) return; // Ensure the map instance is available

    // Reacts to prop changes and updates the map view
    map.current.flyTo({
      center: defaultCenter,
      zoom: defaultZoom,
      pitch: defaultPitch,
      bearing: defaultBearing,
    });
  }, [defaultCenter, defaultZoom, defaultMaxZoom, defaultPitch, defaultBearing]); // Dependencies on props to listen for changes

  return (
    <div
      ref={mapContainer}
      style={{ position: "absolute", top: 50, bottom: 0, width: "100%" }}
    />
  );
};

export default MapComponent;
