import { Checkbox } from "../CheckBox/CheckBox"

export default function TabPlans() {
    const premiumMock = [

        {
        id:"1m",    
        title: "1 Aylık",
        description: "1.00 $ ay başına (+ varsa KDV) her ay faturalandırılır."
        },
        {
        id:"2m", 
        title: "3 Aylık",
        description: "1.00 $ ay başına (+ varsa KDV) her ay faturalandırılır."
        },
        {
        id:"3m", 
        title: "12 Aylık",
        description: "1.00 $ ay başına (+ varsa KDV) her ay faturalandırılır."   
        }
    ]
    return(
        <div className="flex gap-2.5">
            {premiumMock.map(tab => (
                <div
                key={tab.id} className="bg-(--bg-dark) w-[320px] h-24.25 border rounded-t-lg p-4 flex flex-col justify-center"
                >
                    <div>
                          <Checkbox
            variant="circle"
            
            
          />
                    </div>
                    <p className="text-sm font-semibold text-[14px] text-(--text-heading)">{tab.title}</p>
                    <p className="text-(--text-body) text-sm">{tab.description}</p>
                </div>
                
            ))}
        </div>
    )
}