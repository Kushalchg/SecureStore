export interface RootCheckResult {
  isRooted: boolean;
}

export interface DeveloperCheckResult {
  isDeveloperOptionsEnabled: boolean;
}


export interface RootDetectionModule {
  checkRootStatus(): Promise<RootCheckResult>;
  checkDeveloperOptions(): Promise<DeveloperCheckResult>;
}
