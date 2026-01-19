"use client";

import { Layout } from "@/components/layouts/layout";
import { MerchantProductTable } from "@/features/product/components/merchant-product-table";
import { useParams, useRouter } from "next/navigation";
import { useTenant } from "@/features/tenant/hooks/tenant-queries";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useMemo, useEffect, useState } from "react";
import { TenantTypes } from "@/types/features/tenant.type";
import { Query, QueryDirection } from "@/types/lib/query.type";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const tenantId = params.id as string;

  // FIXED: Add error state
  const [error, setError] = useState<string | null>(null);

  const { data: tenantData, isLoading, isError, error: queryError } = useTenant({
    page: 1,
    itemPerPage: 100,
    sortBy: "createdAt",
    direction: QueryDirection.DESC,
    search: "",
  });

  // FIXED: Better error handling
  useEffect(() => {
    if (isError) {
      setError(queryError?.message || "Failed to load tenant data");
    }
  }, [isError, queryError]);

  // FIXED: More defensive useMemo with proper type checking
  const tenantInfo = useMemo(() => {
    try {
      if (!tenantData?.data) {
        return { name: "", found: false };
      }

      const paginationData = tenantData.data as Query.Pagination<TenantTypes.Service.TenantData>;

      // FIXED: Add null/undefined checks
      if (!paginationData?.items || !Array.isArray(paginationData.items)) {
        return { name: "", found: false };
      }

      const tenant = paginationData.items.find((t) => t?.id === tenantId);

      return {
        name: tenant?.name || "",
        found: !!tenant
      };
    } catch (err) {
      console.error("Error parsing tenant data:", err);
      setError("Error processing tenant data");
      return { name: "", found: false };
    }
  }, [tenantData, tenantId]);

  // FIXED: Show error state
  if (error) {
    return (
      <Layout
        breadcrumbs={[
          {
            name: "Tenant",
            target: "/internals/tenant",
          },
          {
            name: "Error",
            target: `/internals/tenant/${tenantId}`,
          },
        ]}
      >
        <section className="flex flex-1 flex-col gap-4 space-y-8 overflow-hidden p-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/internals/tenant")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-red-600">
                Error Loading Tenant
              </h2>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg">
            <div className="text-center">
              <p className="text-red-600 font-medium mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout
        breadcrumbs={[
          {
            name: "Tenant",
            target: "/internals/tenant",
          },
          {
            name: "Loading...",
            target: `/internals/tenant/${tenantId}`,
          },
        ]}
      >
        <section className="flex flex-1 flex-col gap-4 space-y-8 overflow-hidden p-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading tenant data...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // FIXED: Show warning if tenant not found
  if (!isLoading && !tenantInfo.found) {
    return (
      <Layout
        breadcrumbs={[
          {
            name: "Tenant",
            target: "/internals/tenant",
          },
          {
            name: "Not Found",
            target: `/internals/tenant/${tenantId}`,
          },
        ]}
      >
        <section className="flex flex-1 flex-col gap-4 space-y-8 overflow-hidden p-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/internals/tenant")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Tenant Not Found
              </h2>
              <p className="text-sm text-muted-foreground">
                The requested tenant could not be found
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-64 bg-yellow-50 rounded-lg">
            <div className="text-center">
              <p className="text-yellow-600 font-medium mb-4">
                Tenant with ID "{tenantId}" does not exist
              </p>
              <Button onClick={() => router.push("/internals/tenant")}>
                Back to Tenant List
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      breadcrumbs={[
        {
          name: "Tenant",
          target: "/internals/tenant",
        },
        {
          name: tenantInfo.name || "Detail",
          target: `/internals/tenant/${tenantId}`,
        },
      ]}
    >
      <section className="flex flex-1 flex-col gap-4 space-y-8 overflow-hidden p-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/internals/tenant")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Produk - {tenantInfo.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              Kelola produk untuk tenant ini
            </p>
          </div>
        </div>
        <MerchantProductTable
          merchantId={tenantId}
          merchantName={tenantInfo.name}
        />
      </section>
    </Layout>
  );
}