export interface BioQuantity {
  id: number;
  name: string;
  isValid: boolean;
  link: string;
  userId: number;
  organismId: number;
  organism: string;
  unitId: number;
  timeTo: string;
  timeFrom: string;
  valueTo: number;
  valueFrom: number;
  valueStep: number;
}

export interface BioQuantityDetail extends BioQuantity {
  modelUnits: any[];
  attributes: any[];
  variableValues: any[];
}
