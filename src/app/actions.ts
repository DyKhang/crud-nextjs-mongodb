"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { ProductDocument, Products } from "@/models/product";
import { revalidatePath } from "next/cache";

export const createProduct = async ({
  imageFile,
  name,
  quantity,
}: {
  name: string;
  quantity: number;
  imageFile: File | null;
}): Promise<{
  message: string;
  success: boolean;
}> => {
  try {
    const { error, data } = await supabase.storage
      .from("products")
      .upload(imageFile!.name, imageFile!);
    if (error) throw error;

    const imgUrl = `${process.env.SUPABASE_URL}/storage/v1/object/${data.fullPath}`;

    await Products.create({ imgUrl, name, quantity });

    return {
      success: true,
      message: "Product created successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export async function deleteProduct({
  imgUrl,
  _id,
}: {
  imgUrl: string;
  _id: string;
}): Promise<{
  message: string;
  success: boolean;
}> {
  const session = await auth();

  if (!session)
    return {
      message: "Please login",
      success: false,
    };

  try {
    const deleteImg = imgUrl.replace(
      `${process.env.SUPABASE_URL}/storage/v1/object/products/`,
      "",
    );

    const { error } = await supabase.storage
      .from("products")
      .remove([deleteImg]);

    if (error) throw error;

    await Products.deleteOne({ _id });

    return {
      message: "Delete product success",
      success: true,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  } finally {
    revalidatePath("/products");
  }
}

interface UpdateProduct extends Omit<ProductDocument, "imgUrl"> {
  imgUrl: string | File;
  imgRemove: string;
}

export async function updateProduct(product: UpdateProduct): Promise<{
  message: string;
  success: boolean;
}> {
  const session = await auth();

  if (!session)
    return {
      message: "Please login",
      success: false,
    };

  try {
    let imgUrl = product.imgUrl;
    if (typeof product.imgUrl !== "string") {
      const deleteImg = product.imgRemove.replace(
        `${process.env.SUPABASE_URL}/storage/v1/object/products/`,
        "",
      );

      const { error: deleteError } = await supabase.storage
        .from("products")
        .remove([deleteImg]);

      if (deleteError) throw deleteError;

      const { error: uploadError, data } = await supabase.storage
        .from("products")
        .upload(product.imgUrl.name, product.imgUrl);
      if (uploadError) throw uploadError;

      imgUrl = `${process.env.SUPABASE_URL}/storage/v1/object/${data.fullPath}`;
    }

    await Products.updateOne({ _id: product._id }, { ...product, imgUrl });

    return {
      message: "Update success",
      success: true,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  } finally {
    revalidatePath(`/products/${product._id}`);
  }
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut();
}
