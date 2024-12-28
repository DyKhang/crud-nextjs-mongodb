"use client";

import { CircleX } from "lucide-react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProductDocument } from "@/models/product";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import clsx from "clsx";
import { Session } from "next-auth";

type Props = {
  product: ProductDocument;
  handlerDeleteProduct({ imgUrl, _id }: { imgUrl: string; _id: string }): void;
  session: Session | null;
};

export const Product: React.FC<Props> = ({
  product,
  handlerDeleteProduct,
  session,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      key={product._id}
      className="group/product overflow-hidden rounded-md border border-slate-700 p-3"
    >
      <div className="relative h-[300px]">
        <Image
          src={product.imgUrl}
          fill
          alt={product.name}
          className="cursor-pointer object-cover transition-transform duration-700 group-hover/product:scale-110"
          sizes="160"
          onClick={() => router.push(`/products/${product._id}`)}
        />
        <AlertDialog>
          <AlertDialogTrigger
            className={clsx({
              hidden: !session,
            })}
          >
            <div
              className={clsx(
                "absolute right-0 top-0 cursor-pointer text-red-600",
                {
                  hidden: isPending,
                },
              )}
            >
              <CircleX />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                product from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  startTransition(() => {
                    handlerDeleteProduct({
                      _id: product._id,
                      imgUrl: product.imgUrl,
                    });
                  })
                }
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
