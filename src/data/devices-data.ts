export interface DeviceEntry {
  id: string;
  deviceName: string;
  deviceType: "Wearable" | "Diagnostic" | "Monitoring";
  manufacturer: string;
  modelNumber: string;
  connectionStatus: "Connected" | "Disconnected";
  connectionType: "API" | "Direct";
  measurementType: string;
  measurementUnits: string;
  dataFrequency: "Continuous" | "Intermittent" | "On-demand";
}

export const devicesData: DeviceEntry[] = [
  {
    id: "1",
    deviceName: "Apple Watch Series 8",
    deviceType: "Wearable",
    manufacturer: "Apple Inc.",
    modelNumber: "A2473",
    connectionStatus: "Connected",
    connectionType: "API",
    measurementType: "Heart Rate, ECG, Blood Oxygen",
    measurementUnits: "BPM, mV, %",
    dataFrequency: "Continuous"
  },
  {
    id: "2",
    deviceName: "Omron Blood Pressure Monitor",
    deviceType: "Monitoring",
    manufacturer: "Omron Healthcare",
    modelNumber: "BP786N",
    connectionStatus: "Connected",
    connectionType: "Direct",
    measurementType: "Blood Pressure",
    measurementUnits: "mmHg",
    dataFrequency: "On-demand"
  },
  {
    id: "3",
    deviceName: "Fitbit Sense 2",
    deviceType: "Wearable",
    manufacturer: "Fitbit",
    modelNumber: "FB521",
    connectionStatus: "Connected",
    connectionType: "API",
    measurementType: "Activity, Sleep, Stress",
    measurementUnits: "Steps, Hours, Score",
    dataFrequency: "Continuous"
  },
  {
    id: "4",
    deviceName: "Dexcom G7 CGM",
    deviceType: "Monitoring",
    manufacturer: "Dexcom",
    modelNumber: "G7-001",
    connectionStatus: "Connected",
    connectionType: "API",
    measurementType: "Blood Glucose",
    measurementUnits: "mg/dL",
    dataFrequency: "Continuous"
  },
  {
    id: "5",
    deviceName: "Withings Sleep Analyzer",
    deviceType: "Monitoring",
    manufacturer: "Withings",
    modelNumber: "WSM02",
    connectionStatus: "Disconnected",
    connectionType: "API",
    measurementType: "Sleep Patterns",
    measurementUnits: "Hours, Score",
    dataFrequency: "Continuous"
  },
  {
    id: "6",
    deviceName: "Kardia Mobile",
    deviceType: "Diagnostic",
    manufacturer: "AliveCor",
    modelNumber: "AC-009",
    connectionStatus: "Disconnected",
    connectionType: "Direct",
    measurementType: "ECG",
    measurementUnits: "mV",
    dataFrequency: "On-demand"
  },
  {
    id: "7",
    deviceName: "Oura Ring Gen 3",
    deviceType: "Wearable",
    manufacturer: "Oura",
    modelNumber: "OR3-001",
    connectionStatus: "Connected",
    connectionType: "API",
    measurementType: "Sleep, Readiness, Activity",
    measurementUnits: "Score",
    dataFrequency: "Continuous"
  },
  {
    id: "8",
    deviceName: "Nonin Pulse Oximeter",
    deviceType: "Diagnostic",
    manufacturer: "Nonin Medical",
    modelNumber: "3150",
    connectionStatus: "Connected",
    connectionType: "Direct",
    measurementType: "Blood Oxygen, Pulse Rate",
    measurementUnits: "%, BPM",
    dataFrequency: "Intermittent"
  }
];
