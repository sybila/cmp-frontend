export interface Model {
  id: number;
  name: string;
  sbmlId: string;
  sboTerm: string;
  notes: string;
  annotation: string;
  userId: number;
  approvedId: number;
  status: string;
}

// TODO: normalizer for this model and others
