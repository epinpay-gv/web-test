"use client";

import { useState, useMemo } from "react";
import { useTheme } from "next-themes"; // Zustand yerine bunu kullanıyoruz

import { ProgressBar } from "@/components/common/ProgressBar/ProgressBar";
import { Input } from "@/components/common/Form/Input/Input";


<<<<<<< HEAD
import {
  Home,
  AdjustmentsHorizontal,
  UserCircle,
  Download,
  UserHeadset,
  CheckCircle,
  UserAdd,
  AngleRight,
  ExclamationCircle
} from "flowbite-react-icons/outline";

import NavItems from "@/components/common/NavLinks/NavTabs/NavItems";
<<<<<<< HEAD
import { IconShape } from "@/components/common/IconSahpe/IconShape";
import { Flame, Clock, HelpCircle, ChevronDown, Badge, ChevronRight, Trash } from "lucide-react";
import Badges from "@/components/common/Badges/Badges";
=======
import { IconShape } from "@/components/common/IconShape/IconShape";
import { Flame, Clock } from "lucide-react";
import Badges from "@/components/common/Badges/Badge";
>>>>>>> feature/catalog
import Pagination from "@/components/common/Paginate/Pagination";
import Accordion from "@/components/common/Accordion/Accordion";
import AccordionItem from "@/components/common/Accordion/AccordionItem";
import DropdownListItem from "@/components/common/Dropdown/DropdownListItem";
import { Modal } from "@/components/common/Modal/Modal";
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
=======

>>>>>>> feature/login-register

const faqData = [
  {
    id: 1,
    title: "Can I use Flowbite in open-source projects?",
    content: `Generally, it is accepted to use Flowbite in open-source projects, as long as it is not a UI library, a theme, a template, a page-builder that would be considered as an alternative to Flowbite itself.

With that being said, feel free to use this design kit for your open-source projects.

Find out more information by reading the release.`,
    defaultOpen: true,
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Can I contribute to the Flowbite project?",
    content:
      "Yes! Flowbite is open-source and we welcome contributions from the community.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "What are the main features of Flowbite?",
    content:
      "Flowbite includes a comprehensive set of UI components, dark mode support, and more.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Is Flowbite compatible with popular frontend frameworks?",
    content:
      "Yes, Flowbite works with React, Vue, Angular, and vanilla JavaScript.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Does Flowbite offer pre-built components?",
    content: "Yes, Flowbite provides dozens of ready-to-use components.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 6,
    title: "Is Flowbite free to use, or does it have premium features?",
    content:
      "Flowbite offers both free and premium versions with additional components.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 7,
    title: "How can I get technical support for Flowbite?",
    content:
      "You can get support through GitHub issues, Discord community, or documentation.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 8,
    title: "Where can I find Flowbite documentation and guides?",
    content:
      "Complete documentation is available at flowbite.com/docs with examples and guides.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 9,
    title: "Is Flowbite suitable for commercial projects?",
    content:
      "Yes, Flowbite can be used in commercial projects under the MIT license.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 10,
    title: "How can I get support if I encounter issues with Flowbite?",
    content:
      "Support is available through multiple channels including community forums and direct support.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
];


const faqData = [
  {
    id: 1,
    title: "Can I use Flowbite in open-source projects?",
    content: `Generally, it is accepted to use Flowbite in open-source projects, as long as it is not a UI library, a theme, a template, a page-builder that would be considered as an alternative to Flowbite itself.

With that being said, feel free to use this design kit for your open-source projects.

Find out more information by reading the release.`,
    defaultOpen: true,
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Can I contribute to the Flowbite project?",
    content:
      "Yes! Flowbite is open-source and we welcome contributions from the community.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "What are the main features of Flowbite?",
    content:
      "Flowbite includes a comprehensive set of UI components, dark mode support, and more.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Is Flowbite compatible with popular frontend frameworks?",
    content:
      "Yes, Flowbite works with React, Vue, Angular, and vanilla JavaScript.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Does Flowbite offer pre-built components?",
    content: "Yes, Flowbite provides dozens of ready-to-use components.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 6,
    title: "Is Flowbite free to use, or does it have premium features?",
    content:
      "Flowbite offers both free and premium versions with additional components.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 7,
    title: "How can I get technical support for Flowbite?",
    content:
      "You can get support through GitHub issues, Discord community, or documentation.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 8,
    title: "Where can I find Flowbite documentation and guides?",
    content:
      "Complete documentation is available at flowbite.com/docs with examples and guides.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 9,
    title: "Is Flowbite suitable for commercial projects?",
    content:
      "Yes, Flowbite can be used in commercial projects under the MIT license.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
  {
    id: 10,
    title: "How can I get support if I encounter issues with Flowbite?",
    content:
      "Support is available through multiple channels including community forums and direct support.",
    leftIcon: <HelpCircle className="w-5 h-5" />,
    rightIcon: <ChevronDown className="w-5 h-5" />,
  },
];


type ViewState = 'CATEGORY_LIST' | 'PLATFORM_DETAIL' | 'PRICE_FILTER';
export default function TestPage() {
<<<<<<< HEAD
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
  const [isChecked, setIsChecked] = useState(false);

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
    <div className="min-h-screen gap-8 flex flex-col justify-center items-center transition-colors bg-white dark:bg-slate-900">     
      <div className="flex flex-col gap-10">
        <div className="flex gap-4">
          // checkbox ve toggle componentlerini farklı durumlarda görmek için örnekler
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
              <Toggle size="lg" />
              <Toggle checked size="lg" />
            </div>
            {/* Disabled */}
            <div className="flex gap-2">
              <Toggle disabled size="lg" />
              <Toggle disabled checked size="lg" />
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
            {/* <IconShape icon={Flame} color="red" variant="square" size="lg" onClick={() => alert("ikona tıklandı")} />
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
=======
  const [password, setPassword] = useState("");
  const calculateStrength = useMemo(() => {
    if (password.length === 0) return 0;
    const hasUpperCase = /[A-Z]/.test(password);
    const someLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let strength = 0;
    if (hasUpperCase && someLowerCase) strength += 25;
    if (hasNumber) strength += 25;
    if (hasSpecial) strength += 25;
    if (password.length >= 6) strength += 25;
    if (password.length < 6) {
      return Math.min(strength, 15);
    }

    return strength;
  }, [password]);
  return (
    <div className="min-h-screen gap-8 flex justify-center items-center transition-colors bg-white dark:bg-slate-900">
      <div className="p-10 bg-[#0B111D]  flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-xl space-y-4">
        <h2 className="text-white text-sm font-medium mb-2">Şifre Gücü Testi</h2>
        
        <Input
          type="password"
          placeholder="Şifrenizi girin..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />

        {/* Karakter yoksa ProgressBar hiç gözükmez */}
        {password.length > 0 && (
          <div className="mt-4">
            <ProgressBar 
              progress={calculateStrength} 
              variant="dynamic" 
              labelPosition="top"
>>>>>>> feature/login-register
              size="base"
            />
            <p className="text-[10px] text-slate-400 mt-2">
              {password.length < 6 
                ? "Şifre en az 6 karakter olmalıdır." 
                : "Şifre uzunluğu yeterli."}
            </p>
          </div>
<<<<<<< HEAD
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
      // Badges ve Accordion componentlerini görmek için örnekler
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

      </div>
      // Badges ve Accordion componentlerini görmek için örnekler
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

      </div>
    </div>
      </div>
   
=======
        )}
      </div>
    </div>
    </div>
>>>>>>> feature/login-register
  );
}