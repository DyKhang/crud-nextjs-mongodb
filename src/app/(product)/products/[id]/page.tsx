import { AddUpdateForm } from "@/components/AddUpdateForm";
import { Heading } from "@/components/Heading";
import { ProductResType } from "@/models/product";
import Image from "next/image";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: ProductResType = await fetch(
    `${process.env.NEXTAPI_URL}/products/${id}`,
  ).then((res) => res.json());

  return (
    <div className="flex gap-8">
      <div className="relative mt-4 size-[400px]">
        <Image
          alt={data.product.name}
          src={data.product.imgUrl}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Heading>{data.product.name}</Heading>

        <p>Số lượng sản phẩm: {data.product.quantity}</p>

        <div className="mt-3">
          <AddUpdateForm product={data.product} />
        </div>
      </div>
    </div>
  );
}
