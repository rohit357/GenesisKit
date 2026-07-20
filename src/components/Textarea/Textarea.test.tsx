import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("associates the visible label with the textarea", () => {
    render(<Textarea label="Comment" />);

    const textarea = screen.getByLabelText("Comment");
    expect(textarea).toHaveClass("gk-textarea--md", "gk-textarea--resize-vertical");
  });

  it("connects description and error content for assistive technology", () => {
    render(
      <Textarea
        label="Feedback"
        description="Please avoid sharing private information."
        error="Feedback is required."
      />
    );

    const textarea = screen.getByLabelText("Feedback");
    const describedBy = textarea.getAttribute("aria-describedby") ?? "";

    expect(describedBy).toContain("-description");
    expect(describedBy).toContain("-error");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Feedback is required.");
  });

  it("supports custom rows, size, resize, required state, and refs", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(
      <Textarea id="bio" label="Biography" size="lg" resize="none" rows={6} required ref={ref} />
    );

    const textarea = screen.getByRole("textbox", { name: /Biography/ });
    expect(textarea).toHaveAttribute("id", "bio");
    expect(textarea).toHaveAttribute("rows", "6");
    expect(textarea).toHaveClass("gk-textarea--lg", "gk-textarea--resize-none");
    expect(textarea).toBeRequired();
    expect(ref.current).toBe(textarea);
  });

  it("fires input changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea label="Notes" onChange={onChange} />);

    await user.type(screen.getByLabelText("Notes"), "Hello");

    expect(onChange).toHaveBeenCalled();
  });
});
