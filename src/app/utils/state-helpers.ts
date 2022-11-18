export class StateHelpers {
    static loading = {
        isLoading: true,
        hasLoaded: false
    };

    static success = {
        isLoading: false,
        hasLoaded: true
    };

    static error = {
        isLoading: false,
        hasLoaded: false
    };
}
