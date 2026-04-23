'use client';

import { useVaults } from '@/hooks/useVaults';
import { PaginationInput, SortBy, SortOrder, VaultsEntity } from '@workspace/gql/generated/graphql';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
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

  const { vaults, loading, hasMore, handleLoadMore } = useVaults(params);

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

  const filteredVaults = vaults.filter((vault) => {
    const matchesSearch = vault.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? true;
    const isPaid = (vault.unlockPrice || 0) > 0;
    const matchesTab = activeTab === 'all' || (activeTab === 'paid' && isPaid) || (activeTab === 'free' && !isPaid);
    return matchesSearch && matchesTab;
  });

  const totalVaults = vaults.length;
  const totalLikes = vaults.reduce((sum, v) => sum + v.likeCount, 0);
  const totalViews = vaults.reduce((sum, v) => sum + (v.viewCount || 0), 0);
  const totalEarnings = vaults.reduce((sum, v) => sum + (v.totalEarning || 0), 0);

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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
