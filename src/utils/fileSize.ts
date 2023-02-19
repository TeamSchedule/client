export default function fileSize(bytes: number): string {
    const kilobytes: number = bytes / 1024;
    const megabytes: number = kilobytes / 1024;

    if (megabytes > 1) {
        return Math.floor(megabytes * 10) / 10 + "MB";
    }
    return Math.floor(kilobytes * 10) / 10 + "KB";
}
