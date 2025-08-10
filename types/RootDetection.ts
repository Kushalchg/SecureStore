export interface RootCheckResult {
  isRooted: boolean;
  //method is not important here because it only output the rootBeer method
  //because i only use that
  method: string;
}

export interface DeveloperCheckResult {
  isDeveloperOptionsEnabled: boolean;
}


export interface RootDetectionModule {
  checkRootStatus(): Promise<RootCheckResult>;
  checkDeveloperOptions(): Promise<DeveloperCheckResult>;
}
