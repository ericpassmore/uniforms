export class URLCache {
    private cache: Map<string, number> = new Map();
    private readonly MAX_ENTRIES = 1000; // Maximum allowed entries in the cache

    // Add a URL to the cache with a 2-second expiration, only if it doesn't already exist
    add(url: string): void {
        this.cleanup(); // Ensure we clean expired entries first

        if (this.cache.has(url)) {
            //console.log(`URL "${url}" is already in the cache.`);
            return; // Skip adding if it already exists
        }

        if (this.cache.size >= this.MAX_ENTRIES) {
            throw new Error(`Cache size exceeded the maximum limit of ${this.MAX_ENTRIES} entries.`);
        }

        const expiration = Date.now() + 1500; // Current time + 1500 ms (2 seconds)
        this.cache.set(url, expiration);
        //console.log(`URL "${url}" added to the cache.`);
    }

    // Check if a URL exists in the cache
    has(url: string): boolean {
        this.cleanup(); // Remove expired entries before checking
        return this.cache.has(url);
    }

    // Remove expired URLs from the cache
    private cleanup(): void {
        const now = Date.now();
        for (const [url, expiration] of this.cache) {
            if (expiration <= now) {
                this.cache.delete(url);
                //console.log(`URL "${url}" expired and was removed from the cache.`);
            }
        }
    }
}