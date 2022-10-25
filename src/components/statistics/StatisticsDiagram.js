import React from "react";
import BasePreviewSection from "../profilePage/BasePreviewSection";
import StatisticsDiagramMonthView from "./StatisticsDiagramMonthView";
import "./statistics.css";

export default function StatisticsDiagram({}) {
    const DiagramView = StatisticsDiagramMonthView;

    return (
        <BasePreviewSection>
            <h2 className="mb-4">Статистика</h2>
            <DiagramView />
        </BasePreviewSection>
    );
}
