"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { CircleX } from "lucide-react";
import { createProduct, updateProduct } from "@/app/actions";
import { SpinnerMini } from "@/components/SpinnerMini";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ProductDocument } from "@/models/product";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  quantity: z.coerce.number().positive(),
  imageFile: z.string().url({ message: "Image is required" }),
});

type Props = {
  product?: ProductDocument;
};

export const AddUpdateForm: React.FC<Props> = ({ product }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product ? product.name : "",
      imageFile: product ? product.imgUrl : "",
      quantity: product ? product.quantity : 1,
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const { data } = useSession();

  const [isPending, startTransition] = useTransition();

  const { imageFile } = form.watch();

  const [file, setFile] = useState<File | null>(null);
  const inputImageRef = useRef<HTMLInputElement | null>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, quantity } = values;

    startTransition(async () => {
      if (!product) {
        const { message, success } = await createProduct({
          imageFile: file,
          name,
          quantity,
        });
        toast({
          description: message,
          variant: success ? "default" : "destructive",
        });
        if (success) {
          router.push("/products");
        }
      } else {
        const { message, success } = await updateProduct({
          _id: product._id,
          imgUrl: file ? file : product.imgUrl,
          name,
          quantity,
          imgRemove: product.imgUrl,
        });
        toast({
          description: message,
          variant: success ? "default" : "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-[400px] space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  ref={inputImageRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFile(file);
                      field.onChange(
                        `http://localhost:3000/${file.name}`,
                        file,
                      );
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {(file || imageFile) && (
          <div>
            <div className="relative size-[300px]">
              <Image
                src={file ? URL.createObjectURL(file) : imageFile}
                fill
                alt="preview"
                className="h-auto w-auto object-cover"
              />
              <div
                onClick={() => {
                  setFile(null);
                  form.setValue("imageFile", "");
                  if (inputImageRef.current) {
                    inputImageRef.current.value = "";
                  }
                }}
                className="absolute right-2 top-2 cursor-pointer text-red-600"
              >
                <CircleX />
              </div>
            </div>
          </div>
        )}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-3">
          <Button
            disabled={isPending || !data}
            type="submit"
            className="h-[36px] w-[94px] text-[18px] font-normal"
          >
            {isPending ? <SpinnerMini /> : product ? "Update" : "Submit"}
          </Button>
          {!data && <p>Please login to edit this product</p>}
        </div>
      </form>
    </Form>
  );
};
