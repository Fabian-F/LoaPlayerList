export class StringUtils {
  static toTitleCase(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  static arrayIncludes(arr: Array<string>, value: string) {
    return arr.some((v) =>
      v.toLowerCase() === value
    )
  }
}
