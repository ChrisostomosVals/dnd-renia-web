import { DivIcon } from "leaflet";
import { FC } from "react";
import { Marker, MarkerProps } from "react-leaflet";
import { renderToString } from "react-dom/server"
import { GiPositionMarker } from "react-icons/gi";
type CustomMarkerProps = {
    color?: string;
} & MarkerProps;
export const CustomMarker: FC<CustomMarkerProps> = (props) => {
    const iconHTML = renderToString(<GiPositionMarker color={props.color} size={40}/>)
    const customMarkerIcon = new DivIcon({
        html: iconHTML,
        iconSize: [0, 0],
        iconAnchor: [22, 41],
      });
    return (
      <Marker {...props} icon={customMarkerIcon}>
        {props.children}
      </Marker>
    );
  };