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
import { devicesData, DeviceEntry } from "../data/devices-data";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

type SortField = keyof DeviceEntry;
type SortOrder = 'asc' | 'desc';

export const Devices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("deviceName");
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
    return devicesData
      .filter(device => {
        const searchLower = searchTerm.toLowerCase();
        return (
          device.deviceName.toLowerCase().includes(searchLower) ||
          device.deviceType.toLowerCase().includes(searchLower) ||
          device.manufacturer.toLowerCase().includes(searchLower) ||
          device.modelNumber.toLowerCase().includes(searchLower) ||
          device.measurementType.toLowerCase().includes(searchLower)
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
        <h1 className="text-2xl font-bold">Connected Devices</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
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
                  onClick={() => handleSort('deviceName')}
                >
                  Device Name {renderSortIndicator('deviceName')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('deviceType')}
                >
                  Type {renderSortIndicator('deviceType')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('manufacturer')}
                >
                  Manufacturer {renderSortIndicator('manufacturer')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('modelNumber')}
                >
                  Model Number {renderSortIndicator('modelNumber')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('connectionStatus')}
                >
                  Status {renderSortIndicator('connectionStatus')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('connectionType')}
                >
                  Connection {renderSortIndicator('connectionType')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('measurementType')}
                >
                  Measurement Type {renderSortIndicator('measurementType')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('measurementUnits')}
                >
                  Units {renderSortIndicator('measurementUnits')}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('dataFrequency')}
                >
                  Frequency {renderSortIndicator('dataFrequency')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((device) => (
                <TableRow key={device.id} className="hover:bg-muted/50">
                  <TableCell>{device.deviceName}</TableCell>
                  <TableCell>
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${device.deviceType === 'Wearable' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : ''}
                      ${device.deviceType === 'Diagnostic' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : ''}
                      ${device.deviceType === 'Monitoring' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
                    `}>
                      {device.deviceType}
                    </span>
                  </TableCell>
                  <TableCell>{device.manufacturer}</TableCell>
                  <TableCell>{device.modelNumber}</TableCell>
                  <TableCell>
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${device.connectionStatus === 'Connected' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}
                    `}>
                      {device.connectionStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${device.connectionType === 'API' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'}
                    `}>
                      {device.connectionType}
                    </span>
                  </TableCell>
                  <TableCell>{device.measurementType}</TableCell>
                  <TableCell>{device.measurementUnits}</TableCell>
                  <TableCell>
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${device.dataFrequency === 'Continuous' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
                      ${device.dataFrequency === 'Intermittent' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : ''}
                      ${device.dataFrequency === 'On-demand' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : ''}
                    `}>
                      {device.dataFrequency}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Devices;
