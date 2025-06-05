# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class TableHierarchy(Component):
    """A TableHierarchy component.
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
@param {Object} props.selectedColumnHierarchy - Currently selected column in hierarchical format
@param {string} props.indexColumnWidth - The width of the index column 
@param {Function} props.setProps - Dash callback to update props
@returns {React.ReactNode} - Rendered hierarchical table component

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- className (string; optional):
    CSS class names to apply to the outer div.

- columns (list of dicts; optional):
    Array of column definitions. Each column should have a name and
    optional width property. Example: [{ name: 'Forecast
    Decomposition', width: '250px' }, { name: 'January 2024' }].

    `columns` is a list of dicts with keys:

    - name (string; required)

    - width (string; optional)

- data (list; optional):
    The hierarchical data to display. Each item should have arbitrary
    columns and an optional children array.

- indexColumnName (string; required):
    Name of the column to use as the index (leftmost column). This
    column will be sticky when horizontally scrolling.

- indexColumnWidth (string; default '200px'):
    Width of the index column (leftmost column). Can be updated by the
    user via drag-to-resize.

- selectedColumn (dict; optional):
    Object representing the currently selected column (controlled
    component pattern). This will be updated when a column header is
    clicked. Contains the column name and data which is an array of
    objects with the index column value and the value for this column.

    `selectedColumn` is a dict with keys:

    - name (string; optional)

    - data (list of dicts; optional)

- selectedColumnHierarchy (dict; optional):
    Object representing the currently selected column in hierarchical
    format. This preserves the original hierarchy of the data
    structure. Each node contains the index column value, the selected
    column value, and any children.

    `selectedColumnHierarchy` is a dict with keys:

    - name (string; optional)

    - data (list; optional)

- selectedItem (dict; optional):
    Object representing the currently selected item (controlled
    component pattern). This will be updated when a row is clicked.
    Contains all properties of the selected item except the 'children'
    array.

- style (dict; optional):
    Inline styles to apply to the outer div."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_hierarchies'
    _type = 'TableHierarchy'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, data=Component.UNDEFINED, columns=Component.UNDEFINED, indexColumnName=Component.REQUIRED, style=Component.UNDEFINED, className=Component.UNDEFINED, selectedItem=Component.UNDEFINED, selectedColumn=Component.UNDEFINED, selectedColumnHierarchy=Component.UNDEFINED, indexColumnWidth=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'className', 'columns', 'data', 'indexColumnName', 'indexColumnWidth', 'selectedColumn', 'selectedColumnHierarchy', 'selectedItem', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'columns', 'data', 'indexColumnName', 'indexColumnWidth', 'selectedColumn', 'selectedColumnHierarchy', 'selectedItem', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['indexColumnName']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(TableHierarchy, self).__init__(**args)
