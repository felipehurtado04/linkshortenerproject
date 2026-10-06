# UI Components Guidelines 

- All UI elements in this app must use shadcn/ui components. Do not build custom UI primitives, wrappers, or one-off component files when a shadcn component already fits the need.
- Use the existing shadcn components under `components/ui` as the default source for buttons, forms, cards, dialogs, inputs, and other interface elements.
- Do not create custom components for screens, widgets, or layout pieces unless the requirement is explicitly covered by a shadcn component generated from the official shadcn/ui library.
- Prefer composition with shadcn primitives and Tailwind utility classes over bespoke CSS or custom component logic.
- Keep styling, spacing, and patterns consistent with the established shadcn design system already in the project.
- When a design needs a new UI pattern, prefer the nearest official shadcn component and extend it through the existing shadcn conventions rather than creating a new custom component.
