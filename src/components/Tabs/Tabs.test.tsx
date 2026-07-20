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

  it("only moves focus on arrows in manual activation mode until Enter", async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} activationMode="manual" />);
    await user.click(screen.getByRole("tab", { name: "Overview" }));
    await user.keyboard("{ArrowRight}");
    const activity = screen.getByRole("tab", { name: "Activity" });
    expect(activity).toHaveFocus();
    expect(activity).toHaveAttribute("aria-selected", "false");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview content");
    await user.keyboard("{Enter}");
    expect(activity).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Activity content");
  });

  it("keeps inactive panels mounted but hidden with keepMounted", async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} keepMounted />);
    const panels = screen.getAllByRole("tabpanel", { hidden: true });
    expect(panels).toHaveLength(3);
    expect(screen.getByText("Activity content")).not.toBeVisible();
    await user.click(screen.getByRole("tab", { name: "Activity" }));
    expect(screen.getByText("Activity content")).toBeVisible();
    expect(screen.getByText("Overview content")).not.toBeVisible();
  });

  it("unmounts inactive panels by default", () => {
    render(<Tabs items={items} />);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
    expect(screen.queryByText("Activity content")).not.toBeInTheDocument();
  });
});
