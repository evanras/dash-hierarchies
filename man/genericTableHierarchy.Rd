% Auto-generated: do not edit by hand
\name{genericTableHierarchy}

\alias{genericTableHierarchy}

\title{GenericTableHierarchy component}

\description{
GenericTableHierarchy - A component for displaying hierarchical data in a simple table format with expandable rows and row selection.  @param {Object} props - Component props @param {string} props.id - The ID used to identify this component @param {Array} props.data - Array of data items with optional children arrays @param {Array} props.columns - Array of column definitions with name properties @param {Object} props.colors - Custom colors for hover and selection states @param {string} props.uniqueKey - Property name to use as unique identifier for rows @param {Object} props.selectedRow - Currently selected row data @param {string} props.dataKey - Key to use when comparing selected row with current row @param {string} props.highlightKey - Optional secondary key to check for highlighting @param {Object} props.style - Custom styles to apply to the container @param {string} props.className - CSS class names to apply to the container @param {Function} props.setProps - Callback to update props @returns {React.ReactNode} - Rendered hierarchical table component
}

\usage{
genericTableHierarchy(id=NULL, className=NULL, colors=NULL, columns=NULL,
data=NULL, dataKey=NULL, highlightKey=NULL,
selectedRow=NULL, style=NULL, uniqueKey=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component.}

\item{className}{Character. CSS class names to apply to the container.}

\item{colors}{Lists containing elements 'hovercolor', 'selectedcolor'.
those elements have the following types:
  - hovercolor (character; optional)
  - selectedcolor (character; optional). Color configuration for hover and selected states.}

\item{columns}{List of lists containing elements 'name', 'label', 'width', 'align', 'tooltiptext'.
those elements have the following types:
  - name (character; required)
  - label (character; optional)
  - width (character; optional)
  - align (a value equal to: 'left', 'center', 'right'; optional)
  - tooltiptext (character; optional)s. Array of column definitions that specify which fields to display.
Each column should have a name property, and can optionally have width, label, and align.
Example: [{ name: 'title', label: 'Title', width: '200px', align: 'left' }]}

\item{data}{Unnamed list. The hierarchical data to display.
Each item should have arbitrary properties and an optional children array.}

\item{dataKey}{Character. Property name to use when comparing selected row with current row.
Default is the same as uniqueKey.}

\item{highlightKey}{Character. Optional secondary property to check when determining if a row should be highlighted.}

\item{selectedRow}{Named list. Currently selected row data.}

\item{style}{Named list. Inline styles to apply to the container.}

\item{uniqueKey}{Character. Property name in data items to use as unique identifier.
Default is 'id'.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

