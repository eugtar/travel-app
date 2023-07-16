"use client";
import React from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";

// @ts-ignore
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadow: markerShadow.src,
});

const Map: React.FC<{ center?: number[] }> = ({ center }) => {
  return (
    <MapContainer
      center={(center as Leaflet.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {center && <Marker position={center as Leaflet.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
