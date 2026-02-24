import { 
  DesktopPc, 
  MobilePhone,    
} from "flowbite-react-icons/outline";
import { JSX } from "react";
import { SiRiotgames, SiPlaystation, SiGoogleplay, SiEpicgames, SiNintendo, SiUbisoft, SiOrigin, SiAmazon, SiRazer, SiRoblox, SiNetflix, SiIcloud, SiSpotify, SiTwitch, } from "react-icons/si";
import { FaXbox, FaSteam, FaBattleNet, FaMicrosoft, FaItunes, FaWindows } from "react-icons/fa";
import { IoLogoAppleAppstore } from "react-icons/io5";
import { TbBrandDeezer, TbBrandDisney } from "react-icons/tb";

export const PLATFORM_ICON_MAP: Record<number, JSX.Element> = {
  1: <SiRiotgames size={20}/>,
  2: <SiPlaystation size={20}/>,
  3: <SiGoogleplay size={20}/>,
  4: <MobilePhone size={20} />,
  5: <FaXbox size={20} />,
  6: <SiEpicgames size={20} />,
  7: <SiPlaystation size={20} />,
  8: <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-10.5h4v1.5h-2.5v1.5h2v1.5h-2v1.5h2.5v1.5h-4v-7.5zm5.5 0h1.5l1.5 4.5 1.5-4.5h1.5v7.5h-1.5v-5.2l-1.5 4.5h-1l-1.5-4.5v5.2H12v-7.5z"/>
     </svg>,
  9: <SiNintendo size={20} />,
 10: <DesktopPc size={20} />,
 11: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"  fill="currentColor" />
        <path d="M12 16L15 18L12 10L9 18L12 16Z" fill="black" fillOpacity="0.2"/>
      </svg>,
 12: <SiUbisoft size={20}/>,
 13: <FaSteam size={20}/>,
 14: <SiOrigin size={20}/>,
 16: <SiPlaystation size={20}/>,
 17: <FaBattleNet size={20} />,
 18: <SiAmazon size={20} />,
 20: <SiRazer size={20} />,
 21: <SiRoblox  size={20} />,
 22: <div className="flex gap-1">
        <SiPlaystation size={20} />
        <FaXbox size={20}/>
     </div>,
 23: <FaMicrosoft  size={20} />,
 26: <SiGoogleplay size={20} />,
 27: <IoLogoAppleAppstore size={20}/>,
 28: <SiNetflix size={20}/>,
 29: <FaItunes size={20}/>,
 30: <SiIcloud size={20}/>,
 31: <TbBrandDisney size={20}/>,
 32: <TbBrandDeezer size={20}/>,
 33: <SiSpotify size={20}/>,
 34: <SiTwitch size={20}/>,
 35: <FaXbox size={20}/>,
 37: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 9H21L22 21H2L3 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     </svg>,
 39: <FaWindows size={20}/> 


};

const DEFAULT_ICON = <></>