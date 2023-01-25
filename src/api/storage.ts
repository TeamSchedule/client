export class LocalStorageApi {
    static GET(name: string): any {
        const value = window.localStorage.getItem(name);
        if (value) return JSON.parse(value);
        return null;
    }

    static SET(name: string, item: any) {
        window.localStorage.setItem(name, JSON.stringify(item));
    }

    static DELETE(name: string) {
        window.localStorage.removeItem(name);
    }

    static CLEAR() {
        window.localStorage.clear();
    }
}
