import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

const items = [
  { value: "overview", label: "Overview", content: "Overview content" },
  { value: "activity", label: "Activity", content: "Activity content" },
  { value: "disabled", label: "Disabled", content: "Hidden", disabled: true }
];

describe("Tabs", () => {
  it("renders the first enabled tab and panel", () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview content");
  });

  it("changes tabs and notifies consumers", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Tabs items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("tab", { name: "Activity" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Activity content");
    expect(onValueChange).toHaveBeenCalledWith("activity");
  });

  it("supports keyboard navigation and disabled tabs", async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    const overview = screen.getByRole("tab", { name: "Overview" });
    await user.click(overview);
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Activity" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Disabled" })).toBeDisabled();
  });
});
