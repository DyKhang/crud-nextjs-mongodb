import { PaginationProducts } from "@/components/Pagination";
import { ProductList } from "@/components/ProductList";
import { auth } from "@/lib/auth";
import { ProductsResType } from "@/models/product";

export const ProductListWrap = async ({ page }: { page: string }) => {
  const data = await fetch(
    `${process.env.NEXTAPI_URL}/products${page ? `?page=${page}` : "?page=1"}`,
  );

  const res: ProductsResType = await data.json();
  const session = await auth();
  if (res.products.length === 0) return null;

  return (
    <div className="space-y-8">
      <ProductList res={res} session={session} />
      <PaginationProducts
        pageSize={res.pageSize}
        totalProduct={res.totalProduct}
        currentPage={parseInt(page)}
      />
    </div>
  );
};
