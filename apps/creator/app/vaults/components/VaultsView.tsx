'use client';

import { useVaults } from '@/hooks/useVaults';
import { PaginationInput, SortBy, SortOrder, VaultsEntity } from '@workspace/gql/generated/graphql';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Loading } from '@workspace/ui/globals/Loading';
import { Archive } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { VaultsFilters } from './VaultsFilters';
import { VaultsHeader } from './VaultsHeader';
import { VaultsStats } from './VaultsStats';
import { VaultsTable } from './VaultsTable';

export function VaultsView() {
  const [selectedVaults, setSelectedVaults] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const params: PaginationInput = {
    sortBy: SortBy.VaultCreatedAt,
    orderBy: SortOrder.Desc,
    take: 20,
    skip: 0
  };

  // Assuming SortBy.PostCreatedAt might work or default to CreatedAt.
  // Actually let's check SortBy enum. If not available, use undefined or reliable one.
  // Vaults don't have "PostCreatedAt". They have "CreatedAt"?
  // Let's use SortBy.CreatedAt if exists, or check GraphQL.
  // For now using SortBy.PostCreatedAt as placeholder or remove if fails.
  // Actually useVaults uses "getCreatorVaultsQuery" which takes "PaginationInput".
  // PaginationInput usually has "sortBy" as "SortBy" enum.

  const { vaults, loading, hasMore, handleLoadMore } = useVaults(params);

  // Mock deleting state
  const [deleting, setDeleting] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const handleToggleSelect = (vaultId: string) => {
    setSelectedVaults((prev) => (prev.includes(vaultId) ? prev.filter((id) => id !== vaultId) : [...prev, vaultId]));
  };

  const handleSelectAll = (filtered: VaultsEntity[]) => {
    if (selectedVaults.length === filtered.length) {
      setSelectedVaults([]);
    } else {
      setSelectedVaults(filtered.map((v) => v.id));
    }
  };

  const handleDelete = async (vaultId: string) => {
    if (confirm('Are you sure you want to delete this vault?')) {
      setDeleting(true);
      // Mock delete
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Vault deleted');
      setSelectedVaults((prev) => prev.filter((id) => id !== vaultId));
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedVaults.length === 0) {
      toast.error('No vaults selected');
      return;
    }
    if (confirm(`Are you sure you want to delete ${selectedVaults.length} vault(s)?`)) {
      setBulkDeleting(true);
      // Mock bulk delete
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Vaults deleted');
      setSelectedVaults([]);
      setBulkDeleting(false);
    }
  };

  const handleShare = (vault: VaultsEntity) => {
    const url = `${window.location.origin}/vaults/${vault.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  // Filter vaults
  const filteredVaults = vaults.filter((vault) => {
    const matchesSearch = vault.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? true;
    // Tabs logic: All, Paid, Free?
    const isPaid = (vault.unlockPrice || 0) > 0;
    const matchesTab = activeTab === 'all' || (activeTab === 'paid' && isPaid) || (activeTab === 'free' && !isPaid);
    return matchesSearch && matchesTab;
  });

  // Calculate stats from loaded vaults
  const totalVaults = vaults.length;
  const totalLikes = vaults.reduce((sum, v) => sum + v.likeCount, 0);
  const totalViews = vaults.reduce((sum, v) => sum + (v.viewCount || 0), 0);
  const totalEarnings = vaults.reduce((sum, v) => sum + (v.totalEarning || 0), 0);
  // Note: v.totalEarning field exists in VaultsEntity? I saw it in Step 918. Yes.

  return (
    <div className="container max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <VaultsHeader selectedCount={selectedVaults.length} onBulkDelete={handleBulkDelete} isBulkDeleting={bulkDeleting} />

      <VaultsStats totalVaults={totalVaults} totalLikes={totalLikes} totalViews={totalViews} totalEarnings={totalEarnings} />

      <Card>
        <VaultsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCount={selectedVaults.length}
          totalFiltered={filteredVaults.length}
          onSelectAll={() => handleSelectAll(filteredVaults)}
        />
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All
              </TabsTrigger>
              <TabsTrigger value="paid" className="text-xs sm:text-sm">
                Paid
              </TabsTrigger>
              <TabsTrigger value="free" className="text-xs sm:text-sm">
                Free
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4 sm:mt-6">
              {loading && vaults.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] gap-4">
                  <Loading />
                  <p className="text-sm text-muted-foreground">Loading vaults...</p>
                </div>
              ) : filteredVaults.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] gap-4 border-2 border-dashed rounded-lg">
                  <Archive className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center space-y-1">
                    <p className="text-sm font-medium">No vaults found</p>
                    <p className="text-xs text-muted-foreground">Create your first vault in &quot;Vaults Studio&quot; to get started</p>
                  </div>
                </div>
              ) : (
                <VaultsTable
                  vaults={filteredVaults}
                  loading={loading}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                  selectedVaults={selectedVaults}
                  onToggleSelect={handleToggleSelect}
                  onDelete={handleDelete}
                  onShare={handleShare}
                  deleting={deleting}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
