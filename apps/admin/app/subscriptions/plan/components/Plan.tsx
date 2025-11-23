import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { PageManager } from '@workspace/ui/globals/PageManager';
import { PreviewEditor } from '@workspace/ui/globals/PreviewEditor';
import { useState } from 'react';
import { Header } from './Header';
import { PlanInformation } from './PlanInformation';
import { PlanPreview } from './PlanPreview';

export default function Plan() {
  const [planName, setPlanName] = useState('Pro');
  const [featureInput, setFeatureInput] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState(24);
  const [yearlyPrice, setYearlyPrice] = useState(216);
  const [description, setDescription] = useState('Perfect for professionals');
  const [features, setFeatures] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('create_plan');

  const addFeature = () => {
    if (featureInput.trim() !== '') {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  return (
    <PageManager>
      <Header />
      <div className="flex md:flex-row flex-col justify-between w-full gap-2 p-1">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full">
          <TabsList>
            <TabsTrigger value="create_plan">Information</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="create_plan" className="space-y-1">
            <PlanInformation
              banner={banner}
              description={description}
              featureInput={featureInput}
              featured={featured}
              features={features}
              monthlyPrice={monthlyPrice}
              setDescription={setDescription}
              setFeatureInput={setFeatureInput}
              setFeatured={setFeatured}
              setMonthlyPrice={setMonthlyPrice}
              setYearlyPrice={setYearlyPrice}
              yearlyPrice={yearlyPrice}
              setPlanName={setPlanName}
              setBanner={setBanner}
              addFeature={addFeature}
              setFeatures={setFeatures}
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-1">
            <PreviewEditor image={banner} setImage={setBanner} isEditing={isEditing} setIsEditing={setIsEditing} />
          </TabsContent>
        </Tabs>

        <PlanPreview
          banner={banner}
          featured={featured}
          planName={planName}
          description={description}
          features={features}
          monthlyPrice={monthlyPrice}
          yearlyPrice={yearlyPrice}
          setActiveTab={setActiveTab}
        />
      </div>
    </PageManager>
  );
}
