import { cn } from "./utils";

describe("cn()", () => {
  it("returns a single class unchanged", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple classes", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolves Tailwind conflicts — last value wins", () => {
    // tailwind-merge should deduplicate conflicting utilities
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("filters falsy values", () => {
    expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
  });

  it("supports conditional object syntax from clsx", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo");
  });
});
