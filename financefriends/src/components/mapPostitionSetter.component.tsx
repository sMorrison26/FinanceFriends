'use client';
import React, { useState } from 'react';
import MapboxComponent from './map.component'; // Adjust the import path as necessary

export default function MapPositionSetter() {
    const [mapProps, setMapProps] = useState({
        defaultCenter: [-73.985656, 40.748433] as [number, number], // Annotate as tuple
        defaultZoom: 14,
        defaultMaxZoom: 22,
        defaultPitch: 60,
        defaultBearing: -30,
    });


    const setDefaultPosition = () => {
        setMapProps({
            defaultCenter: [-73.691482, 42.732983] as [number, number], // Annotate as tuple
            defaultZoom: 16,
            defaultMaxZoom: 22,
            defaultPitch: 65,
            defaultBearing: 125,
        });
    };

    return (
        <div>
            <button onClick={setDefaultPosition}>Set Default Position</button>
            <MapboxComponent
                defaultCenter={mapProps.defaultCenter}
                defaultZoom={mapProps.defaultZoom}
                defaultMaxZoom={mapProps.defaultMaxZoom}
                defaultPitch={mapProps.defaultPitch}
                defaultBearing={mapProps.defaultBearing}
            />
        </div>
    );
}
