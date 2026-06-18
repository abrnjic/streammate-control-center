export interface ScanOptions {
  force?: boolean;
}

export interface ScannerStatus {
  isScanning: boolean;
  lastScanFinishedAt: number | null;
  error: string | null;
}
