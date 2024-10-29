export function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center">
            <div className="relative">
                <div className="h-8 w-8 rounded-full border-2 border-muted-foreground/20"></div>
                <div className="absolute left-0 top-0 h-8 w-8 animate-spin rounded-full border-2 border-t-2 border-primary"></div>
            </div>
        </div>
    );
}
