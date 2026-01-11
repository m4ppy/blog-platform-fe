import axios from "axios";

export function getApiErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return (
            error.response?.data?.message ??
            `Request failed (${error.response?.status})`
        );
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Unknown error occurred";
}
