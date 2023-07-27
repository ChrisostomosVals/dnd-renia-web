import {
  EventHandler,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import LocationModel from "../../dist/models/LocationModel";
import WorldObjectModel from "../../dist/models/WorldObjectModel";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LocationApi from "../../dist/api/LocationApi";
import { toast } from "react-toastify";
import WorldObjectApi from "../../dist/api/WorldObjectApi";
import { MapContainer, TileLayer } from "react-leaflet";
import RequireAuth from "../../access/RequireAuth";
import {
  LatLngLiteral,
  LatLngTuple,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import { CustomMarker } from "../../components/Marker/Marker";
import { CustomPopup } from "../../components/Popup/Popup";
import Typography from "../../components/Typography/Typography";
import { theme } from "../../theme";
import { AiOutlineClose } from "react-icons/ai";
import * as Styled from "./Map.styles";
import { GiPositionMarker, GiWorld } from "react-icons/gi";
import { HiExternalLink, HiOutlinePencilAlt } from "react-icons/hi";
import { LocationEvents } from "../../blocks/LocationEvents/LocationEvents";
import { LocationForm } from "../../blocks/forms/locationForm/LocationForm";
import { ScrollableModal } from "../../components/Modal/ScrollableModal";
import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "../../components/Button/Button.style";
import { WorldObjectForm } from "../../blocks/forms/worldObjectForm/WorldObjectForm";
import { WorldObjectImages } from "../../blocks/worldObjectImages/WorldObjectImages";
import { Spinner } from "../../components/Spinner/Spinner";
const MapPage: FC = () => {
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [worldObjects, setWorldObjects] = useState<WorldObjectModel[]>([]);
  const mode = useSelector(
    (state: RootState) => state.settings.preferences.themeMode
  );
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const [type, setType] = useState<boolean>(false);
  const [center, setCenter] = useState<LatLngTuple>([0, 0]);
  const [marker, setMarker] = useState<LatLngTuple>();
  const outerBounds: LatLngTuple[] = [
    [-90, -180],
    [90, 180],
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<LatLngLiteral>();
  const [location, setLocation] = useState<LocationModel>();
  const [worldObject, setWorldObject] = useState<WorldObjectModel>();
  const [action, setAction] = useState<"view" | "edit" | "delete">("view");
  useEffect(() => {
    if (token) {
      LocationApi.GetAsync(token?.access_token, url).then((response) => {
        if (response.isError) {
          console.log(response.error);
          toast.error("Failed to fetch locations");
        } else {
          setLocation(response.data![0]);
          setCenter([Number(response.data![0].x), Number(response.data![0].y)]);
          setLocations(response.data!);
        }
      });
      WorldObjectApi.GetAsync(token?.access_token, url).then((response) => {
        if (response.isError) {
          console.log(response.error);
          toast.error("Failed to fetch locations");
        } else {
          setWorldObjects(response.data!);
        }
      });
    }
  }, [url, token]);
  const handlePopupClick = useCallback(
    <T,>(value: T, action: "view" | "edit", position?: LatLngLiteral): void => {
      if (!type) {
        setLocation(value as LocationModel);
        setOpen(true);
        setAction(action);
        if (action === "edit") {
          setPosition(position);
        }
      } else {
        setWorldObject(value as WorldObjectModel);
        setOpen(true);
        setAction(action);
        if (action === "edit") {
          setPosition(position);
        }
      }
    },
    []
  );
  const fetchLocations = async (): Promise<void> => {
    const response = await LocationApi.GetAsync(token?.access_token ?? "", url);
    if (response.isError) {
      console.log(response.error);
      toast.error("Failed to fetch locations");
    } else {
      setLocations(response.data!);
    }
    setOpen(false);
  };
  const fetchWorldObjects = async (): Promise<void> => {
    const response = await WorldObjectApi.GetAsync(
      token?.access_token ?? "",
      url
    );
    if (response.isError) {
      console.log(response.error);
      toast.error("Failed to fetch locations");
    } else {
      setWorldObjects(response.data!);
    }
    setOpen(false);
  };
  const handleMarkerDrag = (id: string, e?: any): void => {
    if (!type) {
      const updatedLocations = locations.map((loc) => {
        if (loc.id === id) {
          const { lat, lng } = e.target._latlng;
          return { ...loc, x: lng, y: lat };
        }
        return loc;
      });
      setLocations(updatedLocations);
    } else {
      const updateWorldObjects = worldObjects.map((obj) => {
        if (obj.id === id) {
          const { lat, lng } = e.target._latlng;
          const properties = obj.properties!.map((prop) =>
                prop.name === "latitude"
                  ? { ...prop, value: lat.toString()}
                  : prop.name === "longitude"
                  ? { ...prop, value: lng.toString()}
                  : prop
              )
          return { ...obj, properties: properties };
        }
        return obj;
      });
      setWorldObjects(updateWorldObjects);
    }
  };
  const handleNewMarkerDrag = (e?: any): void => {
    const { lat, lng } = e.target._latlng;
    setMarker([lat, lng]);
  };
  const handleDelete = async (): Promise<void> => {
    if (!type) {
      if (location) {
        try {
          const response = await LocationApi.DeleteAsync(
            token?.access_token ?? "",
            url,
            location.id
          );
          if (response.isError) {
            console.log(response.error);
            toast.error("Failed to delete Location");
          } else {
            setLocation(undefined);
            const updatedLocations = locations.filter(
              (item) => item.id !== location.id
            );
            setLocations(updatedLocations);
            toast.success("Location Deleted");
          }
        } catch (ex: any) {
          console.error(ex);
          toast.error("Something went wrong");
        }
        setOpen(false);
      }
    }
    else{
      if (worldObject) {
        try {
          const response = await WorldObjectApi.DeleteAsync(
            token?.access_token ?? "",
            url,
            worldObject.id
          );
          if (response.isError) {
            console.log(response.error);
            toast.error("Failed to delete World Object");
          } else {
            setLocation(undefined);
            const updatedWorldObjects = worldObjects.filter(
              (item) => item.id !== worldObject.id
            );
            setWorldObjects(updatedWorldObjects);
            toast.success("World Object Deleted");
          }
        } catch (ex: any) {
          console.error(ex);
          toast.error("Something went wrong");
        }
        setOpen(false);
      }
    }
  };
  const ModalChildren: FC = () => {
    if (!type) {
      switch (action) {
        default:
        case "view":
          return <LocationEvents events={location?.events ?? []} />;
        case "edit":
          return (
            <LocationForm
              onSuccess={fetchLocations}
              position={position}
              location={location}
            />
          );
        case "delete":
          return (
            <Styled.ModalContent>
              <Typography variant="heading1" align="center">
                Delete Location?
              </Typography>
              <Styled.ModalFooter>
                <Button
                  variant="secondary"
                  fullWidth={false}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button fullWidth={false} onClick={handleDelete}>
                  Submit
                </Button>
              </Styled.ModalFooter>
            </Styled.ModalContent>
          );
      }
    } else {
      switch (action) {
        default:
        case "view":
          return <WorldObjectImages id={worldObject?.id} />;
        case "edit":
          return (
            <WorldObjectForm
              onSuccess={fetchWorldObjects}
              position={position}
              worldObject={worldObject}
            />
          );
        case "delete":
          return (
            <Styled.ModalContent>
              <Typography variant="heading1" align="center">
                Delete Object?
              </Typography>
              <Styled.ModalFooter>
                <Button
                  variant="secondary"
                  fullWidth={false}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button fullWidth={false} onClick={handleDelete}>
                  Submit
                </Button>
              </Styled.ModalFooter>
            </Styled.ModalContent>
          );
      }
    }
  };
  const handleType = (type: boolean) => {
    setType(type);
    setMarker(undefined);
  };
  const handleDoubleClick = <T,>(value: T): void => {
    if (!type) {
      setAction("delete");
      setLocation(value as LocationModel);
      setOpen(true);
    } else {
      setAction("delete");
      setWorldObject(value as WorldObjectModel);
      setOpen(true);
    }
  };
  if(!url){
    return <Spinner visible={true}/>
  }
  return (
    <>
      <MapContainer
        maxBounds={outerBounds}
        center={center}
        zoom={3}
        maxZoom={3}
        minZoom={2}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "calc(100vh - 4rem)" }}
      >
        <Styled.MarkerTypesContainer>
          <Styled.ReactIcon>
            <GiWorld onClick={() => handleType(true)} size={40} />
          </Styled.ReactIcon>
          <Styled.ReactIcon>
            <GiPositionMarker size={40} onClick={() => handleType(false)} />
          </Styled.ReactIcon>
          <Styled.ReactIcon>
            {!marker ? (
              <FaCirclePlus size={40} onClick={() => setMarker([0, 0])} />
            ) : (
              <AiOutlineClose size={40} onClick={() => setMarker(undefined)} />
            )}
          </Styled.ReactIcon>
        </Styled.MarkerTypesContainer>
        <TileLayer
          noWrap={true}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`${url}/map/{z}/{x}/{y}.png`}
        />
        {!!locations.length &&
          !type &&
          locations.map((location, index) => (
            <CustomMarker
              key={location.id}
              draggable
              position={[Number(location.y), Number(location.x)]}
              color={
                index === 0
                  ? theme.color[mode].markerPrimary
                  : theme.color[mode].markerSecondary
              }
              eventHandlers={{
                dragend: (e) => handleMarkerDrag(location.id, e),
                dblclick: () => handleDoubleClick(location),
              }}
            >
              <CustomPopup>
                <Styled.PopupContainer>
                  <Typography variant="paragraphLarge" align="center">
                    Time: {location.time}
                  </Typography>
                  <Typography variant="paragraphLarge" align="center">
                    Date: {location.date}
                  </Typography>
                  <Typography variant="paragraphLarge" align="center">
                    Season: {location.season}
                  </Typography>
                  <Typography variant="paragraphLarge" align="center">
                    Year: {location.year}
                  </Typography>
                  <Styled.PopupFooter>
                    <HiExternalLink
                      cursor="pointer"
                      size={20}
                      onClick={() => handlePopupClick(location, "view")}
                    />
                    <HiOutlinePencilAlt
                      cursor="pointer"
                      size={20}
                      onClick={() =>
                        handlePopupClick(location, "edit", {
                          lat: Number(location.y),
                          lng: Number(location.x),
                        })
                      }
                    />
                  </Styled.PopupFooter>
                </Styled.PopupContainer>
              </CustomPopup>
            </CustomMarker>
          ))}
        {!!worldObjects.length &&
          type &&
          worldObjects.map((worldObject, index) => {
            const latitude = worldObject.properties?.find(
              (prop) => prop.name === "latitude"
            );
            const longitude = worldObject.properties?.find(
              (prop) => prop.name === "longitude"
            );
            if (latitude && longitude) {
              return (
                <CustomMarker
                  key={worldObject.id}
                  draggable
                  position={[Number(latitude.value), Number(longitude.value)]}
                  eventHandlers={{
                    dragend: (e) => handleMarkerDrag(worldObject.id, e),
                    dblclick: () => handleDoubleClick(worldObject),
                    click: () => setWorldObject(worldObject)
                  }}
                >
                  <CustomPopup>
                    <Styled.PopupContainer>
                      <Typography variant="heading2" align="center">
                        {worldObject.name}
                      </Typography>
                      <Typography variant="paragraphLarge" align="center">
                        {worldObject.type}
                      </Typography>
                      <Typography variant="paragraphLarge" align="center">
                        {worldObject.description}
                      </Typography>
                      <Styled.PopupFooter>
                        <HiExternalLink
                          cursor="pointer"
                          size={20}
                          onClick={() => handlePopupClick(worldObject, "view")}
                        />
                        <HiOutlinePencilAlt
                          cursor="pointer"
                          size={20}
                          onClick={() =>
                            handlePopupClick(worldObject, "edit", {
                              lat: Number(latitude.value),
                              lng: Number(longitude.value),
                            })
                          }
                        />
                      </Styled.PopupFooter>
                    </Styled.PopupContainer>
                  </CustomPopup>
                </CustomMarker>
              );
            }
            return null;
          })}
        {marker && (
          <CustomMarker
            draggable
            position={marker}
            color={theme.color[mode].hover}
            eventHandlers={{
              click: () =>
                handlePopupClick(undefined, "edit", {
                  lat: marker[0],
                  lng: marker[1],
                }),
              dragend: handleNewMarkerDrag,
            }}
          ></CustomMarker>
        )}
      </MapContainer>
      <ScrollableModal
        open={open}
        icon={<AiOutlineClose onClick={() => setOpen(false)} />}
      >
        <ModalChildren />
      </ScrollableModal>
    </>
  );
};

const Map = RequireAuth(MapPage);

export default memo(Map);
