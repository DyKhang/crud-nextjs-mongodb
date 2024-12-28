"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const PickSofa = () => {
  const [imgUrl, setImgUrl] = useState("/sofa-1.png");
  const router = useRouter();

  return (
    <section className="mt-[100px] flex gap-[70px]">
      <div className="flex items-center gap-[25px]">
        <div className="flex flex-col gap-[20px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <Image
              key={i}
              alt={`sofa-${i + 1}`}
              src={`/sofa-${i + 1}.png`}
              width={71}
              height={64}
              quality={100}
              className={clsx(
                "h-[64px] w-[71px] cursor-pointer rounded-md border-[2px] object-cover",
                {
                  "border-red-500": imgUrl === `/sofa-${i + 1}.png`,
                },
              )}
              onClick={() => setImgUrl(`/sofa-${i + 1}.png`)}
            />
          ))}
        </div>

        <div className="relative aspect-square w-[514px]">
          <Image
            alt="sofa-1"
            src={imgUrl}
            fill
            className="rounded-[10px] object-cover"
          />
        </div>
      </div>

      <div>
        <h2 className="text-[58px] font-bold">Comfortable Sofa</h2>

        <p className="text-[18px] font-light">
          The most wanted styles is waiting for you. Find the best styles of
          modern furniture for you.
        </p>

        <Button
          onClick={() => router.push("/products")}
          className="h-[60px] w-[181px]"
        >
          Learn More
        </Button>
      </div>
    </section>
  );
};
