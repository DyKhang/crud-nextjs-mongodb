"use client";

import { deleteProduct } from "@/app/actions";
import { Product } from "@/components/Product";
import { ProductsResType } from "@/models/product";
import { Session } from "next-auth";
import { useOptimistic } from "react";

type Props = {
  res: ProductsResType;
  session: Session | null;
};

export const ProductList: React.FC<Props> = ({ res, session }) => {
  const [optimisticState, removeOptimistic] = useOptimistic(
    res.products,
    // updateFn
    (currentState, optimisticValue) => {
      return currentState.filter((product) => product._id !== optimisticValue);
    },
  );

  function handlerDeleteProduct({
    imgUrl,
    _id,
  }: {
    imgUrl: string;
    _id: string;
  }) {
    removeOptimistic(_id);
    deleteProduct({
      imgUrl,
      _id,
    });
  }

  return (
    <section className="mt-4 grid grid-cols-5 gap-4">
      {optimisticState.map((product) => (
        <Product
          key={product._id}
          session={session}
          product={product}
          handlerDeleteProduct={handlerDeleteProduct}
        />
      ))}
    </section>
  );
};
