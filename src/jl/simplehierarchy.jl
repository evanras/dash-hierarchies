# AUTO GENERATED FILE - DO NOT EDIT

export simplehierarchy

"""
    simplehierarchy(;kwargs...)

A SimpleHierarchy component.
SimpleHierarchy - A Dash component for displaying hierarchical data with expandable sections

This component displays hierarchical data with collapsible sections, percentage indicators, 
and progress bars. It is designed to be used as a Dash component.

@param {Object} props - Component props
@param {string} props.id - The ID used to identify this component in Dash callbacks
@param {Array} props.data - Array of data items with name, percentage, and optional children
@param {Object} props.colors - Colors for the progress bars
@param {string} props.colors.primary - Color for the filled portion of progress bars
@param {string} props.colors.background - Color for the unfilled portion of progress bars
@param {Object} props.styles - Custom styles to apply to the container
@param {string} props.className - CSS class names to apply to the container
@param {string} props.selectedItem - Name of the currently selected item (for controlled component)
@param {Function} props.setProps - Dash callback to update props
@returns {React.ReactNode} - Rendered hierarchical data component
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `className` (String; optional): CSS class names to apply to the outer div.
- `colors` (optional): Colors for the component.. colors has the following type: lists containing elements 'primary', 'background'.
Those elements have the following types:
  - `primary` (String; optional)
  - `background` (String; optional)
- `data` (optional): The hierarchical data to display.
Each item should have a name, percentage, and optional children array.. data has the following type: Array of lists containing elements 'name', 'percentage', 'children'.
Those elements have the following types:
  - `name` (String; required)
  - `percentage` (Real; required)
  - `children` (Array; optional)s
- `selectedItem` (Dict; optional): Object representing the currently selected item (controlled component pattern).
This will be updated when a row is clicked.
Contains all properties of the selected item except the 'children' array.
- `styles` (Dict; optional): Inline styles to apply to the outer div.
"""
function simplehierarchy(; kwargs...)
        available_props = Symbol[:id, :className, :colors, :data, :selectedItem, :styles]
        wild_props = Symbol[]
        return Component("simplehierarchy", "SimpleHierarchy", "dash_hierarchies", available_props, wild_props; kwargs...)
end

