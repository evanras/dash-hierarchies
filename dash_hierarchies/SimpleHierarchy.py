# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class SimpleHierarchy(Component):
    """A SimpleHierarchy component.
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
@param {Object} props.selectedItem - Currently selected item (for controlled component)
@param {Function} props.setProps - Dash callback to update props
@returns {React.ReactNode} - Rendered hierarchical data component

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- className (string; optional):
    CSS class names to apply to the outer div.

- colors (dict; default { primary: "#7c3aed", background: "#e5e7eb" }):
    Colors for the component.

    `colors` is a dict with keys:

    - primary (string; optional)

    - background (string; optional)

- data (list of dicts; optional):
    The hierarchical data to display. Each item should have a name,
    percentage, and optional children array.

    `data` is a list of dicts with keys:

    - name (string; required)

    - percentage (number; required)

    - children (list; optional)

- selectedItem (dict; optional):
    Object representing the currently selected item (controlled
    component pattern). This will be updated when a row is clicked.
    Contains all properties of the selected item except the 'children'
    array.

- styles (dict; optional):
    Inline styles to apply to the outer div."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_hierarchies'
    _type = 'SimpleHierarchy'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, data=Component.UNDEFINED, colors=Component.UNDEFINED, styles=Component.UNDEFINED, className=Component.UNDEFINED, selectedItem=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'className', 'colors', 'data', 'selectedItem', 'styles']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'className', 'colors', 'data', 'selectedItem', 'styles']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(SimpleHierarchy, self).__init__(**args)
