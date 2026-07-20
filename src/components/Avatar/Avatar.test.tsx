import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials with an accessible name", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveTextContent("AL");
  });

  it("renders an image and falls back when it fails", () => {
    render(<Avatar name="Ada Lovelace" src="/missing.jpg" alt="Ada profile" />);
    const avatar = screen.getByRole("img", { name: "Ada profile" });
    fireEvent.error(avatar.querySelector("img")!);
    expect(avatar).toHaveTextContent("AL");
  });

  it("supports size and shape", () => {
    render(<Avatar name="A" size="lg" shape="square" data-testid="avatar" />);
    expect(screen.getByTestId("avatar")).toHaveClass("gk-avatar--lg", "gk-avatar--square");
  });
});
