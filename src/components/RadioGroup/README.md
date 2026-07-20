# RadioGroup

`RadioGroup` provides a labeled set of mutually exclusive options with
controlled and uncontrolled modes.

```tsx
<RadioGroup
  label="Billing cycle"
  name="billing"
  options={[{ value: "monthly", label: "Monthly" }, { value: "yearly", label: "Yearly" }]}
  value={billing}
  onValueChange={setBilling}
/> 
```

