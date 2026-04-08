import {
  StreamerLeague,
  BasicStreamer,
} from "@/features/streamers/streamers.types";
import Image from "next/image";

type CardVariant = "default" | "detailed" | "profile";
type CardSize = "base" | "lg";

const CARD_VARIANT_CLASSES: Record<CardVariant, string> = {
  default: "gap-2.5",
  detailed: "flex-col gap-8",
  profile: "gap-4",
};
const CARD_SIZE_CLASSES: Record<CardSize, string> = {
  base: "w-[44px] h-[44px]",
  lg: "w-[120px] h-[120px]",
};
const BADGE_SIZE_CLASSES: Record<CardSize, string> = {
  base: "w-8 h-8",
  lg: "w-[68px] h-[68px]",
};

const LEAGUE_IMAGE_SRC: Record<StreamerLeague, string> = {
  rookie: "/streamers/level-0.webp",
  bronze: "/streamers/level-1.webp",
  silver: "/streamers/level-2.webp",
  gold: "/streamers/level-3.webp",
  platinum: "/streamers/level-4.webp",
};

// Social media icon components (inline SVGs to avoid extra deps)
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const DiscordIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

interface SocialLink {
  platform: "x" | "youtube" | "instagram" | "discord";
  url: string;
}

interface StreamerInfoProps {
  data: BasicStreamer & {
    socialLinks?: SocialLink[];
  };
  variant?: CardVariant;
  size?: CardSize;
}

const SOCIAL_ICONS = {
  x: XIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  discord: DiscordIcon,
};

export default function StreamerInfo({
  data,
  variant = "default",
  size = "base",
}: StreamerInfoProps) {
  // Profile variant: dark card with follower count + social links
  if (variant === "profile") {
    return (
      <div className="flex items-center gap-[16px] w-[400px] h-[172px] rounded-[12px] pt-[16px] pb-[16px] ml-1 ">
        {/* Avatar with league badge */}
        <div className="relative w-[140px] h-[140px]">
          <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden ring-4 ring-[#BBF451]">
            <Image
              src={data.avatar_url}
              alt={data.full_name}
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>

          {data.isEpinpayStreamer && data.package && (
            <div className="absolute left-[65px] top-[68px] w-[72px] h-[72px]">
              {/* sabit sarı parça */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `conic-gradient(from -120deg, #BBF451 42%, transparent 42%)`,
                  WebkitMask:
                    "radial-gradient(circle, transparent calc(60% - 30px), black calc(60% - 30px))",
                  mask: "radial-gradient(circle, transparent calc(60% - 30px), black calc(60% - 30px))",
                }}
              />

              {/* package görseli */}
              <div className="w-[65px] h-[65px] absolute left-[3px] top-[3px] overflow-hidden">
                <Image
                  src={LEAGUE_IMAGE_SRC[data.package]}
                  alt={data.package}
                  fill
                  sizes="65px"
                  className="object-cover border-[2px] border-[#051017] rounded-full bg-[#051017]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Name + follower count + social links */}
        <div className="flex flex-col gap-[16px] w-[168px] h-[115px]">
          <p className="text-white font-semibold text-xl leading-tight">
            {data.full_name}
          </p>
          <p className="text-[#8a9bb0] text-lg font-medium">
            <span className="text-white font-semibold">{data.followerCount}</span> takipçi
          </p>
          {data.socialLinks && data.socialLinks.length > 0 && (
            <div className="flex items-center gap-[8px]">
              {data.socialLinks.map(({ platform, url }) => {
                const Icon = SOCIAL_ICONS[platform];
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[36px] h-[36px] rounded-lg bg-[#1a2633] hover:bg-[#243347] text-[#8a9bb0] hover:text-white flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default & detailed variants (unchanged)
  return (
    <div className={`z-20 flex items-center ${CARD_VARIANT_CLASSES[variant]}`}>
      <div className="relative">
        <div
          className={`relative rounded-full overflow-hidden ${CARD_SIZE_CLASSES[size]}`}
        >
          <Image
            src={data.avatar_url}
            alt={data.full_name}
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
        {data.isEpinpayStreamer && data.package && (
          <div
            className={`absolute -right-2 -bottom-2 rounded-full overflow-hidden border-2 border-(--border-light-medium) ${BADGE_SIZE_CLASSES[size]}`}
          >
            <Image
              src={LEAGUE_IMAGE_SRC[data.package]}
              alt={data.full_name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 text-white">
        <p className="text-xl leading-2">{data.full_name}</p>
        {variant === "detailed" ? (
          <p className="text-lg leading-2 text-(--text-body)">
            {data.followerCount} takipçi
          </p>
        ) : (
          <p className="text-lg leading-2 text-(--text-body)">
            {data.nick_name}
          </p>
        )}
      </div>
    </div>
  );
}