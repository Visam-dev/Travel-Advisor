import { useMapEvents } from "react-leaflet";

const MapEvents = ({ setCoordinates, setBounds, searchQuery }) => {
  useMapEvents({
    // moveend: (e) => {
    //   const map = e.target;
    //   const center = map.getCenter();
    //   setCoordinates([center.lat, center.lng]);
    //   const bounds = map.getBounds();
    //   setBounds({
    //     ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
    //     sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
    //   });
    // },
    // zoomend: (e) => {
    //   const map = e.target;
    //   const center = map.getCenter();
    //   setCoordinates([center.lat, center.lng]);
    //   const bounds = map.getBounds();
    //   setBounds({
    //     ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
    //     sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
    //   });
    // }
    moveend: (e) => {
  if (searchQuery) {
    const map = e.target;
    const center = map.getCenter();
    setCoordinates([center.lat, center.lng]);
    const bounds = map.getBounds();
    setBounds({
      ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
      sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
    });
  }
},
zoomend: (e) => {
  if (searchQuery) {
    const map = e.target;
    const center = map.getCenter();
    setCoordinates([center.lat, center.lng]);
    const bounds = map.getBounds();
    setBounds({
      ne: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
      sw: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
    });
  }
}
  });
  return null;
};

export default MapEvents;