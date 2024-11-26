import React, { useState, useMemo } from "react";
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
import { rxCabinetData, MedicationEntry } from "../data/rx-cabinet-data";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

type SortField = keyof MedicationEntry;
type SortOrder = 'asc' | 'desc';

export const RxCabinet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    return rxCabinetData
      .filter(entry => {
        const searchLower = searchTerm.toLowerCase();
        return (
          entry.name.toLowerCase().includes(searchLower) ||
          entry.type.toLowerCase().includes(searchLower) ||
          entry.dosage.toLowerCase().includes(searchLower) ||
          entry.routeOfAdministration.toLowerCase().includes(searchLower) ||
          (entry.pharmacy?.toLowerCase().includes(searchLower) || false)
        );
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue === undefined || bValue === undefined) return 0;

        let comparison = 0;
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else {
          comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
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
        <h1 className="text-2xl font-bold">Rx Cabinet</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  Type {renderSortIndicator('type')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Name {renderSortIndicator('name')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('datePrescribed')}
                >
                  Date Prescribed {renderSortIndicator('datePrescribed')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('dosage')}
                >
                  Dosage {renderSortIndicator('dosage')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('routeOfAdministration')}
                >
                  Route {renderSortIndicator('routeOfAdministration')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('startDate')}
                >
                  Start Date {renderSortIndicator('startDate')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('endDate')}
                >
                  End Date {renderSortIndicator('endDate')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('refills')}
                >
                  Refills {renderSortIndicator('refills')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('pharmacy')}
                >
                  Pharmacy {renderSortIndicator('pharmacy')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${entry.type === 'Medication' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : ''}
                      ${entry.type === 'Supplement' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
                      ${entry.type === 'Vitamin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : ''}
                      ${entry.type === 'Nutraceutical' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' : ''}
                    `}>
                      {entry.type}
                    </span>
                  </TableCell>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.datePrescribed || "-"}</TableCell>
                  <TableCell>{entry.dosage}</TableCell>
                  <TableCell>{entry.routeOfAdministration}</TableCell>
                  <TableCell>{new Date(entry.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{entry.endDate ? new Date(entry.endDate).toLocaleDateString() : "-"}</TableCell>
                  <TableCell>
                    {entry.refills !== undefined ? (
                      <span className={`
                        px-2 py-1 rounded-full text-xs
                        ${entry.refills > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}
                      `}>
                        {entry.refills}
                      </span>
                    ) : "-"}
                  </TableCell>
                  <TableCell>{entry.pharmacy || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default RxCabinet;
