% Auto-generated: do not edit by hand
\name{tableHierarchy}

\alias{tableHierarchy}

\title{TableHierarchy component}

\description{
TableHierarchy - A Dash component for displaying hierarchical data in a table format with multiple columns, sticky headers, and expandable rows.  This component displays hierarchical data in a table format with support for: - Multiple columns - Sticky index column (leftmost) - Sticky headers - Expandable/collapsible rows - Column selection callbacks - Resizable index column  @param {Object} props - Component props @param {string} props.id - The ID used to identify this component in Dash callbacks @param {Array} props.data - Array of data items with arbitrary columns and optional children arrays @param {Array} props.columns - Array of column definitions with name and width properties @param {string} props.indexColumnName - Name of the column to use as the index (leftmost column) @param {Object} props.style - Custom styles to apply to the container @param {string} props.className - CSS class names to apply to the container @param {Object} props.selectedItem - Currently selected item (for controlled component) @param {Object} props.selectedColumn - Currently selected column (for controlled component) @param {Object} props.selectedColumnHierarchy - Currently selected column in hierarchical format @param {string} props.indexColumnWidth - The width of the index column  @param {Function} props.setProps - Dash callback to update props @returns {React.ReactNode} - Rendered hierarchical table component
}

\usage{
tableHierarchy(id=NULL, className=NULL, columns=NULL, data=NULL,
indexColumnName=NULL, indexColumnWidth=NULL,
selectedColumn=NULL, selectedColumnHierarchy=NULL,
selectedItem=NULL, style=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{className}{Character. CSS class names to apply to the outer div.}

\item{columns}{List of lists containing elements 'name', 'width'.
those elements have the following types:
  - name (character; required)
  - width (character; optional)s. Array of column definitions.
Each column should have a name and optional width property.
Example: [{ name: 'Forecast Decomposition', width: '250px' }, { name: 'January 2024' }]}

\item{data}{Unnamed list. The hierarchical data to display.
Each item should have arbitrary columns and an optional children array.}

\item{indexColumnName}{Character. Name of the column to use as the index (leftmost column).
This column will be sticky when horizontally scrolling.}

\item{indexColumnWidth}{Character. Width of the index column (leftmost column).
Can be updated by the user via drag-to-resize.}

\item{selectedColumn}{Lists containing elements 'name', 'data'.
those elements have the following types:
  - name (character; optional)
  - data (list of named lists; optional). Object representing the currently selected column (controlled component pattern).
This will be updated when a column header is clicked.
Contains the column name and data which is an array of objects with the index column value and the value for this column.}

\item{selectedColumnHierarchy}{Lists containing elements 'name', 'data'.
those elements have the following types:
  - name (character; optional)
  - data (unnamed list; optional). Object representing the currently selected column in hierarchical format.
This preserves the original hierarchy of the data structure.
Each node contains the index column value, the selected column value, and any children.}

\item{selectedItem}{Named list. Object representing the currently selected item (controlled component pattern).
This will be updated when a row is clicked.
Contains all properties of the selected item except the 'children' array.}

\item{style}{Named list. Inline styles to apply to the outer div.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

