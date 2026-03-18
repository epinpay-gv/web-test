import { Packages, Stream } from "@/features/streamers/streamers.types";

export const mockStreamers = [];

export const mockStreams: Stream[] = [
    {
    streamerId: "streamer-4",
    full_name: "Sophie Turner",
    nick_name: "SophieStreams",
    streamURl: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1",
    avatar_url: "/to-be-deleted/avatar-2.jpg",
    isEpinpayStreamer: false,
  },
  {
    streamerId: "streamer-5",
    full_name: "Carlos Mendez",
    nick_name: "CarlosM",
    streamURl: "https://player.twitch.tv/?channel=shadowkekw&parent=localhost&autoplay=true&muted=true",
    avatar_url: "/to-be-deleted/avatar-3.jpg",
    isEpinpayStreamer: true,
  },
  {
    streamerId: "streamer-1",
    full_name: "Alex Johnson",
    nick_name: "AlexPlays",
    streamURl: "https://player.kick.com/panky",
    avatar_url: "/to-be-deleted/avatar-1.jpg",
    isEpinpayStreamer: true,
  },
  {
    streamerId: "streamer-2",
    full_name: "Maria Garcia",
    nick_name: "MariaGG",
    streamURl: "https://player.kick.com/naru",
    avatar_url: "/to-be-deleted/avatar-2.jpg",
    isEpinpayStreamer: false,
  },
  {
    streamerId: "streamer-3",
    full_name: "James Lee",
    nick_name: "JLeeTV",
    streamURl: "https://player.kick.com/levo",
    avatar_url: "/to-be-deleted/avatar-3.jpg",
    isEpinpayStreamer: true,
  },

  {
    streamerId: "streamer-6",
    full_name: "Yuki Tanaka",
    nick_name: "YukiLive",
    streamURl: "https://stream.example.com/yukilive",
    avatar_url: "/to-be-deleted/avatar-1.jpg",
    isEpinpayStreamer: false,
  },
  {
    streamerId: "streamer-7",
    full_name: "Emma Wilson",
    nick_name: "EmmaW",
    streamURl: "https://stream.example.com/emmaw",
    avatar_url: "/to-be-deleted/avatar-1.jpg",
    isEpinpayStreamer: true,
  },
  {
    streamerId: "streamer-8",
    full_name: "Noah Brown",
    nick_name: "NoahBGaming",
    streamURl: "https://stream.example.com/noahbgaming",
    avatar_url: "/to-be-deleted/avatar-1.jpg",
    isEpinpayStreamer: false,
  },
  {
    streamerId: "streamer-9",
    full_name: "Lena Müller",
    nick_name: "LenaMStream",
    streamURl: "https://stream.example.com/lenamstream",
    avatar_url: "/to-be-deleted/avatar-1.jpg",
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
  details: [],
  description: ""
}];
