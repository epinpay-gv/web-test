import { CheckBox } from "@/components/common";


interface PlanOption {
    id: string;
    title: string;
    description: string;
}

interface TabPlansProps {
    plans: PlanOption[];
    selectedPlanId?: string;
    onPlanSelect?: (id: string) => void;
}

export default function TabPlans({ plans, selectedPlanId, onPlanSelect }: TabPlansProps) {
    return (
        <div className="flex gap-4">
            {plans.map(plan => {
                const isSelected = selectedPlanId === plan.id;

                return (
                    <div
                        key={plan.id}
                        onClick={() => onPlanSelect?.(plan.id)}
                        className={`
                            max-w-xs w-84 h-24.25 p-4 rounded-t-lg
                            flex flex-col gap-2 cursor-pointer
                            transition-colors duration-200
                            ${isSelected
                                ? "bg-(--bg-dark)"
                                : "bg-(--bg-neutral-primary-soft) hover:bg-(--bg-dark)"
                            }
                        `}
                    >
                        <div className="flex items-start justify-between">
                            <p className="text-(--text-heading) font-semibold text-[14px]">
                                {plan.title}
                            </p>
                            <CheckBox
                                variant="circle"
                                checked={isSelected}
                            />
                        </div>

                        <p className="text-(--text-body) text-sm w-65.5 h-10">
                            {plan.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
