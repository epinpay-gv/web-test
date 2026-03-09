interface SellerDetailProps {
    email: string,
    phone: string,
    address: string
}

export function SellerDetail({email, phone, address} : SellerDetailProps) {
   
    return(
        <div className="bg-(--bg-neutral-primary-soft) border border-[#1D303A] rounded-(--radius-base)  relative p-6">
            <div className="border-b border-[#1D303A] pb-2">
                <p className="text-(--text-body) font-medium">Satıcı Detayları</p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-2">
                <div className="flex flex-col">
                    <div className="w-full flex gap-1">
                        <p>Email:</p>
                        <p>{email}</p>
                    </div>
                    <div className="w-full flex gap-1">
                        <p>Telefon:</p>
                        <p>{phone}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <p>Adres</p>
                    <p>{address}</p>
                </div>
            </div>
        </div>
    )
}