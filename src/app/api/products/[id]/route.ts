import { Products } from "@/models/product";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = await Products.findById(id);
    return Response.json(
      { product },
      {
        status: 200,
      },
    );
  } catch {
    return Response.json("product not found", {
      status: 404,
    });
  }
}
