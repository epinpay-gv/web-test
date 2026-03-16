"use client";
import { ParticipantSearch } from "./ParticipantSearch";
import { useMemo, useState } from "react";
import { formatDateTR } from "@/lib/utils";
import { Pagination, NavTab } from "@/components/common";
import { NavTabItem } from "@/components/common/NavElements/NavTabs/NavTab";
import { PaginationData, Raffle } from "@/types/types";

const PER_PAGE = 9;

interface ParticipantSectionProps {
  card: Raffle;
}

export default function ParticipantSection({ card }: ParticipantSectionProps) {
  const { participations, pool } = card;

  const navItems: NavTabItem[] = [
    { label: "Katılımcılar", value: "participations" },
    ...(["DRAWN", "ANNOUNCED", "COMPLETED"].includes(card.status)
      ? [{ label: "Çekilişi Kazananlar", value: "pool" }]
      : []),
  ];

  const [selectedTab, setSelectedTab] = useState("participations");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setCurrentPage(1);
    setSearch("");
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const activeData = selectedTab === "participations" ? participations : pool;

  // Filter by search
  const filteredData = useMemo(() => {
    if (!activeData) return [];
    if (!search.trim()) return activeData;

    const lower = search.toLowerCase();
    return activeData.filter((i) => {
      // participations have userName, pool items have winnerName
      const name =
        "userName" in i
          ? i.userName?.toLowerCase()
          : "winnerName" in i
            ? i.winnerName?.toLowerCase()
            : "";
      return name?.includes(lower);
    });
  }, [activeData, search]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredData.slice(start, start + PER_PAGE);
  }, [filteredData, currentPage]);

  const pagination: PaginationData = {
    count: filteredData.length,
    per_page: PER_PAGE,
    current_page: currentPage,
    total_page: Math.ceil(filteredData.length / PER_PAGE),
    has_more: currentPage < Math.ceil(filteredData.length / PER_PAGE),
  };

  return (
    <div className="flex flex-col gap-4 w-full justify-between">
      {/* NAV */}
      <NavTab
        items={navItems}
        size="sm"
        activeValue={selectedTab}
        onChange={handleTabChange}
      />

      {/* SEARCH */}
      <ParticipantSearch value={search} onChange={handleSearchChange} />

      {/* LIST : participants, winners*/}
      {paginatedData.length === 0 && (
        <p className="text-xs text-(--text-body) text-center">
          Katılımcı bulunamadı. İlk katılan sen ol!
        </p>
      )}

      {selectedTab === "participations" && (
        <div className="grid grid-cols-3 gap-2 max-h-35.75 overflow-y-auto">
          {paginatedData.map((i) => {
            const item = i as (typeof participations)[number];
            return (
              <div
                key={item.id}
                className="flex flex-col gap-2 border-b border-(--border-default) pb-2"
              >
                <p className="text-xs font-medium leading-[150%] text-white">
                  {item.userName}
                </p>
                <p className="text-xs font-normal leading-[150%] text-(--text-body)">
                  {formatDateTR(item.joinedAt)}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {selectedTab === "pool" &&
        card.status !== "DRAFT" &&
        card.status !== "ACTIVE" && (
          <div className="grid grid-cols-3 gap-2 max-h-115.75">
            {paginatedData.map((i) => {
              const item = i as (typeof pool)[number];
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 border-b border-(--border-default) pb-2"
                >
                  <p className="text-xs font-medium leading-[150%] text-(--text-fg-success-strong)">
                    {item.winnerName}
                  </p>
                  <p className="text-xs font-normal leading-[150%] text-(--text-body)">
                    {formatDateTR(item.createdAt)}
                  </p>
                </div>
              );
            })}
          </div>
        )}

      {/* PAGINATION */}
      <div className="mx-auto">
        {pagination.total_page > 1 && (
          <Pagination pagination={pagination} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  );
}
