import { Button, Input } from "@/components/common";
import { QuestionCircle } from "flowbite-react-icons/outline";

export function DiscountCodeForm(){
    return(
        <div className="flex flex-col gap-2.5">
            <label className="text-(--text-heading) text-sm leading-5 flex items-center gap-1">
                İndirim kodu 
                <span className="text-(--text-body)"><QuestionCircle size={14}/></span>
            </label>
            <div className="flex gap-2">
                <Input 
                    placeholder="Kodu Gir"
                    rightIcon={<></>}
                    className="py-2.5 px-3"
                />
                <div className="w-[22%]">
                    <Button 
                        text="Onayla" 
                        variant="brand"                        
                        textSize="sm"
                        className="py-2.5 px-4"
                    />
                </div>
            </div>
        </div>
    )
}