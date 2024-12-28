"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function PaginationProducts({
  totalProduct,
  pageSize,
  currentPage,
}: {
  totalProduct: number;
  pageSize: number;
  currentPage: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createSearchParams = useCallback(
    (page: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  function handleSetSearchParams(page: string) {
    createSearchParams(page);
  }

  function nextPage() {
    createSearchParams(`${currentPage ? currentPage + 1 : 2}`);
  }

  function prevPage() {
    createSearchParams(`${currentPage - 1}`);
  }

  const maxPage = Math.ceil(totalProduct / pageSize);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={prevPage}>
          <PaginationPrevious />
        </PaginationItem>
        {Array.from({ length: maxPage }).map((_, index) => (
          <PaginationItem
            key={index}
            onClick={() => handleSetSearchParams((index + 1).toString())}
          >
            <PaginationLink isActive={currentPage === index + 1}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem onClick={nextPage}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
