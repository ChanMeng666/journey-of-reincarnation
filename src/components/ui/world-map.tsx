'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from 'react-simple-maps';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface WorldMapProps {
    country: string;
    className?: string;
}

export function WorldMap({ country, className }: WorldMapProps) {
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    function handleMoveEnd(position: { coordinates: [number, number]; zoom: number }) {
        setPosition(position);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={className}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Birth Location</CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-hidden">
                    <div className="h-[400px] w-full">
                        <ComposableMap
                            projectionConfig={{
                                rotate: [-10, 0, 0],
                                scale: 147
                            }}
                        >
                            <ZoomableGroup
                                zoom={position.zoom}
                                center={position.coordinates}
                                onMoveEnd={handleMoveEnd}
                                maxZoom={5}
                            >
                                <Geographies geography="/custom.geo.json">
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const isHighlighted =
                                                geo.properties.name === country ||
                                                geo.properties.ADMIN === country ||
                                                geo.properties.NAME === country;

                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={isHighlighted ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                                                    stroke="hsl(var(--border))"
                                                    strokeWidth={0.5}
                                                    style={{
                                                        default: {
                                                            outline: "none",
                                                        },
                                                        hover: {
                                                            fill: isHighlighted
                                                                ? "hsl(var(--primary))"
                                                                : "hsl(var(--muted-foreground))",
                                                            outline: "none",
                                                        },
                                                        pressed: {
                                                            outline: "none",
                                                        },
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
