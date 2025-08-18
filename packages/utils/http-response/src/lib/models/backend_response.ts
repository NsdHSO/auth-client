/**
 * Defines the specific HTTP status codes your backend uses for responses.
 * This directly corresponds to your `HttpCodeW` enum.
 */
export type BackendHttpCode =
  | 'OK' // OK
  | 'Created'// Created
  | 'No Content' // No Content
  | 'Bad Request' // Bad Request
  | 'Unauthorized' // Unauthorized
  | 'Not Found' // Not Found
  | 'Conflict' // Conflict
  | 'Internal Server Error' // Internal Server Error
  | ' Not Implemented'; // Not Implemented

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
