"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type Stamp = {
  id: number;
  name: string;
  iconUrl: string;
  isCollected?: boolean;
};

// ダミーデータ
const stamps: Stamp[] = [];
for (let i = 0; i < 10; i++) {
  stamps.push({
    id: i,
    // TODO: スタンプ名を実際のスタンプ名に変更
    name: `stamp${i}`,
    // TODO: 画像URLを実際の画像に変更
    iconUrl: "/images/stampIcon/stamp-icon-sample.png",
  });
}

export default function StampScreen() {
  return (
    <div className="flex flex-col items-center space-y-4">
      {stamps.map((item) => (
        <StampPopup
          key={item.id}
          id={item.id}
          iconUrl={item.iconUrl}
          name={item.name}
        />
      ))}
    </div>
  );
}

export function StampPopup({
  id,
  iconUrl,
  name,
}: {
  id: number;
  iconUrl: string;
  name: string;
}) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div key={id}>
            <Image
              src={iconUrl}
              alt={name}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription></DialogDescription>
          <h1>Map</h1>
        </DialogContent>
      </Dialog>
    </div>
  );
}
