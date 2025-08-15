/**
 * Defines the specific HTTP status codes your backend uses for responses.
 * This directly corresponds to your `HttpCodeW` enum.
 */
export type BackendHttpCode =
  | 200 // OK
  | 201 // Created
  | 204 // No Content
  | 400 // Bad Request
  | 401 // Unauthorized
  | 404 // Not Found
  | 409 // Conflict
  | 500 // Internal Server Error
  | 501; // Not Implemented

/**
 * The generic interface for all responses coming from your backend.
 * This is for non-paginated responses.
 * @template T The type of the `message` payload.
 */
export interface BackendResponse<T> {
  message: T;
  code: BackendHttpCode;
}

// Optional: You might want a specific type for common error messages
export type BackendErrorMessage = string; // Or a more complex error object if your backend sends it
