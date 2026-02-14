# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class GenericTableHierarchy(Component):
    """A GenericTableHierarchy component.
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

- id (string; optional):
    The ID used to identify this component.

- className (string; default ''):
    CSS class names to apply to the container.

- colors (dict; default { hoverColor: '#f5f5f5', selectedColor: '#e6f7ff' }):
    Color configuration for hover and selected states.

    `colors` is a dict with keys:

    - hoverColor (string; optional)

    - selectedColor (string; optional)

- columns (list of dicts; optional):
    Array of column definitions that specify which fields to display.
    Each column should have a name property, and can optionally have
    width, label, and align. Example: [{ name: 'title', label:
    'Title', width: '200px', align: 'left' }].

    `columns` is a list of dicts with keys:

    - name (string; required)

    - label (string; optional)

    - width (string; optional)

    - align (a value equal to: 'left', 'center', 'right'; optional)

    - tooltipText (string; optional)

- data (list; optional):
    The hierarchical data to display. Each item should have arbitrary
    properties and an optional children array.

- dataKey (string; default 'id'):
    Property name to use when comparing selected row with current row.
    Default is the same as uniqueKey.

- highlightKey (string; optional):
    Optional secondary property to check when determining if a row
    should be highlighted.

- selectedRow (dict; optional):
    Currently selected row data.

- style (dict; optional):
    Inline styles to apply to the container.

- uniqueKey (string; default 'id'):
    Property name in data items to use as unique identifier. Default
    is 'id'."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_hierarchies'
    _type = 'GenericTableHierarchy'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, data=Component.UNDEFINED, columns=Component.UNDEFINED, colors=Component.UNDEFINED, uniqueKey=Component.UNDEFINED, selectedRow=Component.UNDEFINED, dataKey=Component.UNDEFINED, highlightKey=Component.UNDEFINED, style=Component.UNDEFINED, className=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'className', 'colors', 'columns', 'data', 'dataKey', 'highlightKey', 'selectedRow', 'style', 'uniqueKey']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'colors', 'columns', 'data', 'dataKey', 'highlightKey', 'selectedRow', 'style', 'uniqueKey']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(GenericTableHierarchy, self).__init__(**args)
