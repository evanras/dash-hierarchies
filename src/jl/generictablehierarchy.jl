# AUTO GENERATED FILE - DO NOT EDIT

export generictablehierarchy

"""
    generictablehierarchy(;kwargs...)

A GenericTableHierarchy component.
GenericTableHierarchy - A component for displaying hierarchical data in a simple table format
with expandable rows and row selection.

@param {Object} props - Component props
@param {string} props.id - The ID used to identify this component
@param {Array} props.data - Array of data items with optional children arrays
@param {Array} props.columns - Array of column definitions with name properties
@param {Object} props.colors - Custom colors for hover and selection states
@param {string} props.uniqueKey - Property name to use as unique identifier for rows
@param {Object} props.selectedRow - Currently selected row data
@param {string} props.dataKey - Key to use when comparing selected row with current row
@param {string} props.highlightKey - Optional secondary key to check for highlighting
@param {Object} props.style - Custom styles to apply to the container
@param {string} props.className - CSS class names to apply to the container
@param {Function} props.setProps - Callback to update props
@returns {React.ReactNode} - Rendered hierarchical table component
Keyword arguments:
- `id` (String; optional): The ID used to identify this component.
- `className` (String; optional): CSS class names to apply to the container.
- `colors` (optional): Color configuration for hover and selected states.. colors has the following type: lists containing elements 'hoverColor', 'selectedColor'.
Those elements have the following types:
  - `hoverColor` (String; optional)
  - `selectedColor` (String; optional)
- `columns` (optional): Array of column definitions that specify which fields to display.
Each column should have a name property, and can optionally have width, label, and align.
Example: [{ name: 'title', label: 'Title', width: '200px', align: 'left' }]. columns has the following type: Array of lists containing elements 'name', 'label', 'width', 'align'.
Those elements have the following types:
  - `name` (String; required)
  - `label` (String; optional)
  - `width` (String; optional)
  - `align` (a value equal to: 'left', 'center', 'right'; optional)s
- `data` (Array; optional): The hierarchical data to display.
Each item should have arbitrary properties and an optional children array.
- `dataKey` (String; optional): Property name to use when comparing selected row with current row.
Default is the same as uniqueKey.
- `highlightKey` (String; optional): Optional secondary property to check when determining if a row should be highlighted.
- `selectedRow` (Dict; optional): Currently selected row data.
- `style` (Dict; optional): Inline styles to apply to the container.
- `uniqueKey` (String; optional): Property name in data items to use as unique identifier.
Default is 'id'.
"""
function generictablehierarchy(; kwargs...)
        available_props = Symbol[:id, :className, :colors, :columns, :data, :dataKey, :highlightKey, :selectedRow, :style, :uniqueKey]
        wild_props = Symbol[]
        return Component("generictablehierarchy", "GenericTableHierarchy", "dash_hierarchies", available_props, wild_props; kwargs...)
end

