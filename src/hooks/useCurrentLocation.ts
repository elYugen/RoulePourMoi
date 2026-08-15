import * as Location from "expo-location";
import { useEffect, useState } from "react";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

type LocationState = {
  coords: Coordinates | null;
  loading: boolean;
  errorMessage: string | null;
};

export function useCurrentLocation() {
  const [state, setState] = useState<LocationState>({
    coords: null,
    loading: true,
    errorMessage: null,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        if (!cancelled) {
          setState({ coords: null, loading: false, errorMessage: "Localisation refusée." });
        }
        return;
      }

      try {
        const position = await Location.getCurrentPositionAsync({});
        if (!cancelled) {
          setState({
            coords: { latitude: position.coords.latitude, longitude: position.coords.longitude },
            loading: false,
            errorMessage: null,
          });
        }
      } catch {
        if (!cancelled) {
          setState({ coords: null, loading: false, errorMessage: "Position indisponible." });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
