import { Storyboard6ES } from "@/components/hero/storyboard";
import { The416Feature } from "@/components/home/the-416-feature";
import { Collection } from "@/components/home/collection";
import { MrFreshBand } from "@/components/home/mr-fresh-band";
import { Closing } from "@/components/home/closing";
import { findAsset } from "@/lib/assets";

export default function Home() {
  const heroSrc = findAsset("hero/6es-hero");
  const stageSrc = findAsset("hero/marble-stage");
  const founderSrc = findAsset("the-416/founder");

  return (
    <>
      {/* Landing: 6ES storyboard → collection → founder (416) → Mr Fresh → list */}
      <Storyboard6ES heroSrc={heroSrc} stageSrc={stageSrc} />
      <Collection />
      <The416Feature founderSrc={founderSrc} />
      <MrFreshBand />
      <Closing />
    </>
  );
}
