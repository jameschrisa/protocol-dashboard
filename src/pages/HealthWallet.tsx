import { useState, useMemo } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { healthWalletData, HealthWalletEntry } from "../data/health-wallet-data";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import { PieChartCard } from "../components/health/pie-chart-card";
import {
  calculateCategoryData,
  calculatePaymentMethodData,
  calculateInsuranceCoverageData,
} from "../components/health/health-wallet-charts";

type SortField = keyof HealthWalletEntry;
type SortOrder = 'asc' | 'desc';

export const HealthWallet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activePaymentIndex, setActivePaymentIndex] = useState(0);
  const [activeInsuranceIndex, setActiveInsuranceIndex] = useState(0);

  // Calculate chart data
  const categoryData = useMemo(() => calculateCategoryData(healthWalletData), []);
  const paymentMethodData = useMemo(() => calculatePaymentMethodData(healthWalletData), []);
  const insuranceCoverageData = useMemo(() => calculateInsuranceCoverageData(healthWalletData), []);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    return healthWalletData
      .filter(entry => {
        const searchLower = searchTerm.toLowerCase();
        return (
          entry.providerName.toLowerCase().includes(searchLower) ||
          entry.category.toLowerCase().includes(searchLower) ||
          entry.paymentMethod.toLowerCase().includes(searchLower) ||
          entry.billingStatus.toLowerCase().includes(searchLower) ||
          (entry.insuranceClaimId?.toLowerCase().includes(searchLower) || false)
        );
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue === undefined || bValue === undefined) return 0;

        let comparison = 0;
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }

        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [searchTerm, sortField, sortOrder]);

  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Health Wallet</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <PieChartCard
          title="Expense Category Distribution"
          data={categoryData}
          activeIndex={activeCategoryIndex}
          onSelect={(value) => setActiveCategoryIndex(categoryData.findIndex(item => item.name === value))}
          onHover={setActiveCategoryIndex}
        />
        <PieChartCard
          title="Payment Method Distribution"
          data={paymentMethodData}
          activeIndex={activePaymentIndex}
          onSelect={(value) => setActivePaymentIndex(paymentMethodData.findIndex(item => item.name === value))}
          onHover={setActivePaymentIndex}
        />
        <PieChartCard
          title="Insurance Coverage Distribution"
          data={insuranceCoverageData}
          activeIndex={activeInsuranceIndex}
          onSelect={(value) => setActiveInsuranceIndex(insuranceCoverageData.findIndex(item => item.name === value))}
          onHover={setActiveInsuranceIndex}
        />
      </div>
      
      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  Date {renderSortIndicator('date')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('providerName')}
                >
                  Provider {renderSortIndicator('providerName')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  Category {renderSortIndicator('category')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer text-right"
                  onClick={() => handleSort('amount')}
                >
                  Amount {renderSortIndicator('amount')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('paymentMethod')}
                >
                  Payment Method {renderSortIndicator('paymentMethod')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('insuranceClaimId')}
                >
                  Claim ID {renderSortIndicator('insuranceClaimId')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('billingStatus')}
                >
                  Status {renderSortIndicator('billingStatus')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer text-right"
                  onClick={() => handleSort('insuranceCoverage')}
                >
                  Coverage {renderSortIndicator('insuranceCoverage')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer text-right"
                  onClick={() => handleSort('outOfPocketCost')}
                >
                  Out of Pocket {renderSortIndicator('outOfPocketCost')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-muted/50">
                  <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                  <TableCell>{entry.providerName}</TableCell>
                  <TableCell>
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${entry.category === 'Medical' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : ''}
                      ${entry.category === 'Dental' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
                      ${entry.category === 'Vision' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : ''}
                      ${entry.category === 'Pharmacy' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' : ''}
                    `}>
                      {entry.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(entry.amount)}</TableCell>
                  <TableCell>{entry.paymentMethod}</TableCell>
                  <TableCell>{entry.insuranceClaimId || "-"}</TableCell>
                  <TableCell>
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${entry.billingStatus === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
                      ${entry.billingStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : ''}
                      ${entry.billingStatus === 'Denied' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : ''}
                    `}>
                      {entry.billingStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{entry.insuranceCoverage}%</TableCell>
                  <TableCell className="text-right">{formatCurrency(entry.outOfPocketCost)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default HealthWallet;
