export class LocalStorageApi {
    static GET(name: string): any {
        const value = localStorage.getItem(name);
        if (value) return JSON.parse(value);
        return null;
    }

    static SET(name: string, item: any) {
        localStorage.setItem(name, JSON.stringify(item));
    }

    static DELETE(name: string) {
        localStorage.removeItem(name);
    }
}
