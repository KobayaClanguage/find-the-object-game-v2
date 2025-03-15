"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StampScreen from "@/features/game/StampScreen";
import ScanScreen from "@/features/game/ScanScreen";
import SettingsScreen from "@/features/game/SettingsScreen";

import Link from "next/link";

export default function GamePage() {
  const searchParams = useSearchParams();
  const [pageType, setPageType] = useState<"stamp" | "scan" | "settings">(
    "stamp"
  );

  useEffect(() => {
    const pageTypeParam = searchParams.get("pageType");
    if (pageTypeParam) {
      setPageType(pageTypeParam as "stamp" | "scan" | "settings");
    }
  }, [searchParams]);

  const getTitle = () => {
    switch (pageType) {
      case "stamp":
        return "ホーム";
      case "scan":
        return "QRコード読み取り";
      case "settings":
        return "設定";
      default:
        return "";
    }
  };

  return (
    <div className="relative h-full">
      <h1 className="text-center text-white bg-[#0094f4] p-4">{getTitle()}</h1>
      <Tabs defaultValue={pageType} className="h-full space-y-6">
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          {/* Adjust height considering title and bottom buttons */}
          <TabsContent value="stamp" className="flex-grow">
            <StampScreen />
          </TabsContent>
          <TabsContent value="scan" className="flex-grow">
            <ScanScreen />
          </TabsContent>
          <TabsContent value="settings" className="flex-grow">
            <SettingsScreen />
          </TabsContent>
        </div>
        <TabsList className="fixed bottom-0 left-0 right-0 flex justify-around bg-white p-4 shadow-md">
          <Link href="?pageType=stamp">
            <TabsTrigger value="stamp">stamp</TabsTrigger>
          </Link>
          <Link href="?pageType=scan">
            <TabsTrigger value="scan">scan</TabsTrigger>
          </Link>
          <Link href="?pageType=settings">
            <TabsTrigger value="settings">settings</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  );
}
