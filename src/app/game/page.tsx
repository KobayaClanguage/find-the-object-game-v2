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
    <div>
      <h1>{getTitle()}</h1>
      <Tabs defaultValue={pageType} className="h-full space-y-6">
        <TabsContent value="stamp">
          <p>stamp</p>
        </TabsContent>
        <TabsContent value="scan">
          <p>scan</p>
        </TabsContent>
        <TabsContent value="settings">
          <p>settings</p>
        </TabsContent>
        <TabsList>
          <Link href="?pageType=stamp">
            <TabsTrigger value="stamp">
              <StampScreen />
            </TabsTrigger>
          </Link>
          <Link href="?pageType=scan">
            <TabsTrigger value="scan">
              <ScanScreen />
            </TabsTrigger>
          </Link>
          <Link href="?pageType=settings">
            <TabsTrigger value="settings">
              <SettingsScreen />
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  );
}
