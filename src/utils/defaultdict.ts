export default function DefaultDict() {
    return new Proxy(
        {},
        {
            // @ts-ignore
            get: (target, name) => (name in target ? target[name] : false),
        }
    );
}
