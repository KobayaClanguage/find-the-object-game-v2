import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavigationFooter() {
  return (
    <>
      <Button asChild>
        <Link href="/game/stamp">stamp</Link>
      </Button>
      <Button asChild>
        <Link href="/game/scan">scan</Link>
      </Button>
      <Button asChild>
        <Link href="/game/settings">settings</Link>
      </Button>
    </>
  );
}
