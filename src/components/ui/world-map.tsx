'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from 'react-simple-maps';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './card';
import { useTranslation } from 'react-i18next';

interface WorldMapProps {
    country: string;
    className?: string;
}

interface Position {
    coordinates: [number, number]; // 使用元组类型
    zoom: number;
}

// 国家名称映射：将重生系统中的国家名称映射到地图数据中的实际名称
const COUNTRY_NAME_MAPPING: Record<string, string[]> = {
    'United States': ['United States of America', 'United States'],
    'United Kingdom': ['United Kingdom', 'United Kingdom of Great Britain and Northern Ireland'],
    'Russia': ['Russia', 'Russian Federation'],
    'China': ['China'],
    'India': ['India'],
    'Indonesia': ['Indonesia'],
    'Pakistan': ['Pakistan'],
    'Brazil': ['Brazil'],
    'Nigeria': ['Nigeria'],
    'Bangladesh': ['Bangladesh'],
    'Mexico': ['Mexico'],
    'Japan': ['Japan'],
    'Germany': ['Germany'],
    'France': ['France'],
};



export function WorldMap({ country, className }: WorldMapProps) {
    const { t } = useTranslation();

    const [position, setPosition] = useState<Position>({
        coordinates: [0, 0], // 明确指定为元组
        zoom: 1
    });

    // 更新处理函数的类型
    const handleMoveEnd = (position: Position) => {
        setPosition(position);
    };

    // 检查是否应该高亮显示该地理区域
    const isCountryHighlighted = (geo: { properties: Record<string, unknown> }, targetCountry: string): boolean => {
        // 获取地理区域的所有可能名称
        const geoNames = [
            geo.properties.name,
            geo.properties.ADMIN,
            geo.properties.NAME,
            geo.properties.name_long,
            geo.properties.brk_name,
            geo.properties.admin,
            geo.properties.formal_en,
        ].filter(Boolean) as string[];

        // 获取目标国家的所有可能映射名称
        const targetNames = COUNTRY_NAME_MAPPING[targetCountry] || [targetCountry];

        // 检查是否有任何匹配
        return targetNames.some(targetName => 
            geoNames.some(geoName => 
                geoName && (
                    geoName === targetName || 
                    geoName.toLowerCase() === targetName.toLowerCase()
                )
            )
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={className}
        >
            <Card>
                <CardHeader>
                    {/*<CardTitle>Birth Location</CardTitle>*/}
                    <CardTitle>{t('worldMap')}</CardTitle>
                    <CardDescription>{t('birthCountry')}: {country}</CardDescription>
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
                                            const isHighlighted = isCountryHighlighted(geo, country);

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
