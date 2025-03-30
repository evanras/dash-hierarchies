# AUTO GENERATED FILE - DO NOT EDIT

export tablehierarchy

"""
    tablehierarchy(;kwargs...)

A TableHierarchy component.
TableHierarchy - A Dash component for displaying hierarchical data in a table format
with multiple columns, sticky headers, and expandable rows.

This component displays hierarchical data in a table format with support for:
- Multiple columns
- Sticky index column (leftmost)
- Sticky headers
- Expandable/collapsible rows
- Column selection callbacks
- Resizable index column

@param {Object} props - Component props
@param {string} props.id - The ID used to identify this component in Dash callbacks
@param {Array} props.data - Array of data items with arbitrary columns and optional children arrays
@param {Array} props.columns - Array of column definitions with name and width properties
@param {string} props.indexColumnName - Name of the column to use as the index (leftmost column)
@param {Object} props.style - Custom styles to apply to the container
@param {string} props.className - CSS class names to apply to the container
@param {Object} props.selectedItem - Currently selected item (for controlled component)
@param {Object} props.selectedColumn - Currently selected column (for controlled component)
@param {string} props.indexColumnWidth - The width of the index column 
@param {Function} props.setProps - Dash callback to update props
@returns {React.ReactNode} - Rendered hierarchical table component
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `className` (String; optional): CSS class names to apply to the outer div.
- `columns` (optional): Array of column definitions.
Each column should have a name and optional width property.
Example: [{ name: 'Forecast Decomposition', width: '250px' }, { name: 'January 2024' }]. columns has the following type: Array of lists containing elements 'name', 'width'.
Those elements have the following types:
  - `name` (String; required)
  - `width` (String; optional)s
- `data` (Array; optional): The hierarchical data to display.
Each item should have arbitrary columns and an optional children array.
- `indexColumnName` (String; required): Name of the column to use as the index (leftmost column).
This column will be sticky when horizontally scrolling.
- `indexColumnWidth` (String; optional): Width of the index column (leftmost column).
Can be updated by the user via drag-to-resize.
- `selectedColumn` (optional): Object representing the currently selected column (controlled component pattern).
This will be updated when a column header is clicked.
Contains the column name and data which is an array of objects with the index column value and the value for this column.. selectedColumn has the following type: lists containing elements 'name', 'data'.
Those elements have the following types:
  - `name` (String; optional)
  - `data` (Array of Dicts; optional)
- `selectedItem` (Dict; optional): Object representing the currently selected item (controlled component pattern).
This will be updated when a row is clicked.
Contains all properties of the selected item except the 'children' array.
- `style` (Dict; optional): Inline styles to apply to the outer div.
"""
function tablehierarchy(; kwargs...)
        available_props = Symbol[:id, :className, :columns, :data, :indexColumnName, :indexColumnWidth, :selectedColumn, :selectedItem, :style]
        wild_props = Symbol[]
        return Component("tablehierarchy", "TableHierarchy", "dash_hierarchies", available_props, wild_props; kwargs...)
end

