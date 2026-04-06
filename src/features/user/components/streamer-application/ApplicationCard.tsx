"use client";

import { mockStreamerApplications } from "@/mocks/user/streamer-application.mock";
import ApplicationCardBase from "./ApplicationCardBase";



export default function ApplicationCard() {
    return (
        <div>
            <h1 className="font-semibold text-[16px]">Başvurular</h1>
            <p className="text-(--text-body) text-[14px]">
                Yayıncı başvurularınızı buradan takip edebilirsiniz.
            </p>
            <div className="flex flex-wrap gap-4">
                {mockStreamerApplications.map((app) => (
                    <ApplicationCardBase key={app.applicationId} application={app} />
                ))}
            </div>
        </div>
    );
}