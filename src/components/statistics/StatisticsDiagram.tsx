import React from "react";
import BasePreviewSection from "../profilePage/BasePreviewSection";
import StatisticsDiagramMonthView from "./StatisticsDiagramMonthView";

export default function StatisticsDiagram() {
    const DiagramView = StatisticsDiagramMonthView;

    return (
        <BasePreviewSection>
            <h2 className="mb-4">Статистика</h2>
            <DiagramView />
        </BasePreviewSection>
    );
}
