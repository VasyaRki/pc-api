export type PagedResult<Entity> = { data: Entity[]; total: number };

export type PaginationQuery = {
  page?: number;
  limit?: number;
  fields?: string[];
  search?: string;
};
