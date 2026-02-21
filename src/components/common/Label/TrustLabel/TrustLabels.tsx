import { TRUST_LABEL_DATA } from "./trust-label.data";
import { LabelType, TrustLabelKey } from "./trust-label.types";

interface TrustLabelsProps {
  type?: LabelType;
  labelList: TrustLabelKey[];
  orientation?: "horizontal" | "vertical";
}

export default function TrustLabels({
  type = "default",
  labelList,
  orientation = "horizontal",
}: TrustLabelsProps) {

  const iconColorMap = {
    warning: "text-(--text-fg-warning)",
    purple: "text-(--text-fg-indigo)/80",
    cyan: "text-(--text-fg-lime)/80",
  };

  return (
    <div
      className={`flex ${orientation === "horizontal" ? "w-full items-center" : "flex-col"} ${type === "colorful" ? "gap-3" : "gap-2"}`}
    >
      {labelList.map((key) => {
        const { icon: Icon, iconColor, title } = TRUST_LABEL_DATA[key];

        return (
          <div key={key} className="flex items-center gap-2">
            <Icon
              size={20}
              className={iconColor ? iconColorMap[iconColor] : undefined}
            />
            <p className="text-xs text-(--text-body)">{title}</p>
          </div>
        );
      })}
    </div>
  );
}
