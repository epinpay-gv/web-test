import { Packages, Stream } from "@/features/streamers/streamers.types";

export const mockStreamers = [];
export const mockStreams: Stream[] = [
  {
    streamerId: "streamer-1",
    full_name: "Alex Johnson",
    nick_name: "AlexPlays",
    streamURl: "https://stream.example.com/alexplays",
    avatar_url: "https://avatar.example.com/alexplays.png",
    isEpinpayStreamer: true,
  },
  {
    streamerId: "streamer-2",
    full_name: "Maria Garcia",
    nick_name: "MariaGG",
    streamURl: "https://stream.example.com/mariagg",
    avatar_url: "https://avatar.example.com/mariagg.png",
    isEpinpayStreamer: false,
  },
  {
    streamerId: "streamer-3",
    full_name: "James Lee",
    nick_name: "JLeeTV",
    streamURl: "https://stream.example.com/jleetv",
    avatar_url: "https://avatar.example.com/jleetv.png",
    isEpinpayStreamer: true,
  },
  {
    streamerId: "streamer-4",
    full_name: "Sophie Turner",
    nick_name: "SophieStreams",
    streamURl: "https://stream.example.com/sophiestreams",
    avatar_url: "https://avatar.example.com/sophiestreams.png",
    isEpinpayStreamer: false,
  },
  {
    streamerId: "streamer-5",
    full_name: "Carlos Mendez",
    nick_name: "CarlosM",
    streamURl: "https://stream.example.com/carlosm",
    avatar_url: "https://avatar.example.com/carlosm.png",
    isEpinpayStreamer: true,
  },
  {
    streamerId: "streamer-6",
    full_name: "Yuki Tanaka",
    nick_name: "YukiLive",
    streamURl: "https://stream.example.com/yukilive",
    avatar_url: "https://avatar.example.com/yukilive.png",
    isEpinpayStreamer: false,
  },
  {
    streamerId: "streamer-7",
    full_name: "Emma Wilson",
    nick_name: "EmmaW",
    streamURl: "https://stream.example.com/emmaw",
    avatar_url: "https://avatar.example.com/emmaw.png",
    isEpinpayStreamer: true,
  },
  {
    streamerId: "streamer-8",
    full_name: "Noah Brown",
    nick_name: "NoahBGaming",
    streamURl: "https://stream.example.com/noahbgaming",
    avatar_url: "https://avatar.example.com/noahbgaming.png",
    isEpinpayStreamer: false,
  },
  {
    streamerId: "streamer-9",
    full_name: "Lena Müller",
    nick_name: "LenaMStream",
    streamURl: "https://stream.example.com/lenamstream",
    avatar_url: "https://avatar.example.com/lenamstream.png",
    isEpinpayStreamer: true,
  },
];
export const mockPackages : Packages[]= [{
    id: "package-001",
    name: "Bronze",
    order_rank: 1,
    is_active: true,
    created_at: "2026-02-10T08:00:00",
    updated_at: "2026-02-10T08:00:00",
    details: []
}];
