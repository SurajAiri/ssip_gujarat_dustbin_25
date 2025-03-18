import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  APP_NAME,
  GOVERNMENT,
  GOVERNMENT_WEBSITE,
  TAGLINE,
  TAGLINE_LONG,
} from "@/utils/contants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuthStore } from "@/stores/authStore";

interface FooterLink {
  label: string;
  href: string;
}

const Footer = () => {
  const {isAuthenticated} = useAuthStore();
  const currentYear = new Date().getFullYear();
const footerSections = [
    {
        title: "Quick Links",
        links: [
           isAuthenticated? { label: "Home", href: "/" }:
            {label:"Landing Page",href:"/landing"},
            { label: "Show Bins", href: "/bin-map" },
            { label: "Report Issue", href: "/report" },
            { label: "Information", href: "/info" },
        ],
    },
    {
        title: "Services",
        links: [
            { label: "Visualize Data", href: "/visualize" },
            { label: "Schedule Pickup", href: "/pickup-map" },
            { label: "Resolve Issues", href: "/resolve" },
            { label: "Report Issue", href: "/report" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Use", href: "/terms" },
            { label: "Disclaimer", href: "/disclaimer" },
            { label: "Accessibility", href: "/accessibility" },
        ],
    },
];
  return (
    <footer className="bg-gray-600 text-gray-200 border-t border-gray-700">
      {/* Main Footer - Desktop */}
      <div className="container mx-auto px-4 py-6">
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {/* Logo and About */}
          <div className="col-span-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              {/* <img src="/logo.png" alt="Logo" /> */}
              <h3 className="font-bold text-base text-white">{APP_NAME}</h3>
            </div>
            <p className="text-sm text-gray-300 mb-3">{TAGLINE_LONG}</p>
          </div>

          {/* Footer Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h4 className="font-semibold mb-3 text-sm text-gray-100">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Footer Accordion */}
        <div className="md:hidden">
          <div className="flex flex-col items-center mb-4">
            {/* <img src="/logo-placeholder.png" alt="Logo" className="h-10 w-10 mb-2" /> */}
            <h3 className="font-bold text-base text-white mb-1">{APP_NAME}</h3>
            <p className="text-sm text-gray-300 text-center mb-2">{TAGLINE}</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {footerSections.map((section, index) => (
              <AccordionItem
                key={section.title}
                value={`section-${index}`}
                className="border-b border-gray-500"
              >
                <AccordionTrigger className="py-2 text-sm font-medium text-gray-200 hover:text-white hover:no-underline">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 py-1">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.href}
                          className="text-sm text-gray-300 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="bg-gray-700 py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-3">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-300" />
                <span className="text-sm">+91 1234567890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-300" />
                <span className="text-sm">
                  contact@environmentalmonitoring.org
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-300" />
                <span className="text-sm">123 Environment Street, Gujarat</span>
              </div>
            </div>
            <div className="mt-2 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-900 border-gray-500 hover:bg-gray-500 hover:text-white"
                onClick={() => window.open(GOVERNMENT_WEBSITE, "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Visit Government Portal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-300">
            <p>
              © {currentYear} {APP_NAME}. All rights reserved.
            </p>
            <p className="mt-1 md:mt-0">{GOVERNMENT}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

