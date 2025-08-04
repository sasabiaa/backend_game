import { interpolate, motion, useScroll } from "motion/react";
import Navbar from "../components/Navbar";

import { useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { Map, Source, Layer } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useState } from "react";

const Mapbox = () => {
    // baca parameter URL city
    const { search } = useLocation();
    const city = new URLSearchParams(search).get("city");
    console.log("City from URL: ", city);

    // token
    const TOKEN = mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    // viewstate
    const [viewState, setViewState] = useState({
        longtitude: 110.5084366,
        latitude: -7.3305234,
        zoom: 6,
    });
    const [geojson, setGeojson] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // fetch dari BE tpi belum jadi

    // useEffect fetch ke Geojson juga blum

    //layer heatmap
    const heatmapLayer = {
        id: "heatmap",
        type: "heatmap",
        source: "air-quality",
        maxzoom: 15,
        paint: {
            "heatmap-weight": ["get", "intensity"],
            "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 2, 15,5],
            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(0,255,0,0)",
                0.2,
                "rgba(0,255,0,0.5)",
                0.4,
                "rgba(255,255,0,0.7)",
                0.6,
                "rgba(255,165,0,0.8)",
                0.8,
                "rgba(255,0,0,0.9)",
                1,
                "rgba(139,0,0,1)",
            ],
            "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 15, 60],
            "heatmap-opacity": 0.9,
        },
    };

    // circle layer
    const circleLayer = {
        id: "circle",
        type: "circle",
        source: "air-quality",
        minzoom: 12,
        paint: {
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["get", "aqi"],
                1,
                5,
                5,
                15,
                5,
                25,
            ],
            "circle-color": [
                "case",
                ["<", ["get", "aqi"], 2],
                "#00e400",
                ["<", ["get", "aqi"], 3],
                "#ffff00",
                ["<", ["get", "aqi"], 4],
                "#ff7e00",
                ["<", ["get", "aqi"], 5],
                "#ff0000",
                "#8f3f97",
            ],
            "circle-opacity": 0.8,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
        },
    };

    // loading
    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full" />
            </div>
        );
    }

  return (
    <div className="w-full min-h-screen justify-center items-center bg-cover bg-center bg-[#204E51]">
      <motion.div className="py-10">
        <Navbar />
      </motion.div>

      <div className="w-full h-full rounded-3xl overflow-hidden relative">
        <Map
            mapboxAccessToken={TOKEN}
            initialViewState={viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            style={{ width:"100%", height:"100%"}}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            attributionControl={false}
            reuseMaps={true}>
            {geojson && (
                <Source id="air-quality" type="geojson" data={geojson}>
                    <Layer {...heatmapLayer} />
                    <Layer {...circleLayer} />
                </Source>
            )}
        </Map>
      </div>


    </div>
  );
};

export default Mapbox;
