"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();

  return (
    <section className="bg-[#F1DEB4] pb-[100px] pt-[70px]">
      <Container>
        <div className="flex gap-[183px]">
          <div>
            <h1 className="text-[58px] font-bold">Find Your Best Furniture</h1>

            <div className="relative mt-[20px] w-[459px]">
              <div className="relative h-[193px]">
                <Image
                  alt="sofa-1"
                  src="https://images.unsplash.com/photo-1512212621149-107ffe572d2f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-[-20px] left-1/2 flex size-[40px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-[#005D63] text-white">
                <Play size={15} />
              </div>
            </div>

            <p className="mt-[40px] text-[18px] font-light">
              The most wanted styles is waiting for you. Find the best styles of
              modern furniture for you. Still, the second option holds promised.
              could make the tagline.
            </p>

            <Button
              onClick={() => router.push("/products")}
              className="h-[60px] w-[181px]"
            >
              Get Started
            </Button>
          </div>

          <Image
            src="/sofa-2.png"
            alt="sofa-2"
            width={528}
            height={528}
            className="size-[528px] flex-shrink-0"
          />
        </div>
      </Container>
    </section>
  );
};
