export enum CommandMode {
  PRODUCTION = 1100,
  RECORDED_READY = 1110,
  TESTING_STAGE = 1120,
  DEVELOPING_STAGE = 1130,
  MAINTENANCE_STAGE = 0,
  UNRECORDED = 90,
}

export enum CommandRunType {
  THIS = "TF",
  HANDLE = "HF",
}
