"use client";

import { useState } from "react";
import { useTheme } from "next-themes"; // Zustand yerine bunu kullanıyoruz
import { Input } from "@/components/common/Form/Input/Input";
import { User } from "flowbite-react-icons/outline";
import { useEffect } from "react";
import { Checkbox } from "@/components/common/CheckBox/CheckBox";
import NavigationTabs from "@/components/common/NavLinks/NavTabs/NavTabs";
import { Toggle } from "@/components/common/Toggle/Toggle";


import {
  Home,
  AdjustmentsHorizontal,
  UserCircle,
  Download,
  UserHeadset,
  CheckCircle,
} from "flowbite-react-icons/outline";

import NavItems from "@/components/common/NavLinks/NavTabs/NavItems";
import { IconShape } from "@/components/common/IconSahpe/IconShape";
import { Flame, Clock } from "lucide-react";
import Badges from "@/components/common/Badges/Badges";
import Pagination from "@/components/common/Paginate/Pagination";
import {BottomSheet} from "@/components/common/BottomSheet/BottomSheet";
import { Button } from "@/components/common/Button/Button";

const TIME_RANGES = [
  { label: "7 Gün", value: "1h" },
  { label: "10Gün", value: "24h" },
  { label: "12Gün", value: "1w" },
];

const MENU_TABS = [
  { label: "Home", value: "home", icon: Home },
  { label: "Settings", value: "settings", icon: AdjustmentsHorizontal },
  { label: "My account", value: "accounts", icon: UserCircle },
  { label: "Downloads", value: "downloads", icon: Download },
  { label: "Supports", value: "supports", icon: UserHeadset },
];

type ViewState = 'CATEGORY_LIST' | 'PLATFORM_DETAIL' | 'PRICE_FILTER';
export default function TestPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("");
  const [range, setRange] = useState("");
  const [visible, setVisible] = useState(true);
   const paginationData = {
    count: 28,
    current_page: currentPage,
    has_more: true,
    per_page: 8,
    total_page: 4,
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Burada API çağrısı yapabilirsiniz
    // fetchData(page);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<ViewState[]>(['CATEGORY_LIST']);
  const currentView = history[history.length - 1];
  const navigateTo = (nextView: ViewState) => {
    setHistory((prev) => [...prev, nextView]);
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1)); 
    } else {
      setIsOpen(false); 
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setHistory(['CATEGORY_LIST']), 300);
  };
  const handleClear = () => {
    console.log("Temizleye basıldı")
  }
  return (
    <div className="min-h-screen gap-8 flex justify-center items-center transition-colors bg-white dark:bg-slate-900">     
      <div className="flex flex-col gap-10">
        <div className="flex gap-4">
          <div>
            <Checkbox variant="square" />
            <Checkbox variant="square" checked />
          </div>
          <div>
            <Checkbox variant="square" disabled />
            <Checkbox variant="square" disabled checked />
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <Checkbox variant="circle" />
            <Checkbox variant="circle" checked />
          </div>
          <div>
            <Checkbox variant="circle" disabled />
            <Checkbox variant="circle" disabled checked />
          </div>
        </div>
        <div className="flex gap-10">
          <Checkbox
            variant="square"
            label="Remember me"
          />
          <Checkbox
            variant="square"
            label="Remember me"
            helperText="Save my credentials for easier sign-in"
          />

          <div className="p-10 space-y-6">
            {/* Normal */}
            <div className="flex gap-2">
              <Toggle />          
              <Toggle checked />
            </div>
            {/* Disabled */}
            <div className="flex gap-2">
              <Toggle disabled />
              <Toggle disabled checked />
            </div>
             {/* Normal */}
            <div className="flex gap-2">
              <Toggle size="lg"/>          
              <Toggle checked size="lg"/>
            </div>
            {/* Disabled */}
            <div className="flex gap-2">
              <Toggle disabled size="lg"/>
              <Toggle disabled checked size="lg"/>
            </div>
            
            {/* Focus halini görmek için Tab tuşuna basabilirsin */}
          </div>
          {/* <div className="flex items-start gap-3 rounded-lg bg-slate-800/60 px-4 py-3">
            <Checkbox
              variant="square"
              label="Remember me"
              helperText="Save my credentials for easier sign-in"
            />
          </div> */}
          <div className="p-10 flex gap-4 items-center">
            {/* Statik Renk - Circle */}
            {/* <IconShape icon={Flame} color="green" variant="circle" size="lg" /> */}
            
            {/* Statik Renk - Square */}
            {/* <IconShape icon={Flame} color="red" variant="square" size="lg" onClick={() => alert("ikona tıklandı")}/>
             */}
            {/* Dışarıdan Özel Renk (Custom) */}
            {/* <IconShape 
              icon={Flame} 
              color="custom" 
              customColor="var(--text-heading)" 
              variant="square" 
              size="lg" 
            /> */}
          </div>
          {/* <div>

            <NavItems
              label="Item 1"
              value="item1"
              icon={AdjustmentsHorizontal}
              isActive={false}
              onClick={() => { }}
              variant="bordered"
              size="base"
              iconPosition="left"
            />

            <NavigationTabs
              items={MENU_TABS}
              activeValue={activeTab}
              onChange={setActiveTab}
              variant="bordered"
              size="base"
            />

          </div> */}
        </div>
        <div className="mt-20 flex items-center flex-col">
           <div className="mt-12">
          <p className="text-white text-center mb-4">
            {currentPage}. Sayfadasın
          </p>
          <Pagination
            count={120}
            current_page={currentPage}
            has_more={true}
            per_page={8}
            total_page={5}
            onPageChange={handlePageChange}
          />
        </div>
        </div>
        <div className="mt-20 flex items-center flex-col">
          <div className="mt-12">
            <p className="text-white text-center mb-4">
              {currentPage}. Sayfadasın
            </p>
            <Pagination
              count={80}
              current_page={currentPage}
              has_more={true}
              per_page={8}
              total_page={10}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center"> 
        <div className="p-10">
      <Button onClick={() => setIsOpen(true)} text="Bottom Sheet" variant="tertiatry" size="full" padding="xl"/>

      <BottomSheet
        isOpen={isOpen}
        onClose={history.length < 1 ? handleClose : undefined}
        onBack={history.length > 1 ? goBack : undefined} 
        title={
          currentView === 'CATEGORY_LIST' ? 'Filtrele' : 
          currentView === 'PLATFORM_DETAIL' ? 'Platform Seç' : 'Fiyat Aralığı'
        }
        
      >
        {/* SAYFA 1: ANA LİSTE */}
        {currentView === 'CATEGORY_LIST' && (
          <div className="space-y-4 text-white p-6">
            <div 
              onClick={() => navigateTo('PLATFORM_DETAIL')}
              className="p-4 bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-700 flex justify-between"
            >
              <span>Platformlar</span>
              <span className="text-gray-400">→</span>
            </div>
            <div 
              onClick={() => navigateTo('PRICE_FILTER')}
              className="p-4 bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-700 flex justify-between"
            >
              <span>Fiyat Aralığı</span>
              <span className="text-gray-400">→</span>
            </div>
          </div>
        )}

        {/* SAYFA 2: PLATFORM DETAY */}
        {currentView === 'PLATFORM_DETAIL' && (
          <div className=" text-white">
            {['Steam', 'Epic Games', 'Playstation'].map(p => (
              <div key={p} className="p-4 border-b border-gray-800">{p}</div>
            ))}
            <div className="bg-(--bg-neutral-primary-soft) p-6 w-full flex gap-4">
              <Button text="Tümünü Temizle" onClick={handleClear} variant="tertiatry" appearance="filled" className="border border-(--border-default)"/>
              <Button text="Uygula" onClick={handleClose} variant="tertiatry" className="border border-(--border-default)"/>
            </div>
          </div>
        )}

        {/* SAYFA 3: FİYAT DETAY */}
        {currentView === 'PRICE_FILTER' && (
          <div className="p-10 text-center text-gray-400">
            Fiyat Kaydırıcısı Buraya Gelecek...
          </div>
        )}
      </BottomSheet>
    </div>
        </div>
      </div>
      {/* <div className="flex flex-col">
        <Badges text="new" theme="gray" secondaryText="secondary text" closable icon={<Clock />} type="default" />

        {visible && (
          <Badges
            text="Closable badge"
            theme="danger"
            icon={<Clock />}
            size="lg"
            closable
            secondaryText="secondary text"
            onClose={() => setVisible(false)}
          />
        )}

      </div>
      <div className="flex flex-col">
        <Badges text="new" theme="gray" secondaryText="secondary text" closable icon={<Clock />} type="default" />

        {visible && (
          <Badges
            text="Closable badge"
            theme="danger"
            icon={<Clock />}
            size="lg"
            closable
            secondaryText="secondary text"
            onClose={() => setVisible(false)}
          />
        )}

      </div> */}
      
    </div>
  );
}