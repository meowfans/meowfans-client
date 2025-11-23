"use client";

import { PaginationEllipsis } from "@workspace/ui/components/pagination";
import { useIsMobile } from "@workspace/ui/hooks/useIsMobile";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@workspace/ui/components/pagination";

interface Props {
  pageNumber: number;
  setPageNumber: (page: number) => unknown;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
}

export const Paginate: React.FC<Props> = ({
  pageNumber,
  hasNext,
  hasPrev,
  setPageNumber,
  totalPages,
}) => {
  const isMobile = useIsMobile();
  const [currentPageNumber, setCurrentPageNumber] =
    useState<number>(pageNumber);
  useEffect(() => setCurrentPageNumber(pageNumber), [pageNumber]);
  const pages: (number | "ellipsis")[] = [];

  const updatePage = (newPage: number) => {
    const page = Math.max(1, Math.min(totalPages, newPage));
    setPageNumber(page);
    setCurrentPageNumber(page);
  };

  const handlePreviousPage = () => updatePage(currentPageNumber - 1);
  const handleNextPage = () => updatePage(currentPageNumber + 1);
  const handleEndPage = () => updatePage(totalPages);

  const renderDesktopPages = () => {
    const delta = 2;

    const start = Math.max(2, currentPageNumber - delta);
    const end = Math.min(totalPages - 1, currentPageNumber + delta);
    pages.push(1);

    if (start > 2) pages.push("ellipsis");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("ellipsis");

    if (totalPages > 1) pages.push(totalPages);

    return pages.map((page, idx) =>
      page === "ellipsis" ? (
        <PaginationItem key={`ellipsis-${idx}`}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={page} onClick={() => updatePage(page)}>
          <PaginationLink
            href={`?p=${page}`}
            isActive={currentPageNumber === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  const renderMobilePages = () => {
    if (currentPageNumber > 1) pages.push(currentPageNumber - 1);
    pages.push(currentPageNumber);
    if (currentPageNumber < totalPages) pages.push(currentPageNumber + 1);

    return pages.map((page) => (
      <PaginationItem key={page} onClick={() => updatePage(page as number)}>
        <PaginationLink
          href={`?p=${page}`}
          isActive={currentPageNumber === page}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={`?p=1`}
            aria-label="Go to first page"
            size="icon"
            onClick={() => updatePage(1)}
          >
            <ChevronFirst className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={`?p=${Math.max(1, currentPageNumber - 1)}`}
            aria-label="Go to previous page"
            size="icon"
            isActive={hasPrev}
            onClick={handlePreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {isMobile ? renderMobilePages() : renderDesktopPages()}

        <PaginationItem>
          <PaginationLink
            href={`?p=${Math.min(currentPageNumber + 1, totalPages)}`}
            aria-label="Go to next page"
            isActive={hasNext}
            size="icon"
            onClick={handleNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href={`?p=${totalPages}`}
            aria-label="Go to last page"
            size="icon"
            onClick={handleEndPage}
          >
            <ChevronLast className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
