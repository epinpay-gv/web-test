"use client";
import { Pagination, Button } from "@/components/common";
import StatusState from "@/components/common/StatusState/StatusState";
import { FilterGroupConfig } from "@/features/filters/filters.types";
import { useUrlFilters } from "@/features/filters/hooks/useUrlFilters";
import { FiltersSection, RaffleGrid } from "@/features/user/components";
import { PaginationData, Raffle } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { AnimatePresence, motion } from "framer-motion";
import { Ticket, PlusCircle, CheckCircle2 } from "lucide-react";
import UserPageHeader from "@/features/user/components/common/UserPageHeader";

interface RafflesClientProps {
  data: Raffle[];
  initialFilters: FilterGroupConfig[];
  pagination: PaginationData;
}

export default function RafflesClient({
  data,
  initialFilters,
  pagination,
}: RafflesClientProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [editingRaffle, setEditingRaffle] = useState<Raffle | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    searchParams,
    handleSearchChange,
    handleSingleFilter,
    handleDateRangeChange,
    handlePageChange,
    handleResetFilters,
  } = useUrlFilters(initialFilters);

  const currentType = searchParams.get("type") || "joined";
  const isFiltered = searchParams.toString().length > 0;

  const allowedRoles = ["STORE", "STREAMER", "ADMIN"];
  const hasManagementAccess = !!user?.roles && Array.isArray(user.roles) && user.roles.some(role => allowedRoles.includes(role.toUpperCase()));

  return (
    <div className="relative">
      <UserPageHeader title="Çekilişlerim">
        {hasManagementAccess && (          
          <Button variant="brand" className="max-w-fit" text="Yeni Çekiliş Oluştur" onClick={() => router.push(`/create-raffle`)} />
        )}
      </UserPageHeader>

      <div className="mt-8 overflow-hidden">
        {/* Premium Segmented Control (Switch) Tab Navigasyonu */}
        {hasManagementAccess && (
          <div className="flex justify-center pr-1 sm:justify-start mb-10">
            <div 
              className="relative flex p-1 backdrop-blur-md w-full max-w-[400px]"
              style={{
                backgroundColor: 'var(--bg-neutral-primary)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-base)'
              }}
            >
              {/* Sliding Background */}
              <motion.div
                className="absolute inset-y-1 left-1 shadow-[0_0_15px_#00bbe54d]"
                style={{
                  backgroundColor: 'var(--bg-brand-medium)',
                  borderRadius: 'calc(var(--radius-base) - 4px)',
                  width: 'calc(50% - 4px)'
                }}
                initial={false}
                animate={{
                  x: currentType === "joined" ? 0 : "100%",
                }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />

              {/* Katıldıklarım Button */}
              <button
                onClick={() => handleSingleFilter("type", "joined")}
                className="relative flex-1 flex items-center justify-center gap-3 py-3 text-sm font-bold transition-colors duration-300 z-10"
                style={{
                  color: currentType === "joined" ? 'var(--text-white)' : 'var(--text-body-subtle)'
                }}
              >
                <Ticket className={`w-4 h-4 transition-transform ${currentType === 'joined' ? 'scale-110' : ''}`} />
                <span>Katıldıklarım</span>
              </button>
              <button
                onClick={() => handleSingleFilter("type", "created")}
                className="relative flex-1 flex items-center justify-center gap-3 py-3 text-sm font-bold transition-colors duration-300 z-10"
                style={{
                  color: currentType === "created" ? 'var(--text-white)' : 'var(--text-body-subtle)'
                }}
              >
                <PlusCircle className={`w-4 h-4 transition-transform ${currentType === 'created' ? 'scale-110' : ''}`} />
                <span>Oluşturduklarım</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <FiltersSection
        filters={initialFilters}
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        onStatusChange={handleSingleFilter}
        onDateRangeChange={handleDateRangeChange}
        totalCount={pagination.count}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentType + (pagination?.current_page || 1)}
          initial={{ opacity: 0, x: currentType === "joined" ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: currentType === "joined" ? 50 : -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          
          {data.length > 0 ? (
            <>
              <RaffleGrid
                data={data}
                onCardClick={(card: Raffle) => {
                  if (currentType === "created") {
                    router.push(`/create-raffle/${card.id}`);
                  } else {
                    router.push(`/user/raffles/${card.id}`);
                  }
                }}
                onEdit={currentType === "created" ? (card) => router.push(`/user/raffles/${card.id}/edit`) : undefined}
              />
              <div className="flex justify-center mt-12">
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="py-12">
              <StatusState
                image={
                  isFiltered
                    ? "/illustrations/search-empty.png"
                    : currentType === "created" 
                      ? "/illustrations/empty-raffles.png" 
                      : "/illustrations/empty-orders.png"
                }
                description={
                  isFiltered
                    ? "Seçilen filtrelere ait çekiliş bulunamadı."
                    : currentType === "created"
                      ? "Henüz bir çekiliş oluşturmadınız. Hemen ilk çekilişinizi oluşturmaya ne dersiniz?"
                      : "Henüz bir çekilişe katılmadınız. Aktif çekilişlere göz atarak şansınızı deneyebilirsiniz."
                }
                actions={
                  isFiltered ? (
                    <Button
                      text="Filtreleri Temizle"
                      variant="secondary"
                      padding="sm"
                      size="base"
                      textSize="sm"
                      onClick={handleResetFilters}
                      className="w-full max-w-xs"
                    />
                  ) : (
                    <Button
                      text={currentType === "created" ? "Yeni Çekiliş Oluştur" : "Aktif Çekilişleri Gör"}
                      variant="brand"
                      padding="sm"
                      size="base"
                      textSize="sm"
                      onClick={() => router.push(currentType === "created" ? "/create-raffle" : "/raffles")}
                      className="w-full max-w-xs"
                    />
                  )
                }
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
