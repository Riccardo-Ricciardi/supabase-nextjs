"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { LanguagePicker } from "@/components/languagePicker";
import { ThemePicker } from "@/components/themePicker";
import { useTranslationStore } from "@/utils/useTranslations";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface NavbarProps {
  language: string;
  table: string;
  isMobile: boolean;
}

export default function Navbar({ language, table, isMobile }: NavbarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { translations, loadTranslations } = useTranslationStore();

  useEffect(() => {
    if (Object.keys(translations).length === 0) {
      loadTranslations().then(() => setIsMounted(true));
    } else {
      setIsMounted(true);
    }
  }, [translations, loadTranslations]);

  if (!isMounted) return null;

  return (
    <header
      className="border-grid sticky top-0 z-50 w-full border-b
     bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/85"
    >
      <div
        className="mx-auto h-14 flex justify-between items-center"
        style={{ width: "clamp(0px, 80%, 1200px)" }}
      >
        <Link href="/">
          <Image src="/logo.png" alt="Logo" height={40} width={34.28} />
        </Link>

        {isMobile ? (
          <div className="flex items-center space-x-2">
            <ThemePicker />
            <LanguagePicker />
            <NavbarMobile language={language} table={table} />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <NavbarDesktop language={language} table={table} />
            <ThemePicker />
            <LanguagePicker />
          </div>
        )}
      </div>
    </header>
  );
}

function NavbarDesktop({
  language,
  table,
}: {
  language: string;
  table: string;
}) {
  const { translations } = useTranslationStore();
  const translation = translations?.[language]?.[table] ?? [];

  return (
    <ul className="flex items-center space-x-2 pl-16 text-card-foreground">
      {translation.map((text, index) => (
        <li key={index}>
          <Link
            href={index === 0 ? "/" : `/${text.toLowerCase()}`}
            className="whitespace-nowrap"
          >
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NavbarMobile({
  language,
  table,
}: {
  language: string;
  table: string;
}) {
  const { translations } = useTranslationStore();
  const translation = translations?.[language]?.[table] ?? [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {translation.map((text, index) => (
          <DropdownMenuItem key={index}>
            <Link
              href={index === 0 ? "/" : `/${text.toLowerCase()}`}
              className="w-full"
            >
              {text}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
