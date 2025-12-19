import { UsageGuide, Dosage, Safety } from "@/types/product";

interface ProductUsageGuideProps {
  usageGuide: UsageGuide[];
  dosage: Dosage[];
  safety: Safety[];
}

export const ProductUsageGuide = ({ usageGuide, dosage, safety }: ProductUsageGuideProps) => {
  const defaultDosageData = [
    { plantType: "Potted Plants", amount: "1-2 tablespoons per gallon of soil", frequency: "" },
    { plantType: "Vegetable Gardens", amount: "2-3 lbs per 100 sq ft", frequency: "" },
    { plantType: "Trees & Shrubs", amount: "1/4 cup per foot of plant height", frequency: "" },
    { plantType: "Lawns", amount: "5-10 lbs per 1,000 sq ft", frequency: "" }
  ];

  const defaultUsageSteps = [
    { stepNumber: 1, title: "Ensure Soil is Moist", description: "Water the area lightly before application to ensure proper nutrient absorption." },
    { stepNumber: 2, title: "Spread Granules Evenly", description: "Distribute the fertilizer granules evenly around the base of plants or across the designated area." },
    { stepNumber: 3, title: "Work Into Soil", description: "Gently work the granules into the top 2-3 inches of soil using a rake or cultivator." },
    { stepNumber: 4, title: "Water Thoroughly", description: "Water the treated area thoroughly to activate the fertilizer and help nutrients reach plant roots." }
  ];

  return (
    <div className="bg-white text-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Application Rates Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Application Rates
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {dosage.length > 0 ? (
              dosage.map((d) => (
                <div key={d.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-200 last:border-0 gap-2 sm:gap-0">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {d.plantType}
                  </span>
                  <div className="text-left sm:text-right">
                    <div className="text-gray-700 text-sm sm:text-base">{d.amount}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{d.frequency}</div>
                  </div>
                </div>
              ))
            ) : (
              defaultDosageData.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-200 last:border-0 gap-2 sm:gap-0">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">{item.plantType}</span>
                  <span className="text-gray-700 text-sm sm:text-base">{item.amount}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* How to Apply Section */}
        <div className="relative">
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
          <div className="lg:pl-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              How to Use
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {usageGuide.length > 0 ? (
                usageGuide.map((step) => (
                  <div key={step.id} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                      {step.stepNumber}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                        {step.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                defaultUsageSteps.map((step) => (
                  <div key={step.stepNumber} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                      {step.stepNumber}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">
                        {step.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Safety Information */}
      {safety.length > 0 && (
        <div className="mt-6 sm:mt-8 bg-gray-50 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Safety Information
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {safety.map((s) => (
              <div key={s.id} className="flex items-start space-x-3">
                <div className="shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">
                    {s.title}
                  </h4>
                  <p className="text-gray-700 text-sm sm:text-base">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};