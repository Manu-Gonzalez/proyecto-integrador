import { TestOrderItem } from "./TestOrderItem";

export interface TestOrder {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  items: TestOrderItem[];
}
