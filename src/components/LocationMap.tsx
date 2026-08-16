import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

import { Coordinates } from "../hooks/useCurrentLocation";
import { colors } from "../styles/colors";

type LocationMapProps = {
  coords: Coordinates;
  style?: object;
};

// OpenStreetMap rendu avec Leaflet dans une webview.
// échange pour expo-maps (Google/Apple Maps natuf) pour la version prod (besoin api payante)
function buildMapHtml({ latitude, longitude }: Coordinates) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
      html, body, #map { height: 100%; margin: 0; padding: 0; background: ${colors.surface}; }
      .location-dot {
        width: 18px;
        height: 18px;
        border-radius: 9px;
        background: #4A90E2;
        border: 3px solid #ffffff;
        box-shadow: 0 0 0 6px rgba(74, 144, 226, 0.3);
      }
      .leaflet-control-attribution {
        font-size: 9px;
        background: rgba(27, 23, 48, 0.8);
        color: ${colors.textMuted};
      }
      .leaflet-control-attribution a { color: ${colors.textSecondary}; }
      .leaflet-tile-pane { filter: brightness(1.55) contrast(0.92); }
      .map-tint {
        position: absolute;
        inset: 0;
        z-index: 350;
        background: ${colors.accent};
        opacity: 0.45;
        mix-blend-mode: color;
        pointer-events: none;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      const map = L.map('map', { zoomControl: false }).setView([${latitude}, ${longitude}], 16);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);
      const icon = L.divIcon({ className: '', html: '<div class="location-dot"></div>', iconSize: [18, 18] });
      L.marker([${latitude}, ${longitude}], { icon }).addTo(map);

      const tint = document.createElement('div');
      tint.className = 'map-tint';
      document.getElementById('map').appendChild(tint);
    </script>
  </body>
</html>`;
}

export function LocationMap({ coords, style }: LocationMapProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: buildMapHtml(coords) }}
        style={styles.webview}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
