import { useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import img from "/logo.png";

const Map = ({ position }) => {
  const mapElement = useRef();
  const markerElement = useRef();
  useEffect(() => {
    const map = tt.map({
      key: "AU0kSppGfQV2AAbNrHzXDme4Ft5y6RkE",
      container: mapElement.current,
      center: [position[0].longitude, position[0].latitude],
      zoom: 4,
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    const marker = new tt.Marker({ element: markerElement.current });
    const popup = new tt.Popup({ closeButton: true }).setHTML(position[0].title);

    if (position[0].latitude && position[0].longitude) {
      marker
        .setLngLat([position[0].longitude, position[0].latitude])
        .setPopup(popup)
        .addTo(map);
    } else {
      console.log("Geolocation is not supported by your browser");
    }
    const markers = [];
    position.forEach((place) => {
      markers.push({
        position: [place.longitude, place.latitude],
        title: place.title,
      });
    });

    markers.forEach((marker, i) => {
      if (i !== 0) {
        const popup = new tt.Popup({ closeButton: true }).setHTML(marker.title);
        new tt.Marker({ color: "#7C6555" })
          .setLngLat(marker.position)
          .setPopup(popup)
          .addTo(map);
        map.setCenter(marker.position);
      }
    });

    return () => {
      map.remove();
    };
  });

  return (
    <>
      <div ref={mapElement} className="mapDiv w-screen h-96"></div>;
      <img src={img} ref={markerElement} className="w-10 h-10" />
    </>
  );
};
export default Map;
