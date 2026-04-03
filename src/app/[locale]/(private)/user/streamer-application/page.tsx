import { UserPageHeader } from "@/features/user/components";
import ApplicationCard from "@/features/user/components/streamer-application/ApplicationCard";

export default function Streamers() {
    return (
        <div>
             <UserPageHeader title="Yayıncı Başvurusu"/>
             <ApplicationCard/>
        </div>
    )
}