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

  useEffect(() => {
    mapboxgl.accessToken = "your_mapbox_access_token";

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
        // Example of adding a 3D building layer
      });

      // Clean up on unmount
      return () => map.remove();
    }
  }, [defaultCenter, defaultZoom, defaultMaxZoom, defaultPitch, defaultBearing]);

  return (
    <div
      ref={mapContainer}
      style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
    />
  );
};

export default MapComponent;
