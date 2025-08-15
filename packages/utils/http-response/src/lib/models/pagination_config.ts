import { BackendHttpCode } from './backend_response';

/**
 * Represents the pagination information included in paginated responses.
 */
export interface PaginationInfo {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  has_next_Page: boolean;
  has_previous_page: boolean;
}

/**
 * Represents a paginated response coming from your backend.
 * The `message` field will contain a `data` array and `pagination` info.
 * @template T The type of the individual items within the `data` array.
 */
export interface PaginatedBackendResponse<T> {
  message: {
    data: T[]; // Assuming 'data' is always an array of items for paginated responses
    pagination: PaginationInfo;
  };
  code: BackendHttpCode;
}
