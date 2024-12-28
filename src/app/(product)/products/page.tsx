import { Metadata } from "next";
import { Suspense } from "react";
import { Heading } from "@/components/Heading";
import { ProductListWrap } from "@/components/ProductListWrap";
import { Spinner } from "@/components/Spinner";

export const metadata: Metadata = {
  title: "Products",
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = await (await searchParams).page;

  return (
    <>
      <Heading>Products</Heading>

      <Suspense fallback={<Spinner />} key={page}>
        <ProductListWrap page={page} />
      </Suspense>
    </>
  );
}
