import Accordion from "@/components/common/Accordion/Accordion";
import AccordionItem from "@/components/common/Accordion/AccordionItem";
import { HelpCircle, ChevronDown } from "lucide-react";

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

export default function deneme() {
  return (
    <div className="min-h-screen flex flex-col gap-8 justify-center items-center transition-colors bg-white dark:bg-slate-900">
      <div className="w-full max-w-3xl">
        <Accordion theme="dark">
          {faqData.map((faq) => (
            <AccordionItem
              key={faq.id}
              title={faq.title}
              leftIcon={faq.leftIcon}      
              rightIcon={faq.rightIcon}    
              defaultOpen={faq.defaultOpen}
            >
              {faq.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}