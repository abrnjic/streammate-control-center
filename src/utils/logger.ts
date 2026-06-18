export function createLogger(addLog: (msg: string) => void) {
  return {
    info: (msg: string) => addLog(`[INFO] ${msg}`),
    error: (msg: string) => addLog(`[ERROR] ${msg}`),
    warn: (msg: string) => addLog(`[WARNING] ${msg}`),
    system: (msg: string) => addLog(`[SYSTEM] ${msg}`),
    success: (msg: string) => addLog(`[SUCCESS] ${msg}`)
  };
}
