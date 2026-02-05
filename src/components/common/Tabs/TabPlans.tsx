// TabPlans.tsx
import { Checkbox } from "../CheckBox/CheckBox"

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
            {plans.map(plan => (
                <div
                    key={plan.id}
                    className="bg-(--bg-neutral-primary-soft) hover:bg-(--bg-dark) max-w-xs rounded-t-lg p-4 flex flex-col gap-2 cursor-pointer w-84 h-24.25"
                    onClick={() => onPlanSelect?.(plan.id)}
                >
                    <div className="flex items-start justify-between">
                        <p className="text-(--text-heading) font-semibold text-[14px]">{plan.title}</p>
                        <Checkbox
                            variant="circle"
                            checked={selectedPlanId === plan.id}
                        />

                    </div>
                    <p className="text-(--text-body) text-sm  w-65.5 h-10">
                        {plan.description}
                    </p>
                </div>
            ))}
        </div>
    )
}